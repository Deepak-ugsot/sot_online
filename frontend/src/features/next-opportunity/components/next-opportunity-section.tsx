"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  nextOpportunityArtwork,
  nextOpportunityBenefits,
  nextOpportunityDescription,
  nextOpportunityHeading,
} from "../constants/next-opportunity.constants";
import { useNextOpportunityReveal } from "../hooks/use-next-opportunity-reveal";
import { NextOpportunityBenefit } from "./next-opportunity-benefit";

/**
 * "Your Next Opportunity Could Be Anywhere." — what the Internshala ecosystem opens
 * up, in four points, beside an astronaut holding the brand's board over the globe.
 *
 * Sits between "This is not another course" and the curriculum: the page has just
 * finished saying what the programme is *not*, and this is the first thing it offers
 * before the syllabus itself. It shares the light `surface` ground with both, and the
 * section directly above and below — three light bands the curriculum closes.
 *
 * **The section's background is load-bearing.** The render's own ground is a flat
 * `#f3f4f6` plate, not transparency, and `bg-surface` is that exact colour — which is
 * what lets the astronaut sit on the page with no plate, no rounding and no shadow of
 * its own. Change this section's background and the render becomes a visible
 * rectangle.
 *
 * The two columns split only at `lg`. Narrower than that the benefits would have to
 * share a track too small for two of them, so the render drops below the copy — which
 * is also the reading order, since it is the picture the four points are describing.
 *
 * A Client Component only because the reveal hook needs the section element.
 */
export function NextOpportunitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useNextOpportunityReveal(sectionRef);

  return (
    <section
      id="next-opportunity"
      ref={sectionRef}
      aria-labelledby="next-opportunity-heading"
      className="bg-surface py-16 sm:py-20 lg:py-24"
    >
      {/* `84rem` is the page's measure — the hero, career and global-ambition blocks
          all use it. */}
      <div className="mx-auto max-w-[84rem] px-6">
        {/*
          `items-center` rather than stretching: the render is a fixed-ratio plate and
          the copy column is taller than it at most widths, so aligning to the top
          would leave the astronaut floating against the heading with a hole beneath
          it. Centred, the globe sits level with the bottom row of benefits, which is
          how the design reads.

          The copy gets the wider track — its four benefits are two columns of running
          text, while the render only has to stay legible.

          **The gutter between them is narrow on purpose.** The render's plate is the
          section's own colour and the astronaut sits well inside it, so the picture
          already carries its own margin; adding a full-size gutter on top of that
          reads as a hole, and takes the width out of the copy, which is the column
          that actually needs it.
        */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          <div data-next-opportunity="copy" className="order-1">
            <h2
              id="next-opportunity-heading"
              className="type-heading text-[clamp(1.875rem,3.6vw,3rem)] font-semibold text-ink"
            >
              {nextOpportunityHeading.lead}
              {/*
                `block` rather than a `<br>`: the break is a decision held in the
                constants (see the type for why), and letting the span own the line
                keeps the two halves from ever being reflowed into one at a width
                where they happen to fit.
              */}
              <span className="block">
                {nextOpportunityHeading.trail}{" "}
                {/* Bricolage Grotesque via `font-accent`, matching the red word
                    across the hero, curriculum and career headings. */}
                <span className="font-accent text-brand">
                  {nextOpportunityHeading.accent}
                </span>
              </span>
            </h2>

            {/* `36rem` holds the paragraph to a readable measure once the column
                itself grows past it on a wide screen. */}
            <p className="mt-5 max-w-[36rem] text-pretty text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-relaxed text-ink-muted">
              {nextOpportunityDescription}
            </p>

            {/*
              Two columns from `sm`, which is also where they stay at `lg` — the four
              points are short, and a single column of them beside the render would
              run the copy far taller than the picture it sits with.

              `gap-y` is larger than `gap-x` on purpose: the rows are separated by
              nothing but space, while the columns already have the renders standing
              at the head of each one. Both are the design's own intervals, measured
              at 1440 — they read as generous because the four points are short, and
              tightening them turns the block into a table.
            */}
            <ul className="mt-9 grid grid-cols-1 gap-x-8 gap-y-7 sm:mt-12 sm:grid-cols-2 sm:gap-y-9 lg:gap-x-12 lg:gap-y-14">
              {nextOpportunityBenefits.map((benefit) => (
                <NextOpportunityBenefit key={benefit.id} benefit={benefit} />
              ))}
            </ul>
          </div>

          {/*
            No plate, no rounding, no shadow — see the section's own note. The render
            arrives already seated on the section's colour.
          */}
          <div data-next-opportunity="artwork" className="order-2">
            <Image
              src={nextOpportunityArtwork.src}
              alt={nextOpportunityArtwork.alt}
              width={nextOpportunityArtwork.width}
              height={nextOpportunityArtwork.height}
              sizes="(min-width: 1024px) 46vw, 92vw"
              // `max-w` is a phone measure only — it stops the plate from filling a
              // whole narrow screen when it is stacked under the copy. At `lg` the
              // design has the render filling its column, so the cap comes off.
              className="mx-auto h-auto w-full max-w-[34rem] lg:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
