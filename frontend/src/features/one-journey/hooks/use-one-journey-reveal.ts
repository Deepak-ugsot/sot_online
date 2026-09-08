"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  ONE_JOURNEY_SELECTORS,
  oneJourneyCards,
} from "../constants/one-journey.constants";

/**
 * Narrowest viewport that pins.
 *
 * Matches the `lg:` placement on the cards, so the scroll-linked deal exists exactly
 * where the scatter it deals into does. A stage one viewport tall also cannot hold a
 * two-line heading, four full-width cards and the footer on a phone.
 */
const PIN_MIN_WIDTH = 1024;

/** Scroll runway for the pin, as a multiple of viewport height. */
const RUNWAY = 2.4;

/**
 * Fraction of the timeline one card takes to land.
 *
 * Four cards at 0.34 each, started 0.22 apart, finish at 0.88 — the tail is a
 * deliberate hold on the completed scatter so it is not snatched away the instant the
 * last card arrives.
 */
const CARD_DURATION = 0.34;
const CARD_STAGGER = 0.22;

/**
 * Deals the four cards into their scatter, scroll-linked, while the section is pinned.
 *
 * Each card starts fully below the deck, unturned and invisible, and rises into its
 * own resting place — offset, overlapped and rotated to the angle in its data. They
 * arrive one at a time because their tweens are staggered along the timeline, and the
 * timeline is `scrub`bed to the pin's scroll range, so progress is the reader's scroll
 * position rather than elapsed time. Scrolling back rewinds it.
 *
 * The settle is on the *angle*, not the position: the card rises with `power3.out`,
 * which never travels past its target, while its rotation springs a little past on
 * `back.out(2.2)` and locks. That keeps the "stick" without letting a card overshoot
 * out of the deck's clipped box — see the tweens for why that mattered.
 *
 * **The stage is pinned, not the individual cards.** GSAP's pin sets `position:
 * fixed`, and inside `#smooth-content` a `fixed` element resolves against the
 * smoother's transformed wrapper rather than the viewport — the trap documented on
 * `SmoothScroll`, and why the site header lives outside it. Pinning one full-height
 * stage with `pinSpacing: true` is what the hero and approach sections do, and it is
 * the pattern that works on this page.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useOneJourneyReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const stage = scope.querySelector<HTMLElement>(ONE_JOURNEY_SELECTORS.stage);
      const deck = scope.querySelector<HTMLElement>(ONE_JOURNEY_SELECTORS.deck);
      if (!stage || !deck) return;

      const matchMedia = gsap.matchMedia();

      // Under reduced motion nothing is registered and nothing is hidden, so the deck
      // renders in its final scatter. Deliberately no `gsap.set` outside these blocks
      // — hiding the cards unconditionally would leave them invisible for
      // reduced-motion users, with no timeline to bring them back.
      matchMedia.add(
        {
          isPinned: `(min-width: ${PIN_MIN_WIDTH}px) and (prefers-reduced-motion: no-preference)`,
          isFlowing: `(max-width: ${PIN_MIN_WIDTH - 1}px) and (prefers-reduced-motion: no-preference)`,
        },
        (mmContext) => {
          const { isPinned } = mmContext.conditions as {
            isPinned: boolean;
            isFlowing: boolean;
          };

          const cards = gsap.utils.toArray<HTMLElement>(ONE_JOURNEY_SELECTORS.card);
          if (cards.length === 0) return;

          // --- Below the pin ----------------------------------------------------
          // A plain column, so each card simply rises as it reaches the lower third
          // of the screen. Still one at a time, still scroll-driven, but with no pin
          // and no scatter to deal into.
          if (!isPinned) {
            cards.forEach((card) => {
              gsap.from(card, {
                autoAlpha: 0,
                y: 44,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 88%", once: true },
              });
            });

            return () => {
              gsap.set(cards, { clearProps: "opacity,visibility,transform" });
            };
          }

          // --- Pinned: the scroll-linked deal -----------------------------------
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scope,
              start: "top top",
              end: () => "+=" + window.innerHeight * RUNWAY,
              scrub: 0.4,
              pin: stage,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, index) => {
            const angle = oneJourneyCards[index]?.angle ?? 0;

            const at = index * CARD_STAGGER;

            /*
              **The rise and the turn are two tweens, and the split is the whole
              point.** A single `back.out` on everything overshoots the card *past* its
              resting place — which for the first card, sitting near the deck's top
              edge, means overshooting straight out of the `overflow-hidden` box and
              being visibly shaved off as it lands.

              So the rise gets `power3.out`, which decelerates hard but never travels
              past its target, and the overshoot lives on the rotation instead: the
              card slides cleanly into place while its angle springs a degree or two
              past and settles. That still reads as a card *sticking* rather than
              gliding to a halt, and nothing ever leaves the deck.
            */
            timeline.fromTo(
              card,
              {
                // Below the deck's own bottom edge, which `overflow-hidden` clips —
                // so the card is genuinely off-stage rather than merely transparent.
                // Measured in a function so `invalidateOnRefresh` re-reads it after a
                // resize rather than baking in a number from an unsettled layout.
                y: () => deck.clientHeight - card.offsetTop + 48,
                autoAlpha: 0,
              },
              {
                y: 0,
                autoAlpha: 1,
                duration: CARD_DURATION,
                ease: "power3.out",
              },
              at,
            );

            timeline.fromTo(
              card,
              { rotation: 0 },
              {
                rotation: angle,
                duration: CARD_DURATION,
                ease: "back.out(2.2)",
              },
              at,
            );
          });

          // The cards are measured before the webfont swaps, which reflows every one
          // of them and changes how far each has to travel. Without this the tweens
          // keep the distances they were born with and the deal starts mid-air.
          void document.fonts?.ready.then(() => ScrollTrigger.refresh());
        },
      );

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
