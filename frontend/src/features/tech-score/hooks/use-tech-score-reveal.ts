"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import {
  TECH_SCORE_SELECTORS,
  techScoreDial,
} from "../constants/tech-score.constants";

/** How far below its resting position each stat card starts. */
const STAT_OFFSET_Y = 20;

/**
 * The section's entrance: the panel rises in, the ring draws itself round to the score
 * while the number counts up to meet it, and the six stats cascade in beside them.
 *
 * **The ring and the number are one tween, not two.** They are the same value at two
 * spellings, and running them on separate timelines would let the arc land on 67 a
 * frame before or after the digits do — which is exactly the kind of mismatch a viewer
 * notices without being able to name. So a single object is tweened and both are
 * written from its `onUpdate`.
 *
 * **`strokeDashoffset` rather than a transform.** It repaints rather than composites,
 * so it cannot desync with ScrollSmoother's own transform of the page content the way a
 * compositor animation can — the failure this page has already had once, in
 * `features/buildspace`.
 *
 * Under reduced motion nothing is registered and nothing is hidden, so the panel renders
 * in place with the arc already at the score — no separate static branch to keep in
 * sync.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useTechScoreReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(TECH_SCORE_SELECTORS.card, {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: scope, start: "top 82%", once: true },
        });

        const stats = gsap.utils.toArray<HTMLElement>(TECH_SCORE_SELECTORS.stat);
        if (stats.length > 0) {
          gsap.from(stats, {
            autoAlpha: 0,
            y: STAT_OFFSET_Y,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.07,
            delay: 0.15,
            scrollTrigger: { trigger: scope, start: "top 82%", once: true },
          });
        }

        const arc = scope.querySelector<SVGCircleElement>(TECH_SCORE_SELECTORS.arc);
        const number = scope.querySelector<HTMLElement>(TECH_SCORE_SELECTORS.number);
        if (!arc || !number) return;

        // The rest length is read off the element rather than recomputed here, so the
        // ring's geometry stays owned by the component that draws it.
        const rest = Number(arc.getAttribute("stroke-dashoffset"));
        const length = Number(arc.getAttribute("stroke-dasharray"));
        const counter = { value: 0 };

        gsap.to(counter, {
          value: techScoreDial.value,
          duration: 1.6,
          ease: "power2.out",
          delay: 0.2,
          onUpdate: () => {
            number.textContent = String(Math.round(counter.value));
            arc.style.strokeDashoffset = String(
              length - (length - rest) * (counter.value / techScoreDial.value),
            );
          },
          onComplete: () => {
            // Hand the arc back to the attribute the component set, so nothing inline
            // is left to contradict it.
            number.textContent = String(techScoreDial.value);
            arc.style.removeProperty("stroke-dashoffset");
          },
          scrollTrigger: { trigger: scope, start: "top 82%", once: true },
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
