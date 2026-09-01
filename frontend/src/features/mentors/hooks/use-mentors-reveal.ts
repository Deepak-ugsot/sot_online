"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { MENTORS_SELECTORS } from "../constants/mentors.constants";

/**
 * Reveals the heading and then the marquee as the section scrolls into view.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
 *
 * The marquee only fades and rises **into place**; its own horizontal scroll is a
 * separate CSS animation that has been running the whole time and is untouched here.
 * Animating the marquee wrapper rather than the tracks is what keeps the two from
 * competing for the same `transform`.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useMentorsReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered, so both render in place.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(MENTORS_SELECTORS.heading, {
          opacity: 0,
          y: 55,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 90%", once: true },
        });

        gsap.from(MENTORS_SELECTORS.marquee, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
          // Triggered off the marquee itself, not the section: the section top can
          // clear the trigger line while the logo rows are still below the fold.
          scrollTrigger: {
            trigger: MENTORS_SELECTORS.marquee,
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
