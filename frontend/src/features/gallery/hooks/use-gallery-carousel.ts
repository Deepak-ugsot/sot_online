"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import {
  GALLERY_PIN_BREAKPOINT,
  GALLERY_SELECTORS,
} from "../constants/gallery.constants";

/**
 * Same hold-buffer pattern as the hero and approach sections: the track finishes
 * travelling at `CONTENT_END` of the pin's range, leaving a tail where nothing
 * happens so a fast flick can't unpin the section mid-slide.
 */
const CONTENT_END = 0.85;

/**
 * Scroll distance per card, as a multiple of the viewport's own width — not a 1:1
 * px mapping. Above 1 the carousel feels slower and more deliberate than the
 * cursor, matching the pacing of the hero and approach pins.
 */
const DISTANCE_MULTIPLIER = 1.6;

/**
 * Pins the section and slides the card track horizontally as you scroll down.
 *
 * Only runs at `GALLERY_PIN_BREAKPOINT` and above. Below that — and under reduced
 * motion — the markup's own CSS scroll-snap track takes over and no JS is involved
 * at all, so the cards stay swipeable.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useGalleryCarousel(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const stage = scope.querySelector<HTMLElement>(GALLERY_SELECTORS.stage);
      const viewport = scope.querySelector<HTMLElement>(GALLERY_SELECTORS.viewport);
      const track = scope.querySelector<HTMLElement>(GALLERY_SELECTORS.track);
      if (!stage || !viewport || !track) return;

      const cardCount = track.children.length;
      const totalSteps = cardCount - 1;
      if (totalSteps < 1) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        `(min-width: ${GALLERY_PIN_BREAKPOINT}px) and (prefers-reduced-motion: no-preference)`,
        () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scope,
              start: "top top",
              // Measured in a callback so a resize re-reads the viewport width
              // rather than reusing whatever it was on first paint.
              end: () =>
                "+=" +
                (totalSteps * viewport.clientWidth * DISTANCE_MULTIPLIER) /
                  CONTENT_END,
              scrub: 0.2,
              pin: stage,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // `xPercent` is relative to the track's own width, and the track is one
          // viewport wide — so -100 per step lands each card exactly in frame,
          // regardless of the current viewport size.
          timeline
            .to(
              track,
              { xPercent: -totalSteps * 100, duration: CONTENT_END, ease: "none" },
              0,
            )
            // Stretches the timeline's duration to a true 1.0 — see the hero's
            // matching comment for why `scrub` needs this.
            .to({}, { duration: 1 - CONTENT_END });

          return () => {
            gsap.set(track, { xPercent: 0 });
          };
        },
      );

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
