"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { GLOBAL_AMBITION_SELECTORS } from "../constants/global-ambition.constants";

/**
 * Reveals the header, then the cards on a stagger, as the section scrolls in.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect,
 * so scrolling back up leaves the block where it is.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in
 * its final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useGlobalAmbitionReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(GLOBAL_AMBITION_SELECTORS.header, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 82%", once: true },
        });

        /*
          The grid is triggered off its own top rather than the section's, and a
          little later than the header — otherwise on a tall viewport the whole
          block, heading included, would already be on screen before anything moved.

          `stagger` walks the cards in DOM order, which is reading order: across the
          first row, across the second, then the full-width card last.
        */
        gsap.from(GLOBAL_AMBITION_SELECTORS.card, {
          opacity: 0,
          y: 44,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: GLOBAL_AMBITION_SELECTORS.card,
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
