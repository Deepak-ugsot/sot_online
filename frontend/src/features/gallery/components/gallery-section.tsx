"use client";

import { useRef } from "react";

import { RailScrollArrow } from "@/components/ui/rail-scroll-arrow";
import { galleryCards, galleryHeading } from "../constants/gallery.constants";
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
          "relative flex h-auto w-full flex-col items-start justify-center gap-10 overflow-hidden px-6 py-18 " +
          "lg:h-[100svh] lg:flex-row lg:items-center lg:gap-[clamp(1.5rem,5vw,4.5rem)] lg:px-[clamp(1.5rem,6vw,5rem)] lg:py-0"
        }
      >
        <div className="shrink-0 lg:basis-[clamp(13.75rem,30vw,23.75rem)]">
          <h2
            id="gallery-heading"
            className="mb-7 type-heading text-[clamp(1.875rem,3.6vw,2.875rem)] text-ink"
          >
            {galleryHeading.lead}
            <br />
            <span className="font-accent font-medium text-brand">
              {galleryHeading.accent}
            </span>
          </h2>
        </div>

        {/*
          Below `lg` the cards simply stack in document flow — a plain vertical column,
          no scroll container, no JS. At `lg` and up the rail takes over: it is
          `overflow-hidden` and panned by the pinned page scroll, and under reduced
          motion there it falls back to a native horizontal scroll-snap rail
          (`tabIndex={0}` makes that fallback keyboard-scrollable).
        */}
        {/*
          The wrapper carries the flex sizing so the arrow can be positioned against it.
          The arrow only shows when the rail is a real horizontal scroll container,
          which — below `lg` being a vertical stack now — means `lg`+ under reduced
          motion only.
        */}
        <div className="relative w-full lg:min-w-0 lg:flex-1">
          <div
            ref={viewportRef}
            data-gallery="viewport"
            role="group"
            aria-label="Programme stages"
            tabIndex={0}
            className={
              "w-full " +
              "lg:snap-none lg:overflow-hidden " +
              "lg:motion-reduce:overflow-x-auto lg:motion-reduce:snap-x lg:motion-reduce:snap-mandatory"
            }
          >
            <div
              data-gallery="track"
              className="flex w-full flex-col gap-12 lg:flex-row lg:flex-nowrap lg:gap-0 lg:will-change-transform"
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
