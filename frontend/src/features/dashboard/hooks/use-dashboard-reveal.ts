"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { DASHBOARD_SELECTORS } from "../constants/dashboard.constants";

/**
 * Reveals the section in three beats: heading, then the checklist items cascading,
 * then the dashboard panel rising into place.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useDashboardReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered, so everything renders in place.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(DASHBOARD_SELECTORS.heading, {
          opacity: 0,
          y: 55,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 90%", once: true },
        });

        // Staggered per item rather than per row: the cascade should read left to
        // right across the whole block, not restart on the second line.
        gsap.from(DASHBOARD_SELECTORS.checklistItem, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: DASHBOARD_SELECTORS.checklist,
            start: "top 90%",
            once: true,
          },
        });

        gsap.from(DASHBOARD_SELECTORS.media, {
          opacity: 0,
          y: 70,
          scale: 0.88,
          duration: 1,
          ease: "power3.out",
          // Triggered off the panel itself: it sits well below the heading, so the
          // section top clears the trigger line long before it is visible.
          scrollTrigger: {
            trigger: DASHBOARD_SELECTORS.media,
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
