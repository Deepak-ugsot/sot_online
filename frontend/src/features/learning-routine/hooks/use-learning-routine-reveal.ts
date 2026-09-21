"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { LEARNING_ROUTINE_SELECTORS } from "../constants/learning-routine.constants";

/**
 * Reveals the heading row, then the card, then the four parts in reading order, as the
 * section scrolls in.
 *
 * Fires once and does not reverse — an entrance, not a scroll-linked effect.
 *
 * The card and the parts are triggered off their own tops rather than the section's:
 * the heading row sits above them, and on a short viewport the section top clears the
 * trigger line while they are still below the fold.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in its
 * final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useLearningRoutineReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(LEARNING_ROUTINE_SELECTORS.header, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        gsap.from(LEARNING_ROUTINE_SELECTORS.artwork, {
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: LEARNING_ROUTINE_SELECTORS.artwork,
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(LEARNING_ROUTINE_SELECTORS.item, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: LEARNING_ROUTINE_SELECTORS.item,
            start: "top 88%",
            once: true,
          },
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
