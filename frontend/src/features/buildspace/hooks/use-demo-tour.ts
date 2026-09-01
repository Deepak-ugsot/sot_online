"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { buildspaceChapters } from "../constants/buildspace.constants";

/** How long a nudged-out-of-autoplay tour waits before picking itself back up. */
const RESUME_DELAY = 3600;

/**
 * Update cadence, in milliseconds.
 *
 * **The tour runs on rAF but publishes at ~16fps, and that gap is the point.** Every
 * frame would re-render the whole 1280x880 canvas sixty times a second for visuals that
 * cannot show it: the fastest thing driven off `progress` is the answer typing itself
 * out, which lands a new character roughly every 40ms. Everything genuinely continuous —
 * the score bars, the milestone progress — is a CSS transition on a value that only
 * changes when a discrete reveal fires, so it stays smooth on the compositor no matter
 * how coarsely this ticks.
 */
const PUBLISH_EVERY = 62;

/**
 * Where the reduced-motion render stops.
 *
 * The AI review, complete. It is the chapter that best explains what BuildSpace does in
 * a single still frame — the answer, five scored dimensions, and the two things to fix —
 * and unlike the plan or the ship form it does not depend on an animation having run to
 * make sense.
 */
const STATIC_CHAPTER = 2;

export type DemoTourState = {
  /** Index into `buildspaceChapters`. */
  index: number;
  /** 0–1 through the current chapter. */
  progress: number;
  /** True while the tour is held — hover, or a jump the viewer made. */
  paused: boolean;
  /** 0–1 countdown to auto-resume; 0 unless a countdown is actually running. */
  resumeProgress: number;
  /** True when motion is off and the tour is a single still frame. */
  isStatic: boolean;
};

export type DemoTourControls = {
  /** Jump to a chapter and hold there for a moment. */
  goTo: (index: number) => void;
  /** Hold the tour with no countdown — used while the pointer is over the window. */
  hold: () => void;
  /** Release a hold. */
  release: () => void;
  /** Drop any countdown and run now. */
  resume: () => void;
};

/**
 * Drives the product tour: which chapter is showing and how far through it we are.
 *
 * **Nothing runs until the canvas is actually on screen.** The tour is deep in a long
 * page, so without the observer it would spend most of a session animating a canvas
 * nobody is looking at — and because every chapter's contents are derived from
 * `progress` rather than from a running CSS animation, a viewer who scrolls back would
 * otherwise arrive mid-sentence in whichever chapter the clock had reached.
 *
 * @param mountRef - The element whose visibility gates playback.
 */
export function useDemoTour(
  mountRef: React.RefObject<HTMLElement | null>,
): DemoTourState & DemoTourControls {
  const [state, setState] = useState<DemoTourState>({
    index: 0,
    progress: 0,
    paused: false,
    resumeProgress: 0,
    isStatic: false,
  });

  /**
   * Playback lives in a ref, not in state. The rAF loop reads and writes it every frame;
   * putting it in state would make each frame a render and the loop would be chasing its
   * own re-renders.
   */
  const clock = useRef({
    index: 0,
    elapsed: 0,
    /** Set while held by hover. */
    held: false,
    /** Timestamp the countdown ends at, or 0 when none is running. */
    resumeAt: 0,
    visible: false,
    isStatic: false,
    lastPublish: 0,
  });

  const publish = useCallback((now: number, force = false) => {
    const c = clock.current;
    if (!force && now - c.lastPublish < PUBLISH_EVERY) return;
    c.lastPublish = now;

    const chapter = buildspaceChapters[c.index];
    const countdown = c.resumeAt > 0 ? Math.max(0, (c.resumeAt - now) / RESUME_DELAY) : 0;

    setState({
      index: c.index,
      progress: Math.min(1, c.elapsed / chapter.duration),
      paused: c.held || c.resumeAt > 0,
      resumeProgress: countdown,
      isStatic: c.isStatic,
    });
  }, []);

  // Playback loop.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let previous = 0;

    const tick = (now: number) => {
      const c = clock.current;
      const delta = previous === 0 ? 0 : now - previous;
      previous = now;

      // A countdown expiring is what releases a viewer-initiated hold.
      if (c.resumeAt > 0 && now >= c.resumeAt) c.resumeAt = 0;

      const running = c.visible && !c.held && c.resumeAt === 0;

      if (running) {
        // Clamped so a backgrounded tab — where rAF stops and `now` jumps by seconds on
        // return — resumes from where it paused instead of skipping chapters.
        c.elapsed += Math.min(delta, 100);

        const chapter = buildspaceChapters[c.index];
        if (c.elapsed >= chapter.duration) {
          c.elapsed = 0;
          c.index = (c.index + 1) % buildspaceChapters.length;
        }
      }

      if (running) {
        publish(now, false);
      } else if (c.resumeAt > 0) {
        // A countdown is the one paused state whose readout keeps moving, so it publishes
        // every frame to keep the ring smooth.
        publish(now, true);
      }
      // Otherwise nothing has changed and nothing is published. This matters more than it
      // looks: the section is off screen for most of a long page, and `publish` builds a
      // fresh state object every time, so React cannot bail out on an equal value — a
      // throttled publish here would re-render the whole canvas every 62ms for the entire
      // time nobody is looking at it. `hold`, `release` and `goTo` each force a publish of
      // their own, so no transition into a paused state is missed.

      frame = requestAnimationFrame(tick);
    };

    const applyMotion = () => {
      const c = clock.current;
      c.isStatic = motion.matches;
      if (motion.matches) {
        c.index = STATIC_CHAPTER;
        c.elapsed = buildspaceChapters[STATIC_CHAPTER].duration;
        c.held = true;
        c.resumeAt = 0;
      } else {
        c.held = false;
      }
      publish(performance.now(), true);
    };

    // `rootMargin` starts the tour a little before it is reached, so the first chapter is
    // already underway rather than beginning from nothing as it scrolls into place.
    const observer = new IntersectionObserver(
      ([entry]) => {
        clock.current.visible = entry.isIntersecting;
      },
      { rootMargin: "120px 0px", threshold: 0.05 },
    );
    observer.observe(mount);

    applyMotion();
    motion.addEventListener("change", applyMotion);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", applyMotion);
    };
  }, [mountRef, publish]);

  const goTo = useCallback(
    (index: number) => {
      const c = clock.current;
      if (c.isStatic) {
        // Still a real control under reduced motion — it just does not start a clock.
        c.index = index;
        c.elapsed = buildspaceChapters[index].duration;
        publish(performance.now(), true);
        return;
      }
      c.index = index;
      c.elapsed = 0;
      c.resumeAt = performance.now() + RESUME_DELAY;
      publish(performance.now(), true);
    },
    [publish],
  );

  const hold = useCallback(() => {
    if (clock.current.isStatic) return;
    clock.current.held = true;
    publish(performance.now(), true);
  }, [publish]);

  const release = useCallback(() => {
    if (clock.current.isStatic) return;
    clock.current.held = false;
    publish(performance.now(), true);
  }, [publish]);

  const resume = useCallback(() => {
    if (clock.current.isStatic) return;
    clock.current.held = false;
    clock.current.resumeAt = 0;
    publish(performance.now(), true);
  }, [publish]);

  return { ...state, goTo, hold, release, resume };
}
