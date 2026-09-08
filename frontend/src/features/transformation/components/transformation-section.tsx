"use client";

import { useState } from "react";

import {
  transformationClosing,
  transformationHeading,
  transformationSteps,
} from "../constants/transformation.constants";
import { TransformationStep } from "./transformation-step";

/**
 * "Two years. One serious transformation." — the seven steps of the programme as a
 * horizontal accordion: one panel open, the rest collapsed to a number and a title.
 *
 * Modelled on the "Our Expertise" row at upgrad-enterprise.com, measured: one panel at
 * 337px against five at 176px, all 400px tall, easing on
 * `cubic-bezier(0.215, 0.61, 0.355, 1)` over 0.5s.
 *
 * **A panel opens on hover, on focus and on click, all three.** Hover is the
 * interaction the row is designed around, but hover alone strands both the keyboard and
 * the touchscreen — focus covers the first and click the second, and none of them
 * conflict because they all do the same single thing.
 *
 * **The open panel is state, not CSS.** A pure-CSS version (`:hover` widening a flex
 * child) cannot keep a panel open once the pointer leaves, so the row would collapse to
 * nothing whenever the mouse was elsewhere — the reference always has exactly one panel
 * open, and so does this.
 *
 * Below `lg` the accordion is abandoned entirely — a collapsed column on a phone is
 * about 40px wide and shows a number and nothing else. The row becomes a horizontal
 * scroll rail instead, every panel open and swiped through one at a time.
 */
export function TransformationSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="transformation"
      aria-labelledby="transformation-heading"
      className="bg-surface py-16 sm:py-20 lg:py-24"
    >
      {/* `84rem` matches the career and mentors sections, so the page keeps one
          measure down its length. */}
      <div className="mx-auto max-w-[84rem] px-6">
        <h2
          id="transformation-heading"
          className="type-heading text-[clamp(1.5rem,3vw,2.375rem)] font-bold text-ink"
        >
          {transformationHeading.lead}
          <span className="block text-brand">{transformationHeading.accent}</span>
        </h2>

        {/*
          `items-stretch` so every panel is the height of the tallest — the open one —
          rather than each sizing to its own copy, which would leave the closed ones as
          short stubs along the top.

          **Below `lg` this is a swipe rail, not a column.** The panels keep their full
          copy and artwork and are scrolled through sideways, which is the same reading
          order as the desktop row rather than a different shape of the same content.

          `-mx-6 px-6` cancels the container's gutter for the scroller alone, so a card
          can sit flush against the viewport edge as it scrolls out — inside the gutter
          the rail would stop 24px short on both sides and the last card could never
          reach the edge. `no-scrollbar` hides the bar: the next card peeking in from
          the right already says the rail scrolls.

          The rail needs no `tabIndex` of its own — every panel is a `<button>`, so
          tabbing through them scrolls the rail natively, and a container tab stop would
          only add a step that does nothing.
        */}
        <ol className="no-scrollbar mt-10 -mx-6 flex list-none snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-6 pb-2 sm:mt-12 lg:mx-0 lg:mt-14 lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0">
          {transformationSteps.map((step, index) => (
            <TransformationStep
              key={step.id}
              step={step}
              isOpen={index === openIndex}
              onOpen={() => setOpenIndex(index)}
            />
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-[46rem] text-center type-heading text-[clamp(1.0625rem,1.9vw,1.625rem)] font-bold text-balance text-ink sm:mt-12 lg:mt-14">
          {transformationClosing.lead}{" "}
          <span className="text-brand">{transformationClosing.accent}</span>{" "}
          {transformationClosing.tail}
        </p>
      </div>
    </section>
  );
}
