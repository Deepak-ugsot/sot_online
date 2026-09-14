import { Phone } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

import { callbackCopy, callbackFields, loginCopy } from "../constants/auth.constants";
import { submitCallbackRequest } from "../services/auth.service";
import type {
  CallbackFieldName,
  CallbackRequest,
  RequestStatus,
} from "../types/auth.types";
import { isValidEmail } from "../utils/email.utils";
import { isValidPhone, toPhoneDigits } from "../utils/phone.utils";
import { AuthField } from "./auth-field";
import { AuthPanel } from "./auth-panel";
import { AuthSubmit } from "./auth-submit";

type CallbackStepProps = {
  /** Whatever the reader already typed on the phone step, so they do not retype it. */
  defaultPhone: string;
  onBack: () => void;
  onSent: () => void;
};

type FieldErrors = Partial<Record<CallbackFieldName, string>>;

const emptyRequest: CallbackRequest = { name: "", email: "", phone: "", query: "" };

/**
 * Checks the whole form at once and returns a message per offending field.
 *
 * All of it, not the first failure: a reader who fixes one field and is then told
 * about the next has to submit once per mistake, and never sees how much is left.
 */
function validate(values: CallbackRequest): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of callbackFields) {
    if (field.required && !values[field.name].trim()) {
      errors[field.name] = callbackCopy.requiredError;
    }
  }

  // Only worth saying once the field has something in it — "required" already covers empty.
  if (!errors.email && !isValidEmail(values.email)) {
    errors.email = callbackCopy.emailError;
  }

  if (!errors.phone && !isValidPhone(values.phone)) {
    errors.phone = loginCopy.phoneError;
  }

  return errors;
}

/**
 * "Request a Callback" — the way off this screen for someone who would rather talk to
 * a person than receive a code.
 *
 * Reached from the top bar on any step and returns to the step it was opened from, so
 * a reader who is midway through an OTP does not lose it by glancing at this.
 *
 * The form is rendered from `callbackFields` rather than written out four times: the
 * fields differ only in label, placeholder, control and autofill hint, and hand-written
 * rows drift apart the first time one of them is restyled.
 */
export function CallbackStep({ defaultPhone, onBack, onSent }: CallbackStepProps) {
  const [values, setValues] = useState<CallbackRequest>(() => ({
    ...emptyRequest,
    phone: defaultPhone,
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (name: CallbackFieldName) => (value: string) => {
    setValues((current) => ({
      ...current,
      // The phone field is held as bare digits here for the same reason as on the
      // login step — see `toPhoneDigits`.
      [name]: name === "phone" ? toPhoneDigits(value) : value,
    }));

    // Drop this field's complaint as soon as it is edited; leave the others standing.
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setFormError(null);
    setStatus("pending");

    try {
      await submitCallbackRequest(values);
      onSent();
    } catch {
      setStatus("error");
      setFormError(callbackCopy.submitError);
    }
  };

  return (
    <AuthPanel heading={callbackCopy.heading} onBack={onBack}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {callbackFields.map((field) => (
          <AuthField
            key={field.name}
            id={`callback-${field.name}`}
            label={field.label}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={handleChange(field.name)}
            control={field.control}
            autoComplete={field.autoComplete}
            required={field.required}
            error={errors[field.name]}
            inputMode={field.name === "phone" ? "tel" : undefined}
          />
        ))}

        {/* Whole-form failure — a field-level message would have nowhere to sit. */}
        {formError && (
          <p role="alert" className="font-display text-[13px] text-brand">
            {formError}
          </p>
        )}

        <AuthSubmit
          isPending={status === "pending"}
          icon={<Phone aria-hidden="true" className="h-4 w-4" />}
        >
          {status === "pending" ? callbackCopy.submitting : callbackCopy.submit}
        </AuthSubmit>
      </form>
    </AuthPanel>
  );
}
