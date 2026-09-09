"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { LEARN_FROM_PEOPLE_SELECTORS } from "../constants/learn-from-people.constants";

/**
 * Reveals the heading, then the four cards, then the closing line as the section
 * scrolls in.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect,
 * so scrolling back up leaves the grid where it is.
 *
 * The cards are staggered in document order, which is reading order in both layouts:
 * down the single column on a phone, and left-to-right across the two columns from
 * `lg`. They are triggered off the grid rather than the section top, so a tall viewport
 * cannot clear the trigger while the cards themselves are still below the fold.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in its
 * final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useLearnFromPeopleReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(LEARN_FROM_PEOPLE_SELECTORS.heading, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        // Gentler than the heading: a card is a large tinted block, and the same 30px
        // lift on four of them at once reads as the grid jolting rather than arriving.
        gsap.from(LEARN_FROM_PEOPLE_SELECTORS.card, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: LEARN_FROM_PEOPLE_SELECTORS.card,
            start: "top 88%",
            once: true,
          },
        });

        gsap.from(LEARN_FROM_PEOPLE_SELECTORS.closing, {
          opacity: 0,
          y: 22,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: LEARN_FROM_PEOPLE_SELECTORS.closing,
            start: "top 92%",
            once: true,
          },
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
