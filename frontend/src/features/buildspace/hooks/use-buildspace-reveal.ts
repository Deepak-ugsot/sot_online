"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { BUILDSPACE_SELECTORS } from "../constants/buildspace.constants";

/**
 * The section's entrance: the red corner glow blooms open from the top right, the heading,
 * subtitle and CTA rise in turn, and the demo window arrives beside them.
 *
 * **No pin and no scrub, unlike the collage this replaced.** That version scrubbed a
 * fold-into-the-laptop sequence across a viewport-and-a-half of pinned scroll, because
 * static artwork needed the scroll to give it something to do. The window is already
 * playing a tour of its own on a clock — pinning the page over it would put two competing
 * motions on screen and hand the viewer's scroll to the one they are not watching.
 *
 * Everything here is a one-shot reveal, so nothing fights the demo for attention once the
 * section has arrived.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useBuildspaceReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        /*
          The corner glow fades up ahead of the copy, so the light is already in the room by
          the time anything is read.

          **Opacity only, and one-shot.** `clearProps` hands opacity back to the stylesheet
          when the tween lands, and the layer is a painted gradient that sits still from
          then on.

          **This is a GSAP tween rather than a CSS animation, and that distinction is
          load-bearing on this page.** A CSS animation runs on the compositor thread, while
          ScrollSmoother drives the whole page's content with a transform updated on the
          main thread; an earlier version of this glow drifted on CSS keyframes and the two
          threads disagreed about where the layer belonged, which tore the page apart as it
          scrolled. GSAP writes inline styles from a rAF tick — the same thread the smoother
          runs on — so the two can never fall out of step.

          Do not turn this into a loop.
        */
        gsap.from(BUILDSPACE_SELECTORS.glow, {
          opacity: 0,
          duration: 1.8,
          ease: "power2.out",
          clearProps: "opacity",
          scrollTrigger: { trigger: scope, start: "top 92%", once: true },
        });

        gsap.from(`${BUILDSPACE_SELECTORS.heading} > *`, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: scope, start: "top 85%", once: true },
        });

        // Later and gentler than the copy: the window is by far the largest thing in the
        // section, and the same 30px lift on that mass reads as a jolt rather than a rise.
        gsap.from(BUILDSPACE_SELECTORS.demo, {
          opacity: 0,
          y: 40,
          scale: 0.97,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: BUILDSPACE_SELECTORS.demo,
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
