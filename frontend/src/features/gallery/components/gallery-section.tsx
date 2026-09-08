"use client";

import { useRef } from "react";

import { RailScrollArrow } from "@/components/ui/rail-scroll-arrow";
import {
  galleryCards,
  galleryHeading,
  gallerySubtitle,
} from "../constants/gallery.constants";
import { useGalleryCarousel } from "../hooks/use-gallery-carousel";
import { GalleryCard } from "./gallery-card";

/**
 * "Your 2-Year Engineering Journey" — a fixed intro column beside a card track that
 * advances one card per scroll step.
 *
 * Two behaviours, split at `lg`:
 *
 * - **`lg` and up** — the stage pins and the track is translated horizontally by
 *   scroll. See `useGalleryCarousel`.
 * - **Below `lg`, and under reduced motion at any width** — no JS at all. The track
 *   becomes a native horizontal scroll-snap container the user swipes through.
 *
 * The CSS fallback is the reason this degrades well: the cards remain reachable by
 * swipe, keyboard and screen reader even if the carousel never initialises.
 */
export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useGalleryCarousel(sectionRef);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-labelledby="gallery-heading"
      className="relative bg-[linear-gradient(135deg,#f7f8f9,#e9eaec)]"
    >
      <div
        data-gallery="stage"
        className={
          "relative flex h-auto w-full flex-col items-start justify-center gap-6 overflow-hidden px-6 py-14 sm:gap-10 sm:py-18 " +
          "lg:h-[100svh] lg:flex-row lg:items-center lg:gap-[clamp(1.5rem,5vw,4.5rem)] lg:px-[clamp(1.5rem,6vw,5rem)] lg:py-0"
        }
      >
        <div className="shrink-0 lg:basis-[clamp(13.75rem,30vw,23.75rem)]">
          <h2
            id="gallery-heading"
            className="type-heading text-[clamp(1.875rem,3.6vw,2.875rem)] text-ink"
          >
            {galleryHeading.lead}
            <br />
            <span className="font-accent font-medium text-brand">
              {galleryHeading.accent}
            </span>
          </h2>

          {/* The three "not someone who…" sentences. `max-w` rather than the column's
              full width: the intro column is already narrow at `lg`, and on a phone
              the line would otherwise run the full viewport. */}
          <p className="mt-4 mb-0 max-w-[26rem] text-[0.9375rem] leading-relaxed text-ink-muted sm:mt-5 lg:mb-7">
            {gallerySubtitle}
          </p>
        </div>

        {/*
          **Below `lg` this is a native horizontal scroll-snap rail** — the cards are
          swiped through sideways, one at a time, with no JS at all. At `lg` and up the
          carousel takes over: the same track becomes `overflow-hidden` and is panned by
          the pinned page scroll, and under reduced motion there it falls back to the
          same native rail. `tabIndex={0}` makes the rail keyboard-scrollable in both
          cases, since the cards themselves hold nothing focusable.
        */}
        {/*
          The wrapper carries the flex sizing so the arrow can be positioned against it.
          The arrow shows whenever the rail is a real horizontal scroll container, which
          is now below `lg` as well as `lg`+ under reduced motion.
        */}
        <div className="relative w-full lg:min-w-0 lg:flex-1">
          <div
            ref={viewportRef}
            data-gallery="viewport"
            role="group"
            aria-label="Programme stages"
            tabIndex={0}
            /*
              **The rail sits inside the stage's gutter, not bled out of it.** Bleeding
              it with `-mx-6 px-6` lets the last card reach the viewport edge, but
              scroll-snap aligns a card to the scrollport rather than to the padding
              box — so the first card landed 24px left of the heading above it and read
              as stuck to the screen edge. Kept inside the gutter, the rail's first card
              lines up with the heading, which is the alignment the eye actually checks.

              `no-scrollbar` hides the bar; the next card peeking in from the right
              already says the rail scrolls.
            */
            className={
              "no-scrollbar w-full snap-x snap-mandatory overflow-x-auto " +
              "lg:snap-none lg:overflow-hidden " +
              "lg:motion-reduce:overflow-x-auto lg:motion-reduce:snap-x lg:motion-reduce:snap-mandatory"
            }
          >
            <div
              data-gallery="track"
              className="flex w-full flex-nowrap gap-4 lg:gap-0 lg:will-change-transform"
            >
              {galleryCards.map((card, index) => (
                // Only the first card is visible when the section is reached; the
                // rest are off to the right and can load lazily.
                <GalleryCard key={card.id} card={card} priority={index === 0} />
              ))}
            </div>
          </div>

          {/*
            Centred on the media panel rather than on the whole card, which is taller
            by its title and description. `min(23vh,19.375rem)` is exactly half the
            panel's own `h-[46vh] max-h-[38.75rem]` — change one and change the other.
          */}
          <RailScrollArrow
            viewportRef={viewportRef}
            className="right-0 top-[min(23vh,19.375rem)] -translate-y-1/2"
          />
        </div>
      </div>
    </section>
  );
}
