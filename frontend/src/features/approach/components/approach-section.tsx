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
          "relative flex h-[100vh] h-[100svh] w-full flex-col items-center justify-center gap-[clamp(1.5rem,5vh,4.5rem)] overflow-hidden px-6 pt-[7.5rem] pb-16 " +
          "motion-reduce:h-auto motion-reduce:gap-2 motion-reduce:overflow-visible motion-reduce:px-6 motion-reduce:py-30"
        }
      >
        {/*
          **In flow, not absolutely positioned.** It used to be pinned at a fixed
          `top`, which kept the word stack dead-centre in the stage — but the two were
          then laid out independently, and on a short viewport they collided: at
          1600×700 the stack's top sat 58px *above* this line's bottom, running
          "DIRECTION" straight through the sentence. No word size fixes that, because
          the stack grows from the centre while this line stays put.

          As a flex child the overlap cannot happen at all, and the stage's
          `pt-[7.5rem]` is what clears the fixed site header (~79px) that sits over
          this stage for the whole pin.

          `w-full` because it is a real sentence rather than a two-word label, and
          needs a width to wrap inside on a phone.
        */}
        <p
          id="approach-lead"
          className="w-full text-center font-display text-[clamp(1.0625rem,2.1vw,2.5rem)] leading-snug font-medium tracking-[-0.01em] text-balance text-ink"
        >
          {approachLead}
        </p>

        <ApproachWords />
      </div>
    </section>
  );
}
