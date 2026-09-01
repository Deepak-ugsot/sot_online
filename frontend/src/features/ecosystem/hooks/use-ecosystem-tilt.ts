"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { ECOSYSTEM_SELECTORS } from "../constants/ecosystem.constants";

/** Maximum tilt away from flat, in degrees, at the very edge of a card. */
const MAX_TILT = 14;
const HOVER_SCALE = 1.12;
/** Pixels the hovered card rises. Negative is up. */
const HOVER_LIFT = -14;
const EASE = { duration: 0.4, ease: "power2.out" } as const;

/**
 * Tilts a collage card toward the cursor while it is hovered.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useEcosystemTilt(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // `(hover: hover)` matters: on touch, `pointermove` fires on tap and would
      // leave a card frozen mid-tilt with no `pointerleave` to reset it.
      matchMedia.add(
        "(hover: hover) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            ECOSYSTEM_SELECTORS.card,
          );
          const teardowns: Array<() => void> = [];

          cards.forEach((card) => {
            // The resting angle the card must return to, read from the custom
            // properties rather than the matrix so it survives GSAP taking the
            // transform over: `--rotate` times `--fan`, exactly as the stylesheet
            // composes them.
            //
            // Read again on every enter rather than cached once, because `--fan`
            // damps the whole collage on narrow viewports. A hover-capable pointer
            // at that width — a desktop window dragged narrow — would otherwise
            // return the card to whichever angle happened to apply at mount.
            const restingAngle = () => {
              const style = getComputedStyle(card);
              const angle = Number.parseFloat(
                style.getPropertyValue("--rotate"),
              );
              const fan = Number.parseFloat(style.getPropertyValue("--fan"));

              return (
                (Number.isNaN(angle) ? 0 : angle) * (Number.isNaN(fan) ? 1 : fan)
              );
            };

            let base = restingAngle();

            // Hand the angle to GSAP as a tracked rotation before anything animates,
            // so its first write composes with the fan instead of erasing it.
            gsap.set(card, { rotation: base });

            // `scaleX`/`scaleY`, not `scale`: GSAP routes the `scale` alias through
            // the standalone native CSS property, which does not compose with the
            // transform matrix these cards already carry — it silently fails.
            const rotateX = gsap.quickTo(card, "rotationX", EASE);
            const rotateY = gsap.quickTo(card, "rotationY", EASE);
            const rotate = gsap.quickTo(card, "rotation", EASE);
            const scaleX = gsap.quickTo(card, "scaleX", EASE);
            const scaleY = gsap.quickTo(card, "scaleY", EASE);
            const lift = gsap.quickTo(card, "y", EASE);

            // Raised so the hovered card clears the two it overlaps.
            const onEnter = () => {
              base = restingAngle();
              card.style.zIndex = "10";
            };

            const onMove = (event: PointerEvent) => {
              const rect = card.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width - 0.5;
              const y = (event.clientY - rect.top) / rect.height - 0.5;

              rotateX(-y * MAX_TILT);
              rotateY(x * MAX_TILT);
              // A little extra spin on top of the fan angle, not instead of it.
              rotate(base + x * MAX_TILT * 0.3);
              scaleX(HOVER_SCALE);
              scaleY(HOVER_SCALE);
              lift(HOVER_LIFT);
            };

            const onLeave = () => {
              rotateX(0);
              rotateY(0);
              // Back to this card's own fan angle — not to 0, which would flatten
              // the collage one card at a time as the cursor crossed it.
              rotate(base);
              scaleX(1);
              scaleY(1);
              lift(0);
              card.style.zIndex = "";
            };

            card.addEventListener("pointerenter", onEnter);
            card.addEventListener("pointermove", onMove);
            card.addEventListener("pointerleave", onLeave);

            teardowns.push(() => {
              card.removeEventListener("pointerenter", onEnter);
              card.removeEventListener("pointermove", onMove);
              card.removeEventListener("pointerleave", onLeave);
            });
          });

          return () => {
            teardowns.forEach((teardown) => teardown());
            // Hands the transform back to the stylesheet, which still holds the fan
            // angle, so the cards keep their angles after a revert.
            gsap.set(cards, { clearProps: "transform,zIndex" });
          };
        },
      );

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
