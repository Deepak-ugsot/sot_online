"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FACULTY_SELECTORS } from "../constants/faculty.constants";

/**
 * Reveals the heading and subtitle, then the card row, as the section scrolls in — and
 * sends the row back to its first card every time a reader arrives at it.
 *
 * The reveal fires once and does not reverse — an entrance, not a scroll-linked effect.
 *
 * **The row always starts at Vishwa Mohan.** The marquee is a CSS animation that runs
 * from page load, so without this a reader would arrive at whatever card the loop had
 * drifted to by then. Its clock is wound back to zero as the row fades in, and again
 * whenever it scrolls back into view from either direction — at the viewport's edge, so
 * the jump happens off-screen. See `restartMarquee` for why it seeks rather than
 * restarting the animation.
 *
 * **It animates the rail's wrapper, never the tracks.** The tracks' `transform` belongs
 * to the marquee's CSS animation, and a tween on the same property would fight it for
 * the whole of the entrance — the row would stall and then jump. On the wrapper the two
 * compose instead: the row drifts while the whole of it rises into place.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in its
 * final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useFacultyReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        /*
          Winds every copy of the row back to its first frame — the first track's first
          card, Vishwa Mohan, at the window's start. All copies in the same tick, so they
          stay in the lockstep the loop depends on.

          A seek (`currentTime = 0`), deliberately not `play()` / `pause()`: calling either
          on a CSS animation pins its play state for good, and the row would stop pausing
          under the pointer. Seeking leaves the stylesheet in charge of that.
        */
        const restartMarquee = () => {
          for (const track of gsap.utils.toArray<HTMLElement>(FACULTY_SELECTORS.track)) {
            for (const animation of track.getAnimations?.() ?? []) {
              animation.currentTime = 0;
            }
          }
        };

        // Every arrival: scrolling down onto the row, or back up onto it from below.
        ScrollTrigger.create({
          trigger: FACULTY_SELECTORS.rail,
          start: "top bottom",
          end: "bottom top",
          onEnter: restartMarquee,
          onEnterBack: restartMarquee,
        });

        gsap.from(FACULTY_SELECTORS.intro, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        // On its own trigger: on a phone the row sits well below the heading, and tying
        // it to the section top would have it play out before it is in view.
        gsap.from(FACULTY_SELECTORS.rail, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          // The first arrival: the row starts moving from its first card as it fades
          // in, rather than from wherever it drifted while hidden below the trigger.
          onStart: restartMarquee,
          scrollTrigger: {
            trigger: FACULTY_SELECTORS.rail,
            start: "top 88%",
            once: true,
          },
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
