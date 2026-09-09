"use client";

import { useRef } from "react";

import {
  earlyStartCallout,
  earlyStartHeading,
  earlyStartSteps,
  earlyStartSubtitle,
} from "../constants/early-start.constants";
import { useEarlyStartReveal } from "../hooks/use-early-start-reveal";
import { EarlyStartCallout } from "./early-start-callout";
import { EarlyStartTimeline } from "./early-start-timeline";

/**
 * "Your Career Doesn't Start In Final Year." — the six stages of a career on a timeline
 * whose rail is drawn by the reader's scroll, with the section's claim and its CTA on a
 * red card beside it.
 *
 * Sits directly under the curriculum section and shares its light `surface` ground on
 * purpose: the curriculum says what is taught, and this says when the rest of it
 * happens. They read as one light band before the dark ecosystem section below.
 *
 * The two columns split only at `lg`. Narrower than that the card would have to sit in
 * a column too small for its claim to hold a sensible measure, so it drops below the
 * timeline — which is also the reading order, since the card is the conclusion the
 * list is arguing toward.
 *
 * A Client Component only because the reveal hook needs the section element.
 */
export function EarlyStartSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEarlyStartReveal(sectionRef);

  return (
    <section
      id="early-start"
      ref={sectionRef}
      aria-labelledby="early-start-heading"
      className="relative bg-surface py-14 lg:py-20"
    >
      {/* `72rem` and the same gutters as the curriculum section above it, so the two
          sit on one set of outer edges rather than stepping in and out. */}
      <div className="mx-auto max-w-[72rem] px-6 sm:px-8">
        {/*
          `56rem` is set by the heading's one line: "Your Career Doesn't Start In Final
          Year." measures 793px at the `2.75rem` cap, so the `48rem` (768px) this
          started at broke it in two and stranded "Final Year." on a line of its own.
          The slack above 793px is deliberate — the measurement is against the fallback
          face, since Neue Montreal is not redistributable and 404s in this repo (see
          `globals.css`), so measure again if that file lands. Below the cap the `3.6vw`
          term shrinks the type faster than the block, and the line keeps fitting down
          to where it wraps by itself.

          The paragraph under it is one short line and needs no measure of its own.
        */}
        <div
          data-early-start="heading"
          className="mx-auto flex max-w-[56rem] flex-col items-center gap-3 text-center"
        >
          <h2
            id="early-start-heading"
            className="type-heading text-balance text-[clamp(1.625rem,3.6vw,2.75rem)] font-bold text-ink"
          >
            {earlyStartHeading.lead}{" "}
            <span className="text-brand">{earlyStartHeading.accent}</span>
          </h2>

          <p className="font-display text-pretty text-[clamp(0.9375rem,1.3vw,1.0625rem)] text-ink-muted">
            {earlyStartSubtitle}
          </p>
        </div>

        {/*
          `items-start` keeps the card the height of its own content — stretched, it
          would grow to the full height of a six-step timeline and leave the CTA
          stranded in the middle of a large empty red field.

          The timeline gets the wider column: its descriptions are full sentences,
          while the card carries one line of display type.
        */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:mt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <EarlyStartTimeline steps={earlyStartSteps} />

          <EarlyStartCallout callout={earlyStartCallout} />
        </div>
      </div>
    </section>
  );
}
