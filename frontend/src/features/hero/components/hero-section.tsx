"use client";

import { useRef } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import {
  heroCtas,
  heroEyebrow,
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
          so the eyebrow still clears the nav by 8px. See the README for the
          measurements this block is tuned against.
        */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pt-20 pb-10 text-center sm:px-8 sm:pt-28 sm:pb-24 lg:pt-32">
          {/*
            `84rem`, matching the career, mentors and AI-mentor sections, so the page
            keeps one measure down its length. It is also what the headline needs: at
            `76rem` the second sentence was 94px too wide to hold one line at 72px and
            broke mid-phrase. The subtext, eyebrow and footnote set their own narrower
            caps, so only the headline actually uses the extra width.
          */}
          <div className="flex w-full max-w-[84rem] flex-col items-center">
            {/*
              White, not the brand red the page's other eyebrows use. This one sits on
              the hero's near-white footage, where a saturated red tops out at about
              1.5:1 — and no red can pass there, since `#E6161F` only reaches 4.5:1
              against pure black. White carries the line without a shadow behind it.

              `max-w` keeps it to two lines at the narrowest widths — the stage has no
              height to spare there (see the README's phone measurements).
            */}
            <p
              data-hero="eyebrow"
              className="mb-3 max-w-[34rem] text-[clamp(0.8125rem,1.15vw,1.0625rem)] font-semibold text-white sm:mb-4"
            >
              {heroEyebrow}
            </p>

            <HeroHeadline
              id="hero-heading"
              data-hero="headline"
              lead={heroHeadline.lead}
              accent={heroHeadline.accent}
              tail={heroHeadline.tail}
            />

            <p
              data-hero="subtext"
              className="mt-3.5 max-w-[62rem] text-[clamp(0.875rem,1.5vw,1.1875rem)] leading-normal text-white/90 sm:mt-5 sm:leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.5),0_4px_20px_rgba(0,0,0,0.5)]"
            >
              {heroSubtext}
            </p>

            {/*
              Sits between the subtext and the CTAs: it answers the "do I have to
              leave my degree?" objection *before* the reader reaches the buttons,
              rather than after they have already decided.

              Still the quietest thing in the block — `white/70` and the smallest
              size — so it reads as a qualifier on the pitch above it, not as a third
              piece of the pitch competing with the buttons below.

              `52rem` is sized to hold it on one line at every desktop width, with
              room to spare. `42rem` did not: the line is 650px at 1280 against a
              672px cap, and the type grows with the viewport, so it wrapped to two
              from 1440 up — the cap has to clear the 762px the line measures once
              the font hits its own 15px ceiling.
            */}
            <p
              data-hero="footnote"
              className="mt-3 max-w-[52rem] text-[clamp(0.75rem,1vw,0.9375rem)] leading-snug sm:leading-relaxed text-white/70 sm:mt-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.5),0_4px_20px_rgba(0,0,0,0.5)]"
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
