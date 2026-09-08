"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { BEYOND_COLLEGE_SELECTORS } from "../constants/beyond-college.constants";

/**
 * Width at which the two panels stop sharing a row.
 *
 * Matches the grid's own `lg:grid-cols-[1fr_auto_1fr]`, so the entrance changes on
 * exactly the same line the layout does.
 */
const SIDE_BY_SIDE_MIN_WIDTH = 1024;

/**
 * Reveals the header, then the two panels, then the closing line.
 *
 * Fires once and does not reverse — an entrance, not a scroll-linked effect.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in
 * its final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useBeyondCollegeReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        {
          isSideBySide: `(min-width: ${SIDE_BY_SIDE_MIN_WIDTH}px) and (prefers-reduced-motion: no-preference)`,
          isStacked: `(max-width: ${SIDE_BY_SIDE_MIN_WIDTH - 1}px) and (prefers-reduced-motion: no-preference)`,
        },
        (mmContext) => {
          const { isSideBySide } = mmContext.conditions as {
            isSideBySide: boolean;
            isStacked: boolean;
          };

          gsap.from(BEYOND_COLLEGE_SELECTORS.header, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: scope, start: "top 82%", once: true },
          });

          const panelTrigger = {
            trigger: BEYOND_COLLEGE_SELECTORS.panel,
            start: "top 85%",
            once: true,
          };

          /*
            The two panels come in from their own sides, toward the `+` between them.
            The section's argument is that the two halves join, and arriving from
            opposite edges is that argument in motion.

            `x` is zeroed when they are stacked: there is no left and right to arrive
            from, and a horizontal slide on a full-width card would only make the
            document briefly wider than the viewport — a `from` tween holds its start
            state until its ScrollTrigger fires, so that width would be real, and
            reachable, for as long as it took the reader to scroll here.
          */
          gsap.utils
            .toArray<HTMLElement>(BEYOND_COLLEGE_SELECTORS.panel)
            .forEach((panel, index) => {
              gsap.from(panel, {
                opacity: 0,
                x: isSideBySide ? (index === 0 ? -56 : 56) : 0,
                y: isSideBySide ? 0 : 40,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: panelTrigger,
              });
            });

          // Lands after the panels have closed on it, so it reads as the join being
          // made rather than as a third thing arriving alongside them.
          gsap.from(BEYOND_COLLEGE_SELECTORS.badge, {
            opacity: 0,
            scale: 0.4,
            duration: 0.6,
            ease: "back.out(2)",
            delay: 0.35,
            scrollTrigger: panelTrigger,
          });

          gsap.from(BEYOND_COLLEGE_SELECTORS.closing, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: BEYOND_COLLEGE_SELECTORS.closing,
              start: "top 92%",
              once: true,
            },
          });
        },
      );

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
