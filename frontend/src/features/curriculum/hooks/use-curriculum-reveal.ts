"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { CURRICULUM_SELECTORS } from "../constants/curriculum.constants";

/**
 * The section's entrance: the heading and subtitle rise, then the panel arrives beneath
 * them.
 *
 * **One-shot only — no pin and no scrub.** The panel is a tabbed control the reader
 * operates themselves, and scroll-driven motion on something being clicked fights the
 * interaction: the card would still be settling while its tabs are being pressed.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useCurriculumReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(`${CURRICULUM_SELECTORS.heading} > *`, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        // Gentler than the copy: the panel is by far the largest thing in the section, and
        // the same 30px lift on that mass reads as a jolt rather than a rise.
        gsap.from(CURRICULUM_SELECTORS.panel, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: CURRICULUM_SELECTORS.panel,
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
