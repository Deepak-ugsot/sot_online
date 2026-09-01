"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { CAREER_SELECTORS } from "../constants/career.constants";

/**
 * Plays the section's entrance once it scrolls into view: the intro column rises as
 * one unit, then the highlight rows cascade in from the left.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect,
 * so re-triggering it on every pass back up would be noise.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useCareerReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered at all, so the markup simply
      // renders in its natural, final state. No separate "static" branch needed.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        // Animated as a single element rather than per-child: the intro is a flex
        // column, so tweening its children individually would animate the gaps
        // between them and let the heading, copy and CTA overlap mid-flight.
        gsap.from(CAREER_SELECTORS.intro, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 90%", once: true },
        });

        gsap.from(CAREER_SELECTORS.item, {
          opacity: 0,
          x: -60,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          // Triggered off the list itself, not the section: on tall viewports the
          // section top can clear the trigger line while the list is still below
          // the fold, which would play the cascade before it is visible.
          scrollTrigger: {
            trigger: CAREER_SELECTORS.list,
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
