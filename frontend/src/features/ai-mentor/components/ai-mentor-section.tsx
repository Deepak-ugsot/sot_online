"use client";

import Image from "next/image";
import { useRef } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import {
  aiMentorAvailability,
  aiMentorCapabilities,
  aiMentorCta,
  aiMentorDescription,
  aiMentorEyebrow,
  aiMentorHeading,
  aiMentorPortrait,
} from "../constants/ai-mentor.constants";
import { useAiMentorReveal } from "../hooks/use-ai-mentor-reveal";

/**
 * "Meet your personal AI Career Mentor." — copy on the left, the mentor figure
 * standing at the bottom-right of the dark band.
 *
 * The only section set in Sora and Fraunces rather than the site-wide display/accent
 * pairing. That is the reference's own choice, not a drift: this block is styled as a
 * product callout and reads deliberately differently from the marketing sections
 * around it.
 *
 * **The figure is absolutely positioned from `lg` up, not a grid column.** It has to
 * run to the viewport's right edge and sit flush with the section's bottom, and a
 * column inside the `84rem` measure can do neither — it would stop short on both
 * sides. Taking it out of flow also means the section's height is set by the copy
 * alone, so the artwork can never push the band taller than the words need.
 *
 * Below `lg` it drops back into normal flow underneath the copy, still flush with the
 * bottom edge because nothing follows it inside the section.
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
        `isolate` keeps the glow's negative z-index local — without it, a `-z-10`
        child escapes to the root stacking context and paints *behind* the section's
        own background, where it is invisible.

        `overflow-hidden` clips the glow, which is deliberately wider than the band.
      */
      className="relative isolate overflow-hidden bg-ink-raised"
    >
      {/*
        Brand light behind the figure. Two blurred discs rather than one: the tight
        one gives the glow a core that reads as coming from the figure, the wide one
        lifts the whole right side of the band off flat #1b1b1f.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 bottom-0 h-[34rem] w-[34rem] translate-x-1/3 translate-y-1/3 rounded-full bg-brand/20 blur-[130px]" />
        <div className="absolute right-[14%] bottom-0 h-[18rem] w-[18rem] translate-y-1/2 rounded-full bg-brand/25 blur-[90px]" />
      </div>

      {/* `84rem` matches the career and mentors sections, so the page keeps one
          measure down its length. */}
      <div className="mx-auto max-w-[84rem] px-6">
        <div
          data-ai-mentor="copy"
          /*
            Capped at `34rem` rather than filling its half: at 1280 that leaves ~150px
            of clear dark between the last word and the figure's outer edge, which is
            what stops the two halves reading as one crowded block. The percentage is
            only there to make the cap bind earlier on narrow desktops.
          */
          className="max-w-[34rem] pt-16 pb-12 lg:w-[52%] lg:py-28"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-sora text-xs font-bold tracking-[0.2em] uppercase text-brand">
              {aiMentorEyebrow}
            </p>

            {/*
              The availability claim as a live-status chip. A pulsing dot is the
              conventional shorthand for "up right now", which is exactly what "24×7"
              is asserting — flat text next to the eyebrow said it far more quietly.

              `animate-ping` needs no reduced-motion guard here: `globals.css` cuts
              every animation to a single 0.01ms pass under that preference.
            */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 py-1 pr-3 pl-2.5">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>

              <span className="font-fraunces text-[0.8125rem] italic text-white/70">
                {aiMentorAvailability}
              </span>
            </span>
          </div>

          <h2
            id="ai-mentor-heading"
            className="mt-5 font-sora text-[clamp(2rem,3.6vw,3.125rem)] leading-[1.14] font-extrabold tracking-[-0.02em] text-white"
          >
            {/* The space survives the line break in source, and has to — without it
                the accessible name reads "personalAI Career Mentor." */}
            {aiMentorHeading.lead}{" "}
            <span className="text-brand">{aiMentorHeading.accent}</span>
          </h2>

          <p className="mt-5 max-w-[30rem] font-sora text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.65] text-white/65">
            {aiMentorDescription}
          </p>

          {/* A list, not loose spans — these are seven peer capabilities. */}
          <ul className="mt-8 flex list-none flex-wrap gap-2.5">
            {aiMentorCapabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-[2px] border border-white/12 bg-white/[0.03] px-3.5 py-1.5 font-sora text-[0.8125rem] whitespace-nowrap text-white/60"
              >
                {capability}
              </li>
            ))}
          </ul>

          <CtaButton
            href={aiMentorCta.href}
            variant="primary"
            size="md"
            withIcon
            className="mt-9"
          >
            {aiMentorCta.label}
          </CtaButton>
        </div>
      </div>

      <div
        data-ai-mentor="portrait"
        /*
          `object-contain` on a bottom-right-anchored box, rather than a sized image:
          the box's own aspect ratio changes with the viewport, and `contain` is what
          guarantees the figure never spills sideways into the copy no matter which
          dimension ends up binding.

          The width steps up at `xl` because the cap on the copy column stops binding
          there — below it, `42%` is the widest the figure can be while still clearing
          the copy at 1024, the narrowest viewport that uses this layout.
        */
        className="relative h-[clamp(20rem,88vw,26rem)] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[42%] xl:w-[46%]"
      >
        <Image
          src={aiMentorPortrait.src}
          alt={aiMentorPortrait.alt}
          fill
          sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 42vw, 100vw"
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}
