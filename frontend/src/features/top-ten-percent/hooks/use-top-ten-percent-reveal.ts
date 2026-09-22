"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { TOP_TEN_PERCENT_SELECTORS } from "../constants/top-ten-percent.constants";

/**
 * Reveals the copy, the cohort photo and the handwritten annotation as three beats.
 * Fires once and does not reverse — an entrance, not a scroll-linked effect. Mirrors
 * `useHackathonsReveal`.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in its
 * final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useTopTenPercentReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(TOP_TEN_PERCENT_SELECTORS.beat, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: TOP_TEN_PERCENT_SELECTORS.copy,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(TOP_TEN_PERCENT_SELECTORS.artwork, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: TOP_TEN_PERCENT_SELECTORS.artwork,
            start: "top 85%",
            once: true,
          },
        });

        // On its own trigger and a beat behind the figure — it reads as a note added
        // beside the photo, not as part of the same rise.
        gsap.from(TOP_TEN_PERCENT_SELECTORS.annotation, {
          opacity: 0,
          y: 12,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: TOP_TEN_PERCENT_SELECTORS.artwork,
            start: "top 85%",
            once: true,
          },
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
