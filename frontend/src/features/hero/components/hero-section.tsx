"use client";

import { useRef } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import {
  heroCtas,
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
          the stage has far less height to give away: at 320×700 the desktop values
          left 492px for 564px of content, and the stage clips.
        */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pt-24 pb-16 text-center sm:px-8 sm:pt-28 sm:pb-24 lg:pt-32">
          <div className="flex w-full max-w-[76rem] flex-col items-center">
            <HeroHeadline
              id="hero-heading"
              data-hero="headline"
              lead={heroHeadline.lead}
              accent={heroHeadline.accent}
              tail={heroHeadline.tail}
            />

            <p
              data-hero="subtext"
              className="mt-4 max-w-[47rem] text-[clamp(0.9375rem,1.5vw,1.1875rem)] leading-relaxed text-white/90 sm:mt-5 [text-shadow:0_1px_2px_rgba(0,0,0,0.5),0_4px_20px_rgba(0,0,0,0.5)]"
            >
              {heroSubtext}
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
              className="mt-7 flex w-full max-w-[20rem] flex-col items-center gap-3.5 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5"
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
