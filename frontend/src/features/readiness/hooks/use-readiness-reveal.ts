"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { READINESS_SELECTORS } from "../constants/readiness.constants";

/**
 * Reveals the heading block as the section arrives.
 *
 * The cards are deliberately not part of this. They live in a track that the pin
 * transforms sideways, and a second entrance tween on the same elements would be
 * competing for the same property the moment the pin engages — the row arriving from
 * off-screen right is already the entrance.
 *
 * Fires once and does not reverse. Under reduced motion nothing is registered and
 * nothing is hidden, so the heading renders in place.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useReadinessReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        // The copy block and the CTA are separate top-level items, so staggering
        // them here is safe — there are no internal gaps for the tween to disturb.
        gsap.from(READINESS_SELECTORS.topItem, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: scope, start: "top 90%", once: true },
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
