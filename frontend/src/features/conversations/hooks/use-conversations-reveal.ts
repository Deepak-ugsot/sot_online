"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { CONVERSATIONS_SELECTORS } from "../constants/conversations.constants";

/**
 * Reveals the copy (heading, portrait, quote) and the video column as two beats, rising
 * in on their own trigger. Fires once and does not reverse — an entrance, not a
 * scroll-linked effect. Mirrors `useHackathonsReveal`.
 *
 * Nothing is registered under `prefers-reduced-motion`, so every element renders in its
 * final position with no `from` state to sit in.
 *
 * @param scopeRef - The section element. Selectors are scoped to it via `gsap.context`,
 *   so the hook can never reach outside its own feature.
 */
export function useConversationsReveal(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(CONVERSATIONS_SELECTORS.beat, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          // The portrait wrapper is one of these `beat` targets, and from `lg` it needs
          // to end the animation with no inline `transform` at all: a `translate(0, 0)`
          // left behind is visually identical to none, but — like `position` — it still
          // establishes a containing block for absolutely positioned descendants, which
          // is exactly what the quote card is once it needs to reach past this box (see
          // `ConversationsSection`). Left uncleared, the card stays pinned to this
          // element's own box no matter what `position` rule tries to hand it to `copy`
          // instead.
          clearProps: "transform",
          scrollTrigger: {
            trigger: CONVERSATIONS_SELECTORS.copy,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(CONVERSATIONS_SELECTORS.media, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: CONVERSATIONS_SELECTORS.media,
            start: "top 82%",
            once: true,
          },
        });
      });

      return () => matchMedia.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
