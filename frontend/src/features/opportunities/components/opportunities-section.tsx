"use client";

import { useRef } from "react";

import {
  opportunities,
  opportunitiesClosing,
  opportunitiesHeading,
} from "../constants/opportunities.constants";
import { useOpportunitiesCarousel } from "../hooks/use-opportunities-carousel";
import { OpportunityCard } from "./opportunity-card";

/**
 * "Exclusive Opportunities" — seven cards on a scroll-driven 3D cylinder.
 *
 * Same two-element structure the other pinned sections use: the outer `<section>` is
 * the trigger and must not clip, because GSAP inserts a pin spacer inside it for the
 * scroll runway. The inner stage is what gets pinned.
 *
 * **Reduced motion falls back to a plain horizontal scroller.** The arc drops its
 * absolute positioning and becomes a flex row, the viewport becomes a normal
 * overflow-x container, and perspective is switched off. That only works because the
 * carousel writes no inline transforms in that mode — see `useOpportunitiesCarousel`.
 */
export function OpportunitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useOpportunitiesCarousel(sectionRef);

  return (
    <section
      id="opportunities"
      ref={sectionRef}
      aria-labelledby="opportunities-heading"
      className="relative bg-surface"
    >
      <div
        data-opportunities="stage"
        className={
          // The top padding clears the fixed site header (79px desktop, ~64 mobile).
          // The stage is a full-viewport box that centres its contents, so the padding
          // is what keeps the heading out from under the nav.
          //
          // **Centring alone is not enough.** `justify-center` only centres while the
          // content fits: once heading + arc + hint + gaps exceed the space left below
          // the padding, the block starts at the content-box top instead, which put
          // the heading hard against the nav on shorter windows. So the padding is a
          // guaranteed floor (112px − 79px = 33px of clearance no matter what), and
          // the arc and gaps below are sized so the content actually fits.
          //
          // The budget: 0.50H (arc) + 149px (a two-line heading) + 37px (the closing
          // line) + two gaps + 112px (padding) ≤ H. At a flat `4.5vh` gap that comes to
          // 723px against a 720px stage — the closing line sat exactly on the clipped
          // edge at 1280×720, which is an ordinary laptop window.
          //
          // So the gap tightens on short viewports rather than the art shrinking: the
          // arc and the type are the design, the air between them is the part that can
          // give. `1.5vh` below 820px buys back ~43px of the two gaps, which leaves the
          // closing line about 16px clear of the clipped edge at 1280×720 and holds the
          // whole block down to roughly 690px of viewport height.
          "relative flex h-[100vh] h-[100svh] w-full flex-col items-center justify-center gap-[4.5vh] [@media(max-height:820px)]:gap-[1.5vh] overflow-hidden pt-24 min-[768px]:pt-28 " +
          "motion-reduce:h-auto motion-reduce:gap-12 motion-reduce:overflow-visible motion-reduce:px-6 motion-reduce:py-25"
        }
      >
        <div className="flex flex-col items-center px-6 text-center">
          {/*
            `text-balance` rather than a stated break: the line runs to two at most
            desktop widths and the balancer puts the break after "Get", which is the
            phrase boundary. A `\n` here would hold that break at widths where the whole
            line fits on one.
          */}
          <h2
            id="opportunities-heading"
            className="type-heading max-w-[24ch] text-balance font-semibold text-[clamp(2rem,4.5vw,3.5rem)] text-ink"
          >
            <span className="font-accent font-medium text-brand">
              {opportunitiesHeading.accent}
            </span>{" "}
            {opportunitiesHeading.trail}
          </h2>
        </div>

        {/*
          The 3D viewport. `perspective` lives here rather than on the arc so every
          card shares one vanishing point and they read as a single cylinder.
        */}
        <div
          className={
            // Kept a little taller than the card's own `min(px, vh)` ceiling at every
            // viewport height, so the arc always has clearance and never crops a card.
            "relative h-[46vh] max-h-[360px] w-full overflow-hidden [perspective:1400px] " +
            "min-[768px]:h-[50vh] min-[768px]:max-h-[500px] " +
            "motion-reduce:h-auto motion-reduce:max-h-none motion-reduce:overflow-x-auto motion-reduce:[perspective:none]"
          }
        >
          {/*
            A zero-size anchor at the centre of the viewport: cards are positioned
            relative to this origin and pushed out along the cylinder from it. The
            slight `rotateX` tips the cylinder so its far side reads as receding
            upward rather than straight back.
          */}
          <div
            className={
              "absolute top-1/2 left-1/2 h-0 w-0 [transform-style:preserve-3d] [transform:rotateX(10deg)] " +
              "motion-reduce:static motion-reduce:flex motion-reduce:h-auto motion-reduce:w-auto motion-reduce:gap-5 motion-reduce:px-5 motion-reduce:[transform:none]"
            }
          >
            {opportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div>

        {/*
          The closing line, under the arc. It reads as the section's conclusion — the
          cards are the evidence — so it is set at heading weight rather than as a
          caption, and it is the last thing in the stage's centred column.
        */}
        <p className="px-6 text-center type-heading font-semibold text-[clamp(1.125rem,2.2vw,1.75rem)] text-ink">
          {opportunitiesClosing.lead}{" "}
          <span className="font-accent font-medium text-brand">
            {opportunitiesClosing.accent}
          </span>{" "}
          {opportunitiesClosing.trail}
        </p>
      </div>
    </section>
  );
}
