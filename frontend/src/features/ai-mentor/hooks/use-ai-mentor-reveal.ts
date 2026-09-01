"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { AI_MENTOR_SELECTORS } from "../constants/ai-mentor.constants";

/**
 * Width at which the copy and media columns stop sharing a row.
 *
 * The two are `flex-[1_1_26.25rem]` inside a `gap-15 px-6` row, so they need
 * `2 × 420 + 60 + 48 = 948px` to sit side by side. Rounded up to the `lg` breakpoint the
 * rest of the page already turns on, so the entrance changes on the same line the
 * layout does.
 */
const TWO_COLUMN_MIN_WIDTH = 1024;

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
      matchMedia.add(
        {
          isSideBySide: `(min-width: ${TWO_COLUMN_MIN_WIDTH}px) and (prefers-reduced-motion: no-preference)`,
          isStacked: `(max-width: ${TWO_COLUMN_MIN_WIDTH - 1}px) and (prefers-reduced-motion: no-preference)`,
        },
        (mmContext) => {
          const { isSideBySide } = mmContext.conditions as {
            isSideBySide: boolean;
            isStacked: boolean;
          };

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
            // Sliding in "from the right" only means anything while there *is* a right
            // column to slide out of. Once the flex row wraps, the panel is full-bleed
            // and its own width leaves no horizontal room to travel through: a `from`
            // state of `x: 100` then parks it 100px past the right edge, and because a
            // `from` tween holds that state until its ScrollTrigger fires — which for a
            // section this far down the page is not until the user reaches it — the
            // document is born 65px too wide and the whole page scrolls sideways.
            //
            // So the stacked layout rises instead, which is also the entrance the copy
            // column above it already uses.
            x: isSideBySide ? 100 : 0,
            y: isSideBySide ? 0 : 40,
            scale: 0.94,
            duration: 1,
            ease: "power3.out",
            scrollTrigger,
          });
        },
      );

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
