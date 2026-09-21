"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  learningRoutineArtwork,
  learningRoutineHeading,
  learningRoutineItems,
  learningRoutineSubtitle,
} from "../constants/learning-routine.constants";
import { useLearningRoutineReveal } from "../hooks/use-learning-routine-reveal";
import { LearningRoutineItem } from "./learning-routine-item";

/**
 * "Here's what 24 months will look like" — the class model: the routine as a cycle on
 * the dark card, and its four parts spelled out beside it.
 *
 * Sits directly under the curriculum: that section says *what* is taught, and this one
 * says how the weeks run while it is. Same light `surface` ground as both neighbours.
 *
 * Two rows, each split at `lg`: the heading against the subtitle, then the card against
 * the four parts. Both rows centre their halves on each other, which is how the design
 * sets them — the subtitle level with the heading's middle, the grid with the card's.
 *
 * A Client Component only because the reveal hook needs the section element.
 */
export function LearningRoutineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLearningRoutineReveal(sectionRef);

  return (
    <section
      id="learning-routine"
      ref={sectionRef}
      aria-labelledby="learning-routine-heading"
      className="relative bg-surface"
    >
      {/* `84rem` — the page's shared measure, with next-opportunity's `px-6`. The top
          padding is short because the curriculum's own `pb-20` already stands above it:
          together they leave ~196px from the curriculum's last line to this heading at
          1440, the interval the design keeps between sections. */}
      <div className="mx-auto max-w-[84rem] px-6 pt-10 pb-12 lg:pt-10 lg:pb-16">
        <div
          data-learning-routine="header"
          className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
        >
          <h2
            id="learning-routine-heading"
            className="type-heading text-[clamp(1.875rem,3.6vw,3rem)] font-semibold text-ink"
          >
            {/* Two blocks, so the design's break after "months" holds at every width
                where the first line fits, and the space between them keeps the heading
                one sentence to a screen reader. */}
            <span className="block">
              {learningRoutineHeading.lead}{" "}
              <span className="font-accent whitespace-nowrap text-brand">
                {learningRoutineHeading.accent}
              </span>
            </span>{" "}
            <span className="block">{learningRoutineHeading.nextLine}</span>
          </h2>

          <p className="max-w-[30rem] text-pretty text-[clamp(1rem,1.5vw,1.3125rem)] leading-[1.35] text-ink-muted">
            {learningRoutineSubtitle}
          </p>
        </div>

        {/*
          The card's track is `1fr` against the parts' `1.1fr`, and the card itself is
          capped at its file's 559px: at 1440 that gives the card its own size and each
          part's copy the ~200px it has in the design. Fixed at 559 instead, the parts
          would be squeezed into two lines of title at 1280.

          The parts drop to one column between `lg` and `xl`, where two would leave each
          title about 120px beside its render.
        */}
        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-x-12 xl:gap-x-[5.5rem]">
          <div data-learning-routine="artwork">
            <Image
              src={learningRoutineArtwork.src}
              alt={learningRoutineArtwork.alt}
              width={learningRoutineArtwork.width}
              height={learningRoutineArtwork.height}
              sizes="(min-width: 1024px) 35rem, 92vw"
              // Never past the file's own width — it is a 1× export.
              className="mx-auto h-auto w-full max-w-[34.9375rem] lg:mx-0"
            />
          </div>

          <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 xl:gap-y-10">
            {learningRoutineItems.map((item) => (
              <LearningRoutineItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
