"use client";

import { useRef } from "react";

import { ArrowIcon } from "@/components/ui/arrow-icon";
import {
  buildspaceCta,
  buildspaceEyebrow,
  buildspaceHeading,
  buildspaceSubtitle,
} from "../constants/buildspace.constants";
import { useBuildspaceReveal } from "../hooks/use-buildspace-reveal";
import { BuildspaceDemo } from "./buildspace-demo";

/**
 * "BuildSpace — your engineering playground inside Beyond." The pitch and the tour's table
 * of contents down the left, a live window of the product itself down the right.
 *
 * **This is the page's one dark break between the showcase and the mentors band, and the
 * darkness is doing a job.** BuildSpace is a dark, lime-accented product; on the light
 * ground this section used to have, a mock of it read as a screenshot pasted onto a
 * brochure. On a near-black ground the window reads as a screen that is switched on, and
 * the section stops describing the product and starts showing it.
 *
 * The ground is the brand-red corner glow and the folded beams over the top-right — the
 * treatment this section carried before a rotating rainbow aurora briefly replaced it. It
 * does not move: the beams are static gradients, and the comment on them explains why that
 * is a hard constraint on this page rather than a preference.
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

        **They are static, and on this page that is a hard constraint rather than a
        preference.** A previous version of this section drifted two 3000px-wide full-bleed
        gradients in opposite directions, one of them in `mix-blend-mode: screen`, both
        pinned with `will-change`. That tore the whole page apart — not just this section —
        with sections appearing to slide over one another as it scrolled: ScrollSmoother
        transforms the page's content on the main thread every frame, and a blend mode
        forcing a re-blend against a backdrop that moves is what could not keep up. Anything
        added here should stay a painted gradient that sits still.
      */}
      <div
        data-buildspace="glow"
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
        Stacked below 1180px, split above it.

        **1180 is set by the window, not by the copy.** The canvas scales to whatever width
        its column gives it, and a two-column split only pays for itself once the right
        column is still wide enough for the mock to read as an application rather than as a
        thumbnail. Below that the window takes the full measure with the copy centred above
        it, which is the composition this section had throughout.

        **The window's track is sized, the window is not.** The ceiling that keeps the mock
        from growing sits on the *grid track*, and the copy takes whatever is left. An
        earlier version put it on the item instead — a `max-w-[50rem]` window inside a fluid
        track — and the difference became dead space between the columns: on a 1512 viewport
        a 72px gap rendered as a 144px hole and the two halves stopped reading as one
        composition. Sizing the track means the window always fills its column exactly and
        the gutter is never anything but the gap.

        `items-center` because the copy is much the shorter of the two columns once the
        window carries its narration and chips below it.
      */}
      <div
        data-buildspace="stage"
        className={
          "relative z-[1] mx-auto flex max-w-[96rem] flex-col items-center gap-10 px-6 pb-[4.5rem] pt-[4.5rem] " +
          "min-[901px]:gap-14 min-[901px]:pb-[5rem] min-[901px]:pt-[4.875rem] " +
          "min-[1180px]:grid min-[1180px]:grid-cols-[minmax(0,1fr)_clamp(38rem,52vw,50rem)] " +
          "min-[1180px]:items-center min-[1180px]:gap-14 min-[1180px]:px-10 min-[1180px]:pb-[6rem] min-[1180px]:pt-[5.5rem] " +
          "min-[1440px]:gap-[4.5rem] min-[1440px]:px-14"
        }
      >
        <div
          data-buildspace="heading"
          className={
            "flex max-w-[44rem] flex-col items-center gap-[1.125rem] text-center " +
            "min-[1180px]:max-w-none min-[1180px]:items-start min-[1180px]:gap-5 min-[1180px]:text-left"
          }
        >
          {/* The label that says the window beside it is running, not sitting still. The
              dot's pulse is the whole of that claim, so it goes when motion is turned
              down. */}
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pl-2.5 pr-3.5 font-display text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white/65">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#d7ff5f] opacity-70 motion-reduce:animate-none" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#d7ff5f]" />
            </span>
            {buildspaceEyebrow}
          </span>

          <h2
            id="buildspace-heading"
            className={
              "type-heading text-balance text-[clamp(1.875rem,4vw,3.5rem)] text-white " +
              "min-[1180px]:text-pretty min-[1180px]:text-[clamp(2.25rem,2.9vw,3.25rem)]"
            }
          >
            <span className="font-accent font-medium text-brand">
              {buildspaceHeading.accent}
            </span>{" "}
            {buildspaceHeading.trail}
          </h2>

          <p
            className={
              "font-display text-pretty text-[clamp(1rem,1.8vw,1.5rem)] text-white/80 " +
              "min-[1180px]:text-[clamp(1rem,1.15vw,1.125rem)] min-[1180px]:leading-relaxed min-[1180px]:text-white/70"
            }
          >
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

        <div className="w-full max-w-[53.75rem] min-[1180px]:max-w-none">
          <BuildspaceDemo />
        </div>
      </div>
    </section>
  );
}
