"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  topTenPercentAnnotation,
  topTenPercentArtwork,
  topTenPercentDescription,
  topTenPercentHeading,
} from "../constants/top-ten-percent.constants";
import { useTopTenPercentReveal } from "../hooks/use-top-ten-percent-reveal";

/**
 * "The Top 10% Get More Than a Certificate" — the cohort walking away under a red rim
 * light, a backpack's arrow icon picked out again by a handwritten note pointing at it.
 *
 * Sits directly under Next Opportunity, on the same `surface` ground: that section is
 * the ecosystem you get access to, this one is the one reward inside it worth calling
 * out on its own.
 *
 * **Copy and figure share one grid cell from `lg`**, the same trick as the hackathons
 * section: the figure's file is empty transparency wherever the copy sits, so stacking
 * them rather than splitting two columns lets the photo run nearly full width without
 * ever covering a word. Below `lg` there is no spare width for that to hold, so the two
 * fall back to separate rows in normal flow — plain stacking, no overlap.
 *
 * A Client Component only because the reveal hook needs the section element.
 */
export function TopTenPercentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useTopTenPercentReveal(sectionRef);

  return (
    <section
      id="top-ten-percent"
      ref={sectionRef}
      aria-labelledby="top-ten-percent-heading"
      className="relative bg-surface py-16 sm:py-20 lg:py-24"
    >
      {/* `84rem` — the page's shared measure, matching Next Opportunity above. */}
      <div className="mx-auto max-w-[84rem] px-6">
        <div className="grid grid-cols-1 gap-10 lg:gap-0">
          <div
            data-top-ten-percent="copy"
            className="relative z-10 max-w-[26rem] lg:col-start-1 lg:row-start-1"
          >
            <h2
              data-top-ten-percent="beat"
              id="top-ten-percent-heading"
              className="type-heading text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.2] text-ink"
            >
              <span className="block">
                {topTenPercentHeading.lead}{" "}
                <span className="font-accent font-medium text-brand">
                  {topTenPercentHeading.accent}
                </span>{" "}
                {topTenPercentHeading.trail}
              </span>
              <span className="block">{topTenPercentHeading.nextLine}</span>
            </h2>

            <p
              data-top-ten-percent="beat"
              className="mt-4 max-w-[22rem] font-display text-[0.9375rem] leading-relaxed text-pretty text-ink-muted"
            >
              {topTenPercentDescription}
            </p>
          </div>

          {/* Its own row below `lg` (see the component note); the copy's cell from
              `lg` on. Centred on a phone and tablet, pushed to the row's right on
              desktop, where the copy has already claimed the left edge. */}
          <div className="flex justify-center lg:col-start-1 lg:row-start-1 lg:justify-end">
            <div
              data-top-ten-percent="artwork"
              className="relative w-full max-w-[30rem] sm:max-w-[36rem] lg:mt-2 lg:max-w-[44rem]"
            >
              <Image
                src={topTenPercentArtwork.src}
                alt={topTenPercentArtwork.alt}
                width={topTenPercentArtwork.width}
                height={topTenPercentArtwork.height}
                sizes="(min-width: 1024px) 44rem, 90vw"
                className="h-auto w-full select-none"
              />

              {/* Hidden below `sm`: at a phone's width there isn't room beside the
                  figure for a second block of text, and the paragraph above already
                  says everything this note does. */}
              <div
                data-top-ten-percent="annotation"
                className="absolute top-[4%] right-[4%] hidden w-[36%] max-w-[13rem] sm:block"
              >
                <Image
                  src={topTenPercentAnnotation.note.src}
                  alt={topTenPercentAnnotation.note.alt}
                  width={topTenPercentAnnotation.note.width}
                  height={topTenPercentAnnotation.note.height}
                  className="h-auto w-full select-none"
                />
              </div>

              {/* Positioned against the photo itself, not the note above — its tip has
                  to land on the second student's head regardless of where the note's
                  own box falls, so it is measured in the artwork's own percentages
                  rather than nested inside the note's. */}
              <Image
                data-top-ten-percent="annotation"
                src={topTenPercentAnnotation.arrow.src}
                alt={topTenPercentAnnotation.arrow.alt}
                width={topTenPercentAnnotation.arrow.width}
                height={topTenPercentAnnotation.arrow.height}
                className="absolute top-[19%] left-[68%] hidden w-[9%] select-none sm:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
