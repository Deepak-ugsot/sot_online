"use client";

import { useRef } from "react";

import {
  ecosystemClosing,
  ecosystemHeading,
  ecosystemSubtitle,
} from "../constants/ecosystem.constants";
import { useEcosystemReveal } from "../hooks/use-ecosystem-reveal";
import { useEcosystemTilt } from "../hooks/use-ecosystem-tilt";
import { EcosystemCollage } from "./ecosystem-collage";
import { EcosystemStats } from "./ecosystem-stats";

/**
 * "Built by upGrad School of Technology. Designed To Reach Beyond The Campus." — a
 * dark band holding a fanned collage of the group's brands, the figures behind them,
 * and a closing line naming the ecosystem once more.
 *
 * Two hooks rather than one, because they gate differently: the reveal runs anywhere
 * motion is allowed, while the tilt also needs a real hover-capable pointer.
 */
export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEcosystemReveal(sectionRef);
  useEcosystemTilt(sectionRef);

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      aria-labelledby="ecosystem-heading"
      className="relative bg-ink-raised"
    >
      {/*
        `px-6` is the site-wide gutter and holds at every width; only the rhythm
        eases off on a phone, where the full 100/120px band left the collage
        stranded between two empty screens. Back to the designed spacing from
        700px, the same breakpoint the dashboard section uses for its band.
      */}
      <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-10 px-6 pt-18 pb-24 min-[700px]:gap-15 min-[700px]:pt-25 min-[700px]:pb-30">
        {/*
          `63rem` for the block, but the paragraph keeps its own narrower `55.75rem`
          measure. Widening the block alone would drag the body copy out to the same
          1008px, far past a comfortable reading measure; capping the paragraph
          separately lets the heading have the width without the paragraph paying for
          it.

          **Both the block and the heading's cap are set by line one.** "Built by
          upGrad School of Technology. Designed" measures 988px at a `2.75rem` cap —
          against 1008px of block, 20px of slack. At the previous `3.25rem` (52px) the
          same line wanted 1168px and broke into three lines instead of the two the
          copy's own `\n` asks for.

          Below the cap the `3.8vw` term shrinks the type faster than the block, so the
          line keeps fitting all the way down; below `sm` the forced break is off and
          the heading wraps naturally. The width is tied to the accent typeface, as in
          the showcase section: measure again if it changes.
        */}
        <div
          data-ecosystem="heading"
          className="flex max-w-[63rem] flex-col items-center gap-6 text-center"
        >
          <h2
            id="ecosystem-heading"
            className="type-heading text-[clamp(1.875rem,3.8vw,2.75rem)] text-white"
          >
            {ecosystemHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {ecosystemHeading.accent}
            </span>{" "}
            {/* `tail` carries the line break as a `\n`; `whitespace-pre-line` renders
                it as the intended break rather than a literal backslash-n. It waits
                for `sm` because on a phone the line wraps naturally well before this
                forced break would land, and the forced break would then strand a
                fragment of the sentence on its own line. */}
            <span className="whitespace-normal sm:whitespace-pre-line">
              {ecosystemHeading.tail}
            </span>
          </h2>

          <p className="max-w-[55.75rem] font-display text-[clamp(1rem,1.8vw,1.5rem)] text-white">
            {ecosystemSubtitle}
          </p>
        </div>

        <EcosystemCollage />

        <EcosystemStats />

        {/* Triggered off its own block, like the collage and the stats above it —
            the section top clears the scroll trigger long before this line, at the
            very bottom of the band, is on screen.

            `65rem` holds the whole sentence on one line, as the reference does: it
            measures 1017px at the 28px cap, so `46rem` (736px) broke it in two. */}
        <p
          data-ecosystem="closing"
          className="max-w-[65rem] text-center type-heading text-[clamp(1.125rem,2.2vw,1.75rem)] font-bold text-balance text-white"
        >
          {ecosystemClosing.lead}{" "}
          <span className="text-brand">{ecosystemClosing.accent}</span>{" "}
          {ecosystemClosing.tail}
        </p>
      </div>
    </section>
  );
}
