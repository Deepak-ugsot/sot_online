"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { gsap, ScrollSmoother } from "@/lib/gsap";

/**
 * Seconds the content takes to catch up with the real scroll position. Higher is
 * floatier; past about 2 the page starts to feel disconnected from the wheel.
 */
const SMOOTH_SECONDS = 1.2;

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Wraps the page in GSAP's ScrollSmoother, which eases the content toward the real
 * scroll position instead of snapping to it.
 *
 * **Fixed elements must stay outside this component.** The content is driven by a
 * `transform`, and a transformed ancestor makes `position: fixed` resolve against
 * *it* rather than the viewport — so the site header would scroll away with the page.
 * That is why `SiteHeader` is rendered as a sibling of this wrapper, not a child.
 *
 * Native scrolling is untouched: the document keeps its real height and the browser
 * keeps its real scroll position, so anchor links, `scroll-padding-top` and every
 * existing ScrollTrigger keep working. Only the content's offset is eased.
 *
 * Under `prefers-reduced-motion` no smoother is created at all and the two wrappers
 * are left as plain, unstyled divs — the page then scrolls exactly as it did before.
 * `smoothTouch` is deliberately left off for the same reason it is off by default:
 * easing a touch drag makes the page feel like it is lagging behind the finger.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper,
        content,
        smooth: SMOOTH_SECONDS,
        smoothTouch: false,
        // No `data-speed`/`data-lag` parallax on this page; leaving effects off keeps
        // ScrollSmoother from scanning the whole tree for those attributes.
        effects: false,
      });

      return () => smoother.kill();
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
