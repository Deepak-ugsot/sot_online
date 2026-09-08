"use client";

import Image from "next/image";
import { useRef } from "react";

import { cn } from "@/lib/utils";
import {
  AI_MENTOR_BAND_HEIGHT,
  aiMentorCapabilities,
  aiMentorClosing,
  aiMentorDescription,
  aiMentorHeading,
  aiMentorPortrait,
} from "../constants/ai-mentor.constants";
import { useAiMentorReveal } from "../hooks/use-ai-mentor-reveal";

/**
 * "Don't just build for yourself. Build with the world." — copy on the left of a dark
 * band, the android standing at its right.
 *
 * **The band is two flat colours meeting on a hard line, not a gradient.** A light
 * strip runs across the top of the section and the rest is near-black; the figure is
 * then painted *over* the seam, so its head sits in the light while its body is in the
 * dark. That layering is the whole idea of the design — the figure is what makes the
 * two grounds read as one section rather than as two stacked bands.
 *
 * Three things are load-bearing for that:
 *
 * - **The section does not clip.** No `overflow-hidden` anywhere on the way down, or
 *   the head would be cut off exactly at the seam the design is built around.
 * - **The figure is absolutely positioned from `lg` up, spanning the full height.**
 *   It has to cross the seam and reach the section's right edge, and a column inside
 *   the `84rem` measure can do neither.
 * - **The copy clears the band with matching padding.** The band's height is a fixed
 *   value shared with the copy's top padding (`AI_MENTOR_BAND_HEIGHT`), because the
 *   section's height is set by the copy — a percentage band would ask the copy to
 *   clear a distance the copy itself defines.
 *
 * Below `lg` the figure drops back into normal flow underneath the copy.
 */
export function AiMentorSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useAiMentorReveal(sectionRef);

  return (
    <section
      id="ai-mentor"
      ref={sectionRef}
      aria-labelledby="ai-mentor-heading"
      /*
        `isolate` keeps the glow's negative z-index local — without it a `-z-10` child
        escapes to the root stacking context and paints behind the section's own
        background, where it is invisible.

        `overflow-x-clip`, not `overflow-hidden`. The glows are deliberately wider than
        the section and were producing a page-wide horizontal scrollbar once the old
        `overflow-hidden` came off — but `hidden` would also force `overflow-y` to
        `auto`, making this a scroll container, and the figure's head has to be free to
        sit above the seam. `clip` on one axis leaves the other genuinely `visible`.
      */
      className="relative isolate overflow-x-clip bg-[#1a1a1a]"
    >
      {/* The light band. A sibling with its own height rather than a hard-stop
          gradient on the section, so the seam is a real box edge that the figure can
          be measured against. */}
      <div
        aria-hidden="true"
        className={cn("absolute inset-x-0 top-0 bg-[#f4f4f5]", AI_MENTOR_BAND_HEIGHT)}
      />

      {/* Brand light behind the figure, lifting the right of the band off flat black.
          `-z-10` puts it under the copy and the figure but over the section's ground. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 bottom-0 h-[34rem] w-[34rem] translate-x-1/3 translate-y-1/3 rounded-full bg-brand/20 blur-[130px]" />
        <div className="absolute right-[14%] bottom-0 h-[18rem] w-[18rem] translate-y-1/2 rounded-full bg-brand/25 blur-[90px]" />
      </div>

      {/* `84rem` matches the career and mentors sections, so the page keeps one
          measure down its length. */}
      <div className="relative mx-auto max-w-[84rem] px-6">
        {/* Spacer the exact height of the band, so the copy starts below the seam
            rather than on top of it. */}
        <div aria-hidden="true" className={AI_MENTOR_BAND_HEIGHT} />

        <div
          data-ai-mentor="copy"
          /*
            `40rem` is set by the heading, not by taste: "Don't just build for
            yourself." measures 575px at the heading's 44px cap, and at the old `36rem`
            (576px) cap it wrapped — which turned a two-line heading into three. The
            column has to be wider than that sentence or the copy's own line break stops
            meaning anything.

            The figure needs 52–54% to stand tall enough for its head to reach the light
            band, so the two together are close to 100%. They clear each other because
            the render carries about 4% of transparent margin down its left edge.
          */
          className="max-w-[40rem] pt-12 pb-14 lg:w-[50%] lg:pt-16 lg:pb-24"
        >
          {/* The `2.75rem` cap is what lets the first sentence hold one line inside a
              `40rem` column — at `3rem` it needed 627px and wrapped, making the heading
              three lines where the copy's own break says two. */}
          <h2
            id="ai-mentor-heading"
            className="type-heading text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold text-white"
          >
            {/* `whitespace-pre-line` renders the `\n` in the copy as the intended
                break. It waits for `sm`, because on a phone the first sentence wraps
                anyway and the forced break then strands "Build with the" on its own. */}
            <span className="whitespace-normal sm:whitespace-pre-line">
              {aiMentorHeading.lead}
            </span>{" "}
            <span className="text-brand">{aiMentorHeading.accent}</span>
          </h2>

          <p className="mt-5 max-w-[32rem] text-[clamp(0.9375rem,1.2vw,1.125rem)] leading-[1.6] text-white/70">
            {aiMentorDescription}
          </p>

          {/* A list, not loose spans — these are seven steps along one path. */}
          <ul className="mt-8 flex list-none flex-wrap gap-2.5">
            {aiMentorCapabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-[3px] border border-white/25 px-3.5 py-2 text-[0.8125rem] whitespace-nowrap text-white/85"
              >
                {capability}
              </li>
            ))}
          </ul>

          {/* The payoff line. Set at heading weight rather than as body copy — the
              chips above are the steps, and this is what they add up to. */}
          <p className="type-heading mt-9 text-[clamp(1.0625rem,1.7vw,1.5rem)] font-bold text-white">
            {aiMentorClosing.lead}{" "}
            <span className="text-brand">{aiMentorClosing.accent}</span>
          </p>
        </div>
      </div>

      <div
        data-ai-mentor="portrait"
        /*
          `inset-y-0` — the box spans the *whole* section, band included, and the image
          inside is bottom-anchored. That is what carries the figure's head up across
          the seam into the light: anchored to the dark area alone it would stop at the
          seam and the layering would be lost.

          `object-contain` rather than a sized image: the box's aspect changes with the
          viewport, and `contain` is what guarantees the figure never spills sideways
          into the copy no matter which dimension ends up binding.

          **The width is what sets how far the head rises.** Contain is width-bound
          here, so the rendered figure is `boxWidth / 1.083` tall — at 46% it cleared
          the seam by barely 20px and the head read as sitting *on* the line rather
          than through it. The wider values below are chosen so the render is taller
          than the dark area at every desktop width, which is the only way the head
          reliably lands in the light.
        */
        className="relative z-10 h-[clamp(18rem,80vw,24rem)] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[54%] xl:w-[52%]"
      >
        <Image
          src={aiMentorPortrait.src}
          alt={aiMentorPortrait.alt}
          fill
          sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 54vw, 100vw"
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}
