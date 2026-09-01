"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { AI_MENTOR_SELECTORS } from "../constants/ai-mentor.constants";

/**
 * Reveals the copy column and the video panel together as the section scrolls in.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
 *
 * The reference has no entrance here; its right-hand panel is an animated chat demo
 * that plays on its own instead. Since that panel is a video, this matches the
 * copy-plus-media entrance used by the "Not Another Course" section so the two read
 * consistently.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useAiMentorReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered, so both render in place.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: scope, start: "top 85%", once: true };

        // Animated as one block rather than per-child: the column is a flex stack, so
        // tweening the eyebrow, heading, tagline and pills separately would animate
        // the gaps between them and let them overlap mid-flight.
        gsap.from(AI_MENTOR_SELECTORS.copy, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger,
        });

        gsap.from(AI_MENTOR_SELECTORS.media, {
          opacity: 0,
          x: 100,
          scale: 0.94,
          duration: 1,
          ease: "power3.out",
          scrollTrigger,
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
