"use client";

import { useRef } from "react";

import {
  techScoreHeading,
  techScoreStats,
  techScoreSubtitle,
} from "../constants/tech-score.constants";
import { useTechScoreReveal } from "../hooks/use-tech-score-reveal";
import { TechScoreRing } from "./tech-score-ring";
import { TechScoreStat } from "./tech-score-stat";

/**
 * "The uGSOT Beyond Tech Score." — one white panel holding the score itself on the
 * left and the six measurements it is made of on the right.
 *
 * **One card, not eight.** The dial and the stats are the same claim at two
 * magnifications — the number, then its working — so they share a single surface with a
 * rule between them. Giving the dial its own card would make it a seventh sibling and
 * lose the "this is what the 67 is made of" reading entirely.
 *
 * The rule turns with the layout: a vertical hairline between the two halves at `lg`, a
 * horizontal one across the stack below it.
 *
 * A Client Component because it owns the ref for the entrance reveal. Everything it
 * renders is a Server Component.
 */
export function TechScoreSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useTechScoreReveal(sectionRef);

  return (
    <section
      id="tech-score"
      ref={sectionRef}
      aria-labelledby="tech-score-heading"
      className="relative bg-surface"
    >
      {/* `84rem` — the page's shared measure, matching career-os, career and AI Mentor. */}
      <div className="mx-auto max-w-[84rem] px-5 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:pt-25 lg:pb-30">
        <div className="mb-8 flex flex-col items-center gap-4 text-center sm:mb-10 sm:gap-5 lg:mb-12">
          <h2
            id="tech-score-heading"
            // Two clamps rather than one: below `sm` the heading has to come down to fit
            // a 320px line, and widening the desktop clamp's foot would drag the tablet
            // size down with it.
            className="type-heading font-semibold text-[clamp(1.75rem,7vw,2rem)] text-ink sm:text-[clamp(2rem,4vw,3.25rem)]"
          >
            {techScoreHeading.lead}{" "}
            {/* Held together: the line breaks around the brand, never inside it. */}
            <span className="font-accent font-medium whitespace-nowrap text-brand">
              {techScoreHeading.accent}
            </span>{" "}
            {techScoreHeading.tail}
          </h2>

          <p className="max-w-[55.75rem] font-display text-[clamp(1rem,1.8vw,1.5rem)] text-ink">
            {techScoreSubtitle}
          </p>
        </div>

        <div
          data-tech-score="card"
          className={
            "grid gap-6 rounded-[1.75rem] border border-black/[0.04] bg-white p-4 " +
            "shadow-[0_1px_2px_rgba(10,10,11,0.04),0_18px_44px_-24px_rgba(10,10,11,0.18)] " +
            "sm:gap-10 sm:rounded-[2rem] sm:p-8 " +
            // `22rem` for the dial's column is set by the ring: it is drawn at a 17rem
            // ceiling and wants the rest as breathing room, and the sentence under it
            // reads at three lines rather than five at this measure.
            "lg:grid-cols-[22rem_1px_minmax(0,1fr)] lg:items-center lg:gap-10 lg:p-10"
          }
        >
          <TechScoreRing />

          {/* The rule between the two halves. Turns with the layout rather than being
              duplicated: one element, horizontal in the stack and vertical at `lg`.
              `self-stretch` is what gives it the column's full height there — a 1px
              track has no height of its own to stretch into. */}
          <div
            aria-hidden="true"
            className="h-px w-full bg-hairline lg:h-full lg:min-h-[22rem] lg:w-px lg:self-stretch"
          />

          {/*
            `auto-rows-fr` is doing real work: it forces both rows to the same height, so
            every card's figure — pushed to its foot by `mt-auto` — lands on one of two
            lines across the whole grid. Without it the "Open-Source Contributions" card,
            whose label is the only one that wraps, would set its own row taller and pull
            its neighbours' graphics out of line.

            **Two columns from the smallest width, three only at `xl`.** One column on a
            phone gave each tile the full 300px for a number and a two-word label, which
            reads as six slabs rather than a breakdown. Three columns, meanwhile, only
            has room from `xl`: at `lg` they come out 140px wide, and the four tool chips
            on the Open-Source card need 168px — they spilled out of the tile.
          */}
          <div className="grid auto-rows-fr grid-cols-2 gap-3 sm:gap-4 lg:gap-5 xl:grid-cols-3">
            {techScoreStats.map((stat) => (
              <TechScoreStat key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
