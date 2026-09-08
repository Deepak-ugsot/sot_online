"use client";

import { useRef } from "react";

import {
  beyondCollegeClosing,
  beyondCollegeHeading,
  beyondCollegePanels,
  beyondCollegeSubtitle,
} from "../constants/beyond-college.constants";
import { useBeyondCollegeReveal } from "../hooks/use-beyond-college-reveal";
import { BeyondCollegePanel } from "./beyond-college-panel";

/**
 * "Already chosen your college? Perfect." — the two panels that make the section's
 * argument, and the line that states it.
 *
 * **The `+` is a real grid cell, not an absolutely positioned overlay.** It has to sit
 * between the panels on a wide screen and between them again when they stack, and the
 * two panels are not the same height at every width — so an overlay centred on the
 * container would drift off the seam as soon as one side wrapped. As the middle track
 * of a `1fr auto 1fr` grid it is always on the seam, and when the grid collapses to one
 * column it lands between them for free, with no second set of rules.
 *
 * `"use client"` is for the reveal hook alone; everything below it is a Server
 * Component and the hover motion is pure CSS.
 */
export function BeyondCollegeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [collegePanel, acceleratorPanel] = beyondCollegePanels;

  useBeyondCollegeReveal(sectionRef);

  return (
    <section
      id="beyond-college"
      ref={sectionRef}
      aria-labelledby="beyond-college-heading"
      className="bg-surface py-16 sm:py-20 lg:py-24"
    >
      {/* `84rem` is the page's measure — the hero, career and mentors blocks all use it. */}
      <div className="mx-auto max-w-[84rem] px-6">
        <div
          data-beyond-college="header"
          className="mx-auto flex max-w-[52rem] flex-col items-center text-center"
        >
          <h2
            id="beyond-college-heading"
            className="type-heading text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold text-balance text-ink"
          >
            {beyondCollegeHeading.lead}{" "}
            <span className="font-accent text-brand">
              {beyondCollegeHeading.accent}
            </span>
          </h2>

          <p className="mt-4 max-w-[46rem] text-balance text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-relaxed text-ink-muted">
            {beyondCollegeSubtitle}
          </p>
        </div>

        {/*
          `items-stretch` is what makes the two panels the same height regardless of
          which one's copy wraps — the section is a comparison, and two columns of
          visibly different height read as one being the bigger offer.
        */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:mt-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <BeyondCollegePanel panel={collegePanel} />

          {/*
            The seam marker. `aria-hidden`, because "plus" is a visual join between two
            panels a screen reader already reads in order — announcing it would add a
            stray symbol between two lists and say nothing the copy does not.
          */}
          <div
            data-beyond-college="badge"
            aria-hidden="true"
            className="flex items-center justify-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl leading-none font-light text-brand shadow-[0_10px_28px_-8px_rgba(10,10,11,0.28)]">
              +
            </span>
          </div>

          <BeyondCollegePanel panel={acceleratorPanel} />
        </div>

        <p
          data-beyond-college="closing"
          className="mt-12 text-center type-heading text-[clamp(1.25rem,2.4vw,2rem)] font-bold text-balance text-ink sm:mt-14"
        >
          {beyondCollegeClosing.lead}{" "}
          <span className="font-accent text-brand">
            {beyondCollegeClosing.accent}
          </span>
        </p>
      </div>
    </section>
  );
}
