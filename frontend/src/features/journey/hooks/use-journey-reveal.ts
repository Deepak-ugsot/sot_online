"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { JOURNEY_SELECTORS } from "../constants/journey.constants";

/**
 * Brings the heading in, then cascades the gallery cards.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
 *
 * It animates each card's `y` and opacity, which is safe alongside the open/closed
 * behaviour: that is driven entirely by `flex-grow` in CSS, so the two never write to
 * the same property.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useJourneyReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered, so both render in place.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(`${JOURNEY_SELECTORS.heading} > *`, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        gsap.from(JOURNEY_SELECTORS.card, {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          // Triggered off the gallery rather than the section: on the stacked layout
          // the section top clears the line while the cards are still below the fold.
          scrollTrigger: {
            trigger: JOURNEY_SELECTORS.gallery,
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
