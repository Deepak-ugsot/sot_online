"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import {
  SHOWCASE_MARQUEE_SECONDS,
  showcaseHeading,
  showcaseParagraph,
  showcaseProjects,
} from "../constants/showcase.constants";
import { useShowcaseReveal } from "../hooks/use-showcase-reveal";
import { ShowcaseCard } from "./showcase-card";

/**
 * The edge fade, as a mask on the viewport, so cards fade out rather than being
 * chopped off by the overflow boundary.
 *
 * The ramp itself is a custom property rather than a fixed length: 64px is the
 * reference's figure and it is right at desktop width, but it is far too wide for a
 * phone. Inside a 327px viewport, 64px off each end leaves 199px of clear space for a
 * 220px card — so *every* card on screen is partly faded, captions included. 24px
 * leaves a whole card standing clear at 320px and up, and still keeps the strip from
 * ending on a hard cut.
 *
 * Applied inline because the breakpoint lives on the custom property, which is what
 * the `[--showcase-edge:…]` utilities below switch.
 */
const EDGE_MASK =
  "linear-gradient(90deg, transparent 0, black var(--showcase-edge), " +
  "black calc(100% - var(--showcase-edge)), transparent 100%)";

/**
 * "Build Projects That Matter" — a continuously scrolling strip of project cards on
 * the light ground, running into the mentors section below it as one band.
 *
 * **Two identical tracks.** Each translates a full -100% of its own width, so as one
 * leaves the frame its twin arrives at exactly the position the first started from
 * and the loop restarts with no visible seam. Both must render the same cards for
 * that to hold. Same mechanism as the mentors logo marquee, and it reuses that
 * feature's `marquee-left` keyframes rather than declaring a second identical pair.
 *
 * The strip pauses while the pointer is over it, so a card can actually be read.
 */
export function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useShowcaseReveal(sectionRef);

  const renderTrack = (isDuplicate: boolean) => (
    <div
      data-showcase="track"
      // The duplicate exists only to close the loop. Its cards repeat copy that has
      // already been announced, so it is hidden from assistive tech — and with motion
      // disabled there is no loop to close, so it is dropped entirely.
      aria-hidden={isDuplicate || undefined}
      className={cn(
        "flex flex-none items-center gap-6 pr-6 will-change-transform",
        "animate-marquee-left group-hover:[animation-play-state:paused]",
        "motion-reduce:animate-none",
        isDuplicate && "motion-reduce:hidden",
      )}
      // An inline `animation-duration` outranks the one baked into the `animation`
      // shorthand the utility class sets.
      style={{ animationDuration: `${SHOWCASE_MARQUEE_SECONDS}s` }}
    >
      {showcaseProjects.map((project) => (
        <ShowcaseCard key={project.id} project={project} hidden={isDuplicate} />
      ))}
    </div>
  );

  return (
    <section
      id="showcase"
      ref={sectionRef}
      aria-labelledby="showcase-heading"
      className="relative bg-surface"
    >
      {/*
        `84rem` and `px-6` are the mentors marquee's measurements, not the reference's
        `80rem`. The two sections share a background and sit directly on top of each
        other, so their strips have to start and end on the same two lines or the band
        looks misaligned.
      */}
      <div className="mx-auto flex max-w-[84rem] flex-col items-center gap-10 px-6 py-18 min-[601px]:gap-15 min-[601px]:py-25">
        {/*
          Heading and paragraph sit side by side from 1025px up — the width at which
          the two columns below still hold their natural measures — and stack below
          it.

          Alongside the heading the paragraph is centred against it, so the two
          columns share a midline rather than a top edge: the heading runs to two
          display lines and the paragraph to two much shorter ones, so top-aligning
          them left the paragraph hanging off the top of a taller block.

          The heading column is `21rem`, and the number is measured rather than
          chosen. At 52px the break has to land as "Build Projects" / "That Matter",
          which needs at least **322px**; past **436px** the column is wide enough to
          pull "That" up onto the first line and the balance goes. 336px sits inside
          that window with room at both ends. It was 297px and went to three lines the
          moment the accent serif changed to a wider face — the widths here are tied
          to that typeface, so re-measure if it changes again.

          The block's own `max-width` grew with it (`58.5625rem` = 336 + 44 + 557), so
          the extra width comes out of the page's spare measure rather than out of the
          paragraph, which would otherwise have been squeezed to three lines itself.

          The block is narrower than the card strip below it, so it is centred over
          that strip rather than pinned to its left edge — the leftover width would
          otherwise all pool on one side.
        */}
        <div
          className={
            "flex w-full max-w-[58.5625rem] flex-col gap-5 " +
            "min-[1025px]:flex-row min-[1025px]:flex-wrap min-[1025px]:items-center min-[1025px]:gap-11"
          }
        >
          {/*
            The clamp floor is `1.875rem` rather than the reference's `2.125rem`:
            below 850px the clamp sits on its minimum, and 34px is the largest heading
            any light section sets on a phone — journey, dashboard and ecosystem all
            land on 30px there. Desktop is untouched.
          */}
          <h2
            id="showcase-heading"
            className="type-heading text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.15] text-ink min-[1025px]:flex-[0_1_21rem]"
          >
            {showcaseHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {showcaseHeading.accent}
            </span>{" "}
            {showcaseHeading.trail}
          </h2>

          <p className="font-display text-[clamp(1rem,1.6vw,1.25rem)] leading-normal text-ink-muted min-[1025px]:flex-[0_1_34.8125rem]">
            {showcaseParagraph}
          </p>
        </div>

        {/*
          Masked to transparent at both edges so cards fade out rather than being
          chopped off by the overflow boundary — see `EDGE_MASK` for why the ramp
          narrows on phones. With the animation off, a static strip is all that is
          left — let it be scrolled by hand instead of silently cropping the projects
          past the edge.
        */}
        <div
          data-showcase="viewport"
          className={
            "group flex w-full overflow-hidden motion-reduce:overflow-x-auto " +
            "[--showcase-edge:1.5rem] min-[601px]:[--showcase-edge:4rem]"
          }
          style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
        >
          {renderTrack(false)}
          {renderTrack(true)}
        </div>
      </div>
    </section>
  );
}
