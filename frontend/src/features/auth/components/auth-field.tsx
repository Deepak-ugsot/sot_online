import { cn } from "@/lib/utils";
import type { CallbackField } from "../types/auth.types";

type AuthFieldProps = {
  /** Wires the label, the control and the error message together. */
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** `textarea` renders the multi-line control; anything else is an `<input type>`. */
  control: CallbackField["control"];
  autoComplete: string;
  required?: boolean;
  /** Shown under the control, and what marks it invalid to assistive technology. */
  error?: string;
  /** Mobile keyboard hint, where `type` alone does not pick the right one. */
  inputMode?: "text" | "tel" | "email" | "numeric";
};

/**
 * Shared shell for both forms on this screen: label above, control below, error
 * underneath.
 *
 * It takes the control's props rather than the control itself, so the `id` /
 * `aria-describedby` / `aria-invalid` wiring is written once here instead of at each
 * of the five call sites — the place that wiring actually goes wrong.
 *
 * `onChange` hands back the value, not the event. Every caller wants the string, and
 * the phone field has to normalise it on the way through; passing the event would put
 * `event.target.value` in all of them.
 */
export function AuthField({
  id,
  label,
  value,
  onChange,
  placeholder,
  control,
  autoComplete,
  required = false,
  error,
  inputMode,
}: AuthFieldProps) {
  const errorId = `${id}-error`;

  /*
    The dark control treatment. Tinted white rather than a flat hex so it holds its
    relationship to the stage behind it — the panel sits over a lit scene, not over a
    solid colour, and a fixed fill reads as a patch cut out of it.
  */
  const controlClasses = cn(
    "w-full rounded-lg border bg-white/[0.045] px-4 font-display text-[15px] text-white",
    "placeholder:text-white/35",
    "transition-colors duration-250 ease-cinematic hover:border-white/25",
    "focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    // Red border while invalid, so the error is visible without reading the message.
    error ? "border-brand" : "border-white/12",
  );

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-display text-[15px] font-normal text-white/75"
      >
        {label}
      </label>

      {control === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          rows={3}
          className={cn(controlClasses, "resize-y py-3 leading-[1.5]")}
        />
      ) : (
        <input
          id={id}
          type={control}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          inputMode={inputMode}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(controlClasses, "h-12")}
        />
      )}

      {/*
        `role="alert"` rather than a plain paragraph: the message appears after the
        reader has already left the field, so nothing would announce it otherwise.
      */}
      {error && (
        <p id={errorId} role="alert" className="font-display text-[13px] text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
