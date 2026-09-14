/**
 * Formats a stored `yyyy-mm-dd` date for reading.
 *
 * `14 Sep 2004`, not `9/14/2004`: the site's audience is Indian and the ambiguous
 * all-numeric orders are read differently in different places, so the month is spelled.
 *
 * Built from the parts rather than `new Date(value)` — parsing a bare `yyyy-mm-dd`
 * gives a UTC midnight, which in any timezone behind UTC renders as the *previous*
 * day. A birthday is a calendar date, not an instant, and should never shift.
 *
 * Anything that is not a well-formed date comes back unchanged, so a value typed into
 * a browser without `type="date"` is shown as the student entered it.
 */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatStoredDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;

  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) return value;

  return `${Number(day)} ${monthName} ${year}`;
}

/**
 * The initials shown in place of a profile photo.
 *
 * First letter of each of the first two names present, so "Tushar Pal" gives "TP" and
 * a first name alone gives "T". Empty when nothing has been filled in, which is what
 * tells the avatar to fall back to its glyph.
 */
export function toInitials(firstName: string, lastName: string): string {
  return [firstName, lastName]
    .map((part) => part.trim().charAt(0).toUpperCase())
    .filter(Boolean)
    .join("");
}

/** The name under the avatar, or `fallback` until one has been saved. */
export function toDisplayName(
  firstName: string,
  lastName: string,
  fallback: string,
): string {
  const name = [firstName, lastName].map((part) => part.trim()).filter(Boolean).join(" ");
  return name || fallback;
}
