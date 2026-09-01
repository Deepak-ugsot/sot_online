"use client";

import { useRef } from "react";

import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import {
  aiMentorCapabilities,
  aiMentorEyebrow,
  aiMentorHeading,
  aiMentorTagline,
  aiMentorVideo,
} from "../constants/ai-mentor.constants";
import { useAiMentorReveal } from "../hooks/use-ai-mentor-reveal";

/**
 * "Meet your personal AI Career Mentor." — copy column on the left, video on the right.
 *
 * The only section set in Sora and Fraunces rather than the site-wide display/accent
 * pairing. That is the reference's own choice, not a drift: this block is styled as a
 * product callout and reads deliberately differently from the marketing sections
 * around it.
 *
 * Both columns are `flex: 1 1 420px`, so they sit side by side while there is room for
 * two 420px tracks and wrap to a stack when there is not — no breakpoint involved.
 */
export function AiMentorSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useAiMentorReveal(sectionRef);

  return (
    <section
      id="ai-mentor"
      ref={sectionRef}
      aria-labelledby="ai-mentor-heading"
      className="relative bg-ink-raised"
    >
      {/*
        `84rem` matches the career and mentors sections, so the page keeps one
        measure down its length.

        The two columns are capped to exactly half of what that leaves —
        `(84rem - 2×px-6 - gap-15) / 2` — because they are `justify-center`ed:
        widening the container alone would have done nothing visible, just parked the
        same 1032px of content in a roomier box.
      */}
      <div className="mx-auto flex max-w-[84rem] flex-wrap items-center justify-center gap-15 px-6 py-20 lg:py-[6.875rem]">
        <div
          data-ai-mentor="copy"
          className="max-w-[38.625rem] flex-[1_1_26.25rem]"
        >
          <p className="font-sora text-xs font-bold tracking-[0.2em] uppercase text-brand">
            {aiMentorEyebrow}
          </p>

          <h2
            id="ai-mentor-heading"
            className="mt-4 font-sora text-[clamp(1.75rem,3.2vw,2.375rem)] leading-[1.25] font-extrabold text-white"
          >
            {aiMentorHeading}
          </h2>

          <p className="mt-3 font-fraunces text-lg italic text-brand">
            {aiMentorTagline}
          </p>

          {/* A list, not loose spans — these are seven peer capabilities. */}
          <ul className="mt-6 flex list-none flex-wrap gap-3">
            {aiMentorCapabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-[2px] border border-[#333] px-4 py-2 font-sora text-sm whitespace-nowrap text-[#c9c9c9]"
              >
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <div data-ai-mentor="media" className="max-w-[38.625rem] flex-[1_1_26.25rem]">
          <YouTubeEmbed
            videoId={aiMentorVideo.videoId}
            title={aiMentorVideo.title}
          />
        </div>
      </div>
    </section>
  );
}
