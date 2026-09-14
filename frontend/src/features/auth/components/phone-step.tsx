import { useState } from "react";
import type { FormEvent } from "react";

import { loginCopy } from "../constants/auth.constants";
import { requestOtp } from "../services/auth.service";
import type { RequestStatus } from "../types/auth.types";
import { isValidPhone, toPhoneDigits } from "../utils/phone.utils";
import { AuthField } from "./auth-field";
import { AuthPanel } from "./auth-panel";
import { AuthSubmit } from "./auth-submit";
import { LegalNote } from "./legal-note";

type PhoneStepProps = {
  /** Ten national digits, held by the screen so it survives a trip to the OTP card. */
  phone: string;
  onPhoneChange: (digits: string) => void;
  /** Called once the code is on its way, to advance the screen to the OTP card. */
  onSent: () => void;
};

/**
 * Step one: the number the code goes to.
 *
 * The field is normalised on every keystroke rather than validated on submit alone,
 * so a pasted `+91 93474 36818` becomes ten digits instead of being rejected for
 * characters the reader did not knowingly type. Validity is still only *asserted* on
 * submit — telling someone their number is wrong while they are still typing it is
 * noise.
 */
export function PhoneStep({ phone, onPhoneChange, onSent }: PhoneStepProps) {
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => {
    // Any edit answers the complaint, so the message goes as soon as one is made.
    setError(null);
    onPhoneChange(toPhoneDigits(value));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidPhone(phone)) {
      setError(loginCopy.phoneError);
      return;
    }

    setError(null);
    setStatus("pending");

    try {
      await requestOtp(phone);
      // No state reset on the way out: this step unmounts as the screen advances.
      onSent();
    } catch {
      setStatus("error");
      setError(loginCopy.sendError);
    }
  };

  return (
    <AuthPanel heading={loginCopy.heading} footer={<LegalNote />}>
      {/* `noValidate` — the browser's own bubble would pre-empt the message under the
          field, and it cannot be styled to match anything else on this screen. */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <AuthField
          id="login-phone"
          label={loginCopy.phoneLabel}
          placeholder={loginCopy.phonePlaceholder}
          value={phone}
          onChange={handleChange}
          control="tel"
          autoComplete="tel-national"
          inputMode="tel"
          /*
            No `maxLength`. A cap of ten characters stops an eleventh digit ever
            reaching `toPhoneDigits`, which is exactly the keystroke at which a number
            typed with its country code gets corrected — with the cap on, `+919347436818`
            sticks at `9193474368`, which is a valid-looking number belonging to nobody.
            The value is controlled and normalised on every keystroke, so nothing
            over-fills without it.
          */
          required
          error={error ?? undefined}
        />

        <AuthSubmit isPending={status === "pending"}>
          {status === "pending" ? loginCopy.sendingOtp : loginCopy.sendOtp}
        </AuthSubmit>
      </form>
    </AuthPanel>
  );
}
