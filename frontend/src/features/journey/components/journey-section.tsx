"use client";

import { useRef } from "react";

import {
  journeyHeading,
  journeySubtitle,
} from "../constants/journey.constants";
import { useJourneyReveal } from "../hooks/use-journey-reveal";
import { JourneyGallery } from "./journey-gallery";

/**
 * "Career OS adapts to your Journey" — the heading beside an expanding gallery of the
 * four programme tracks.
 *
 * Side by side from 901px up, stacked and centred below it, which is the width at
 * which the heading's 460px column and the gallery both still hold their shape.
 */
export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useJourneyReveal(sectionRef);

  return (
    <section
      id="journey"
      ref={sectionRef}
      aria-labelledby="journey-heading"
      className="relative bg-surface"
    >
      {/*
        `84rem` rather than the reference's `81.375rem`, matching the showcase and
        mentors sections — the widest measure on the page — so this section sits on
        the same outer edges as the rest.

        The column gap widens to 80px only in the row layout. Stacked, that same value
        would just be a large dead band between the heading and the gallery.
      */}
      <div className="mx-auto flex max-w-[84rem] flex-col items-stretch gap-10 px-6 pt-25 pb-30 min-[901px]:flex-row min-[901px]:items-center min-[901px]:gap-20">
        <div
          data-journey="heading"
          className="flex flex-col items-center gap-5 text-center min-[901px]:flex-[0_1_28.75rem] min-[901px]:items-start min-[901px]:text-left"
        >
          <h2
            id="journey-heading"
            className="type-heading text-[clamp(1.875rem,3.2vw,3rem)] leading-[1.18] text-ink"
          >
            {journeyHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {journeyHeading.accent}
            </span>
          </h2>

          <p className="font-display text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.4] text-ink-muted">
            {journeySubtitle}
          </p>
        </div>

        <JourneyGallery />
      </div>
    </section>
  );
}
