"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";
import {
  FOOTER_WORD_INTERVAL_MS,
  footerRotatingWords,
  footerTagline as taglineCopy,
} from "../constants/footer.constants";

/** Seconds the outgoing word takes to leave; the swap is timed to match. */
const EXIT_DURATION_S = 0.3;

/**
 * "Your college gives you a degree. uGSOT Beyond helps you go beyond it." with a
 * rotating word in the red box beneath it.
 *
 * The word in the red box cycles on a timer. The swap is split across two effects on
 * purpose: the interval animates the current word *out* and only then advances the
 * index, and a second effect animates the new word *in* once React has rendered it.
 * Doing both in one tween would swap the text at the wrong moment — either before the
 * old word has left, or after the new one is already visible.
 */
export function FooterTagline() {
  const [wordIndex, setWordIndex] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);
  /** Suppresses the entrance tween on first paint — nothing has swapped yet. */
  const hasSwappedRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const advance = () => {
      hasSwappedRef.current = true;
      setWordIndex((current) => (current + 1) % footerRotatingWords.length);
    };

    let swapTimeout = 0;

    const interval = window.setInterval(() => {
      // Reduced motion still rotates the copy — it just cuts rather than slides.
      if (prefersReducedMotion || !wordRef.current) {
        advance();
        return;
      }

      gsap.to(wordRef.current, {
        y: -12,
        opacity: 0,
        duration: EXIT_DURATION_S,
        ease: "power2.in",
      });

      // Timed independently of the tween rather than hung off its `onComplete`.
      // GSAP advances on animation frames, so a stalled frame loop — a backgrounded
      // tab, a hidden container — would leave the tween unfinished and the word
      // stuck forever. The copy must keep rotating; the slide is decoration.
      swapTimeout = window.setTimeout(advance, EXIT_DURATION_S * 1000);
    }, FOOTER_WORD_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(swapTimeout);
    };
  }, []);

  useEffect(() => {
    if (!hasSwappedRef.current || !wordRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      wordRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: EXIT_DURATION_S, ease: "power2.out" },
    );
  }, [wordIndex]);

  return (
    <div
      data-footer="tagline"
      className="flex flex-col items-center gap-3 text-center"
    >
      {/* The lead is a full sentence now, so it wraps rather than being pinned to one
          line — this `max-w` is what decides where. It is tuned to break after
          "uGSOT" at the design's width; narrowing it spills the sentence onto a
          third line. */}
      <p className="max-w-[56rem] font-display text-[clamp(1.625rem,3.6vw,3.25rem)] leading-[1.2] font-medium tracking-[-0.01em] text-white">
        {taglineCopy.lead}
      </p>

      {/* `overflow-hidden` is what clips the word as it slides in and out, so it
          appears to move behind the edges of the box rather than outside it. */}
      <span className="inline-flex items-center overflow-hidden bg-brand px-4 py-0.5 font-accent text-[clamp(1.375rem,3.2vw,3rem)] font-medium text-white">
        <span ref={wordRef} className="inline-block whitespace-nowrap">
          {footerRotatingWords[wordIndex]}
        </span>
      </span>
    </div>
  );
}
