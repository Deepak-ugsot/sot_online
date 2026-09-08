import Image from "next/image";

import type { GalleryCard } from "../types/gallery.types";

type GalleryCardMediaProps = {
  card: GalleryCard;
  /** Only the first card is above the fold; the rest can load lazily. */
  priority?: boolean;
};

/**
 * The card's image panel: photo, gradient backdrop, dark scrim, and display text.
 *
 * Layer order, bottom to top:
 *
 * 1. **Gradient** — painted on the container itself. Fills the panel while the photo
 *    loads, if it fails, and for a card that has no photo yet.
 * 2. **Photo, when the card has one** — `fill` + `object-cover`, so it crops rather
 *    than distorts at any card size. A card without artwork simply skips this layer
 *    and reads as a finished gradient panel rather than a broken image.
 * 3. **Scrim** — keeps the white display text readable over an unknown photo. This
 *    matters more with real photography than it did with the flat gradients, since
 *    nothing guarantees the lower half of the image is dark.
 * 4. **Display text**.
 *
 * `alt=""` stays correct now that the art is real: every card states its stage three
 * times over — in the display text above, and in the heading and description beneath —
 * so alt text here would only repeat what a screen reader has just read.
 */
export function GalleryCardMedia({ card, priority = false }: GalleryCardMediaProps) {
  return (
    <div
      className="relative flex h-[46vh] max-h-[38.75rem] items-end overflow-hidden rounded-[4px] p-5 sm:p-8 lg:h-[62vh]"
      style={{ backgroundImage: card.gradient }}
    >
      {card.image && (
        <Image
          src={card.image}
          alt=""
          fill
          priority={priority}
          // The card is one viewport wide below `lg`, and roughly half of it above —
          // this stops the optimizer serving a full-width image to the desktop layout.
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.65),rgba(0,0,0,0.15)_55%,rgba(0,0,0,0.05))]"
      />

      {/* `whitespace-pre-line` renders the newline in the copy as the intended line
          break, keeping it in the constants file with the rest of the text. */}
      {/*
        The clamp *floor* is the responsive part, and it was the bug: at `2.5rem` the
        display text stopped scaling below about 380px, so on a 360px phone the longest
        line ("Development.") wanted 265px against 248px of card — it ran off the edge.
        `1.75rem` lets it keep shrinking down to the narrowest phones.

        The `6vw` middle term is deliberately unchanged. Raising it to fix the phone
        would have overflowed the *desktop* card instead, which is much narrower than
        the viewport once the intro column and gap are taken out: at 1024px that same
        line needs 477px at `7vw` against 429px of panel.
      */}
      <span className="relative z-10 whitespace-pre-line font-display text-[clamp(1.75rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white [text-shadow:0_1px_24px_rgba(0,0,0,0.35)]">
        {card.overlay}
      </span>
    </div>
  );
}
