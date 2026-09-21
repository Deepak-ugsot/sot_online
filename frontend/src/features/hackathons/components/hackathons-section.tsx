"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  hackathonsArtwork,
  hackathonsCadence,
  hackathonsDescription,
  hackathonsHeading,
} from "../constants/hackathons.constants";
import { useHackathonsReveal } from "../hooks/use-hackathons-reveal";

/**
 * "Build. Compete. Win. ₹20 Lakhs" — the hackathons and coding competitions, and what
 * they pay, beside a student in a headset that says the same four words.
 *
 * Sits directly under "Your Next Opportunity Could Be Anywhere.": that section offers
 * the work, this one the contest, and the curriculum follows both. All three share the
 * light `surface` ground.
 *
 * **From `lg` the copy and the figure share one grid cell rather than two columns.**
 * The design's paragraph runs past where the figure's box begins — the sentence is
 * wider than the column a two-track grid could give it — and that only works because
 * the file's left fifth is empty transparency, with the figure itself standing well
 * clear of the text. Stacked in one cell, each keeps its own alignment (copy to the
 * start, figure to the end, both centred on the row) and the copy's measure is what
 * keeps the two apart. The copy is layered above so the figure's empty margin never
 * sits over the text it overlaps.
 *
 * A Client Component only because the reveal hook needs the section element.
 */
export function HackathonsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useHackathonsReveal(sectionRef);

  return (
    <section
      id="hackathons"
      ref={sectionRef}
      aria-labelledby="hackathons-heading"
      className="relative bg-surface"
    >
      {/*
        `84rem` is the page's measure — next-opportunity above uses it with the same
        `px-6`, so the two sections' copy shares one left edge.

        The padding is deliberately thin, and nearly none above at `lg`: the design keeps
        this section close to its neighbours (~198px of air from next-opportunity's last
        line to "Build.", ~195px from "Real rewards." to the curriculum heading, at 1440),
        and most of that is already there — next-opportunity's own `pb-24`, the
        curriculum's `pt-20`, and the figure standing taller than the copy it is centred
        on. Anything added here stacks on top of all three.
      */}
      <div className="mx-auto max-w-[84rem] px-6 pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-4 lg:pb-7">
        <div className="grid grid-cols-1 items-center gap-12 lg:gap-0">
          <div
            data-hackathons="copy"
            // The measure is what keeps the copy off the figure at `lg`, where they share
            // a cell. Below `xl` the figure's box starts at ~58% of the row and the copy
            // stays out of it entirely; from `xl` it may run into the file's transparent
            // margin, as the design's paragraph does — and no further.
            className="relative z-10 lg:col-start-1 lg:row-start-1 lg:max-w-[56%] xl:max-w-[71%]"
          >
            <h2
              data-hackathons="beat"
              id="hackathons-heading"
              // `4rem` rather than the design's nominal size: the fallback face sets
              // wider than Neue Montreal, and this is the size at which the first line
              // matches the design's height — its width still runs ~6% over, which is
              // the face, not the size. Measure again if the licensed file lands.
              className="type-heading text-[clamp(2.25rem,4.45vw,4rem)] leading-[1.15] font-semibold text-ink"
            >
              <span className="block">{hackathonsHeading.lead}</span>{" "}
              {/*
                The second line is a row of two things of different heights — the red
                word and the prize plate — centred on each other, as the design sets
                them. Everything is sized in `em` of the heading so the pair keeps its
                proportions all the way down the clamp; at 1440 the row measures
                563×107 against the design's 564×108.
              */}
              <span className="mt-[0.39em] flex flex-wrap items-center gap-x-[0.615em] gap-y-[0.2em]">
                <span className="font-accent text-[1.25em] leading-none font-medium text-brand">
                  {hackathonsHeading.accent}
                </span>{" "}
                <span
                  data-hackathons="prize"
                  className="inline-flex items-center bg-brand px-[0.44em] py-[0.34em] font-display leading-none font-bold whitespace-nowrap text-white"
                >
                  {hackathonsHeading.prize}
                </span>
              </span>
            </h2>

            <p
              data-hackathons="beat"
              className="mt-[clamp(1.75rem,2.6vw,2.25rem)] font-display text-[clamp(1.0625rem,1.53vw,1.375rem)] leading-[1.38] text-pretty text-ink/90"
            >
              {/* One line per sentence, as the design breaks it — see the constants. The
                  space keeps the two a paragraph to a screen reader. */}
              {hackathonsDescription.map((sentence, index) => (
                <span key={index} className="block">
                  {sentence}{" "}
                </span>
              ))}
            </p>

            <div
              data-hackathons="beat"
              className="mt-[clamp(2.5rem,4.2vw,3.8rem)] font-display text-ink/90"
            >
              <p className="text-[clamp(1.25rem,1.8vw,1.625rem)] leading-tight font-bold">
                {hackathonsCadence.label}
              </p>

              {/* Shorter than the label above it, as in the design: it underlines the
                  cadence as a mark rather than measuring the words. */}
              <span aria-hidden="true" className="mt-3 block h-px w-[11.75rem] bg-brand" />

              <p className="mt-3.5 text-[clamp(1.0625rem,1.53vw,1.375rem)] leading-[1.38] text-pretty">
                {hackathonsCadence.lines.map((line, index) => (
                  <span key={index} className="block">
                    {line}{" "}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/*
            No plate, no rounding, no shadow — the file fades out at its own foot and
            that fade is what seats the figure on the section's ground.

            `lg:top-6` lowers it 24px against the copy's centre: the design has the figure
            standing a little below the text rather than level with it, so the torso's
            fade lands under the last line instead of beside it. An offset rather than a
            margin on purpose — a margin would grow the row by twice that and push the
            neighbouring sections away with it; the offset moves the figure and nothing
            else, and the section's `pb-7` is what keeps its fade clear of the next one.

            From `1392px` it also steps 40px past the measure's right edge, which is
            where the design stands it. That width is the first at which the step fits:
            the gutter beyond the measure is the container's 24px padding plus half of
            whatever the viewport has over `84rem`, and at 1392 that is 48px — so the
            shoulder's fade can never be clipped by the window's edge.
          */}
          <div
            data-hackathons="artwork"
            className="lg:relative lg:top-6 lg:col-start-1 lg:row-start-1 lg:w-[42%] lg:justify-self-end xl:w-[32.5rem] min-[1392px]:-mr-10"
          >
            <Image
              src={hackathonsArtwork.src}
              alt={hackathonsArtwork.alt}
              width={hackathonsArtwork.width}
              height={hackathonsArtwork.height}
              sizes="(min-width: 1280px) 32.5rem, (min-width: 1024px) 42vw, 24rem"
              // `max-w` is a phone and tablet measure only — it stops the figure from
              // filling a narrow screen when it is stacked under the copy. At `lg` the
              // wrapper sets the width.
              className="mx-auto h-auto w-full max-w-[20rem] select-none sm:max-w-[24rem] lg:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
