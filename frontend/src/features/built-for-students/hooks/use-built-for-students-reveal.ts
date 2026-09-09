"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { BUILT_FOR_STUDENTS_SELECTORS } from "../constants/built-for-students.constants";

/**
 * Reveals the copy, then the artwork, then the closing claim as the section scrolls in.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect,
 * so scrolling back up leaves the block where it is.
 *
 * The order is the reading order of the wide layout, left to right, and the offsets
 * are staggered rather than simultaneous so the closing line arrives last: it is the
 * caveat, and it lands better after the reader has been through the list.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in
 * its final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useBuiltForStudentsReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: scope, start: "top 80%", once: true };

        // Animated as one block rather than per-child: the column is a flex stack, so
        // tweening the heading and each bullet separately would animate the gaps
        // between them and let the lines drift over one another mid-flight.
        gsap.from(BUILT_FOR_STUDENTS_SELECTORS.copy, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger,
        });

        // The artwork settles rather than travels: a render this heavy sliding in
        // from the side pulls the eye off the heading it is supposed to sit beside.
        // Scaled from just under 1 so it reads as arriving, not as growing.
        gsap.from(BUILT_FOR_STUDENTS_SELECTORS.artwork, {
          opacity: 0,
          y: 32,
          scale: 0.94,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger,
        });

        gsap.from(BUILT_FOR_STUDENTS_SELECTORS.closing, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.24,
          scrollTrigger,
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
