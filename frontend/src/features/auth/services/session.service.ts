import type { Session } from "../types/auth.types";

/**
 * Where "who is signed in" is kept.
 *
 * **`localStorage`, which is a front-end stand-in and not a security boundary.** It is
 * readable and writable by any script on the origin, it never reaches the server, and
 * nothing here is verified — anyone can grant themselves a session from the console.
 * That is acceptable only because there is no backend and nothing behind this gate is
 * private: the profile screens read and write the same browser's `localStorage`.
 *
 * The real thing is an httpOnly, `Secure`, `SameSite=Lax` cookie set by the server on
 * verification, checked in middleware so a signed-out request never reaches the page
 * at all. When that lands, every function here becomes a call against it and the rest
 * of the app — `useSession`, the guard, the profile layout — is untouched.
 */

const STORAGE_KEY = "ugsot.session";

/**
 * Reads the stored session, or `null` if there is none.
 *
 * Returns `null` rather than throwing for anything unexpected — a half-written value,
 * a key someone edited by hand, or `localStorage` throwing outright, which it does in
 * Safari's private mode and wherever the user has blocked site data. A student whose
 * storage is unreadable should meet the login screen, not a crash.
 */
export function readSession(): Session | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as Session).phone !== "string" ||
      typeof (parsed as Session).signedInAt !== "number"
    ) {
      return null;
    }

    return parsed as Session;
  } catch {
    return null;
  }
}

/** Starts a session for `phone`. Called once, on a verified OTP. */
export function writeSession(phone: string): Session {
  const session: Session = { phone, signedInAt: Date.now() };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Storage full, or blocked. The sign-in still stands for this page view; the
    // student will simply be asked to log in again on the next one, which is a far
    // better outcome than failing the verification they just completed.
  }

  return session;
}

/**
 * Ends the session.
 *
 * Deliberately leaves the saved profile alone: the profile is this browser's copy of
 * the student's own data, and wiping it on every sign-out would mean re-typing the
 * form each time. A real sign-out clears the cookie and the data comes back from the
 * server on the next sign-in.
 */
export function clearSession(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do — if it cannot be removed it was almost certainly never written.
  }
}

/** The key, exported so `useSession` can tell this store's `storage` events apart. */
export const SESSION_STORAGE_KEY = STORAGE_KEY;
