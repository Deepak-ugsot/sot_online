"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import {
  READINESS_PIN_MIN_WIDTH,
  READINESS_SELECTORS,
} from "../constants/readiness.constants";

/**
 * Pins the section and pans the card row sideways as you scroll down it.
 *
 * **The travel distance is measured, never assumed.** Card widths and track padding
 * both change with viewport width, so the row's overflow is read off the rendered
 * elements — and read again on every refresh (resize, font load, image load) through
 * the function forms of `x` and `end`, with `invalidateOnRefresh`.
 *
 * The scroll runway is that same distance, so the row moves 1:1 with the page instead
 * of at a fixed guess that would feel fast at one width and slow at another.
 *
 * Below `READINESS_PIN_MIN_WIDTH`, and under reduced motion, none of this registers:
 * no pin, no scrub, and no inline transform left on the track. The markup's own
 * `overflow-x: auto` then makes the row an ordinary swipeable scroller.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useReadinessTrack(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        `(min-width: ${READINESS_PIN_MIN_WIDTH}px) and (prefers-reduced-motion: no-preference)`,
        () => {
          const track = scope.querySelector<HTMLElement>(READINESS_SELECTORS.track);
          const viewport = scope.querySelector<HTMLElement>(
            READINESS_SELECTORS.viewport,
          );
          if (!track || !viewport) return;

          const distance = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth);

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: scope,
              start: "top top",
              end: () => "+=" + distance(),
              scrub: 0.3,
              pin: scope,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(track, { clearProps: "transform" });
          };
        },
      );

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
