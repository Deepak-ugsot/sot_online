"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import {
  BUILDSPACE_CONTENT_END,
  BUILDSPACE_LAPTOP_GROW,
  BUILDSPACE_MERGE,
  BUILDSPACE_PIN_VH,
  BUILDSPACE_SELECTORS,
} from "../constants/buildspace.constants";

/** Fraction of the pin's range, scaled into the content window. */
const at = (fraction: number) => fraction * BUILDSPACE_CONTENT_END;

/**
 * Entrance reveals, and — on desktop — the pinned sequence that folds the features
 * into the laptop.
 *
 * **Three behaviours, chosen by `gsap.matchMedia`:**
 *
 * | Condition                    | What happens                                  |
 * | ---------------------------- | --------------------------------------------- |
 * | ≥901px, motion allowed       | the full pinned, scroll-scrubbed sequence     |
 * | ≤900px, motion allowed       | the student simply fades in; no pin           |
 * | reduced motion               | everything present, nothing moves             |
 *
 * A pinned scrub does not translate to a short, narrow viewport, which is why the
 * middle case exists rather than just letting the desktop sequence run everywhere.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useBuildspaceReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Entrance reveals. Registered for anyone who allows motion, independently of
      // the pin — the cards and laptop are simply *there* by the time the pinned
      // sequence starts folding them away.
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(`${BUILDSPACE_SELECTORS.heading} > *`, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        const sceneTrigger = {
          trigger: BUILDSPACE_SELECTORS.scene,
          start: "top 85%",
          once: true,
        };

        // Two calls rather than one comma-joined selector: the small cards read well
        // with an overshoot, while the laptop at half the scene's width looks unsteady
        // with the same bounce.
        gsap.from(BUILDSPACE_SELECTORS.card, {
          opacity: 0,
          y: 20,
          scale: 0.85,
          duration: 0.5,
          ease: "back.out(1.6)",
          stagger: 0.08,
          scrollTrigger: sceneTrigger,
        });

        gsap.from(BUILDSPACE_SELECTORS.laptop, {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: sceneTrigger,
        });
      });

      matchMedia.add(
        {
          isPinned: "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
          isSimplified: "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
        },
        (self) => {
          const { isPinned } = self.conditions as { isPinned: boolean };
          const character = scope.querySelector<HTMLElement>(
            BUILDSPACE_SELECTORS.character,
          );
          if (!character) return;

          // Without the pin there is nothing for the student to emerge *from*, so they
          // just arrive with the rest of the scene.
          if (!isPinned) {
            gsap.from(character, {
              opacity: 0,
              y: 24,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: BUILDSPACE_SELECTORS.scene,
                start: "top 75%",
                once: true,
              },
            });
            return;
          }

          const stage = scope.querySelector<HTMLElement>(BUILDSPACE_SELECTORS.stage);
          const laptop = scope.querySelector<HTMLElement>(BUILDSPACE_SELECTORS.laptop);
          const cards = gsap.utils.toArray<HTMLElement>(BUILDSPACE_SELECTORS.card);
          if (!stage || !laptop || cards.length === 0) return;

          /**
           * How far a card has to travel to land on the laptop's centre.
           *
           * Measured from `offsetLeft`/`offsetTop`, not `getBoundingClientRect()`:
           * these are *layout* values, so they are immune to the entrance tween's
           * transform still sitting on the card when this runs. A rect would be read
           * mid-reveal and every distance would be off.
           *
           * No grow factor is applied. The laptop scales about its own centre and the
           * scene box never moves, so the target these distances aim at is the same
           * point at every point in the timeline.
           */
          const travel = (card: HTMLElement) => {
            const centre = (el: HTMLElement) => ({
              x: el.offsetLeft + el.offsetWidth / 2,
              y: el.offsetTop + el.offsetHeight / 2,
            });
            const target = centre(laptop);
            const from = centre(card);
            return { x: target.x - from.x, y: target.y - from.y };
          };

          gsap.set(laptop, { transformOrigin: "50% 50%" });
          // The student starts lower and smaller so their entrance reads as rising up
          // out of the laptop rather than a plain fade.
          gsap.set(character, {
            opacity: 0,
            y: 40,
            scale: 0.7,
            transformOrigin: "50% 100%",
          });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              // The *stage*, not the section. The heading is a sibling above it in
              // ordinary flow, so triggering off the section would start the pin while
              // the heading was still on screen and the stage still below the fold —
              // it would jump into place. Off the stage, the pin engages exactly when
              // the stage reaches the top, by which point the heading has scrolled past.
              trigger: stage,
              start: "top top",
              end: () => `+=${window.innerHeight * BUILDSPACE_PIN_VH}`,
              // Direct, unsmoothed scrub. The page already runs ScrollSmoother, so a
              // scrub lag on top of it detaches the cards from the wheel.
              scrub: true,
              pin: stage,
              pinSpacing: true,
              anticipatePin: 1,
              // Every distance below is measured, so they have to be re-measured when
              // the layout changes rather than baked in at first paint.
              invalidateOnRefresh: true,
            },
          });

          // 1. The laptop swells, gently, for most of the merge. Deliberately the only
          //    other thing that moves: the heading holds its place through the whole
          //    pin, and the scene box is never scaled or translated. That restraint is
          //    what keeps the eye on the cards.
          timeline.to(
            laptop,
            {
              scale: BUILDSPACE_LAPTOP_GROW,
              duration: at(0.7),
              ease: "power1.out",
            },
            at(0),
          );

          // 2. Every card folds into the laptop. The windows overlap heavily — each
          //    card runs for `DURATION` while consecutive cards are only `STAGGER`
          //    apart — so they are all in flight together, and `power2.in` back-loads
          //    each one. Together that is the hang-then-rush the reference has; a
          //    short duration or a flatter ease turns it into a plain fly-out.
          //
          //    `overwrite: false` is required. This timeline is built synchronously,
          //    while the card entrance tween above still exists and owns opacity/y/
          //    scale on these same elements — its ScrollTrigger simply has not fired
          //    yet. GSAP's default auto-overwrite would kill that tween's hold the
          //    instant these are created, and the cards would never reveal at all.
          //    Safe here because the entrance always finishes, in scroll position, well
          //    before this window opens.
          cards.forEach((card, index) => {
            timeline.to(
              card,
              {
                x: () => travel(card).x,
                y: () => travel(card).y,
                scale: BUILDSPACE_MERGE.SCALE,
                opacity: 0,
                duration: at(BUILDSPACE_MERGE.DURATION),
                ease: "power2.in",
                overwrite: false,
              },
              at(BUILDSPACE_MERGE.START + index * BUILDSPACE_MERGE.STAGGER),
            );
          });

          // 3. The student rises out of the laptop as the last features land.
          timeline.to(
            character,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: at(0.18),
              ease: "back.out(1.4)",
            },
            at(0.8),
          );

          // No-op tail — see the hero's matching note. Without it `scrub` re-compresses
          // an already-scaled timeline and cancels the hold buffer.
          timeline.to({}, { duration: 1 - BUILDSPACE_CONTENT_END });
        },
      );

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
