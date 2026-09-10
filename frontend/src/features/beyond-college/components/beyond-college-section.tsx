"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  beyondCollegeClosing,
  beyondCollegeHeading,
  beyondCollegePanels,
  beyondCollegeStudent,
  beyondCollegeSubtitle,
} from "../constants/beyond-college.constants";
import { useBeyondCollegeReveal } from "../hooks/use-beyond-college-reveal";
import { BeyondCollegePanel } from "./beyond-college-panel";

/**
 * "Already chosen your college? Perfect." — two panels either side of a student, and
 * the line that states what they add up to.
 *
 * **The portrait is a real grid cell, not an overlay.** It has to sit between the
 * panels on a wide screen and between them again when they stack, and the two panels
 * are not the same height at every width — so an overlay centred on the container
 * would drift off the seam as soon as one side wrapped. As the middle track of a
 * `1fr auto 1fr` grid it is always on the seam, and when the grid collapses to one
 * column it lands between them for free, with no second set of rules. It replaced the
 * `+` badge that used to hold that slot.
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
      // `isolate` keeps the wash's negative z-index local — without it a `-z-10` child
      // escapes to the root stacking context and paints behind the section's own
      // background, where it is invisible.
      className="relative isolate overflow-hidden bg-[#fafafb] py-12 sm:py-20 lg:py-24"
    >
      {/*
        Two very soft washes rather than a flat ground: the panels are a white card and
        a saturated red one on the same row, and on flat #fafafb the white one stops
        reading as a card at all. The warm wash sits under the red panel so its shadow
        has something to fall on.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[18%] right-[-6%] h-[38rem] w-[38rem] rounded-full bg-brand/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-8%] h-[32rem] w-[32rem] rounded-full bg-[#8a93a5]/[0.10] blur-[120px]" />
      </div>

      {/*
        `96rem`, wider than the page's `84rem` measure. Two full panels *and* a figure
        between them is three columns of content where every other section has one or
        two, and at `84rem` the figure came out barely two thirds the height of the
        panels it stands between — the reference has it nearly as tall as they are.
      */}
      <div className="mx-auto max-w-[96rem] px-5 sm:px-6">
        <div
          data-beyond-college="header"
          className="mx-auto flex max-w-[52rem] flex-col items-center text-center"
        >
          <h2
            id="beyond-college-heading"
            className="type-heading text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold text-balance text-ink"
          >
            {beyondCollegeHeading.lead}{" "}
            <span className="font-accent text-brand">
              {beyondCollegeHeading.accent}
            </span>
          </h2>

          <p className="mt-3 max-w-[46rem] text-balance text-[clamp(0.875rem,1.2vw,1.0625rem)] leading-relaxed text-ink-muted sm:mt-4">
            {beyondCollegeSubtitle}
          </p>
        </div>

        {/*
          `items-stretch` is what makes the two panels the same height regardless of
          which one's copy wraps — the section is a comparison, and two columns of
          visibly different height read as one being the bigger offer. It is also what
          gives the portrait's cell a full-height box to stand in.
        */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:mt-14 sm:gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-2">
          <BeyondCollegePanel panel={collegePanel} />

          {/*
            The portrait stands *between* the panels rather than in front of them, so
            the cell is a real track and the negative margins only pull the panels'
            gutters closed around it — the figure never covers a row of either list.

            `items-end`: the render is a standing figure cropped at the waist, so it
            has to sit on the row's baseline. Centred, it floats.
          */}
          <div
            data-beyond-college="student"
            /*
              **`lg` and up only.** The figure only means anything while he is standing
              *between* the two panels; once they stack he is a tall photograph wedged
              between two cards, and on a phone that is most of the section's height
              for no argument at all.

              `z-10` because the negative margin pulls the college panel *over* this
              cell. The figure is a cut-out on transparency, so standing him in front
              is what the overlap is for — his shoulder crosses that panel's edge the
              way the reference draws it.

              **The pull is left-only.** Symmetric margins put "Bigger Future." — which
              is lettered into the render in red — on top of the red panel, where it
              cannot be read. Flush on the right, the whole annotation stays on the
              light ground between the two, which is where the reference has it.
            */
            className="relative z-10 hidden items-end justify-center lg:mr-0 lg:-ml-10 lg:flex lg:w-[clamp(18rem,30vw,34rem)]"
          >
            <Image
              src={beyondCollegeStudent.src}
              alt={beyondCollegeStudent.alt}
              width={beyondCollegeStudent.width}
              height={beyondCollegeStudent.height}
              // Only ever rendered at `lg` and up, so there is one size to declare.
              sizes="30vw"
              className="h-auto w-full object-contain object-bottom"
            />
          </div>

          <BeyondCollegePanel panel={acceleratorPanel} />
        </div>

        {/*
          The closing line is ruled on both sides — it is the section's conclusion, and
          the rules are what stop it reading as a caption hanging under the grid.

          `flex` with two `flex-1` rules rather than a border on the text: the rules
          have to meet the line wherever it wraps, and a fixed-width rule either falls
          short at 1920 or overruns at 390.
        */}
        <div className="mt-8 flex items-center gap-3 sm:mt-14 sm:gap-7">
          <span aria-hidden="true" className="h-px flex-1 bg-black/12" />

          <p
            data-beyond-college="closing"
            className="type-heading text-center text-[clamp(1rem,2.2vw,1.75rem)] font-bold text-balance text-ink"
          >
            {beyondCollegeClosing.lead}{" "}
            <span className="font-accent text-brand">
              {beyondCollegeClosing.accent}
            </span>
          </p>

          <span aria-hidden="true" className="h-px flex-1 bg-black/12" />
        </div>
      </div>
    </section>
  );
}
