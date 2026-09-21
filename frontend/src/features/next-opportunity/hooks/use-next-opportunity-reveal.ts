"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { NEXT_OPPORTUNITY_SELECTORS } from "../constants/next-opportunity.constants";

/**
 * Reveals the copy, then the four benefits on a stagger, with the render rising
 * alongside them.
 *
 * Fires once and does not reverse — an entrance, not a scroll-linked effect, so
 * scrolling back up leaves the block where it is.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in
 * its final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useNextOpportunityReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(NEXT_OPPORTUNITY_SELECTORS.copy, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 78%", once: true },
        });

        /*
          The benefits walk in in reading order — across the top row, then across the
          bottom — triggered off the first of them rather than off the section, so on
          a tall viewport they are not already finished by the time the reader arrives.
        */
        gsap.from(NEXT_OPPORTUNITY_SELECTORS.benefit, {
          opacity: 0,
          y: 32,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: NEXT_OPPORTUNITY_SELECTORS.benefit,
            start: "top 88%",
            once: true,
          },
        });

        /*
          The render rises rather than sliding in from the right: it is a scene set on
          a plinth, and a horizontal entrance reads as the whole panel being dragged
          on. Lifting it slightly is the one move that agrees with what it is.

          No `scale`: the red panel is a hard-edged rectangle, and growing it about its
          centre walks that edge toward the copy beside it before it settles.
        */
        gsap.from(NEXT_OPPORTUNITY_SELECTORS.artwork, {
          opacity: 0,
          y: 44,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: NEXT_OPPORTUNITY_SELECTORS.artwork,
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
