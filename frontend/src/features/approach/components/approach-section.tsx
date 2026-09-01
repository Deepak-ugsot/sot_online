"use client";

import { useRef } from "react";

import { approachEyebrow } from "../constants/approach.constants";
import { useApproachReveal } from "../hooks/use-approach-reveal";
import { ApproachWords } from "./approach-words";

/**
 * "Our Approach" — a pinned section that reveals one oversized word per scroll step:
 * Mentorship → Projects → AI-Powered → Career-Ready.
 *
 * Same two-element structure the hero uses, and required for the same reason: the
 * outer `<section>` is the trigger and must not clip, because GSAP inserts a pin
 * spacer inside it to create the scroll runway. The inner stage is what gets pinned.
 *
 * Under `prefers-reduced-motion` the stage drops its fixed viewport height and the
 * eyebrow returns to normal flow, so the whole thing reads as an ordinary stacked
 * list with no pinning and no scroll dependency.
 */
export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useApproachReveal(sectionRef);

  return (
    <section
      id="approach"
      ref={sectionRef}
      aria-labelledby="approach-eyebrow"
      className="relative bg-surface"
    >
      <div
        data-approach="stage"
        className={
          "relative flex h-[100vh] h-[100svh] w-full flex-col items-center justify-center overflow-hidden " +
          "motion-reduce:h-auto motion-reduce:gap-2 motion-reduce:overflow-visible motion-reduce:px-6 motion-reduce:py-30"
        }
      >
        {/*
          `top` clears the fixed site header (~79px), which sits over this stage for
          the whole time it is pinned. The reference design has no persistent header,
          so its 4.5rem would put the eyebrow behind ours.
        */}
        <p
          id="approach-eyebrow"
          className={
            "absolute top-[7.5rem] left-1/2 -translate-x-1/2 font-display text-[13px] font-medium uppercase tracking-[0.3em] text-ink-muted " +
            "motion-reduce:static motion-reduce:mb-6 motion-reduce:translate-x-0"
          }
        >
          {approachEyebrow}
        </p>

        <ApproachWords />
      </div>
    </section>
  );
}
