"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import {
  careerOsColumns,
  careerOsHeading,
  careerOsSubtitle,
} from "../constants/career-os.constants";
import { useCareerOsReveal } from "../hooks/use-career-os-reveal";
import { CareerOsItem } from "./career-os-item";

/**
 * "Everything In One Place." — the eight-tile Career OS capability grid.
 *
 * **Columns are real elements, not a masonry algorithm.** The arrangement is designed
 * — the two tall tiles belong together in the middle, flanked by three short ones on
 * either side — and CSS masonry would reshuffle that on every copy edit. So each
 * column is its own flex stack, and the tiles' panel heights are tuned to bring all
 * three columns down level.
 *
 * Below `1024px` the column wrappers drop to `display: contents`, which dissolves them
 * and lets all eight tiles flow into the parent grid two-up (then one-up). Same DOM,
 * same reading order, no duplicated markup for the narrow layout.
 */
export function CareerOsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useCareerOsReveal(sectionRef);

  return (
    <section
      id="career-os"
      ref={sectionRef}
      aria-labelledby="career-os-heading"
      className="relative bg-surface"
    >
      {/* `84rem` — the page's shared measure, matching career, mentors and AI Mentor. */}
      <div className="mx-auto max-w-[84rem] px-5 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:pt-25 lg:pb-30">
        <div className="mb-8 flex flex-col items-center gap-4 text-center sm:mb-10 sm:gap-5 lg:mb-[2.375rem]">
          <h2
            id="career-os-heading"
            // Two clamps rather than one: below `sm` the heading has to come down to
            // fit a 320px line, and widening the desktop clamp's foot would drag the
            // tablet size down with it.
            className="type-heading text-[clamp(1.75rem,7vw,2rem)] text-ink sm:text-[clamp(2rem,4vw,3.25rem)]"
          >
            {careerOsHeading.lead}{" "}
            {/* Held together: the line breaks before "One Place.", never inside it. */}
            <span className="font-accent font-medium whitespace-nowrap text-brand">
              {careerOsHeading.accent}
            </span>
          </h2>

          <p className="max-w-[55.75rem] font-display text-[clamp(1rem,1.8vw,1.5rem)] text-ink">
            {careerOsSubtitle}
          </p>
        </div>

        <div
          data-career-os="grid"
          className="grid grid-cols-1 items-start gap-4 min-[560px]:grid-cols-2 min-[560px]:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {careerOsColumns.map((column) => (
            <div
              key={column[0]?.id}
              className={cn(
                // Dissolved below `lg`, so the tiles become direct grid children and
                // flow two-up across the columns instead of stacking inside them.
                "contents",
                "lg:flex lg:h-full lg:flex-col lg:gap-6",
              )}
            >
              {column.map((tile) => (
                <CareerOsItem key={tile.id} feature={tile} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
