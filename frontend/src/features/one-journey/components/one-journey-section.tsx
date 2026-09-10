"use client";

import { useRef } from "react";

import {
  oneJourneyCards,
  oneJourneyClosing,
  oneJourneyHeading,
  oneJourneyPrice,
} from "../constants/one-journey.constants";
import { useOneJourneyReveal } from "../hooks/use-one-journey-reveal";
import { OneJourneyCard } from "./one-journey-card";

/**
 * "Why buy 10 different courses. One uGSOT Beyond journey." — the section pins and
 * deals four cards up into a scatter, one at a time, as the reader scrolls.
 *
 * Same two-element structure the hero and the approach section use, and required for
 * the same reason: the outer `<section>` is the trigger and must not clip, because
 * GSAP inserts a pin spacer inside it to create the runway. The inner stage is what
 * gets pinned — see `useOneJourneyReveal` for why it is the stage and not the cards.
 *
 * With the stage pinned, the heading and the price hold still for free: they are
 * simply sitting at the top and bottom of something that has stopped.
 */
export function OneJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useOneJourneyReveal(sectionRef);

  return (
    <section
      id="one-journey"
      ref={sectionRef}
      aria-labelledby="one-journey-heading"
      className="relative bg-surface"
    >
      <div
        data-one-journey="stage"
        className={
          "mx-auto flex w-full max-w-[84rem] flex-col px-5 py-16 sm:px-6 " +
          "lg:h-[100vh] lg:h-[100svh] lg:py-0 lg:pt-24 lg:pb-12 " +
          "lg:motion-reduce:h-auto lg:motion-reduce:py-20"
        }
      >
        <h2
          id="one-journey-heading"
          className="type-heading shrink-0 text-center text-[clamp(1.375rem,3vw,2.5rem)] font-semibold text-balance text-ink"
        >
          {/* The break lives in the copy as a `\n`; `whitespace-pre-line` renders it
              without a `<br />` here. It waits for `sm` because on a phone the first
              line wraps anyway, and a forced break there strands "One" alone. */}
          <span className="whitespace-normal sm:whitespace-pre-line">
            {oneJourneyHeading.lead}
          </span>{" "}
          <span className="font-accent text-brand">{oneJourneyHeading.accent}</span>{" "}
          {oneJourneyHeading.tail}
        </h2>

        {/*
          The deck: the box the cards are absolutely placed against, and the box that
          clips them while they are still below it.

          `lg:flex-1` so it takes whatever height is left between the heading and the
          footer. That matters twice over — the cards' `top` percentages resolve
          against it, and the hook measures each card's off-stage start from its
          height, so it has to be the real remaining space rather than a guess.

          `lg:overflow-hidden` is what makes them arrive from off-stage rather than
          simply fading up in place. Below `lg` there is no deck at all: the cards
          leave the scatter and become an ordinary column in flow.
        */}
        <div
          data-one-journey="deck"
          className="mt-7 flex flex-col gap-3 sm:mt-10 sm:gap-4 lg:relative lg:mt-8 lg:block lg:min-h-0 lg:flex-1 lg:gap-0 lg:overflow-hidden"
        >
          {oneJourneyCards.map((card, index) => (
            <OneJourneyCard
              key={card.id}
              card={card}
              isLast={index === oneJourneyCards.length - 1}
            />
          ))}
        </div>

        {/*
          The closing line and the price are one row from `sm` up, and the price is
          pushed to the far end rather than sitting next to the sentence — the two are
          separate claims, and side by side they read as one.
        */}
        {/*
          Centred below `sm`, and a justified row from there up. Stacked on a phone
          these two are the only things on the line, and left-aligning a two-line
          sentence over a big price leaves a ragged edge down the middle of the screen —
          centred, they read as one closing block.
        */}
        <div className="mt-7 flex shrink-0 flex-col items-center gap-3 text-center sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:text-left lg:mt-8">
          <p className="type-heading max-w-[26rem] text-[clamp(1rem,1.6vw,1.375rem)] font-bold text-balance text-ink">
            {oneJourneyClosing.lead}{" "}
            <span className="font-accent text-brand">
              {oneJourneyClosing.accent}
            </span>
          </p>

          {/*
            `items-baseline` so "/year" sits on the figure's baseline rather than being
            centred against a much taller number.
          */}
          <p className="flex shrink-0 items-baseline gap-1">
            <span className="type-heading text-[clamp(1.75rem,3.4vw,3rem)] font-bold text-brand">
              {oneJourneyPrice.amount}
            </span>
            <span className="text-[clamp(0.75rem,1vw,0.9375rem)] text-ink-muted">
              {oneJourneyPrice.period}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
