"use client";

import { useEffect, useState, type RefObject } from "react";

import { HERO_SELECTOR } from "../constants/header.constants";

/**
 * Tracks whether the fixed header has scrolled clear of the hero.
 *
 * The header is white-on-transparent, which only works over the hero's dark video —
 * every section below it is light. So it needs its own backdrop from the moment the
 * hero's bottom edge passes under it.
 *
 * Measured against the hero's live bounding box rather than a fixed scroll offset,
 * because the hero's height is not knowable up front: GSAP pins it and inserts a
 * spacer whose size depends on the viewport. The `<section>` wrapping that spacer
 * reports the true end of the hero at any moment, pinned or not.
 *
 * Reads are rAF-throttled, so a burst of scroll events costs at most one layout
 * measurement per frame.
 *
 * @param headerRef - The header element, used for its own rendered height.
 * @returns `true` once the header needs a background of its own.
 */
export function useHeaderBackdrop(headerRef: RefObject<HTMLElement | null>) {
  const [hasBackdrop, setHasBackdrop] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(HERO_SELECTOR);
    let frame = 0;

    const measure = () => {
      frame = 0;
      // No hero on the page — the header can never be over a dark backdrop, so it
      // always carries its own.
      if (!hero) {
        setHasBackdrop(true);
        return;
      }
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      setHasBackdrop(hero.getBoundingClientRect().bottom <= headerHeight);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headerRef]);

  return hasBackdrop;
}
