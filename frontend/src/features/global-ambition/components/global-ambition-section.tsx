"use client";

import { useRef } from "react";

import {
  globalAmbitionCards,
  globalAmbitionHeading,
  globalAmbitionSubtitle,
} from "../constants/global-ambition.constants";
import { useGlobalAmbitionReveal } from "../hooks/use-global-ambition-reveal";
import { GlobalAmbitionCard } from "./global-ambition-card";

/**
 * "Your college may be anywhere. Your ambition can be global." — a centred header
 * over a bento grid of the seven opportunities the programme points students at.
 *
 * **The grid is three columns, not a masonry.** Six cards fill two rows and the
 * seventh runs the full width; the only break in the rhythm is the featured card in
 * the middle of the second row, which overhangs its row by 10px top and bottom. That
 * is a margin trick on a single grid item (see `GlobalAmbitionCard`) rather than a
 * second layout system — everything else stays on the same three tracks, so the
 * block reflows to two columns and then one without any special cases.
 *
 * `"use client"` is for the reveal hook alone. The cards below are Server Components
 * and their hover motion is pure CSS.
 */
export function GlobalAmbitionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGlobalAmbitionReveal(sectionRef);

  return (
    <section
      id="global-ambition"
      ref={sectionRef}
      aria-labelledby="global-ambition-heading"
      className="bg-surface py-16 sm:py-20 lg:py-24"
    >
      {/* `84rem` is the page's measure — the career, mentors and hero blocks all use it. */}
      <div className="mx-auto max-w-[84rem] px-6">
        <div
          data-global-ambition="header"
          className="mx-auto flex max-w-[46rem] flex-col items-center text-center"
        >
          <h2
            id="global-ambition-heading"
            className="type-heading text-[clamp(1.75rem,3.4vw,2.75rem)] text-balance text-ink"
          >
            {globalAmbitionHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {globalAmbitionHeading.accent}
            </span>
          </h2>

          <p className="mt-4 max-w-[38rem] text-balance text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-relaxed text-ink-muted">
            {globalAmbitionSubtitle}
          </p>
        </div>

        {/*
          One column on a phone, two at `sm`, three at `lg`. The full-width card
          spans whatever the current count is, so it stays the block's base line at
          every breakpoint rather than becoming a stray wide card in a 2-up grid.
        */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:mt-14">
          {globalAmbitionCards.map((card, index) => (
            <GlobalAmbitionCard
              key={card.id}
              card={card}
              // The first row is the only part that can be above the fold on a short
              // viewport once the hero has scrolled past.
              priority={index < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
