"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HERO_SELECTORS } from "../constants/hero.constants";

/**
 * All the visual motion is compressed into the first `CONTENT_END` fraction of the
 * pin's scroll range. The remaining tail is a deliberate no-op hold on the final
 * frame.
 *
 * Why: `scrub` smooths the animated value, so it lags raw scroll — but the pin
 * releases on *raw* scroll position. Without this buffer a fast flick can unpin the
 * hero (revealing whatever follows) before the visuals have caught up to the end of
 * the video. The hold guarantees the animation always finishes well before release.
 */
const CONTENT_END = 0.85;

/** Maps a 0–1 position in the "content window" onto the real timeline. */
const p = (fraction: number) => fraction * CONTENT_END;

/** Scroll runway for the pin, as a multiple of viewport height. */
const RUNWAY_DESKTOP = 2.4;
const RUNWAY_TABLET = 1.6;

/** Skip a seek smaller than this (seconds) — sub-frame seeks only cause decoder churn. */
const SEEK_EPSILON = 1 / 60;

/**
 * Pins the hero and scrubs the background video's playhead with scroll, fading the
 * headline, subtext, CTAs and scroll cue out on their own offsets.
 *
 * This mirrors the reference design's hero, which scrubs a 30-frame JPEG sequence.
 * Here the same choreography drives an MP4's `currentTime` instead.
 *
 * @param scopeRef - The section wrapping the hero. All selectors are scoped to it,
 *   so the hook never reaches outside its own feature.
 */
export function useHeroScrollAnimation(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const video = scope.querySelector<HTMLVideoElement>(HERO_SELECTORS.video);
      const stage = scope.querySelector<HTMLElement>(HERO_SELECTORS.stage);
      if (!stage) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        {
          isAnimated: "(prefers-reduced-motion: no-preference)",
          isStatic: "(prefers-reduced-motion: reduce)",
        },
        (mmContext) => {
          const { isStatic } = mmContext.conditions as { isStatic: boolean };

          // Reduced motion: no pin, no scrub. Hold the first frame and leave the
          // content statically visible.
          if (isStatic) {
            if (video) video.currentTime = 0;
            return;
          }

          // --- Video scrubbing -------------------------------------------------
          // Seeking is decoupled from the scroll event: `onUpdate` only records the
          // target time, and a rAF loop applies at most one seek per frame. Setting
          // `currentTime` directly from the scroll handler would queue up seeks
          // faster than the decoder can service them.
          let targetTime = 0;
          let rafId = 0;

          const renderLoop = () => {
            rafId = requestAnimationFrame(renderLoop);
            if (!video || video.readyState < 2) return;
            if (Math.abs(video.currentTime - targetTime) < SEEK_EPSILON) return;
            video.currentTime = targetTime;
          };

          if (video) {
            // The playhead is driven entirely by scroll, so the video must never
            // play on its own.
            video.pause();
            rafId = requestAnimationFrame(renderLoop);
          }

          // --- Timeline --------------------------------------------------------
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scope,
              start: "top top",
              end: () =>
                "+=" +
                window.innerHeight *
                  (window.innerWidth <= 1024 ? RUNWAY_TABLET : RUNWAY_DESKTOP),
              scrub: 0.2,
              pin: stage,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (!video?.duration) return;
                const contentProgress = Math.min(1, self.progress / CONTENT_END);
                targetTime = contentProgress * video.duration;
              },
            },
          });

          // Each element leaves on its own offset, staggered so the hero dissolves
          // rather than disappearing all at once. Offsets match the reference — the
          // site header is deliberately not among them: it is fixed page chrome that
          // stays visible for the whole page.
          timeline
            .to(
              HERO_SELECTORS.headline,
              { autoAlpha: 0, y: -46, duration: p(0.3), ease: "power2.in" },
              p(0.02),
            )
            // The scrim only exists to make the copy readable, so it dissolves in step
            // with it — linearly, and running a touch past the last line of copy so
            // nothing is ever left standing on the bare footage. Once it clears, the
            // scrubbing video plays unobstructed for the rest of the pin.
            .to(HERO_SELECTORS.copyScrim, { autoAlpha: 0, duration: p(0.36) }, p(0.02))
            .to(
              HERO_SELECTORS.subtext,
              { autoAlpha: 0, y: -22, duration: p(0.32), ease: "power2.in" },
              p(0.05),
            )
            .to(
              HERO_SELECTORS.cta,
              {
                autoAlpha: 0,
                scaleX: 0.92,
                scaleY: 0.92,
                duration: p(0.28),
                ease: "power2.in",
              },
              p(0.04),
            )
            // No-op tween that exists purely to stretch the timeline's own duration to
            // a true 1.0. `scrub` maps scroll progress onto `timeline.progress()`,
            // which is relative to `timeline.duration()` — without this the duration
            // would end at CONTENT_END, and scrub would apply that same compression a
            // second time, cancelling the hold out entirely.
            .to({}, { duration: 1 - CONTENT_END });

          return () => {
            cancelAnimationFrame(rafId);
          };
        },
      );

      return () => matchMedia.revert();
    }, scope);

    // Video metadata decides the pin's mapping to `duration`, and webfont swaps can
    // reflow the text — both change what ScrollTrigger measured. Re-measure on each.
    const refresh = () => ScrollTrigger.refresh();
    const video = scope.querySelector<HTMLVideoElement>(HERO_SELECTORS.video);
    video?.addEventListener("loadedmetadata", refresh);
    void document.fonts?.ready.then(refresh);

    return () => {
      video?.removeEventListener("loadedmetadata", refresh);
      context.revert();
    };
  }, [scopeRef]);
}
