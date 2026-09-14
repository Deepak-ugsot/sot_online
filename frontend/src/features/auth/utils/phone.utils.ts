/**
 * Phone number handling for the login screen.
 *
 * The input holds the ten national digits and nothing else — no spaces, no dashes,
 * no country code. The `+91` is chrome the screen draws, not something the reader
 * types, so it never has to be parsed back out.
 */

/** Digits in an Indian mobile number, excluding the dial code. */
export const PHONE_LENGTH = 10;

/**
 * Ten digits starting 6-9.
 *
 * The leading digit matters as much as the count: a landline or a number typed with
 * the country code still in front of it is the right *length* often enough that a
 * bare `\d{10}` waves both through, and the reader then waits for an SMS that was
 * never going to arrive.
 *
 * Written as a literal rather than built from `PHONE_LENGTH` so it reads as what it
 * is — if that constant ever changes, this pattern has to be looked at anyway.
 */
const MOBILE_PATTERN = /^[6-9]\d{9}$/;

/**
 * Removes a dial code or trunk prefix that has pushed the number past ten digits.
 *
 * A reader who writes their number the way they say it out loud — `+91 93474 36818`,
 * or `093474 36818` — hands over twelve or eleven digits. Truncating those to ten
 * keeps the prefix and loses the end of the actual number, and the result still
 * *passes* validation, because `9193474368` is ten digits beginning with a 9. The
 * code is then sent to a number nobody owns and the reader is left waiting on an SMS
 * with nothing to tell them why.
 *
 * Only ever applied to an over-long value: a ten-digit number starting `91` is a real
 * number and is left exactly as it is. The loop covers a value carrying both prefixes.
 */
function stripPrefixes(digits: string): string {
  let result = digits;

  while (result.length > PHONE_LENGTH) {
    if (result.startsWith("91")) {
      result = result.slice(2);
      continue;
    }
    if (result.startsWith("0")) {
      result = result.slice(1);
      continue;
    }
    break;
  }

  return result;
}

/**
 * Strips everything that is not a digit, drops any dial code, and caps the result at
 * `PHONE_LENGTH`.
 *
 * Run on every keystroke rather than on submit, so a pasted `+91 93474 36818` lands
 * as `9347436818` instead of being rejected for punctuation the reader did not
 * knowingly type — and so a number typed *with* its country code corrects itself as
 * the eleventh digit arrives rather than being quietly truncated to a wrong one.
 */
export function toPhoneDigits(value: string): string {
  return stripPrefixes(value.replace(/\D/g, "")).slice(0, PHONE_LENGTH);
}

/** Whether `digits` — already normalised by `toPhoneDigits` — is a mobile number. */
export function isValidPhone(digits: string): boolean {
  return MOBILE_PATTERN.test(digits);
}

/** `9347436818` → `+91-9347436818`, the form the OTP card reads back to confirm. */
export function formatPhone(digits: string, dialCode: string): string {
  return `${dialCode}-${digits}`;
}
