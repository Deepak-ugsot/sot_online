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
 * The aurora's spectrum, as a full 360° cone so it can turn without a seam.
 *
 * The first and last stop are the same colour on purpose: the cone wraps, and any difference
 * between 0° and 360° shows up as a hard radial spoke sweeping round once per loop.
 *
 * **These are muted tones, not the saturated spectrum they started as.** Vercel's own
 * gradients are pale — violet, rose, amber, mint — and at full saturation behind a dark card
 * the effect stops reading as light and starts reading as a novelty rainbow. Softening the
 * stops is what keeps it a glow; the 130px blur then does the rest.
 */
const AURORA =
  "conic-gradient(from 0deg,#8b6ee0 0deg,#c47bb4 48deg,#e08a90 96deg,#e0b184 148deg," +
  "#7fd2b8 204deg,#6fc4cf 252deg,#6f9ede 306deg,#8b6ee0 360deg)";

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
 * The ground carries a rainbow wash rather than the brand-red corner glow and folded beams
 * it started with. It does not move, and the comment on those layers explains why that is a
 * hard constraint on this page rather than a preference.
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
      className="relative overflow-hidden bg-[#08080a]"
    >
      {/*
        The aurora behind the card, in place of the brand-red corner glow and folded beams
        this section used to carry.

        **It rotates, and getting back to a rotation took a detour worth recording.** The
        first attempt drifted two 3000px-wide full-bleed gradients in opposite directions on
        CSS keyframes, one of them in `mix-blend-mode: screen`, both pinned with
        `will-change`. That tore the page apart — not this section, the whole page, with
        sections appearing to slide over one another as it scrolled.

        What survived the post-mortem is that the *pattern* was not the problem: the page's
        own marquees are CSS transform animations inside the same ScrollSmoother content and
        have always been fine. The problem was the scale of it — two enormous layers, a blend
        mode forcing a re-blend of the whole section against a backdrop that moves on every
        scroll frame, and `will-change` holding all of it resident. So this is one bounded
        element, no blend mode, no `will-change`, and the section stays near-black everywhere
        the blur does not reach.

        **If tearing ever returns, `.bs-aurora`'s rotation is the first thing to turn off** —
        the card's edge animation cannot cause it, since animating a registered custom
        property repaints rather than composites.
      */}
      <div
        data-buildspace="glow"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-40 min-[901px]:opacity-70"
      >
        {/*
          One bounded blob, sized to the card it sits behind and hung off the top-right so
          most of it falls outside the frame. The section clips it, so what is left inside is
          the soft shoulder of the glow rather than the disc itself — which is what stops a
          rotating cone reading as a pinwheel.

          `blur` sits on this element while `.bs-aurora` rotates it: the blur is rasterised
          once and the cached result is what turns, so the expensive pass never repeats.
        */}
        <div
          className="bs-aurora absolute right-[-16%] top-[-30%] h-[40rem] w-[40rem] rounded-full blur-[110px] min-[901px]:right-[-6%] min-[901px]:top-[-16%] min-[901px]:h-[58rem] min-[901px]:w-[58rem] min-[901px]:blur-[130px]"
          style={{ backgroundImage: AURORA }}
        />
      </div>

      {/*
        A light scrim, only enough to settle the section's floor back to near-black and keep
        the aurora's lower shoulder off the copy.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(8,8,10,0)_0%,rgba(8,8,10,0.34)_56%,rgba(8,8,10,0.72)_100%)]"
      />

      {/* Film grain — the same utility the hero uses, and it earns its place under a
          full-bleed gradient this wide, which is the textbook case for banding. Straight
          alpha rather than the hero's `mix-blend-overlay`, for the reason given above. */}
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
      />

      {/* Lit top and bottom edges. The section sits between two light bands on the page,
          and a hard cut into near-black at both seams reads as a gap rather than a break. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.16)_50%,rgba(255,255,255,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0)_100%)]"
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
