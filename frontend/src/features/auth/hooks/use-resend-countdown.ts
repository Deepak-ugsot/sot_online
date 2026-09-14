"use client";

import { useEffect, useState } from "react";

/** How often the remaining time is recomputed. Sub-second so the display never sticks. */
const TICK_MS = 500;

/**
 * Seconds left before a one-time code can be resent.
 *
 * Counts down from `seconds` and restarts whenever `startedAt` changes — pass a fresh
 * `Date.now()` each time a code goes out, and the timer resets itself.
 *
 * **The value is derived from a deadline, not decremented once per tick.** A
 * background tab has its timers throttled to once a second at best and often far
 * less, so a counter that subtracts 1 per tick falls behind real time: a reader who
 * checks their messages in another tab — which is the entire point of this screen —
 * comes back to a timer still claiming 40 seconds. Recomputing against a fixed
 * deadline is correct no matter how many ticks were dropped.
 */
export function useResendCountdown(seconds: number, startedAt: number): number {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const deadline = startedAt + seconds * 1000;

    /** Writes the current remaining time and reports it, so the caller can stop at 0. */
    const tick = () => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(left);
      return left;
    };

    // Run once up front: the first interval is a whole tick away, and on a resend the
    // display would otherwise hold the stale 0 until then.
    if (tick() === 0) return;

    const id = window.setInterval(() => {
      if (tick() === 0) window.clearInterval(id);
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [seconds, startedAt]);

  return remaining;
}
