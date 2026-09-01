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
 * **Below `lg` it is 86%**, leaving the next card showing at the edge. There is no
 * pinned carousel down there — the track is a native scroll-snap container — so
 * nothing depends on the width being exactly one screen, and a full-width card gives a
 * phone no sign that there are three more behind it. The sliver is the affordance.
 */
export function GalleryCard({ card, priority = false }: GalleryCardProps) {
  return (
    <article className="relative w-[86%] flex-none snap-start pr-4 lg:w-full lg:pr-[clamp(1.5rem,5vw,4.5rem)]">
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
