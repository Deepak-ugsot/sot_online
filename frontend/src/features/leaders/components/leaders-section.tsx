"use client";

import { useRef } from "react";

import { leaders, leadersHeading, leadersQuote } from "../constants/leaders.constants";
import { useLeadersReveal } from "../hooks/use-leaders-reveal";
import { LeaderCard } from "./leader-card";

/**
 * "Built by Leaders Who've Shaped Education and Technology" — the three people behind
 * the school, as cut-out portraits with their captions set into the corner of each cut.
 *
 * A `<ul>` of `<figure>`s: three parallel profiles rather than a sequence, and marking
 * them as a list tells a screen reader how many there are before it starts reading.
 *
 * **The row is a wrapping flex, not a grid,** so the two-up tablet layout can centre the
 * third portrait beneath the first two — a grid would leave it hanging under the left
 * column. From `lg` it is three across with `justify-between`, which is what puts the
 * outer portraits on the measure's edges the way the design has them.
 *
 * A Client Component only because the reveal hook needs the section element.
 */
export function LeadersSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLeadersReveal(sectionRef);

  return (
    <section
      id="leaders"
      ref={sectionRef}
      aria-labelledby="leaders-heading"
      className="relative bg-surface"
    >
      {/*
        `84rem` — the page's shared measure, matching career-os above and tech-score
        below. The bottom padding is deliberately short: the faculty section follows on
        the same ground, and the design reads the two as one band.
      */}
      <div className="mx-auto max-w-[84rem] px-5 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 lg:pt-25 lg:pb-14">
        <div
          data-leaders="intro"
          className="flex flex-col items-center gap-4 text-center sm:gap-5"
        >
          <h2
            id="leaders-heading"
            // Two clamps rather than one, as in career-os: below `sm` the heading has to
            // come down to fit a 320px line, and widening the desktop clamp's foot would
            // drag the tablet size down with it.
            className="type-heading font-semibold text-[clamp(1.75rem,7vw,2rem)] text-balance text-ink sm:text-[clamp(2rem,4vw,3rem)]"
          >
            {/*
              The design's two lines are two blocks rather than one run with a `<br>` in
              it. A measure wide enough for the first line would let "Education" climb
              onto it, and a hard break strands "Shaped" on a line of its own on a phone,
              where the first line wraps before the break is reached. As blocks, each
              line balances on its own — "Built by Leaders / Who've Shaped" there — and
              the space between them keeps the heading one sentence to a screen reader.
            */}
            <span className="block">
              {/* Held together: the line may break after "Leaders", never inside it. */}
              <span className="font-accent font-medium whitespace-nowrap text-brand">
                {leadersHeading.accent}
              </span>{" "}
              {leadersHeading.trail}
            </span>{" "}
            <span className="block">{leadersHeading.nextLine}</span>
          </h2>

          <p className="max-w-[55.75rem] font-display text-[clamp(1rem,1.5vw,1.25rem)] text-pretty text-ink">
            <q>{leadersQuote}</q>
          </p>
        </div>

        <ul
          data-leaders="grid"
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4 sm:mt-10 sm:gap-y-8 lg:mt-14 lg:justify-between lg:gap-x-10"
        >
          {leaders.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </ul>
      </div>
    </section>
  );
}
