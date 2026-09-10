"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { COMPETE_SELECTORS } from "../constants/compete.constants";

/**
 * Reveals the pitch, then each highlight as the scroll actually reaches it.
 *
 * Fires once per element and does not reverse — this is an entrance, not a
 * scroll-linked effect, so scrolling back up leaves the block where it is.
 *
 * **One trigger per highlight, off the highlight itself.** A single trigger on the
 * section cannot work here: the section is ~706px tall in a 720px viewport, so by the
 * time its top crosses any sensible start line only the first ~130px is on screen and
 * all four items are still below the fold. They then finish animating before the
 * reader ever sees them, and the section reads as static. Per item, each one moves at
 * the moment it arrives — the four sit ~110-135px apart vertically, so the cascade
 * comes out of the scroll itself rather than a fixed `stagger`.
 *
 * That also fixes the order for free. In DOM order the two preparation items come
 * first, but on screen they sit *below* the platforms column (which starts level with
 * the heading, 15.3rem higher). Triggering off position walks them top to bottom —
 * platforms, guidance, preparation, practice — at every breakpoint, including the
 * phone, where the columns collapse and DOM order becomes visual order anyway.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in
 * its final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via
 *   `gsap.context`, so the hook can never reach outside its own feature.
 */
export function useCompeteReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        // `75%` rather than something earlier: the heading sits ~96px below the
        // section's top edge, so a higher start line fires it while it is still off
        // the bottom of the screen.
        gsap.from(COMPETE_SELECTORS.introItem, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: scope, start: "top 75%", once: true },
        });

        gsap.utils.toArray<HTMLElement>(COMPETE_SELECTORS.item, scope).forEach((item) => {
          gsap
            .timeline({
              scrollTrigger: { trigger: item, start: "top 88%", once: true },
            })
            // The icon leads and overshoots a little. It is the only colour in the
            // row — the section's red is carried entirely by these four drawings — so
            // it is what the eye lands on, and a flat fade spends it for nothing.
            .from(item.querySelector(COMPETE_SELECTORS.itemIcon), {
              opacity: 0,
              scale: 0.8,
              duration: 0.5,
              ease: "back.out(1.6)",
            })
            // Overlapped rather than sequential: the title should be legible while the
            // icon is still settling, or the row reads as two separate events.
            .from(
              item.querySelector(COMPETE_SELECTORS.itemCopy),
              { opacity: 0, y: 20, duration: 0.55, ease: "power3.out" },
              "-=0.34",
            );
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
