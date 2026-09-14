import { Pencil } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  DIAL_CODE,
  OTP_LENGTH,
  RESEND_SECONDS,
  loginCopy,
  otpCopy,
} from "../constants/auth.constants";
import { useOtpCode } from "../hooks/use-otp-code";
import { useResendCountdown } from "../hooks/use-resend-countdown";
import { requestOtp, verifyOtp } from "../services/auth.service";
import type { RequestStatus } from "../types/auth.types";
import { formatPhone } from "../utils/phone.utils";
import { AuthPanel } from "./auth-panel";
import { LegalNote } from "./legal-note";

type OtpStepProps = {
  /** The number the code went to. Read back to the reader, and sent with the code. */
  phone: string;
  /**
   * When the current code was sent, as `Date.now()`. Held by the screen rather than
   * here so the resend countdown survives a detour to the callback form — this step
   * unmounts while that is open, and a timestamp owned here would restart the clock
   * on the way back and make the reader wait a second full minute for a code that
   * was sent a minute ago.
   */
  sentAt: number;
  /** Reports a fresh code, so the screen can restart the countdown. */
  onResent: () => void;
  /** The pencil: back to step one with the number still in the field. */
  onEditPhone: () => void;
  onBack: () => void;
  onVerified: () => void;
};

/**
 * Step two: the four-digit code.
 *
 * **The card has no submit button, by design.** Verification fires the moment the
 * last digit lands — a four-box field is full at a glance, so a button underneath it
 * asks the reader to confirm something they can already see is done. The work of
 * getting focus, backspace and paste to behave across four inputs lives in
 * `useOtpCode`; what is left here is the card.
 *
 * A rejected code is **not** cleared. Wiping four boxes to punish one mistyped digit
 * makes the reader re-enter the three they got right; leaving them lets a single
 * keystroke fix it, and editing any digit re-fires verification on its own.
 */
export function OtpStep({
  phone,
  sentAt,
  onResent,
  onEditPhone,
  onBack,
  onVerified,
}: OtpStepProps) {
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [resendStatus, setResendStatus] = useState<RequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const secondsLeft = useResendCountdown(RESEND_SECONDS, sentAt);

  const verify = async (code: string) => {
    setStatus("pending");
    setError(null);

    try {
      if (await verifyOtp(phone, code)) {
        onVerified();
        return;
      }
      setStatus("error");
      setError(otpCopy.verifyError);
    } catch {
      // A code the server rejected and a code that never reached it are different
      // failures, and telling a reader their correct code is wrong sends them
      // hunting for a problem they do not have.
      setStatus("error");
      setError(otpCopy.networkError);
    }
  };

  const otp = useOtpCode({
    length: OTP_LENGTH,
    onComplete: (code) => {
      void verify(code);
    },
  });

  const canResend = secondsLeft === 0 && resendStatus !== "pending";

  const handleResend = async () => {
    if (!canResend) return;

    setResendStatus("pending");
    setError(null);

    try {
      await requestOtp(phone);
      // Order matters: clear the boxes first, then restart the clock. The reset moves
      // focus back to the first box, which is where the new code gets typed.
      otp.reset();
      setStatus("idle");
      onResent();
      setResendStatus("idle");
    } catch {
      setResendStatus("error");
      setError(otpCopy.resendError);
    }
  };

  return (
    <AuthPanel heading={loginCopy.heading} onBack={onBack} footer={<LegalNote />}>
      <div className="rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-7 backdrop-blur-md sm:px-8">
        {/* `h2` — `AuthPanel`'s heading is the `h1`, and this card sits under it. */}
        <h2 className="text-center font-display text-[clamp(1.375rem,2.4vw,1.75rem)] font-bold text-white">
          {otpCopy.heading}
        </h2>

        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-display text-[14px] text-white/70">
          {otpCopy.sentToPrefix}{" "}
          <span className="inline-flex items-center gap-2 text-brand">
            {formatPhone(phone, DIAL_CODE)}
            <button
              type="button"
              onClick={onEditPhone}
              // Icon-only, so the name has to be written out — "Pencil" is what a
              // screen reader would otherwise be left to announce.
              aria-label={otpCopy.editLabel}
              className="cursor-pointer rounded-sm p-0.5 transition-opacity duration-250 ease-cinematic hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          </span>
        </p>

        <div
          role="group"
          aria-label={otpCopy.heading}
          className="mt-6 flex items-center justify-center gap-3"
        >
          {Array.from({ length: OTP_LENGTH }, (_, index) => (
            <input
              key={index}
              ref={otp.registerInput(index)}
              value={otp.code[index] ?? ""}
              onChange={(event) => otp.handleChange(index, event.target.value)}
              onKeyDown={(event) => otp.handleKeyDown(index, event)}
              onPaste={otp.handlePaste}
              // Selects whatever digit is already there, so a keystroke replaces it
              // instead of being appended to it.
              onFocus={(event) => event.currentTarget.select()}
              inputMode="numeric"
              /*
                No `maxLength`. Android autofill drops the whole SMS code into the
                first box, and a cap of 1 would keep the first digit and silently bin
                the rest; `useOtpCode` spreads a multi-digit value across the boxes
                instead. Nothing over-fills — the value is controlled.
              */
              autoComplete={index === 0 ? "one-time-code" : "off"}
              aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
              aria-invalid={status === "error" ? true : undefined}
              className={cn(
                "h-12 w-12 rounded-lg border bg-white/[0.05] text-center font-display text-lg font-semibold text-white",
                "transition-colors duration-250 ease-cinematic",
                "focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                status === "error" ? "border-brand" : "border-white/15",
              )}
            />
          ))}
        </div>

        {/*
          One live region for both messages, always rendered. A region that is added
          to the page at the same moment it gets its text is frequently missed by
          screen readers — it has to be there beforehand for the change to be
          announced.
        */}
        <p
          role="status"
          className={cn(
            "mt-4 min-h-[1.25rem] text-center font-display text-[13px]",
            error ? "text-brand" : "text-white/55",
          )}
        >
          {error ?? (status === "pending" ? otpCopy.verifying : "")}
        </p>

        <div className="mt-1 text-center font-display text-[14px] text-white/55">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="cursor-pointer text-white underline-offset-4 transition-colors duration-250 ease-cinematic hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {otpCopy.resend}
            </button>
          ) : (
            // Plain text, not a disabled button: there is nothing to press yet, and a
            // dead control in the tab order is worse than a sentence.
            <span>
              {resendStatus === "pending"
                ? otpCopy.resending
                : otpCopy.resendPending.replace("{seconds}", String(secondsLeft))}
            </span>
          )}
        </div>
      </div>
    </AuthPanel>
  );
}
