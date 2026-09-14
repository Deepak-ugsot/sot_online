import {
  SESSION_STORAGE_KEY,
  clearSession,
  readSession,
  writeSession,
} from "./session.service";
import type { Session, SessionStatus } from "../types/auth.types";

/**
 * The session, as an external store React can subscribe to.
 *
 * Same reasoning as `profile.store.ts`: `localStorage` is external state that does not
 * exist during the server render, and reading it in an effect renders once with the
 * wrong answer. `useSyncExternalStore` renders the server snapshot while hydrating and
 * the live one immediately after.
 *
 * Here that ordering does real work. The server snapshot's status is **`loading`**,
 * which is not a placeholder — it is the honest answer for the one render where the
 * session cannot be known. A guard that collapsed it to "signed out" would bounce every
 * signed-in student back to the login screen on every refresh.
 */

export type SessionState = {
  status: SessionStatus;
  session: Session | null;
};

/** Stable reference, so the hydrating render never reports a changed snapshot. */
const LOADING: SessionState = { status: "loading", session: null };

let snapshot: SessionState = LOADING;
let isLoaded = false;

const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function toState(session: Session | null): SessionState {
  return session
    ? { status: "authenticated", session }
    : { status: "unauthenticated", session: null };
}

/** Another tab signed in or out; this one follows rather than showing a stale screen. */
function onStorage(event: StorageEvent): void {
  // `key` is null when the whole store is cleared, which is also our business.
  if (event.key !== null && event.key !== SESSION_STORAGE_KEY) return;
  snapshot = toState(readSession());
  emit();
}

export function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

/** Cached, so repeated calls in one render return the same reference. */
export function getSnapshot(): SessionState {
  if (!isLoaded) {
    isLoaded = true;
    snapshot = toState(readSession());
  }
  return snapshot;
}

export function getServerSnapshot(): SessionState {
  return LOADING;
}

/** Signs the student in. Called once, on a verified OTP. */
export function startSession(phone: string): void {
  snapshot = toState(writeSession(phone));
  isLoaded = true;
  emit();
}

/** Signs the student out, here and in every other open tab. */
export function endSession(): void {
  clearSession();
  snapshot = toState(null);
  isLoaded = true;
  emit();
}
