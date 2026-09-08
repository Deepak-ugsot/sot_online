"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { AI_MENTOR_SELECTORS } from "../constants/ai-mentor.constants";

/**
 * Width at which the copy and the figure stop sharing a row.
 *
 * The section switches at Tailwind's `lg`, where the figure leaves normal flow and is
 * absolutely anchored to the band's bottom-right, so the entrance changes on exactly
 * the same line the layout does.
 */
const TWO_COLUMN_MIN_WIDTH = 1024;

/**
 * Reveals the copy and the mentor figure together as the section scrolls in.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
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
          // tweening the eyebrow, heading, description, pills and CTA separately would
          // animate the gaps between them and let them overlap mid-flight.
          gsap.from(AI_MENTOR_SELECTORS.copy, {
            opacity: 0,
            y: 60,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger,
          });

          gsap.from(AI_MENTOR_SELECTORS.portrait, {
            opacity: 0,
            // Sliding in "from the right" only means anything while the figure *is* a
            // right-hand column. Once the layout stacks, the figure is full-bleed and
            // its own width leaves no horizontal room to travel through: an `x: 80`
            // from-state parks it 80px past the right edge, and because a `from` tween
            // holds that state until its ScrollTrigger fires — which for a section
            // this far down the page is not until the user reaches it — the document
            // would be born too wide.
            //
            // The section clips its own overflow now, so that can no longer reach the
            // page, but the tween is still wrong there: it would animate a figure that
            // is partly hidden behind the section's edge. So the stacked layout rises
            // instead, matching the copy above it.
            x: isSideBySide ? 80 : 0,
            y: isSideBySide ? 0 : 40,
            // A hair under 1, and scaled from its own bottom edge: the figure stands on
            // the section's bottom line, and scaling about the centre would lift it off
            // that line and drop it back down.
            scale: 0.96,
            transformOrigin: "bottom center",
            duration: 1.1,
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
