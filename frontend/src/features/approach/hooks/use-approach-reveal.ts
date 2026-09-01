"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { APPROACH_SELECTORS } from "../constants/approach.constants";

/**
 * Same hold-buffer pattern as the hero: the reveal is compressed into the first
 * `CONTENT_END` of the pin's scroll range, leaving a tail where nothing happens.
 *
 * `scrub` lags raw scroll, but the pin releases on raw scroll — without the buffer a
 * fast flick could unpin the section before the last word had finished arriving.
 */
const CONTENT_END = 0.85;

/** Maps a 0–1 position in the "content window" onto the real timeline. */
const p = (fraction: number) => fraction * CONTENT_END;

/** How much of the content window a single word takes to arrive. */
const ROW_DURATION = 0.3;

/** Scroll runway for the pin, as a multiple of viewport height. */
const RUNWAY_DESKTOP = 1.9;
const RUNWAY_MOBILE = 1.4;

/** How far below its resting position each row starts. */
const ROW_OFFSET_Y = 40;

/**
 * Pins the section and reveals one word per scroll step, each fading up into place.
 *
 * The tween targets the row element, not the word inside it — so the row's
 * `overflow-hidden` travels with the row and never clips the animation. That clip
 * exists purely to stop the oversized `nowrap` text widening the document on narrow
 * viewports; see `ApproachWords`.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useApproachReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const stage = scope.querySelector<HTMLElement>(APPROACH_SELECTORS.stage);
      if (!stage) return;

      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered and nothing is hidden, so the
      // words simply render in place. Deliberately no `gsap.set` outside this
      // block — hiding the rows unconditionally would flash them to invisible for
      // reduced-motion users before a static branch could put them back.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>(APPROACH_SELECTORS.row);
        if (rows.length === 0) return;

        gsap.set(rows, { autoAlpha: 0, y: ROW_OFFSET_Y });

        // Spacing is derived so the LAST row's arrival ends at exactly 1.0 of the
        // content window — i.e. precisely at CONTENT_END once scaled. Adding or
        // removing a word re-spaces the whole sequence automatically.
        const rowSpacing = (1 - ROW_DURATION) / Math.max(rows.length - 1, 1);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: () =>
              "+=" +
              window.innerHeight *
                (window.innerWidth <= 767 ? RUNWAY_MOBILE : RUNWAY_DESKTOP),
            scrub: 0.2,
            pin: stage,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        rows.forEach((row, index) => {
          timeline.to(
            row,
            {
              autoAlpha: 1,
              y: 0,
              duration: p(ROW_DURATION),
              ease: "power2.out",
            },
            p(index * rowSpacing),
          );
        });

        // No-op tween that stretches the timeline's own duration to a true 1.0.
        // `scrub` maps scroll progress onto `timeline.progress()`, which is relative
        // to `timeline.duration()` — without this the duration would end at
        // CONTENT_END and scrub would apply that compression a second time,
        // cancelling the hold out entirely.
        timeline.to({}, { duration: 1 - CONTENT_END });

        return () => {
          gsap.set(rows, { clearProps: "opacity,visibility,transform" });
        };
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
