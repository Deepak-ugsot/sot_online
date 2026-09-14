/**
 * Something before an `@`, something after it, and a dot in the domain.
 *
 * Deliberately loose. The grammar an address is actually allowed to take is far
 * wider than any pattern worth shipping, and a strict one's only measurable effect is
 * to turn away real addresses — the address is confirmed by mail reaching it, not by
 * this. All this catches is the typo class the reader can see themselves: a missing
 * `@`, a missing domain, a stray space.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Whether `value` is plausibly an email address. Trims first — a trailing space is not a typo worth refusing. */
export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}
