"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { ONE_PROGRAM_SELECTORS } from "../constants/one-program.constants";

/**
 * Brings the intro's lines in one after another as the section arrives, then the rails
 * beside them.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
 *
 * **It animates the rails wrapper, never a track or a tile.** Each track carries the
 * marquee in its own `transform`; animating a track's `y` here would overwrite that
 * transform and stop the drift dead. Fading the wrapper leaves every track's animation
 * untouched — the same split `useEcosystemReveal` makes for the fanned collage.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useOneProgramReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered, so everything renders in place.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(`${ONE_PROGRAM_SELECTORS.intro} > *`, {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: scope, start: "top 80%", once: true },
        });

        // Opacity only. The rails are already in motion by the time they fade in, and a
        // `y` on the wrapper would read as the whole block settling while its contents
        // slide the other way.
        gsap.from(ONE_PROGRAM_SELECTORS.rails, {
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ONE_PROGRAM_SELECTORS.rails,
            start: "top 90%",
            once: true,
          },
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
