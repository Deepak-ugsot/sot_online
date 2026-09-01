"use client";

import { useEffect, useState, type RefObject } from "react";

import { ArrowIcon } from "@/components/ui/arrow-icon";
import { cn } from "@/lib/utils";

type RailScrollArrowProps = {
  /** The horizontal scroll container this control drives. */
  viewportRef: RefObject<HTMLElement | null>;
  /**
   * Placement against the rail's positioned ancestor. Each rail centres the arrow on
   * a different thing — the gallery on its media panel, which is only part of a card;
   * the readiness row on the whole card — so the caller owns the position and this
   * component owns the behaviour.
   */
  className?: string;
};

/**
 * The arrow that sits on the right edge of a hand-swiped card rail: the sign that
 * there is more to the right, and the control that goes there.
 *
 * **It exists because a peeking card is not enough on its own.** Every rail on the
 * site leaves a slice of the next card showing at the edge, which reads as "there is
 * more" only once you already know the row scrolls. On a phone, where nothing hovers
 * and no scrollbar shows, the arrow is the only thing that says so outright.
 *
 * A real `<button>` rather than a decorative glyph. It costs nothing over an inert
 * icon, and an arrow that looks pressable and is not is worse than no arrow: it makes
 * a phone user tap an area that does nothing.
 *
 * **Whether it shows is measured, not restated.** The two rails that use this hide
 * their overflow at different breakpoints (`1024px` for the gallery, `901px` for
 * readiness) and both fall back to scrolling at every width under reduced motion.
 * Asking the element for its computed `overflow-x` gets all of that right without
 * this file knowing any of it.
 */
export function RailScrollArrow({ viewportRef, className }: RailScrollArrowProps) {
  /**
   * Starts hidden, which is the correct first render on both sides: the answer
   * depends on measuring the element, which the server cannot do. The effect settles
   * it at hydration, long before any of these sections is scrolled to.
   */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const update = () => {
      // Above its breakpoint the rail is `overflow-hidden` and panned by the pinned
      // page scroll, so there is nothing here for `scrollTo` to move.
      const scrollable = getComputedStyle(viewport).overflowX !== "hidden";

      // A snapped scroll routinely lands a fraction of a pixel short of the true end,
      // so an exact comparison would leave the arrow up on the last card forever.
      const atEnd =
        viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 2;

      setVisible(scrollable && !atEnd);
    };

    update();
    viewport.addEventListener("scroll", update, { passive: true });

    // A resize changes the card width and so the end position, and crossing the
    // breakpoint changes whether the rail scrolls at all — both need re-measuring.
    const observer = new ResizeObserver(update);
    observer.observe(viewport);

    // Toggling reduced motion changes the answer without changing any size, so a
    // resize alone would not catch it.
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    motion.addEventListener("change", update);

    return () => {
      viewport.removeEventListener("scroll", update);
      observer.disconnect();
      motion.removeEventListener("change", update);
    };
  }, [viewportRef]);

  /**
   * Advances to the next card's own snap position.
   *
   * Measured from bounding rects rather than `offsetLeft`, and against the rail's
   * `scroll-padding-left` rather than a card width. Both matter: `offsetLeft` is
   * relative to whichever ancestor happens to be positioned, which differs between
   * the two rails, and a rail with scroll padding snaps its cards to that inset — so
   * scrolling by a card's width would leave every card short by the padding, and the
   * error would compound across the row.
   */
  const advance = () => {
    const viewport = viewportRef.current;
    const track = viewport?.firstElementChild;
    if (!viewport || !track) return;

    const left = viewport.getBoundingClientRect().left;
    const pad = parseFloat(getComputedStyle(viewport).scrollPaddingLeft) || 0;
    // 1px of slack so a card already sitting on the snap line is not picked as the
    // next one, which would scroll by nothing.
    const target = Array.from(track.children).find(
      (card) => card.getBoundingClientRect().left > left + pad + 1,
    );
    if (!target) return;

    viewport.scrollBy({
      left: target.getBoundingClientRect().left - left - pad,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={advance}
      // Hidden from assistive tech, not from sight. Each rail is already a labelled,
      // keyboard-scrollable region, so this button is a pointer shortcut to something
      // a screen reader user can do more directly — announcing it would only add a
      // control that repeats the arrow keys.
      aria-hidden="true"
      tabIndex={-1}
      className={cn(
        "absolute z-10 flex h-11 w-11 items-center justify-center rounded-full",
        // The ring is not decoration. These rails run the arrow over photographs the
        // component knows nothing about — the readiness row alone goes from a bright
        // office to a near-black screen — and on the dark ones a near-black disc has
        // no edge of its own. The white glyph still reads; the disc stops existing.
        "bg-ink/85 text-white ring-1 ring-white/25 backdrop-blur-sm",
        "shadow-[0_6px_20px_-6px_rgba(10,10,11,0.55)]",
        "transition-opacity duration-300 ease-cinematic",
        // `pointer-events-none` travels with the fade: a control that is invisible but
        // still takes taps is worse than one that is simply gone.
        visible ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
    >
      <ArrowIcon
        direction="right"
        className="h-[18px] w-[18px] animate-nudge-right motion-reduce:animate-none"
      />
    </button>
  );
}
