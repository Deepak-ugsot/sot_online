"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { FAQ_SELECTORS } from "../constants/faq.constants";

/**
 * Reveals the intro column, then cascades the accordion rows in from the left.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
 *
 * Only `opacity` and `x` are animated, deliberately: the accordion animates its own
 * `grid-template-rows` when a row opens, and touching a row's `transform` or height
 * here would collide with that.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useFaqReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered, so everything renders in place.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        // Animated as one block rather than per-child: the intro is a flex column
        // with a large gap, so tweening the copy and promo card separately would
        // animate the space between them.
        gsap.from(FAQ_SELECTORS.intro, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 88%", once: true },
        });

        gsap.from(FAQ_SELECTORS.item, {
          opacity: 0,
          x: -50,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          // Triggered off the list, not the section: on a tall viewport the section
          // top can clear the trigger line while the rows are still below the fold.
          scrollTrigger: {
            trigger: FAQ_SELECTORS.list,
            start: "top 90%",
            once: true,
          },
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
