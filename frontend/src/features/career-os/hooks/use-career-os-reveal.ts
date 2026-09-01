"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { CAREER_OS_SELECTORS } from "../constants/career-os.constants";

/** How far below its resting position each tile starts. */
const ITEM_OFFSET_Y = 24;

/**
 * Cascades the six feature tiles in when the grid scrolls into view.
 *
 * Fires once and does not reverse — this is an entrance, not a scroll-linked effect.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useCareerOsReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered and nothing is hidden, so the
      // tiles render in place — no separate static branch to keep in sync.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(CAREER_OS_SELECTORS.item);
        if (items.length === 0) return;

        gsap.set(items, { autoAlpha: 0, y: ITEM_OFFSET_Y });

        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          // Triggered off the grid, not the section: the heading sits well above it,
          // so the section top clears the trigger line before the tiles are visible.
          scrollTrigger: {
            trigger: CAREER_OS_SELECTORS.grid,
            start: "top 85%",
            once: true,
          },
        });

        return () => {
          gsap.set(items, { clearProps: "opacity,visibility,transform" });
        };
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
