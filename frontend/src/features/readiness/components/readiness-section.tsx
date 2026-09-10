"use client";

import { useRef } from "react";

import { RailScrollArrow } from "@/components/ui/rail-scroll-arrow";
import { cn } from "@/lib/utils";
import {
  readinessClosing,
  readinessHeading,
  readinessSteps,
} from "../constants/readiness.constants";
import { useReadinessReveal } from "../hooks/use-readiness-reveal";
import { useReadinessTrack } from "../hooks/use-readiness-track";
import { ReadinessCard } from "./readiness-card";

/** Cards on screen before any scrolling at desktop width — worth loading eagerly. */
const EAGER_CARD_COUNT = 4;

/**
 * "Two years. One serious transformation." — the seven steps of the programme as a
 * row of cards that scrolls sideways as the page scrolls down.
 *
 * **The row is full-bleed on purpose.** It has no `max-width`: the point of the
 * layout is that cards run off both edges of the screen, so a centred measure would
 * defeat it. Only the track's own padding holds the first and last card off the edge.
 *
 * **The heading takes its inset from that padding rather than from a container.** The
 * design sets it flush with the first card, and the only thing that knows where the
 * first card starts is the track's `px-20` / `px-6` — so the heading repeats those
 * exact values. A centred `max-w` wrapper would land somewhere else at every width
 * between the two.
 *
 * From `901px` the section pins and the track is panned by `useReadinessTrack`. Below
 * that — and under reduced motion — nothing is registered, and the viewport's own
 * `overflow-x: auto` makes the row a swipeable, snapping scroller. That fallback is in
 * the markup rather than a second branch of JSX, so there is only one row to maintain,
 * and it is the whole of the mobile layout: the cards size themselves off the viewport
 * so one always peeks past the edge, and the vertical rhythm comes down with the width.
 *
 * **`min-h-screen` is what keeps the pin from showing black.** A pinned section is
 * `position: fixed` at its own natural height, and the pin-spacer standing in for it
 * is transparent — so on any viewport taller than the section, the page's dark `body`
 * showed through beneath it for the entire length of the pin. Guaranteeing it is never
 * shorter than the viewport removes the gap at its source, and `justify-center`
 * spreads the extra height instead of piling it under the row.
 */
export function ReadinessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useReadinessReveal(sectionRef);
  useReadinessTrack(sectionRef);

  return (
    <section
      id="readiness"
      ref={sectionRef}
      aria-labelledby="readiness-heading"
      className="relative bg-surface"
    >
      {/*
        Padding trimmed to 64/80 at the pin threshold. A pinned section has to fit the
        viewport it is fixed to, and this one now carries a two-line heading, a row
        461px tall with its stagger, *and* a closing line — at the reference's 100/120
        that runs some 80px over a 900px-tall window, which crops the closing line the
        section is building towards.

        Below the threshold there is no pin to fit and no desktop measure to hold the
        section together, so those values read as a hole above and below the row on a
        phone. 56/64 keeps the heading and the first card in one view at 375×812.
      */}
      <div className="flex flex-col justify-center pt-14 pb-16 min-[901px]:min-h-screen min-[901px]:pt-16 min-[901px]:pb-20">
        <h2
          id="readiness-heading"
          data-readiness="top-item"
          className={cn(
            "type-heading mb-8 px-6 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-ink",
            "min-[901px]:mb-11 min-[901px]:px-20",
          )}
        >
          {readinessHeading.lead}
          {/*
            `block` rather than a `<br>`: the second line is a different colour, so it
            is a `<span>` either way, and letting it own the line break keeps the two
            lines from ever being reflowed into one at a narrow width.
          */}
          <span className="block text-brand">{readinessHeading.accent}</span>
        </h2>

        {/*
          The wrapper is what the swipe arrow is positioned against. The section is
          already `relative`, but it is `min-h-screen` tall at the pin threshold and
          holds the heading and the closing line too — centring the arrow on *that*
          would put it nowhere near the row.
        */}
        <div className="relative">
          <div
            ref={viewportRef}
            data-readiness="viewport"
            // Below the threshold this is a genuine scroll container the user drives, so
            // it needs to be reachable and named the way the gallery's track is. At
            // `901px` and up it is `overflow-hidden` and driven by the page instead, and
            // the tab stop is inert — the same trade the gallery makes, kept identical
            // rather than branched on width, which no static markup can do.
            role="group"
            aria-label="The seven steps of the programme"
            tabIndex={0}
            className={cn(
              "overflow-hidden",
              // Where the pin does not run, the row is swiped by hand. The scrollbar is
              // hidden because the cards running off the edge are the affordance.
              //
              // **`max-[901px]`, not `max-[900px]`.** Tailwind compiles `max-[n]` to
              // `width < n`, so `max-[900px]` and `min-[901px]` left 900px exactly
              // matching neither: no pin registered, and the row still
              // `overflow: hidden` over 2400px of track — 1500px of cards with no way
              // to reach them. Pairing `max-[901px]` with `min-[901px]` tiles the axis
              // with no gap and no overlap.
              "max-[901px]:overflow-x-auto max-[901px]:[scrollbar-width:none]",
              "max-[901px]:[&::-webkit-scrollbar]:hidden",
              // Snapping is what makes a hand-swiped row land on a card instead of
              // halfway through one. `scroll-pl-6` matches the track's own padding so a
              // snapped card keeps that inset rather than butting against the edge, and
              // `overscroll-x-contain` stops a swipe past the last card turning into the
              // browser's back gesture.
              "max-[901px]:snap-x max-[901px]:snap-mandatory max-[901px]:scroll-pl-6",
              "max-[901px]:overscroll-x-contain",
              "motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:scroll-pl-6",
              "motion-reduce:overflow-x-auto motion-reduce:overscroll-x-contain",
            )}
          >
            {/*
              `w-max` is load-bearing: it lets the track be wider than the viewport,
              which is the whole premise — both the pan distance and the hand-swipe
              scroll range are that overflow.
            */}
            <div
              data-readiness="track"
              className="flex w-max items-start gap-4 px-6 will-change-transform min-[901px]:gap-6 min-[901px]:px-20"
            >
              {readinessSteps.map((step, index) => (
                <ReadinessCard
                  key={step.id}
                  step={step}
                  index={index}
                  priority={index < EAGER_CARD_COUNT}
                />
              ))}
            </div>
          </div>

          {/*
            The row holds nothing but cards, all one height, so the viewport's own
            centre *is* the card's centre — no panel measurement needed, unlike the
            gallery. `right-4` rather than `right-0` because this rail is full-bleed:
            at `0` the arrow would touch the edge of the screen.
          */}
          <RailScrollArrow
            viewportRef={viewportRef}
            className="right-4 top-1/2 -translate-y-1/2"
          />
        </div>

        {/*
          Centred against the whole screen rather than against the heading's inset: the
          row is full-bleed, and the design closes the section on the page's own axis.
        */}
        <p
          data-readiness="top-item"
          className={cn(
            "type-heading mx-auto mt-10 max-w-[52rem] px-6 text-center",
            "text-[clamp(1.25rem,2.3vw,2rem)] font-bold text-balance text-ink",
            "min-[901px]:mt-12",
          )}
        >
          {readinessClosing.lead}{" "}
          <span className="text-brand">{readinessClosing.accent}</span>{" "}
          {readinessClosing.tail}
        </p>
      </div>
    </section>
  );
}
