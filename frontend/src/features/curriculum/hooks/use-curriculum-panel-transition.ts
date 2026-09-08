"use client";

import { useCallback, useLayoutEffect, useRef, type RefObject } from "react";

import { gsap } from "@/lib/gsap";

/** Long enough to read as a morph, short enough not to delay the next click. */
const HEIGHT_DURATION = 0.45;
const CONTENT_DURATION = 0.4;

/**
 * Smooth open/close for the semester panel.
 *
 * **The panel is one element that is remounted per semester, not four that show and
 * hide** (see `CurriculumSection` for why — four would put every project card and its
 * artwork in the markup four times over). So there is no outgoing element left to
 * collapse: React swaps the content in a single frame and, without this, the card
 * simply jumps to its new height.
 *
 * What this does instead is morph the one panel: the outgoing height is captured on
 * click, the incoming height is measured after the swap, and the panel is tweened
 * between the two while its content fades up. Growing and shrinking are therefore the
 * same code path — a shorter semester reads as a close, a taller one as an open.
 *
 * **The outgoing height has to be read in the click handler, not in the effect.** An
 * effect only reruns when the open semester changes, so a height cached there goes
 * stale the moment the viewer resizes the window or rotates the phone — and the next
 * switch would then morph from a height the panel never had. `onSelect` runs
 * immediately before the state change, when the panel on screen is still the old one.
 *
 * @param panelRef - The open semester's panel element.
 * @param openIndex - Index of the open semester. Drives the effect.
 * @returns `onSelect`, which must be used in place of the raw state setter.
 */
export function useCurriculumPanelTransition(
  panelRef: RefObject<HTMLElement | null>,
  openIndex: number,
  setOpenIndex: (index: number) => void,
) {
  /** Height of the panel being replaced. `null` means "nothing to morph from". */
  const outgoingHeight = useRef<number | null>(null);

  const onSelect = useCallback(
    (index: number) => {
      outgoingHeight.current = panelRef.current?.offsetHeight ?? null;
      setOpenIndex(index);
    },
    [panelRef, setOpenIndex],
  );

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const from = outgoingHeight.current;

    // Consumed either way: a height that is not animated now must not be reused by a
    // later switch, or a resize in between would make it wrong.
    outgoingHeight.current = null;

    // `from === null` is the first paint, where there is no previous panel and the
    // section's own entrance is already animating this element.
    if (!panel || from === null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const to = panel.offsetHeight;

    const timeline = gsap.timeline();

    timeline.fromTo(
      panel,
      // `overflow: hidden` for the duration only. While the panel is shorter than its
      // content the overflow would otherwise print straight through the header below
      // it — and the card's own clipping is no help, since the spill is in the middle
      // of the card, not past its edge.
      { height: from, overflow: "hidden" },
      {
        height: to,
        duration: HEIGHT_DURATION,
        ease: "power3.out",
        // Both are tween-owned inline styles; left behind, the height would pin the
        // panel at whatever the content measured on this click and stop it responding
        // to a resize.
        clearProps: "height,overflow",
      },
    );

    // Staggered by block — project rail, then skills, then modules — so the new
    // semester reads as arriving rather than cutting in. Offset slightly into the
    // height tween: starting both on frame one makes the fade compete with the morph.
    timeline.fromTo(
      panel.children,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: CONTENT_DURATION,
        ease: "power2.out",
        stagger: 0.06,
        clearProps: "opacity,transform",
      },
      0.08,
    );

    // A click landing mid-tween reruns this effect, so the tween has to be killable.
    // `kill()` skips `clearProps`, and the element it leaves half-styled is the one being
    // unmounted — but it is cleared anyway, so that this stays correct if the panel is
    // ever reconciled in place rather than remounted.
    return () => {
      timeline.kill();
      gsap.set(panel, { clearProps: "height,overflow" });
      gsap.set(panel.children, { clearProps: "opacity,transform" });
    };
  }, [openIndex, panelRef]);

  return onSelect;
}
