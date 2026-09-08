"use client";

import { useRef } from "react";

import { approachLead } from "../constants/approach.constants";
import { useApproachReveal } from "../hooks/use-approach-reveal";
import { ApproachWords } from "./approach-words";

/**
 * "You don't need more content. You need…" — a pinned section that completes its own
 * sentence one oversized word per scroll step: Direction → Discipline → Ecosystem.
 *
 * Same two-element structure the hero uses, and required for the same reason: the
 * outer `<section>` is the trigger and must not clip, because GSAP inserts a pin
 * spacer inside it to create the scroll runway. The inner stage is what gets pinned.
 *
 * Under `prefers-reduced-motion` the stage drops its fixed viewport height and the
 * lead returns to normal flow, so the whole thing reads as an ordinary sentence over
 * a stacked list, with no pinning and no scroll dependency.
 */
export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useApproachReveal(sectionRef);

  return (
    <section
      id="approach"
      ref={sectionRef}
      aria-labelledby="approach-lead"
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
          so its own offset would put this line behind ours.

          Absolutely positioned, and that is what keeps the word stack optically
          centred in the pinned stage: in flow, this line would push the words down by
          its own height and the stack would sit low for the whole pin.

          `w-full px-6` because it is a real sentence now rather than a two-word label
          — without a width to wrap inside, a translated absolute element sizes to its
          content and runs off both edges of a phone.
        */}
        <p
          id="approach-lead"
          className={
            "absolute top-[7.5rem] left-1/2 w-full -translate-x-1/2 px-6 text-center font-display text-[clamp(1.0625rem,2.1vw,2.5rem)] leading-snug font-medium tracking-[-0.01em] text-balance text-ink " +
            "motion-reduce:static motion-reduce:mb-8 motion-reduce:translate-x-0"
          }
        >
          {approachLead}
        </p>

        <ApproachWords />
      </div>
    </section>
  );
}
