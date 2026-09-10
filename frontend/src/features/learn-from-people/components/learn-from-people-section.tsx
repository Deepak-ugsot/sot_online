"use client";

import { useRef } from "react";

import {
  learnFromPeopleClosing,
  learnFromPeopleHeading,
  learnFromPeopleMentors,
} from "../constants/learn-from-people.constants";
import { useLearnFromPeopleReveal } from "../hooks/use-learn-from-people-reveal";
import { LearnFromPeopleCard } from "./learn-from-people-card";

/**
 * "Learn From People Who Have Done It." — the four kinds of engineer a student is
 * taught by, as a 2×2 grid of tinted cards, closed by the line naming the network they
 * come from.
 *
 * A `<ul>`, not four `<div>`s: the cards are four parallel profiles rather than a
 * sequence, and marking them as a list is what tells a screen reader how many there are
 * before it starts reading them.
 *
 * Two columns from `lg`. Below it each card would have to hold its copy and its artwork
 * side by side in half a phone's width, so the grid collapses to one column and the
 * cards keep their internal layout instead — which is the part that carries the design.
 *
 * A Client Component only because the reveal hook needs the section element.
 */
export function LearnFromPeopleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLearnFromPeopleReveal(sectionRef);

  return (
    <section
      id="learn-from-people"
      ref={sectionRef}
      aria-labelledby="learn-from-people-heading"
      className="relative bg-surface py-14 lg:py-20"
    >
      {/* `78rem` rather than the `72rem` of the sections above: these are four cards
          holding artwork, not a column of copy, and at the narrower measure the
          illustrations start crowding the text they sit beside. */}
      <div className="mx-auto max-w-[78rem] px-6 sm:px-8">
        {/*
          `37.5rem` puts the break where the design has it, after "Who". At the `3rem`
          cap "Learn From People Who" measures 539px and the same line with "Have" added
          663px, so the measure has to sit between them — 600px is the middle of that
          61px-either-side band. Widen it and "Have" climbs onto line one.
          Below the cap the `4vw` term shrinks the type faster than the block, so the
          same break holds down to where the heading wraps to three lines by itself —
          which is why it is not forced with a `\n`, since a hard break there would
          strand a fragment on a phone.

          **No `text-balance` here, deliberately.** Balancing evens the two lines out
          and picks "Learn From People" / "Who Have Done It." over the design's break.
          Both are measured against the fallback face, since Neue Montreal is not
          redistributable and 404s in this repo — measure again if that file lands.
        */}
        <h2
          data-learn-from-people="heading"
          id="learn-from-people-heading"
          className="mx-auto max-w-[37.5rem] text-center type-heading text-[clamp(1.75rem,4vw,3rem)] font-semibold text-ink"
        >
          {learnFromPeopleHeading.lead}{" "}
          {/* Bricolage Grotesque via `font-accent`, the same treatment the red word takes
              across the hero, curriculum, career and ecosystem headings. */}
          <span className="font-accent font-medium text-brand">
            {learnFromPeopleHeading.accent}
          </span>{" "}
          {learnFromPeopleHeading.trail}
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          {learnFromPeopleMentors.map((mentor) => (
            <LearnFromPeopleCard key={mentor.id} mentor={mentor} />
          ))}
        </ul>

        <p
          data-learn-from-people="closing"
          className="mx-auto mt-10 max-w-[62rem] text-center font-display text-[clamp(0.9375rem,1.6vw,1.25rem)] text-pretty text-ink lg:mt-14"
        >
          {learnFromPeopleClosing}
        </p>
      </div>
    </section>
  );
}
