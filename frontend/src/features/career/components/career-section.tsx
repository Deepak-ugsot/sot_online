"use client";

import { useRef } from "react";

import { useCareerReveal } from "../hooks/use-career-reveal";
import { CareerHighlightList } from "./career-highlight-list";
import { CareerIntro } from "./career-intro";

/**
 * "College Gives You a Degree. We Help You Build a Career." — the first light
 * section, sitting directly under the hero.
 *
 * Two columns on desktop (intro left, highlights right), stacking below `lg`.
 * Columns are `basis`-sized rather than a 50/50 split so they match the reference's
 * asymmetric measure and the paragraph keeps a readable line length.
 *
 * A Client Component only because it owns the ref for the scroll reveal; both
 * children are Server Components.
 */
export function CareerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useCareerReveal(sectionRef);

  return (
    <section
      id="career"
      ref={sectionRef}
      aria-labelledby="career-heading"
      // The rows cascade in from 60px left of where they settle. Inside a `px-6`
      // phone gutter that start point is 36px outside the viewport, so the first
      // frames of the entrance are painted where nobody can see them and each row
      // appears already half-travelled. Clipping to the section keeps the whole
      // cascade on screen. (Leftward overflow does not scroll the page in LTR, so
      // this is about the animation reading correctly, not about a stray
      // scrollbar.) `clip` rather than `hidden`, which would force `overflow-y` to
      // `auto` and make the section a scroll container — this page pins sections
      // above and below it.
      className="relative overflow-x-clip bg-surface text-ink"
    >
      {/*
        `lg:items-stretch` lets the intro column grow to the height of the highlight
        list, which is what its own `justify-between` needs in order to sit the CTA
        level with the list's last row.
      */}
      {/*
        Stacked, the `gap` is the only thing separating the CTA from the list's first
        rule. It was opened up to `gap-14` on the theory that it needed to do more
        work there than as the trough between two columns, but that plus the airy
        rows pushed the list a screen away from the copy it belongs to. `gap-9` keeps
        the CTA and the list reading as one block; `lg:gap-20` is unchanged.
      */}
      {/*
        `88rem` — a step above `7xl` (80rem), and well short of the page-wide `84rem`
        measure being abandoned entirely.

        The floor is set by the columns, not by taste: they need 1144px between them —
        594px to hold "why are students still confused?" on one line at the heading's
        40px cap, and 550px to hold the longest question on one line. At `7xl` with the
        section's old `lg:px-20` gutter and `lg:gap-20` trough there was only 1120,
        which broke the heading onto a third line.

        **The gutter and trough are sized against 1280, not against 1920.** The
        container stops growing at `88rem`, so the columns are tightest at 1280 — where
        `lg:px-10` and `lg:gap-8` leave exactly the 1168px their bases ask for, and
        nothing shrinks. Widening either by one step puts the heading back onto three
        lines *there* while changing nothing at 1920, because past 1408 the surplus
        falls into the trough anyway: `justify-between` hands it to the gap rather than
        to the columns, so the trough reads as 160px at 1920 regardless.
      */}
      <div className="mx-auto flex max-w-[88rem] flex-col items-start justify-between gap-9 px-6 py-[4.5rem] sm:px-8 lg:flex-row lg:items-stretch lg:gap-8 lg:px-10 lg:py-[6.25rem]">
        <CareerIntro />
        <CareerHighlightList />
      </div>
    </section>
  );
}
