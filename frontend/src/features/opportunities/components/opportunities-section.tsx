"use client";

import { useRef } from "react";

import {
  opportunities,
  opportunitiesHeading,
  opportunitiesSubtitle,
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
          // The budget: 0.50H (arc) + 127px (heading) + 0.045H (one gap) + 112px
          // (padding) ≤ H, which holds from about 525px of viewport height. At `55vh`
          // arc and `6vh` gaps it needed 748px, which is where the collision was
          // coming from; dropping the scroll hint took another ~60px out of it.
          "relative flex h-[100vh] h-[100svh] w-full flex-col items-center justify-center gap-[4.5vh] overflow-hidden pt-24 min-[768px]:pt-28 " +
          "motion-reduce:h-auto motion-reduce:gap-12 motion-reduce:overflow-visible motion-reduce:px-6 motion-reduce:py-25"
        }
      >
        <div className="flex flex-col items-center gap-4 px-6 text-center">
          <h2
            id="opportunities-heading"
            className="type-heading font-semibold text-[clamp(2rem,4.5vw,3.5rem)] text-ink"
          >
            {opportunitiesHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {opportunitiesHeading.accent}
            </span>
          </h2>

          <p className="font-display text-[clamp(1rem,1.8vw,1.5rem)] text-ink">
            {opportunitiesSubtitle}
          </p>
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

      </div>
    </section>
  );
}
