"use client";

import { useRef } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import {
  heroCtas,
  heroFootnote,
  heroHeadline,
  heroSubtext,
} from "../constants/hero.constants";
import { useHeroScrollAnimation } from "../hooks/use-hero-scroll-animation";
import { HeroBackground } from "./hero-background";
import { HeroHeadline } from "./hero-headline";

/**
 * Landing page hero: a pinned, scroll-scrubbed video stage.
 *
 * As you scroll, the section pins and the video's playhead is driven by scroll
 * position while the headline, subtext, CTAs and scroll cue fade out on staggered
 * offsets — then the pin releases. See `useHeroScrollAnimation`.
 *
 * Two-element structure is required by the pin:
 *
 * - The outer `<section>` is the trigger. It must NOT clip, because GSAP inserts a
 *   pin spacer inside it that provides the scroll runway.
 * - The inner stage is what actually gets pinned, and owns the `overflow-hidden`.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useHeroScrollAnimation(sectionRef);

  return (
    <section id="home" ref={sectionRef} aria-labelledby="hero-heading" className="relative bg-canvas">
      <div
        data-hero="stage"
        className="relative isolate h-[100vh] h-[100svh] min-h-[36rem] w-full overflow-hidden"
      >
        <HeroBackground />

        {/*
          Centred content column. Vertically centred with flex rather than absolute
          positioning so it can never slide under the fixed site header on short
          viewports — it reflows within the padded area instead.
        */}
        {/*
          Padding is smaller on a phone, where the header is 72px rather than 79 and
          the stage has far less height to give away — the stage clips, so anything
          the column outgrows is simply lost.

          `pt-20` is the floor, not a preference: it is 80px against a 72px header,
          so the headline still clears the nav by 8px. See the README for the
          measurements this block is tuned against.
        */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pt-20 pb-10 text-center sm:px-8 sm:pt-28 sm:pb-24 lg:pt-32">
          {/*
            `84rem`, matching the career, mentors and AI-mentor sections, so the page
            keeps one measure down its length. It is also what the headline needs: at
            `76rem` the second sentence was 94px too wide to hold one line at 72px and
            broke mid-phrase. The subtext and footnote set their own narrower caps,
            so only the headline actually uses the extra width.
          */}
          <div className="flex w-full max-w-[84rem] flex-col items-center">
            <HeroHeadline
              id="hero-heading"
              data-hero="headline"
              lead={heroHeadline.lead}
              accent={heroHeadline.accent}
              tail={heroHeadline.tail}
            />

            {/*
              One `data-hero` element wrapping both sentences, not one per line: the
              scroll timeline fades `subtext` as a single unit, and two targets would
              have it dissolve in two pieces.

              Each sentence is its own block so the break lands on the full stop
              between them rather than wherever the measure runs out — the same
              reasoning the headline uses for its two lines.
            */}
            <div
              data-hero="subtext"
              className="mt-3.5 max-w-[62rem] text-[clamp(0.875rem,1.5vw,1.1875rem)] leading-normal text-white/90 sm:mt-5 sm:leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.5),0_4px_20px_rgba(0,0,0,0.5)]"
            >
              {heroSubtext.map((line) => (
                <p key={line} className="text-balance">
                  {line}
                </p>
              ))}
            </div>

            {/*
              Sits between the subtext and the CTAs, so the reader learns who the
              programme is for *before* they reach the buttons rather than after they
              have already decided to apply.

              Muted white rather than the brand red the design shows: red at this size
              disappeared into the footage — `#E6161F` measures about 1.5:1 against the
              hero's pale frames, where 70% white holds its edge.

              Deliberately unshadowed, so the copy scrim behind the column (see
              `HeroBackground`) is what carries it. Quieter than the subtext above it
              on purpose: it qualifies the pitch, it is not a third piece of it.

              `52rem` is sized to hold it on one line at every desktop width, with
              room to spare — the current line is shorter than the one this cap was
              measured against, so it has room in hand.
            */}
            <p
              data-hero="footnote"
              className="mt-5 max-w-[52rem] text-[clamp(0.8125rem,1.1vw,1.0625rem)] font-medium leading-snug sm:leading-relaxed text-white/70 sm:mt-7"
            >
              {heroFootnote}
            </p>

            {/*
              Stacked on the narrowest screens so neither CTA is cramped — and both
              are full-width there, capped at `20rem`. Left to size themselves they
              came out 189px and 192px: near-identical but not identical, which on a
              centred stack reads as a mistake rather than as two buttons.

              `sm:justify-center` is what that full width costs: once the row is
              `w-full` the parent's `items-center` no longer centres it, and the pair
              packs to the left edge of the stage while the headline above stays
              centred.
            */}
            <div
              data-hero="cta"
              className="mt-5 flex w-full max-w-[20rem] flex-col items-center gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5"
            >
              {heroCtas.map((cta) => (
                <CtaButton
                  key={cta.href}
                  href={cta.href}
                  variant={cta.variant}
                  size="md"
                  withIcon={cta.variant === "primary"}
                  className="w-full sm:w-auto"
                >
                  {cta.label}
                </CtaButton>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
