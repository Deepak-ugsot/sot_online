"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { ECOSYSTEM_SELECTORS } from "../constants/ecosystem.constants";

/**
 * Brings the heading, then the collage, then the figures in as the section arrives.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
 *
 * **It animates the collage wrapper, never the cards themselves.** Each card carries
 * its fan angle in its own `transform`; animating a card's `y` here would overwrite
 * that transform and silently drop the rotation. Moving the wrapper leaves every
 * card's angle untouched — the same split the mentors marquee uses for the same
 * reason.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useEcosystemReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered, so everything renders in place.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(`${ECOSYSTEM_SELECTORS.heading} > *`, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        // Triggered off each block itself rather than the section: the section top
        // clears the trigger line long before the lower blocks are on screen.
        gsap.from(ECOSYSTEM_SELECTORS.collage, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ECOSYSTEM_SELECTORS.collage,
            start: "top 90%",
            once: true,
          },
        });

        gsap.from(ECOSYSTEM_SELECTORS.stats, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ECOSYSTEM_SELECTORS.stats,
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
