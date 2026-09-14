"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

import {
  endSession,
  getServerSnapshot,
  getSnapshot,
  subscribe,
  type SessionState,
} from "../services/session.store";

/**
 * The signed-in student, or `null`, or "not known yet".
 *
 * The third state is the one that matters: see `session.store.ts` for why collapsing
 * it into "signed out" breaks every refresh.
 */
export function useSession(): SessionState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * `useSession`, plus a redirect to the login screen once it is known there is none.
 *
 * `replace`, not `push`: a signed-out student bounced off the profile should not be
 * able to press Back into it again.
 *
 * **This is a redirect, not a protection.** The page and its JavaScript are served to
 * anyone who asks; this only decides what they are shown. That is acceptable while the
 * profile holds nothing but the same browser's own `localStorage`, and it stops being
 * acceptable the moment a real API sits behind it — at which point the check belongs in
 * middleware against an httpOnly cookie, and the API has to enforce it besides.
 */
export function useRequireSession(): SessionState {
  const state = useSession();
  const router = useRouter();

  useEffect(() => {
    if (state.status === "unauthenticated") router.replace("/login");
  }, [state.status, router]);

  return state;
}

/** Ends the session and returns to the login screen. */
export function useSignOut(): () => void {
  const router = useRouter();

  return () => {
    endSession();
    router.replace("/login");
  };
}
