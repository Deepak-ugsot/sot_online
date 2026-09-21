"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { FACULTY_SELECTORS } from "../constants/faculty.constants";

/**
 * Reveals the heading and subtitle, then the card row, as the section scrolls in.
 *
 * Fires once and does not reverse — an entrance, not a scroll-linked effect.
 *
 * **It animates the rail's wrapper, never the tracks.** The tracks' `transform` belongs
 * to the marquee's CSS animation, and a tween on the same property would fight it for
 * the whole of the entrance — the row would stall and then jump. On the wrapper the two
 * compose instead: the row drifts while the whole of it rises into place.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in its
 * final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useFacultyReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(FACULTY_SELECTORS.intro, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        // On its own trigger: on a phone the row sits well below the heading, and tying
        // it to the section top would have it play out before it is in view.
        gsap.from(FACULTY_SELECTORS.rail, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: FACULTY_SELECTORS.rail,
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
