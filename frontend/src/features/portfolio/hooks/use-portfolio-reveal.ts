"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { PORTFOLIO_SELECTORS } from "../constants/portfolio.constants";

/**
 * Reveals the copy, with the laptop rising alongside it, as the section scrolls in.
 *
 * Fires once and does not reverse — an entrance, not a scroll-linked effect.
 *
 * The laptop rises rather than sliding in from the side: it is set on a surface at an
 * angle, and a horizontal entrance reads as the whole render being dragged across it.
 * On its own trigger, since on a phone it sits below the copy.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in its
 * final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function usePortfolioReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(PORTFOLIO_SELECTORS.copy, {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 80%", once: true },
        });

        gsap.from(PORTFOLIO_SELECTORS.artwork, {
          opacity: 0,
          y: 44,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: PORTFOLIO_SELECTORS.artwork,
            start: "top 85%",
            once: true,
          },
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
