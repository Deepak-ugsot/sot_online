"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { LEADERS_SELECTORS } from "../constants/leaders.constants";

/**
 * Reveals the heading and quote, then the three portraits in reading order, as the
 * section scrolls in.
 *
 * Fires once and does not reverse — an entrance, not a scroll-linked effect, so
 * scrolling back up leaves the row where it is.
 *
 * The portraits are triggered off the row rather than the section: the heading block
 * sits above them, so on a short viewport the section top clears the trigger line while
 * the portraits are still below the fold, and they would finish arriving unseen.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in its
 * final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useLeadersReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(LEADERS_SELECTORS.intro, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        gsap.from(LEADERS_SELECTORS.card, {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: LEADERS_SELECTORS.grid,
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
