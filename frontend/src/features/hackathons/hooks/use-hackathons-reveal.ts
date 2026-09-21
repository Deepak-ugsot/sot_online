"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { HACKATHONS_SELECTORS } from "../constants/hackathons.constants";

/**
 * Reveals the copy in three beats — headline, paragraph, cadence — with the prize plate
 * wiping in across the second line, and the figure rising alongside.
 *
 * Fires once and does not reverse — an entrance, not a scroll-linked effect.
 *
 * **The plate is revealed with `clip-path`, not `scaleX`.** Scaling it would squash the
 * "₹20 Lakhs" inside it on the way in; clipping uncovers the finished plate, text and
 * all, left to right — which reads as the figure being stamped on rather than stretched.
 * It rides on the headline's own rise, and the two never touch the same property.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in its
 * final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useHackathonsReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: HACKATHONS_SELECTORS.copy,
            start: "top 80%",
            once: true,
          },
        });

        timeline
          .from(HACKATHONS_SELECTORS.beat, {
            opacity: 0,
            y: 32,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          })
          .fromTo(
            HACKATHONS_SELECTORS.prize,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.75,
              ease: "power3.inOut",
              // Leaves no inline clip behind once it is fully open.
              clearProps: "clipPath",
            },
            0.2,
          );

        /*
          The figure rises rather than sliding in from the right: it is looking up and
          out of the frame, and a horizontal entrance reads as the whole cut-out being
          dragged on. On its own trigger, since on a phone it sits below all of the copy.
        */
        gsap.from(HACKATHONS_SELECTORS.artwork, {
          opacity: 0,
          y: 44,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: HACKATHONS_SELECTORS.artwork,
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
