import {
  EMPTY_PROFILE,
  readProfile,
  writeProfile,
} from "./profile.service";
import type {
  EditableSectionId,
  ProfileRecord,
  ProfileValues,
} from "../types/profile.types";

/**
 * The profile, as an external store React can subscribe to.
 *
 * **A store rather than context, and `useSyncExternalStore` rather than an effect.**
 * `localStorage` is genuinely external state: it exists before React mounts, it is
 * mutated from other tabs, and it is not there at all during the server render.
 * Reading it in an effect and calling `setState` makes React render once with the
 * wrong answer and again with the right one, which is both a cascading render and the
 * standard way a hydration mismatch gets introduced. `useSyncExternalStore` is the
 * primitive built for exactly this: it renders the server snapshot during hydration
 * and switches to the live one immediately after.
 *
 * Module scope also means every screen and the sidebar share one copy with no provider
 * to wrap them in — saving a name in Personal Details updates the rail in the same
 * commit.
 */

/** The current record. Replaced, never mutated: subscribers compare by reference. */
let snapshot: ProfileRecord = EMPTY_PROFILE;

/**
 * Whether `snapshot` has been filled from storage yet.
 *
 * The read is deferred to the first `getSnapshot` *after* hydration rather than done
 * at module load, so a server render and the hydrating client render agree on
 * `EMPTY_PROFILE` and React can match the two trees.
 */
let isLoaded = false;

const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

/** Re-reads storage after another tab wrote to it. */
function onStorage(event: StorageEvent): void {
  // `key` is null when the whole store is cleared, which is also our business.
  if (event.key !== null && event.key !== "ugsot.profile") return;
  snapshot = readProfile();
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

/**
 * The live record.
 *
 * Must return the *same reference* until something actually changes, or React treats
 * every call as a new value and re-renders forever — hence the cache rather than
 * parsing storage on each call.
 */
export function getSnapshot(): ProfileRecord {
  if (!isLoaded) {
    isLoaded = true;
    snapshot = readProfile();
  }
  return snapshot;
}

/** What the server renders, and what the client hydrates against. Always empty. */
export function getServerSnapshot(): ProfileRecord {
  return EMPTY_PROFILE;
}

/**
 * Replaces one section and persists the whole record.
 *
 * Merges into the live snapshot rather than into a copy the caller captured earlier, so
 * two sections saved in quick succession cannot overwrite each other.
 *
 * Writes first and publishes second: if storage refuses — quota, blocked site data —
 * this throws and the store is left exactly as it was, so the screen never shows a
 * saved state for something that was not saved.
 */
export function saveSection(id: EditableSectionId, values: ProfileValues): void {
  const next: ProfileRecord = { ...getSnapshot(), [id]: values };
  writeProfile(next);
  snapshot = next;
  emit();
}
