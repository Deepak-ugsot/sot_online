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
          `tabIndex={0}` makes the scroll-snap track keyboard-scrollable below `lg`,
          where it is a real scroll container. At `lg` and up it is `overflow-hidden`
          and driven by page scroll instead.

          The right edge is masked below `lg`, over exactly the 3rem the next card
          peeks by. Without it that card shows a chopped bold title and three
          part-words, which reads as a layout fault rather than as "there is more" —
          faded, the same sliver reads as intended. Same device the showcase marquee
          uses on both of its edges.

          The gradient carries a middle stop rather than running straight to
          transparent: a linear fade is still fully opaque where the peek begins, which
          is exactly where the chopped words are. Dropping to 30% within the first rem
          takes the legibility out of them while leaving enough of the card's colour to
          register as another card.
        */}
        {/*
          The wrapper carries the flex sizing so the arrow can be positioned against
          it. Putting the arrow inside the track instead would hand it the track's own
          right-edge mask, and it would fade out exactly where it is meant to sit.
        */}
        <div className="relative w-full lg:min-w-0 lg:flex-1">
          <div
            ref={viewportRef}
            data-gallery="viewport"
            role="group"
            aria-label="Programme stages"
            tabIndex={0}
            className={
              "w-full snap-x snap-mandatory overflow-x-auto " +
              "[-webkit-mask-image:linear-gradient(to_right,#000_calc(100%-3rem),rgba(0,0,0,0.3)_calc(100%-2rem),transparent)] " +
              "[mask-image:linear-gradient(to_right,#000_calc(100%-3rem),rgba(0,0,0,0.3)_calc(100%-2rem),transparent)] " +
              "lg:snap-none lg:overflow-hidden " +
              "lg:[-webkit-mask-image:none] lg:[mask-image:none] " +
              "motion-reduce:overflow-x-auto motion-reduce:snap-x motion-reduce:snap-mandatory"
            }
          >
            <div
              data-gallery="track"
              className="flex w-full flex-nowrap will-change-transform"
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
