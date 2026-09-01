"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { OPPORTUNITIES_SELECTORS } from "../constants/opportunities.constants";
import { getArcTransform } from "../utils/arc-layout";

/**
 * Same hold-buffer pattern as the other pinned sections: the arc finishes rotating at
 * `CONTENT_END` of the pin's range, leaving a tail where nothing happens so a fast
 * flick cannot unpin the section mid-turn.
 */
const CONTENT_END = 0.85;

/** Scroll runway for the pin, as a multiple of viewport height. */
const RUNWAY = 2.2;

/**
 * The card the arc rests on before any scrolling.
 *
 * `1`, not `0`. Centring the first card put every other card on one side of it — the
 * left half of the stage sat empty while five cards bunched into the right, which read
 * as a section already scrolled rather than one waiting to be. Resting on the second
 * card opens with a balanced trio: the first to its left, the third to its right.
 *
 * The scroll range starts here too, so the opening frame is a real position on the
 * cylinder rather than a pose the first scroll snaps away from. The trade is that the
 * first card is never the one facing the viewer — at one position out it is still at
 * 90% scale and fully readable, which is the whole point of resting between cards.
 */
const START_CENTER_INDEX = 1;

/**
 * Pins the section and rotates the card cylinder as you scroll.
 *
 * Scroll drives a **floating** centre index from the first card to the last. Because
 * it is fractional rather than stepped, cards glide continuously around the cylinder
 * instead of snapping between slots — the geometry itself is in `getArcTransform`.
 *
 * Under reduced motion nothing is registered at all: no pin, no timeline, and — just
 * as importantly — no inline transforms. The markup's own CSS fallback then lays the
 * cards out as a plain horizontal scroller, which only works because nothing has
 * positioned them absolutely on a cylinder.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useOpportunitiesCarousel(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const stage = scope.querySelector<HTMLElement>(OPPORTUNITIES_SELECTORS.stage);
      if (!stage) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(OPPORTUNITIES_SELECTORS.card);
        if (cards.length === 0) return;

        const lastIndex = cards.length - 1;

        const renderArc = (centerIndex: number) => {
          cards.forEach((card, index) => {
            gsap.set(card, getArcTransform(index - centerIndex));
          });
        };

        // Lay the arc out immediately so the section is correct before any scrolling.
        renderArc(START_CENTER_INDEX);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: () => "+=" + (window.innerHeight * RUNWAY) / CONTENT_END,
            scrub: 0.2,
            pin: stage,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // The arc is driven from `onUpdate` rather than from tweened properties:
            // every card's position derives from one shared scalar, and recomputing
            // them together is both simpler and cheaper than six parallel tweens.
            onUpdate: (self) => {
              const contentProgress = Math.min(1, self.progress / CONTENT_END);
              renderArc(
                START_CENTER_INDEX +
                  contentProgress * (lastIndex - START_CENTER_INDEX),
              );
            },
          },
        });

        // The timeline animates nothing itself — it exists to give ScrollTrigger
        // something to scrub, and to hold the pin open for the full runway.
        timeline.to({}, { duration: 1 });

        return () => {
          gsap.set(cards, { clearProps: "all" });
        };
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
