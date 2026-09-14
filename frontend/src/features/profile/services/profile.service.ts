import type { EditableSectionId, ProfileRecord } from "../types/profile.types";

/**
 * Where the student's profile is kept.
 *
 * **`localStorage`, as a stand-in for the API.** Everything saved here lives in one
 * browser and reaches no server: a student who signs in on their phone sees an empty
 * form. That is the accepted shape of this build — front-end only — and the reason
 * every access goes through this module rather than touching `localStorage` from a
 * component. Replacing it with `GET`/`PATCH /profile` is a change to these three
 * functions; the provider, the hooks and all four screens are untouched.
 *
 * Not keyed by student. There is one profile per browser, which is correct while the
 * session is also per-browser — see `auth/services/session.service.ts`. A real API
 * scopes by the authenticated user and this question disappears.
 */

const STORAGE_KEY = "ugsot.profile";

/** Every section present and empty — the shape the screens render before anything is saved. */
export const EMPTY_PROFILE: ProfileRecord = {
  personal: {},
  academic: {},
  professional: {},
};

/**
 * Reads the saved profile, falling back to an empty one.
 *
 * Every failure path returns `EMPTY_PROFILE` rather than throwing: malformed JSON, a
 * key edited by hand, `localStorage` unavailable (Safari private mode, blocked site
 * data). A student whose storage is unreadable should meet an empty form they can
 * fill in, not a crashed page.
 *
 * Sections are merged over the empty record rather than trusted wholesale, so a stored
 * value written by an older version — missing `professional`, say — cannot leave a
 * section undefined and take a screen down with it.
 */
export function readProfile(): ProfileRecord {
  if (typeof window === "undefined") return EMPTY_PROFILE;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROFILE;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return EMPTY_PROFILE;

    const stored = parsed as Partial<Record<EditableSectionId, unknown>>;

    return {
      personal: toValues(stored.personal),
      academic: toValues(stored.academic),
      professional: toValues(stored.professional),
    };
  } catch {
    return EMPTY_PROFILE;
  }
}

/** Keeps only string entries, so one bad value cannot put a non-string into an input. */
function toValues(section: unknown): Record<string, string> {
  if (typeof section !== "object" || section === null) return {};

  return Object.fromEntries(
    Object.entries(section).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
}

/**
 * Writes the whole profile.
 *
 * Whole-record rather than per-section, because a partial write needs a read first and
 * two tabs saving different sections would then race, each overwriting the other's
 * section with the copy it read on load. The caller holds the current record and hands
 * back the next one.
 *
 * Throws if storage refuses — the caller surfaces that, because a save that silently
 * failed is the one failure a student must not be left believing succeeded.
 */
export function writeProfile(record: ProfileRecord): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

/** Clears the saved profile. Not wired to sign-out — see `clearSession` for why. */
export function clearProfile(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do — an unremovable key was almost certainly never written.
  }
}
