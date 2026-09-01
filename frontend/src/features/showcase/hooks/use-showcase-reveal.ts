"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { SHOWCASE_SELECTORS } from "../constants/showcase.constants";

/** How far below its resting position each card starts. */
const CARD_OFFSET_Y = 28;

/**
 * Cascades the project cards in when the strip scrolls into view.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
 *
 * It animates each card's own `y`, while the marquee translates the *track* around
 * them, so the two never write to the same element's transform.
 *
 * Both tracks are animated, duplicate included: the set of cards that is hidden and
 * the set that is revealed have to be the same one, or the duplicate would sit at
 * full opacity while the original was still fading up.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useShowcaseReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered and nothing is hidden, so the
      // cards render in place. The hidden state is set here rather than in CSS so
      // there is no branch to un-hide, and no Tailwind transform utility for GSAP
      // to fight over the same `transform` property.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(SHOWCASE_SELECTORS.card);
        if (cards.length === 0) return;

        gsap.set(cards, { autoAlpha: 0, y: CARD_OFFSET_Y });

        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: SHOWCASE_SELECTORS.viewport,
            start: "top 85%",
            once: true,
          },
        });

        return () => {
          gsap.set(cards, { clearProps: "opacity,visibility,transform" });
        };
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
