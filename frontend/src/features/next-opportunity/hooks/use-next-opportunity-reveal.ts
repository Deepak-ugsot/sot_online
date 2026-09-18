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
          The render rises rather than sliding in from the right. The figure is
          already in the air over a globe, and a horizontal entrance reads as the
          whole plate being dragged on; lifting it slightly is the one move that
          agrees with what the picture is of.

          No `scale`: the file's ground is an opaque `#f3f4f6` plate that matches the
          section exactly, and scaling it about its centre would walk its edges over
          the copy beside it before settling — visible as a moving rectangle on a
          background that is otherwise seamless.
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
