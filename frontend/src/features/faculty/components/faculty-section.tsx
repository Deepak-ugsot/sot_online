"use client";

import { useRef } from "react";

import {
  facultyHeading,
  facultyMembers,
  facultySubtitle,
} from "../constants/faculty.constants";
import { useFacultyReveal } from "../hooks/use-faculty-reveal";
import { FacultyMarquee } from "./faculty-marquee";

/**
 * "Taught by World's Top Tech and Academic Minds" — the people who teach, as a row of
 * cards drifting leftward under the heading.
 *
 * Sits directly under the leaders section on the same ground, and the design reads the
 * two as one band: who built the school, then who teaches in it. That is why this
 * section's top padding is short — the leaders section's bottom padding is the other
 * half of the interval between them.
 *
 * The row stays inside the page's measure rather than running full-bleed: the design
 * fades it out at the measure's edges, level with the headings above, so it reads as
 * part of this section rather than as a band passing through the page.
 *
 * A Client Component only because the reveal hook needs the section element. The
 * marquee itself is CSS.
 */
export function FacultySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useFacultyReveal(sectionRef);

  return (
    <section
      id="faculty"
      ref={sectionRef}
      aria-labelledby="faculty-heading"
      className="relative bg-surface"
    >
      {/* `84rem` — the page's shared measure, matching the leaders section above. */}
      <div className="mx-auto max-w-[84rem] px-5 pt-10 pb-20 sm:px-6 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-30">
        <div
          data-faculty="intro"
          className="flex flex-col items-center gap-4 text-center sm:gap-5"
        >
          <h2
            id="faculty-heading"
            // The same two clamps as the leaders heading, so the pair sets at one size.
            className="type-heading font-semibold text-[clamp(1.75rem,7vw,2rem)] text-balance text-ink sm:text-[clamp(2rem,4vw,3rem)]"
          >
            {/* The design's break is after "and". Two blocks rather than a `<br>` — see
                the leaders heading for why. */}
            <span className="block">
              {facultyHeading.lead}{" "}
              {/* Held together: the line may break around the red run, never inside it. */}
              <span className="font-accent font-medium whitespace-nowrap text-brand">
                {facultyHeading.accent}
              </span>{" "}
              {facultyHeading.trail}
            </span>{" "}
            <span className="block">{facultyHeading.nextLine}</span>
          </h2>

          <p className="max-w-[44rem] font-display text-[clamp(1rem,1.5vw,1.25rem)] text-pretty text-ink">
            {facultySubtitle}
          </p>
        </div>

        <div data-faculty="rail" className="mt-8 sm:mt-9">
          <FacultyMarquee members={facultyMembers} />
        </div>
      </div>
    </section>
  );
}
