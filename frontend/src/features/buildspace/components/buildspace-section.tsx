"use client";

import { useRef } from "react";

import { ArrowIcon } from "@/components/ui/arrow-icon";
import {
  buildspaceCta,
  buildspaceHeading,
  buildspaceSubtitle,
} from "../constants/buildspace.constants";
import { useBuildspaceReveal } from "../hooks/use-buildspace-reveal";
import { BuildspaceDemo } from "./buildspace-demo";

/**
 * "Build More. Ship Faster. With BuildSpace." — the pitch, then a live tour of the
 * product itself.
 *
 * **This is the page's one dark break between the showcase and the mentors band, and the
 * darkness is doing a job.** BuildSpace is a dark, lime-accented product; on the light
 * ground this section used to have, a mock of it read as a screenshot pasted onto a
 * brochure. On a near-black ground the window reads as a screen that is switched on, and
 * the section stops describing the product and starts showing it.
 *
 * A Client Component because it owns the ref for the entrance reveal. The demo below is
 * a client island of its own.
 */
export function BuildspaceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useBuildspaceReveal(sectionRef);

  return (
    <section
      id="buildspace"
      ref={sectionRef}
      aria-labelledby="buildspace-heading"
      className="relative overflow-hidden bg-ink-raised"
    >
      {/*
        Two brand glows: a large one bleeding in from the top-right corner, and a much
        fainter one at the bottom-left to keep that corner from going flat black. Both are
        `pointer-events-none` so they never sit between the viewer and the demo below.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(58%_52%_at_82%_4%,rgba(230,22,31,0.46),rgba(230,22,31,0)_68%),radial-gradient(40%_36%_at_8%_98%,rgba(230,22,31,0.14),rgba(230,22,31,0)_70%)]"
      />

      {/*
        The folded light beams over the top-right corner.

        **They are broad ribbons, not hairlines, and the gradient inside each band is what
        makes them read as folded.** Each band runs from a bright pink-red highlight, down
        through brand red, into black before the next one starts — the way a ribbon of
        light shades as it turns. A flat two-stop repeat at this angle reads as hazard
        stripes instead.

        The radial mask is what keeps them a corner treatment: it fades the whole pattern
        out by 78% of the way from the top-right, so the beams reach down into the section
        and dissolve rather than crossing it.
      */}
      <div
        aria-hidden="true"
        className={
          "pointer-events-none absolute inset-0 z-0 " +
          "bg-[repeating-linear-gradient(115deg,rgba(255,59,92,0.88)_0px,rgba(230,22,31,0.62)_40px,rgba(90,8,20,0.22)_84px,rgba(0,0,0,0)_112px,rgba(0,0,0,0)_168px)] " +
          "[-webkit-mask-image:radial-gradient(72%_92%_at_98%_-8%,#000_0%,transparent_78%)] " +
          "[mask-image:radial-gradient(72%_92%_at_98%_-8%,#000_0%,transparent_78%)]"
        }
      />

      {/*
        `gap-[4.125rem]` (66px) between the copy and the window, and 78/80 of vertical
        padding: those are the reference's own fractions of its frame, and the bottom pad
        in particular is load-bearing — the corner glow is sized from the section's width,
        so a shorter section makes the glow fill more of it and the broad light corner
        collapses into a sliver.
      */}
      <div
        data-buildspace="stage"
        className="relative z-[1] mx-auto flex max-w-[80rem] flex-col items-center gap-8 px-6 pb-[4.5rem] pt-[4.5rem] min-[901px]:gap-[4.125rem] min-[901px]:pb-[5rem] min-[901px]:pt-[4.875rem]"
      >
        <div
          data-buildspace="heading"
          className="flex max-w-[56.5rem] flex-col items-center gap-[1.125rem] text-center"
        >
          <h2
            id="buildspace-heading"
            className="type-heading text-balance text-[clamp(1.75rem,3.8vw,3.25rem)] text-white"
          >
            {buildspaceHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {buildspaceHeading.accent}
            </span>
          </h2>

          <p className="font-display text-pretty text-[clamp(1rem,1.8vw,1.5rem)] text-white/80">
            {buildspaceSubtitle}
          </p>

          {/*
            The arrow sits in its own dark square inset in the white pill — the same
            two-tone CTA the header and hero use, inverted for a dark ground. Asymmetric
            padding (`pl-[1.625rem] p-2`) is what centres the label against that square
            rather than against the pill.
          */}
          <a
            href={buildspaceCta.href}
            className="group mt-1 inline-flex items-center gap-4 bg-white p-2 pl-[1.625rem] font-display text-base font-medium text-ink transition-transform duration-300 ease-cinematic hover:-translate-y-px"
          >
            <span>{buildspaceCta.label}</span>
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center bg-ink text-white"
            >
              <ArrowIcon direction="diagonal" className="h-[18px] w-[18px]" />
            </span>
          </a>
        </div>

        <BuildspaceDemo />
      </div>
    </section>
  );
}
