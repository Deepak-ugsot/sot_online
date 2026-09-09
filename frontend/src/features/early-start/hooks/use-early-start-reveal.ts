"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { EARLY_START_SELECTORS } from "../constants/early-start.constants";

/**
 * How far ahead of the line a dot lights and its copy starts arriving, as a fraction
 * of the whole draw. Small on purpose: the point is that the line *causes* the step to
 * appear, and a longer lead breaks that reading — the step is simply already there by
 * the time the line turns up.
 */
const LEAD = 0.06;

/** How long a dot's pop and a step's fade take, in the same fraction-of-the-draw unit. */
const DOT_DURATION = 0.14;
const COPY_DURATION = 0.18;

/**
 * The section's entrance, and the timeline's scroll-drawn rail.
 *
 * Two behaviours, on purpose. The heading and the card are one-shot entrances — they
 * are single blocks and there is nothing in them for a scrub to reveal progressively.
 * The timeline is scrubbed: the rail draws, and each dot and its copy arrive as the
 * line reaches them, so the whole list is tied to the reader's scroll rather than
 * playing itself out the moment it crosses the fold.
 *
 * **The rail is drawn by `strokeDashoffset`, one segment at a time.** Each segment is
 * an SVG line with `pathLength={1}` (see the timeline component), so an offset of 1
 * hides it and 0 draws it in full regardless of its real height. Placing the segments
 * back to back in one timeline traces what looks like a single continuous line, without
 * anything having to know where the dots sit on the page.
 *
 * **Segment heights set the pacing.** Rows are not the same height — two-line titles
 * and three-line descriptions make some segments half again as long as others — so
 * equal durations would make the line speed up and slow down as it passed through them.
 * Each segment therefore gets a share of the timeline proportional to its measured
 * height, which is what makes the draw track the scroll at a constant rate.
 *
 * That measurement is the only thing here that can go stale, and it costs nothing when
 * it does: the *geometry* of the rail is pure layout, so a resize can never break the
 * line — at worst the pacing drifts a few percent from a re-wrapped row, which is
 * invisible against a scrub.
 *
 * **It is the copy that animates, not the row.** The dot and its rail segment live in
 * the same `<li>`, so translating the row would carry the segment with it and break the
 * line every time a step arrived.
 *
 * Nothing is registered under `prefers-reduced-motion` — the rail is drawn and every
 * element is in place from the first paint, with no `from` state to sit in. The same is
 * true if the JavaScript never runs.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useEarlyStartReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(`${EARLY_START_SELECTORS.heading} > *`, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        gsap.from(EARLY_START_SELECTORS.callout, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: EARLY_START_SELECTORS.callout,
            start: "top 85%",
            once: true,
          },
        });

        const rails = gsap.utils.toArray<HTMLElement>(EARLY_START_SELECTORS.rail);
        const dots = gsap.utils.toArray<HTMLElement>(EARLY_START_SELECTORS.dot);
        const copies = gsap.utils.toArray<HTMLElement>(
          EARLY_START_SELECTORS.copy,
        );

        // `offsetHeight` rather than a bounding rect: it is the layout height, so it
        // cannot be thrown off by a transform on an ancestor — the page smoother keeps
        // one on the whole document, and this section's own copy tweens add more.
        const heights = rails.map((rail) => rail.offsetHeight);
        const total = heights.reduce((sum, height) => sum + height, 0);
        if (!total) return;

        /**
         * Where each dot sits along the draw, as a fraction. The first is at 0 and the
         * last at 1 by construction, since there is exactly one segment between each
         * neighbouring pair.
         */
        const positions = heights.reduce<number[]>(
          (marks, height) => [...marks, marks[marks.length - 1] + height / total],
          [0],
        );

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: EARLY_START_SELECTORS.list,
            start: "top 72%",
            end: "bottom 78%",
            scrub: 0.6,
          },
        });

        // The last dot lands at 1, so its pop and its copy run past the end of the
        // rail's own draw. That is intended and needs no clamping: a timeline is as
        // long as its longest child, so the effect is simply that the line completes a
        // little before the final step has finished arriving.
        rails.forEach((rail, index) => {
          timeline.from(
            rail.querySelector("line"),
            {
              strokeDashoffset: 1,
              duration: heights[index] / total,
              ease: "none",
            },
            positions[index],
          );
        });

        dots.forEach((dot, index) => {
          timeline.from(
            dot,
            {
              scale: 0.3,
              opacity: 0,
              duration: DOT_DURATION,
              ease: "back.out(2.4)",
            },
            Math.max(0, positions[index] - LEAD),
          );
        });

        copies.forEach((copy, index) => {
          timeline.from(
            copy,
            {
              opacity: 0,
              y: 12,
              duration: COPY_DURATION,
              ease: "power2.out",
            },
            Math.max(0, positions[index] - LEAD),
          );
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
