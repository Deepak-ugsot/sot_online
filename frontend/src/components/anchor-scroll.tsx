"use client";

import { useEffect } from "react";

import { ScrollSmoother } from "@/lib/gsap";

/**
 * Makes in-page `#hash` links scroll to their section.
 *
 * **Why this is needed at all.** ScrollSmoother puts `#smooth-wrapper` in
 * `position: fixed; overflow: hidden` and drives the content with a transform, so the
 * browser's own anchor jump has nothing to scroll: it scrolls the fixed wrapper
 * instead of the window, leaves the real scroll position at 0, and the page ends up
 * showing a slice of a section with every ScrollTrigger still reporting the top of the
 * document. Clicking "Curriculum" landed on a blank white band, not the curriculum.
 *
 * So the click is intercepted and the scroll driven through the smoother, which knows
 * where a section really starts.
 *
 * **Why `smoother.offset` rather than `getBoundingClientRect`.** Half the sections on
 * this page are pinned, so an element's position in the document is not its position
 * in the scroll — and the content's transform lags the real scroll position by up to
 * `SMOOTH_SECONDS`, which makes a rect measured mid-ease wrong by however far the
 * smoother still has to travel. `offset()` measures with a throwaway ScrollTrigger,
 * which accounts for both.
 *
 * Mounted once by the landing page. Delegated from `document`, so it covers the header
 * (which renders *outside* `SmoothScroll`), the footer, and every in-section CTA
 * without any of them knowing it exists.
 */
export function AnchorScroll() {
  useEffect(() => {
    /**
     * The gap a target needs to clear the fixed header, read from `scroll-padding-top`
     * on `<html>` so the offset keeps a single definition — the one the browser
     * already uses for the jumps this component does not intercept.
     */
    const headerOffset = () =>
      Number.parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
      ) || 0;

    /**
     * Scrolls to the element a hash names.
     *
     * @returns `false` when the hash names nothing — `#apply` and the placeholder
     *   `#` on the social links both land here, and both are left to the browser
     *   rather than swallowed.
     */
    const scrollToHash = (hash: string) => {
      const id = decodeURIComponent(hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return false;

      const smoother = ScrollSmoother.get();

      if (smoother) {
        // Numeric target: `scrollTo` clamps it to the scrollable range, so a section
        // within `headerOffset()` of the top settles at 0 rather than going negative.
        // `false` skips its own tween — the smoother eases the content there anyway,
        // and animating the scroll position on top of that would scrub every pinned
        // section between here and there on the way past.
        smoother.scrollTo(
          smoother.offset(target, "top top") - headerOffset(),
          false,
        );
      } else {
        // No smoother: narrow viewports and reduced motion, where the page scrolls
        // natively and the element's own rect is the truth.
        window.scrollTo({
          top: Math.max(
            0,
            target.getBoundingClientRect().top + window.scrollY - headerOffset(),
          ),
        });
      }

      return true;
    };

    const onClick = (event: MouseEvent) => {
      // Left button, unmodified: a middle-click or ⌘-click is asking for a new tab.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") return;

      // Same document only. `anchor.pathname` is resolved, so this accepts the bare
      // `#curriculum` the landing page uses and rejects the `/#curriculum` the
      // signed-in header carries — that one is a real navigation, and the hash it
      // arrives with is handled on mount below.
      if (
        anchor.origin !== window.location.origin ||
        anchor.pathname !== window.location.pathname
      ) {
        return;
      }

      if (!scrollToHash(anchor.hash)) return;

      event.preventDefault();

      // The jump is ours now, so the URL has to be updated by hand. Pushed rather than
      // replaced so Back returns to the section the reader came from.
      if (anchor.hash !== window.location.hash) {
        window.history.pushState(null, "", anchor.hash);
      }
    };

    /** Back/forward between the entries pushed above. */
    const onPopState = () => {
      scrollToHash(window.location.hash);
    };

    /*
      Arriving *with* a hash — `/#curriculum` from the signed-in header. The browser
      made its own jump before the smoother existed, which is exactly the broken case
      described above, so it is redone here. One frame's delay: `SmoothScroll` creates
      the smoother in a layout effect, and the sections register their pins in theirs,
      so by the next frame there is something to measure against.
    */
    const frame = requestAnimationFrame(() => {
      scrollToHash(window.location.hash);
    });

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}
