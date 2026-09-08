"use client";

import { useEffect } from "react";

import { gsap } from "@/lib/gsap";

/**
 * Temporary verification aid: puts the app's own GSAP instance on `window` so the
 * animation can be stepped by hand.
 *
 * Needed because the automation browser runs with its rAF frozen, so GSAP never renders a
 * frame on its own — including the deferred initial render of a `fromTo`. Exposing the
 * instance allows `__gsap.ticker.tick()` and `tween.progress(n)` to drive it deterministically.
 */
export function GsapBridge() {
  useEffect(() => {
    (window as unknown as { __gsap: typeof gsap }).__gsap = gsap;
  }, []);

  return null;
}
