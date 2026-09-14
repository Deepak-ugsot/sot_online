"use client";

import { useSyncExternalStore } from "react";

import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "../services/profile.store";
import type { ProfileRecord } from "../types/profile.types";

/**
 * The student's saved profile.
 *
 * Empty on the server and for the hydrating render, then the stored record — see
 * `profile.store.ts` for why that ordering is deliberate rather than a compromise.
 */
export function useProfile(): ProfileRecord {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
