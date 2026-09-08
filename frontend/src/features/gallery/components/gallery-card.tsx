import { GalleryCardMedia } from "./gallery-card-media";
import type { GalleryCard as GalleryCardData } from "../types/gallery.types";

type GalleryCardProps = {
  card: GalleryCardData;
  /** Only the first card is above the fold; the rest can load lazily. */
  priority?: boolean;
};

/**
 * One stage of the journey: an image panel with display text, and a
 * title/description beneath it.
 *
 * **At `lg` the card is exactly one viewport wide** (`w-full`), which is what lets the
 * carousel translate the track in whole `-100%` steps to bring each card into frame.
 *
 * **Below `lg` it is a fixed-width snap card** in a horizontal rail — `86%` of the
 * viewport, so the next card peeks in from the right and says the row scrolls.
 * `shrink-0` is what stops six cards being squeezed onto one screen instead of forming
 * a rail.
 */
export function GalleryCard({ card, priority = false }: GalleryCardProps) {
  return (
    <article className="relative w-[86%] shrink-0 snap-start sm:w-[70%] lg:w-full lg:flex-none lg:pr-[clamp(1.5rem,5vw,4.5rem)]">
      <GalleryCardMedia card={card} priority={priority} />

      <div className="flex flex-col items-start gap-3 pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <div>
          <h3 className="mb-1.5 font-display text-xl font-bold text-ink">
            {card.title}
          </h3>
          <p className="max-w-[32.5rem] font-display text-sm leading-normal text-ink-muted">
            {card.description}
          </p>
        </div>
      </div>
    </article>
  );
}
