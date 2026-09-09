"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { NOT_ANOTHER_COURSE_SELECTORS } from "../constants/not-another-course.constants";

/**
 * Width at which the labels move out into the collage's corners.
 *
 * Matches the `min-[1100px]:absolute` in `not-another-course-label.tsx` exactly — the
 * entrance and the layout have to change on the same line, or the labels animate along
 * an axis they do not actually sit on.
 */
const LABELS_AROUND_MIN_WIDTH = 1100;

/**
 * Reveals the section as it scrolls in: the heading and subtitle rise, the collage
 * settles up out of a slight shrink, the four labels arrive from their own sides, and
 * the sign-off lands last.
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
      matchMedia.add(
        {
          isAround: `(min-width: ${LABELS_AROUND_MIN_WIDTH}px) and (prefers-reduced-motion: no-preference)`,
          isBelow: `(max-width: ${LABELS_AROUND_MIN_WIDTH - 1}px) and (prefers-reduced-motion: no-preference)`,
        },
        (mmContext) => {
          const { isAround } = mmContext.conditions as {
            isAround: boolean;
            isBelow: boolean;
          };

          const scrollTrigger = { trigger: scope, start: "top 80%", once: true };

          const timeline = gsap.timeline({ scrollTrigger });

          timeline.from(`${NOT_ANOTHER_COURSE_SELECTORS.heading} > *`, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          });

          timeline.from(
            NOT_ANOTHER_COURSE_SELECTORS.media,
            { opacity: 0, y: 50, scale: 0.96, duration: 1, ease: "power3.out" },
            0.15,
          );

          // Each label comes in from the side it sits on, read off `data-corner` — the
          // one thing about a label that its class string does not expose to script. A
          // function rather than one tween per corner: all four share every other
          // property, and this keeps the stagger across the set.
          //
          // Below the breakpoint there are no corners: the labels are grid cells under
          // the collage, so a sideways entrance has nowhere to come from — and the
          // right-hand ones' `x: 40` start state would push the document 40px wider
          // until the trigger fires. They rise instead.
          timeline.from(
            NOT_ANOTHER_COURSE_SELECTORS.label,
            {
              opacity: 0,
              x: (_index: number, target: HTMLElement) => {
                if (!isAround) return 0;
                return target.dataset.corner?.endsWith("right") ? 40 : -40;
              },
              y: isAround ? 0 : 24,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
            },
            0.45,
          );

          timeline.from(
            `${NOT_ANOTHER_COURSE_SELECTORS.closing} > *`,
            {
              opacity: 0,
              y: 24,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1,
            },
            0.8,
          );
        },
      );

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
