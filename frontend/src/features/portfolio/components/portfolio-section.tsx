"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  portfolioArtwork,
  portfolioDescription,
  portfolioHeading,
} from "../constants/portfolio.constants";
import { usePortfolioReveal } from "../hooks/use-portfolio-reveal";

/**
 * "Build. Showcase. Get Noticed." — what the two years leave a student holding: a
 * developer portfolio, pictured as the site itself on a laptop with its parts round it.
 *
 * Sits directly under "Learn From People Who Have Done It.": that section is who a
 * student learns from, and this one is what they walk away with. Same light `surface`
 * ground as its neighbours.
 *
 * **The composition sits inside the measure, not on its edges.** The design indents the
 * copy ~40px from the page's usual left edge and starts the laptop at the head of the
 * right half rather than pushing it to the right edge — the pair reads as one centred
 * block. `lg:pl-10` and `lg:justify-self-start` are those two moves.
 *
 * A Client Component only because the reveal hook needs the section element.
 */
export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);

  usePortfolioReveal(sectionRef);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      aria-labelledby="portfolio-heading"
      className="relative bg-surface"
    >
      {/* `84rem` — the page's shared measure, with next-opportunity's `px-6`. */}
      <div className="mx-auto max-w-[84rem] px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div data-portfolio="copy" className="lg:pl-10">
            <h2
              id="portfolio-heading"
              className="type-heading text-[clamp(1.875rem,3.6vw,3rem)] font-semibold text-ink"
            >
              <span className="block">{portfolioHeading.lead}</span>{" "}
              {/* The whole second line is the accent, in Bricolage Grotesque like the
                  red run of every other two-tone heading on the page. */}
              <span className="block font-accent text-brand">
                {portfolioHeading.accent}
              </span>
            </h2>

            {/* `27rem` is the design's measure — the paragraph sets on its three lines. */}
            <p className="mt-6 max-w-[27rem] text-pretty text-[clamp(0.875rem,1.05vw,0.9375rem)] leading-[1.3] text-ink-muted">
              {portfolioDescription}
            </p>
          </div>

          {/*
            The wrapper carries the width, not the image. Pushed to the track's start,
            a grid item shrinks to its content — and a responsive image's intrinsic
            width is its file's width divided by the density `srcset` implies, so the
            optimizer serving this 525px file as its 640w candidate made the laptop
            render at ~433px. An explicit `w-full` capped at the file's size sidesteps
            intrinsic sizing entirely.
          */}
          <div
            data-portfolio="artwork"
            className="mx-auto w-full max-w-[32.8125rem] lg:mx-0 lg:justify-self-start"
          >
            <Image
              src={portfolioArtwork.src}
              alt={portfolioArtwork.alt}
              width={portfolioArtwork.width}
              height={portfolioArtwork.height}
              sizes="(min-width: 1024px) 33rem, 92vw"
              // Never past the file's own width — the wrapper's cap; it is a 1× export.
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
