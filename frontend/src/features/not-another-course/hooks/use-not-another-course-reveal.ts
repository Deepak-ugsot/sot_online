"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { NOT_ANOTHER_COURSE_SELECTORS } from "../constants/not-another-course.constants";

/**
 * Reveals the section as it scrolls in: the heading rises, the collage settles up out
 * of a slight shrink, and the two captions arrive last from their own sides.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useNotAnotherCourseReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered, so everything renders in place.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: scope, start: "top 80%", once: true };

        const timeline = gsap.timeline({ scrollTrigger });

        timeline.from(NOT_ANOTHER_COURSE_SELECTORS.heading, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        });

        timeline.from(
          NOT_ANOTHER_COURSE_SELECTORS.media,
          { opacity: 0, y: 50, scale: 0.96, duration: 1, ease: "power3.out" },
          0.15,
        );

        // Each caption comes in from the side it sits on, read off `data-side` — the
        // one thing about a caption that its class string does not expose to script.
        // A function rather than one tween per side: both captions share every other
        // property, and this keeps the stagger across the pair.
        timeline.from(
          NOT_ANOTHER_COURSE_SELECTORS.caption,
          {
            opacity: 0,
            x: (_index: number, target: HTMLElement) =>
              target.dataset.side === "right" ? 40 : -40,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          },
          0.45,
        );
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
