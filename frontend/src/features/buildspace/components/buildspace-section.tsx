"use client";

import { useRef } from "react";

import {
  buildspaceHeading,
  buildspaceSubtitle,
} from "../constants/buildspace.constants";
import { useBuildspaceReveal } from "../hooks/use-buildspace-reveal";
import { BuildspaceScene } from "./buildspace-scene";

/**
 * "Build More. Ship Faster. With BuildSpace." — the pitch over a collage of the
 * product, on the light ground shared with the showcase section above it.
 *
 * **The heading and the pinned stage are siblings, and that split is the whole point.**
 * The heading sits in ordinary flow, so it scrolls up and away like any other copy.
 * Only the stage below it pins, which is why the collage — and nothing else — holds
 * still while the cards fold into the laptop.
 *
 * Putting the heading inside the pinned element instead would freeze it on screen for
 * the entire runway, which reads as the page having stalled.
 */
export function BuildspaceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useBuildspaceReveal(sectionRef);

  return (
    <section
      id="buildspace"
      ref={sectionRef}
      aria-labelledby="buildspace-heading"
      className="relative bg-surface"
    >
      {/*
        Ordinary flow — this scrolls away before the stage below ever pins.
      */}
      <div className="mx-auto max-w-[80rem] px-6 pt-16 pb-4 min-[641px]:pt-24">
        <div
          data-buildspace="heading"
          className="mx-auto flex max-w-[56.5rem] flex-col items-center gap-4 text-center min-[641px]:gap-6"
        >
          <h2
            id="buildspace-heading"
            className="type-heading text-balance text-[clamp(1.75rem,3.8vw,3.25rem)] text-ink"
          >
            {buildspaceHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {buildspaceHeading.accent}
            </span>
          </h2>

          {/*
            The badge is `inline-block` so its background paints as one solid block
            even when the sentence wraps around it, and `nowrap` so the two words
            never split across lines inside that block.
          */}
          <p className="font-display text-pretty text-[clamp(1rem,1.8vw,1.5rem)] text-ink-muted">
            {buildspaceSubtitle.lead}{" "}
            <span className="inline-block whitespace-nowrap bg-brand px-2.5 py-1 text-white">
              {buildspaceSubtitle.badge}
            </span>{" "}
            {buildspaceSubtitle.trail}
          </p>
        </div>
      </div>

      {/*
        The pinned stage. It must not clip, because GSAP inserts a pin spacer around it
        to create the scroll runway.

        A full viewport tall **only from 901px up**, where the pin actually runs.

        **No top pad, and that is deliberate.** Padding here would clear the 80px fixed
        header, but it is also dead space between the copy and the collage on the way
        in, so every pixel of it shows. It is not needed: centring alone drops the scene
        54px down, and the scene's own top band is empty for a further 64px before the
        first card — so the artwork starts at y=118 while pinned, well clear of the
        header. Measured at 1440x900; the clearance shrinks if the scene ever grows to
        fill more of the viewport height.

        Below that the height is left to the content. `h-screen` there would clamp the
        stage to the viewport while the wrapped scene is taller than it — measured at
        640x900, the scene overflowed its stage by 133px.
      */}
      <div
        data-buildspace="stage"
        className="flex w-full items-center justify-center px-6 py-6 min-[901px]:h-screen min-[901px]:py-0"
      >
        <BuildspaceScene />
      </div>
    </section>
  );
}
