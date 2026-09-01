"use client";

import { useRef } from "react";

import {
  ecosystemHeading,
  ecosystemSubtitle,
} from "../constants/ecosystem.constants";
import { useEcosystemReveal } from "../hooks/use-ecosystem-reveal";
import { useEcosystemTilt } from "../hooks/use-ecosystem-tilt";
import { EcosystemCollage } from "./ecosystem-collage";
import { EcosystemStats } from "./ecosystem-stats";

/**
 * "Backed by upGrad's Learning Ecosystem" — a dark band under the mentors section,
 * holding a fanned collage of the group's brands and the figures behind them.
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
          `61rem` for the block, but the paragraph keeps the old `55.75rem` measure.

          The heading needs 969px to hold one line at its 52px cap, and the block was
          892px — so it broke across two. Widening the block alone would have dragged
          the body copy out to the same 976px, which is far past a comfortable reading
          measure; capping the paragraph separately lets the heading have the width
          without the paragraph paying for it.

          The width is tied to the accent typeface, as in the showcase section: measure
          again if it changes. Below roughly 1000px the heading wraps anyway, which is
          correct — a 37-character line cannot hold at phone widths.
        */}
        <div
          data-ecosystem="heading"
          className="flex max-w-[61rem] flex-col items-center gap-6 text-center"
        >
          <h2
            id="ecosystem-heading"
            className="type-heading text-[clamp(1.875rem,3.8vw,3.25rem)] text-white"
          >
            {ecosystemHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {ecosystemHeading.accent}
            </span>
          </h2>

          <p className="max-w-[55.75rem] font-display text-[clamp(1rem,1.8vw,1.5rem)] text-white">
            {ecosystemSubtitle}
          </p>
        </div>

        <EcosystemCollage />

        <EcosystemStats />
      </div>
    </section>
  );
}
