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

/**
 * Runway on phones and small tablets — a quarter of the desktop hold.
 *
 * A pin is scroll the page absorbs without moving, and how long that reads as
 * "an effect" rather than "the page is stuck" scales with how much of the page a
 * screen can show. A desktop viewport still has the next section in peripheral view;
 * a phone does not, so the same 1.6 screens of held scroll felt like the hero had
 * jammed. At this length the copy has finished dissolving and the hero releases
 * within roughly half a screen of scrolling, which reads as a transition.
 *
 * The choreography itself is untouched — it is mapped onto the pin's progress, so a
 * shorter runway plays the same fades over less scroll rather than dropping any.
 */
const RUNWAY_COMPACT = 0.6;

/**
 * Widest viewport that plays the video instead of scrubbing it.
 *
 * Scrubbing means seeking, and seeking is only cheap when the target frame is a
 * keyframe. `Hero_BG_Video.mp4` carries **two** keyframes across its 240 frames, so
 * an arbitrary seek makes the decoder replay everything since the last one — up to
 * 146 frames of 720p to put a single frame on screen.
 *
 * Desktop CPUs absorb that. Mobile decoders do not: they re-prime on every seek and
 * service them one at a time, so a scroll-driven seek stream queues up faster than it
 * drains and never catches up. Below this width the playhead is therefore left alone
 * and the video simply loops, which costs one steady hardware-decode pass and stays
 * smooth on hardware that could never scrub.
 *
 * The copy choreography is unaffected either way — it animates `transform` and
 * `opacity`, which the compositor handles without touching the main thread.
 */
const PLAYBACK_MAX_WIDTH = 1024;

/** Skip a seek smaller than this (seconds) — sub-frame seeks only cause decoder churn. */
const SEEK_EPSILON = 1 / 60;

/**
 * Pins the hero and fades the headline, subtext, CTAs and scrim out on staggered
 * offsets — driving the background video's playhead from scroll on desktop, and
 * letting it loop under its own power at `PLAYBACK_MAX_WIDTH` and below.
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
          isScrubbed: `(min-width: ${PLAYBACK_MAX_WIDTH + 1}px) and (prefers-reduced-motion: no-preference)`,
          isPlayed: `(max-width: ${PLAYBACK_MAX_WIDTH}px) and (prefers-reduced-motion: no-preference)`,
          isStatic: "(prefers-reduced-motion: reduce)",
        },
        (mmContext) => {
          const { isScrubbed, isStatic } = mmContext.conditions as {
            isScrubbed: boolean;
            isPlayed: boolean;
            isStatic: boolean;
          };

          // Reduced motion: no pin, no scrub, no playback. Hold the first frame and
          // leave the content statically visible.
          if (isStatic) {
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
            return;
          }

          // --- Video: scrubbed ------------------------------------------------
          // Seeking is decoupled from the scroll event: `onUpdate` only records the
          // target time, and a rAF loop applies at most one seek per frame. Setting
          // `currentTime` directly from the scroll handler would queue up seeks
          // faster than the decoder can service them.
          let targetTime = 0;
          let rafId = 0;

          const seekLoop = () => {
            rafId = requestAnimationFrame(seekLoop);
            if (!video || video.readyState < 2) return;
            // A seek is still in flight. Issuing another one now would not cancel it,
            // it would only deepen the decoder's queue — so skip this frame and let
            // the next one act on the newest target instead of a stale one.
            if (video.seeking) return;
            if (Math.abs(video.currentTime - targetTime) < SEEK_EPSILON) return;
            video.currentTime = targetTime;
          };

          const startSeeking = () => {
            if (!rafId) rafId = requestAnimationFrame(seekLoop);
          };

          const stopSeeking = () => {
            if (!rafId) return;
            cancelAnimationFrame(rafId);
            rafId = 0;
          };

          // --- Video: played --------------------------------------------------
          // `play()` rejects when the browser declines autoplay — iOS Low Power Mode
          // is the common case. There is no recovery worth attempting and nothing
          // the user needs to be told: the hero simply holds its first frame, which
          // is a perfectly good backdrop. Swallow it rather than throwing into an
          // unhandled rejection.
          const resumePlayback = () => {
            void video?.play().catch(() => {});
          };

          if (video) {
            if (isScrubbed) {
              // The playhead is driven entirely by scroll, so the video must never
              // play on its own.
              video.pause();
            } else {
              resumePlayback();
            }
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
                  (window.innerWidth <= PLAYBACK_MAX_WIDTH
                    ? RUNWAY_COMPACT
                    : RUNWAY_DESKTOP),
              scrub: 0.2,
              pin: stage,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // Nothing about the video needs servicing once the hero has left the
              // viewport: the seek loop would burn a rAF callback per frame for the
              // whole page, and playback would keep a decoder — and on a phone, the
              // battery — busy behind content nobody is looking at.
              onToggle: (self) => {
                if (!video) return;
                if (isScrubbed) {
                  if (self.isActive) startSeeking();
                  else stopSeeking();
                } else if (self.isActive) {
                  resumePlayback();
                } else {
                  video.pause();
                }
              },
              onUpdate: (self) => {
                if (!isScrubbed || !video?.duration) return;
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
            // video plays unobstructed for the rest of the pin.
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
            stopSeeking();
            video?.pause();
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
