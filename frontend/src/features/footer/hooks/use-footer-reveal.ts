"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { FOOTER_SELECTORS } from "../constants/footer.constants";

/**
 * Unveils the footer in five overlapping beats as its card scrolls into view.
 *
 * A single timeline rather than five independent triggers: the beats deliberately
 * overlap (each starts before the previous finishes), which only a shared timeline
 * can express. Separate `ScrollTrigger`s would each fire on their own element's
 * position and the choreography would drift apart.
 *
 * @param scopeRef - The footer element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useFooterReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered, so everything renders in place.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: scope, start: "top 90%", once: true },
          })
          .from(FOOTER_SELECTORS.cta, {
            opacity: 0,
            y: 60,
            duration: 0.9,
            ease: "power3.out",
          })
          .from(
            FOOTER_SELECTORS.watermark,
            { opacity: 0, scale: 0.85, duration: 0.9, ease: "power3.out" },
            "-=0.3",
          )
          .from(
            FOOTER_SELECTORS.tagline,
            { opacity: 0, y: 45, duration: 0.7, ease: "power3.out" },
            "-=0.4",
          )
          .from(
            FOOTER_SELECTORS.column,
            {
              opacity: 0,
              y: 45,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.12,
            },
            "-=0.3",
          )
          .from(
            FOOTER_SELECTORS.bottom,
            { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" },
            "-=0.2",
          );
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
