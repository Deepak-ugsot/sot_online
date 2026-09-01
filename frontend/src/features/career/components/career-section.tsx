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
      <div className="mx-auto flex max-w-[84rem] flex-col items-start justify-between gap-12 px-6 py-[4.5rem] sm:px-8 lg:flex-row lg:items-stretch lg:gap-20 lg:px-20 lg:py-[6.25rem]">
        <CareerIntro />
        <CareerHighlightList />
      </div>
    </section>
  );
}
