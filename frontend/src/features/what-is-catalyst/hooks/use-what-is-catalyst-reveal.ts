"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { WHAT_IS_CATALYST_SELECTORS } from "../constants/what-is-catalyst.constants";

/**
 * Reveals the copy, the artwork and the logo band as the section scrolls in.
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
export function useWhatIsCatalystReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(WHAT_IS_CATALYST_SELECTORS.copy, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 78%", once: true },
        });

        /*
          The render is a hand holding a fan of cards out toward the reader, so it
          arrives the way the hand would: forward and slightly up, rather than sliding
          in from an edge.

          `transformOrigin` is the top right — where the hand is. Scaled about its
          centre the whole composition would swell, wrist included; about the hand,
          the cards swing down into place and the hand stays where it is.

          Triggered off the artwork's own top rather than the section's: on a tall
          viewport the whole block is on screen before the section's trigger point is
          crossed, and the move would be over before the reader got here.
        */
        gsap.from(WHAT_IS_CATALYST_SELECTORS.artwork, {
          opacity: 0,
          y: 34,
          scale: 0.94,
          transformOrigin: "80% 10%",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: WHAT_IS_CATALYST_SELECTORS.artwork,
            start: "top 85%",
            once: true,
          },
        });

        // On its own trigger: on a phone the band is the bottom of a very tall
        // section, and tying it to the copy above would have it play out unseen.
        gsap.from(WHAT_IS_CATALYST_SELECTORS.employers, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: WHAT_IS_CATALYST_SELECTORS.employers,
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
