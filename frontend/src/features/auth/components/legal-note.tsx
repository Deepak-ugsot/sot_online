import { legalNote } from "../constants/auth.constants";

const linkClasses =
  "text-brand underline-offset-4 transition-colors duration-250 ease-cinematic hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/**
 * The consent line under the phone and OTP panels.
 *
 * Set as one sentence with two links inside it rather than as three strings the
 * component concatenates — the copy reads as a sentence, so it is stored as one in
 * `legalNote`, with only the link labels pulled out.
 */
export function LegalNote() {
  return (
    <p className="font-display text-[13px] leading-[1.65] text-white/55">
      {legalNote.lead}{" "}
      <a href={legalNote.terms.href} className={linkClasses}>
        {legalNote.terms.label}
      </a>{" "}
      {legalNote.conjunction}{" "}
      <a href={legalNote.privacy.href} className={linkClasses}>
        {legalNote.privacy.label}
      </a>
    </p>
  );
}
