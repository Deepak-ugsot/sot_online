"use client";

import { useRef } from "react";

import {
  mentorsCompanyNames,
  mentorsHeading,
  mentorsMarqueeRows,
  mentorsParagraph,
} from "../constants/mentors.constants";
import { useMentorsReveal } from "../hooks/use-mentors-reveal";
import { MentorsMarqueeRow } from "./mentors-marquee-row";

/**
 * "Learn From The Best" — a centred heading above three rows of company logos
 * scrolling in alternating directions.
 *
 * The marquee is CSS-driven and runs continuously from load; GSAP only handles the
 * one-shot entrance. Keeping those two on different elements (wrapper vs. tracks)
 * means they never compete for the same `transform`.
 *
 * The tracks are far wider than their row — `overflow-hidden` on the section is a
 * backstop so no part of them can ever widen the document.
 */
export function MentorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useMentorsReveal(sectionRef);

  return (
    <section
      id="mentors"
      ref={sectionRef}
      aria-labelledby="mentors-heading"
      className="relative overflow-hidden bg-surface"
    >
      <div className="py-16 min-[641px]:py-20 min-[901px]:py-25">
        <div
          data-mentors="heading"
          className="mx-auto mb-10 max-w-[56.25rem] px-5 text-center min-[641px]:mb-12 min-[641px]:px-6 min-[901px]:mb-15"
        >
          {/*
            Two clamps rather than one. The desktop ladder is unchanged and still
            tops out at 40px; the mobile one only ever shrinks the heading below
            375px, where "Learn From The Best" would otherwise wrap to two lines.
          */}
          <h2
            id="mentors-heading"
            className="mb-5 type-heading text-[clamp(1.625rem,8vw,1.875rem)] text-ink min-[641px]:mb-6 min-[641px]:text-[clamp(1.875rem,3.6vw,2.5rem)]"
          >
            {mentorsHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {mentorsHeading.accent}
            </span>
          </h2>

          <p className="font-display text-[clamp(0.9375rem,4.3vw,1rem)] leading-normal text-ink-muted min-[641px]:text-[clamp(1rem,1.6vw,1.25rem)]">
            {mentorsParagraph}
          </p>
        </div>

        {/*
          The marquee is decorative: it loops forever and renders every logo twice, so
          exposing it would have a screen reader announce each company repeatedly. This
          sentence carries the same information once, and is generated from the logo
          data so it cannot fall out of sync.
        */}
        <p className="sr-only">
          Mentors and hiring partners include {mentorsCompanyNames.join(", ")}.
        </p>

        {/*
          Constrained rather than full-bleed. Each row's edge mask fades the logos out
          against this boundary, so on wide displays the marquee reads as a contained
          band instead of running off both sides of the screen.

          The gutter is dropped below 641px, where there is no spare width to give
          away: 24px on each side of a 375px screen is a seventh of the strip, and the
          rows already fade themselves out at the edges. The heading keeps its gutter,
          since text does have to stay off the bezel.
        */}
        <div
          data-mentors="marquee"
          aria-hidden="true"
          className="mx-auto flex max-w-[84rem] flex-col gap-6 px-0 min-[641px]:gap-8 min-[641px]:px-6 min-[901px]:gap-10"
        >
          {mentorsMarqueeRows.map((row, index) => (
            <MentorsMarqueeRow key={row.id} row={row} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
