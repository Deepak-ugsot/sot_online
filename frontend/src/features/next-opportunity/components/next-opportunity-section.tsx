"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import {
  nextOpportunityArtwork,
  nextOpportunityBenefits,
  nextOpportunityDescription,
  nextOpportunityHeading,
  nextOpportunityPartners,
} from "../constants/next-opportunity.constants";
import { useNextOpportunityReveal } from "../hooks/use-next-opportunity-reveal";
import { NextOpportunityBenefit } from "./next-opportunity-benefit";

/**
 * "Your Next Opportunity Could Be Anywhere." — what the Internshala ecosystem opens
 * up, under the two brands' lockup, in four points beside the isometric Internshala
 * scene.
 *
 * Sits between "This is not another course" and the hackathons: the page has just
 * finished saying what the programme is *not*, and this is the first thing it offers.
 * It shares the light `surface` ground with its neighbours.
 *
 * The render is a cut-out on transparency with its red panel drawn in, so it sits on
 * the ground with no plate, rounding or shadow of its own.
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
          `items-center` rather than stretching: the render is fixed-ratio and the
          copy column's height changes with its width, so aligning to the top would
          leave one of them hanging against the other with a hole beneath it. Centred,
          the two share a middle, which is how the design reads — the lockup level with
          the panel's top, the last benefit with its foot.

          The copy gets the wider track — its four benefits are two columns of running
          text, while the render only has to stay legible.

          The gutter between them can stay narrow: the render is capped below its
          column's width at `lg` and pushed to the column's end, so the air between the
          two is the render's own slack rather than a gap that takes width out of the
          copy — the column that actually needs it.
        */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          <div data-next-opportunity="copy" className="order-1">
            {/*
              The partnership, before the claim it makes. Set at the files' own 49px
              (1×; see the constants), with the sign between them at the marks' optical
              weight rather than their height — a full-height cross reads as a third logo.

              Internshala is lifted 8px off the shared centre, as in the design: its mark
              is one line where ours carries "School of Technology" under the wordmark,
              so centring the boxes would sit it level with that subline. Lifted, the two
              wordmarks share a line. A translate, so the row's height is unaffected.

              A screen reader hears "upGrad School of Technology in partnership with
              Internshala": the cross is decoration, so the relationship is said in words.
            */}
            <p className="mb-6 flex items-center gap-4 sm:gap-5">
              <Image
                src={nextOpportunityPartners.ours.src}
                alt={nextOpportunityPartners.ours.alt}
                width={nextOpportunityPartners.ours.width}
                height={nextOpportunityPartners.ours.height}
                className="h-10 w-auto sm:h-12"
              />
              <span className="sr-only">in partnership with</span>
              <X
                aria-hidden="true"
                strokeWidth={1.75}
                className="h-4 w-4 shrink-0 text-ink sm:h-5 sm:w-5"
              />
              <Image
                src={nextOpportunityPartners.theirs.src}
                alt={nextOpportunityPartners.theirs.alt}
                width={nextOpportunityPartners.theirs.width}
                height={nextOpportunityPartners.theirs.height}
                className="h-10 w-auto -translate-y-1.5 sm:h-12 sm:-translate-y-2"
              />
            </p>

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

            {/* `30rem` at 15px is the design's measure: at 1440 the paragraph sets on
                the design's four lines, each within ~8px of the design's own length. */}
            <p className="mt-5 max-w-[30rem] text-pretty text-[clamp(0.875rem,1.05vw,0.9375rem)] leading-[1.3] text-ink-muted">
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
            <ul className="mt-9 grid grid-cols-1 gap-x-8 gap-y-7 sm:mt-12 sm:grid-cols-2 sm:gap-y-9 lg:mt-16 lg:gap-x-6 lg:gap-y-9">
              {nextOpportunityBenefits.map((benefit) => (
                <NextOpportunityBenefit key={benefit.id} benefit={benefit} />
              ))}
            </ul>
          </div>

          {/*
            No plate, no rounding, no shadow — the render is a cut-out with its red
            panel drawn in.

            Capped at 536px, the size the design sets it at — the column is wider than
            that at 1440. The file is ~4× that, so it stays sharp on any screen. From `lg`
            it sits against the column's end, so its right edge lands on the measure's —
            where the design has it.
          */}
          <div data-next-opportunity="artwork" className="order-2">
            <Image
              src={nextOpportunityArtwork.src}
              alt={nextOpportunityArtwork.alt}
              width={nextOpportunityArtwork.width}
              height={nextOpportunityArtwork.height}
              sizes="(min-width: 1024px) 33.5rem, 92vw"
              className="mx-auto h-auto w-full max-w-[33.5rem] lg:mr-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
