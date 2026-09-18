"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  catalystArtwork,
  catalystEmployerLogos,
  whatIsCatalystDescription,
  whatIsCatalystEmployersLabel,
  whatIsCatalystHeading,
} from "../constants/what-is-catalyst.constants";
import { useWhatIsCatalystReveal } from "../hooks/use-what-is-catalyst-reveal";
import { CatalystEmployerMarquee } from "./catalyst-employer-marquee";

/**
 * "What is uGSOT Catalyst?" — the one-paragraph answer, the people who built it, and
 * a hand fanning out the six things it is made of.
 *
 * Sits directly under the hero and above "Already chosen your college?": the page
 * opens on a claim, this says plainly what the product *is*, and only then does the
 * next section argue for it. It is the first light band after the dark hero.
 *
 * **At `lg` the render is taken out of flow, and that is the whole layout.** It stands
 * taller than the copy beside it and starts above where the copy column starts, and a
 * render in flow can do neither without dragging the row's height around with it. The
 * obvious grid build is worse still: put the copy and the logo band in two rows of a
 * left column with the render spanning both, and CSS hands the spanning item's extra
 * height to the rows it spans — so the taller the render gets, the further apart it
 * prises the paragraph and the logos. That gap is exactly what this layout exists to
 * avoid. Positioned instead, the render is free to be any size and the copy keeps the
 * interval it was given.
 *
 * Below `lg` the container is a flex column and the render is back in flow, between
 * the paragraph and the logos — the cards are what the paragraph is describing, and
 * reading about the people who built it before hearing what it does gets the section
 * backwards.
 *
 * `"use client"` is for the reveal hook alone. Everything below is a Server Component
 * and the marquee's motion is pure CSS.
 */
export function WhatIsCatalystSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useWhatIsCatalystReveal(sectionRef);

  return (
    <section
      id="what-is-catalyst"
      ref={sectionRef}
      aria-labelledby="what-is-catalyst-heading"
      /*
        `lg:py-40` rather than the `lg:py-24` most light sections use, and it is the
        render that sets it. The artwork is far taller than the copy beside it, so the
        band's depth is what decides how large the hand is allowed to be: at 96px the
        last card ran out of the bottom edge, and every step up in the render's size
        has to be paid for here.

        `relative` because the render is positioned against the **section**, not
        against the measure inside it — the arm has to reach the edge of the *screen*,
        and the measure stops 72px short of it at 1440 and much further short than
        that on a wide monitor.

        `overflow-hidden` then catches whatever the arm overhangs, and is what keeps a
        render pinned to the viewport's edge from widening the document by a pixel of
        rounding.
      */
      className="relative overflow-hidden bg-surface py-16 sm:py-20 lg:py-40"
    >
      {/*
        `84rem` is the page's measure — the hero, career and global-ambition blocks all
        use it. Deliberately *not* `relative`: the render is the one thing in this
        section that does not line up with the measure, and leaving this box
        unpositioned is what lets it resolve against the section instead.
      */}
      <div className="mx-auto flex max-w-[84rem] flex-col px-6 lg:block">
        <div
          data-what-is-catalyst="copy"
          className="order-1 lg:w-[46%]"
        >
          <h2
            id="what-is-catalyst-heading"
            className="type-heading text-[clamp(1.875rem,3.6vw,3rem)] font-semibold text-balance text-ink"
          >
            {whatIsCatalystHeading.lead}{" "}
            {/* Bricolage Grotesque via `font-accent`, matching the red phrase in the
                hero, curriculum and career headings. */}
            <span className="font-accent text-brand">
              {whatIsCatalystHeading.accent}
            </span>
          </h2>

          <p className="mt-5 text-pretty text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-relaxed text-ink-muted">
            {whatIsCatalystDescription}
          </p>
        </div>

        {/*
          The render. No plate, no rounding, no shadow of our own — it is a cut-out on
          transparency whose cards already carry their own lighting, and any box behind
          it would draw a rectangle around a composition that has no edges.

          **`right-0` is the screen's edge, and that is the point.** The file's own
          content runs all the way to its right border — the forearm is already cut
          there — so wherever the render stops, that flat edge stops with it. Held to
          the page's measure it stopped 72px short of the window and left a band of
          bare grey after the arm, which reads as a picture that ran out. Taken to the
          edge, the same cut reads as the arm continuing off-screen.

          `top-6` seats the whole hand *inside* the band: the file's top 2% is
          transparent, so the wrist lands about 37px below the section's edge. It is a
          positive offset because the section is now the containing block — the top of
          its padding box is the top of the section itself, not the top of the copy.
          Pulling this negative is what sliced the forearm flat against the boundary.

          `50%` is of the **section**, so the render scales with the window it is
          pinned to rather than with the measure. **Width, offset and the section's
          own padding are one set of three, not three knobs.** The file is nearly
          square, so its width sets its height; the height plus the offset decides
          where card 06 lands; and only the padding can move the section's floor out
          of its way. Widen this without deepening `lg:py-40` and the last card drops
          out of the bottom.

          `max-w-[46rem]` is the same constraint expressed as a ceiling: past roughly
          1470px the percentage would ask for a render taller than the band, so the
          growth stops there rather than the card doing so.
        */}
        <div
          data-what-is-catalyst="artwork"
          className="order-2 mt-8 lg:absolute lg:top-6 lg:right-0 lg:mt-0 lg:w-[50%] lg:max-w-[46rem]"
        >
          <Image
            src={catalystArtwork.src}
            alt={catalystArtwork.alt}
            width={catalystArtwork.width}
            height={catalystArtwork.height}
            sizes="(min-width: 1024px) 50vw, 92vw"
            className="h-auto w-full"
          />
        </div>

        {/*
          `mt-40` at `lg` is the design's own interval between the paragraph and this
          band — a deliberate rest, not slack left over by the layout. It is a fixed
          number precisely so it cannot grow with the render beside it.
        */}
        <div
          data-what-is-catalyst="employers"
          className="order-3 mt-10 lg:mt-40 lg:w-[46%]"
        >
          <h3 className="type-heading text-[clamp(1.125rem,1.9vw,1.625rem)] font-bold text-ink">
            {whatIsCatalystEmployersLabel}
          </h3>

          <div className="mt-6 sm:mt-7">
            <CatalystEmployerMarquee logos={catalystEmployerLogos} />
          </div>
        </div>
      </div>
    </section>
  );
}
