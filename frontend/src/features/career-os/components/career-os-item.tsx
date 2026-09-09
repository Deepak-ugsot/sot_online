import { cn } from "@/lib/utils";
import type { CareerOsFeature, CareerOsMediaHeight } from "../types/career-os.types";
import { CareerOsIllustration } from "./career-os-illustration";

/**
 * Media panel heights.
 *
 * These are the masonry, and they only mean anything at `lg`. The middle column
 * carries two tiles against the outer columns' three, so its panels are tall and
 * theirs are short — that is what brings all three columns down to the same baseline
 * without a single fixed card height.
 *
 * The outer columns hold the same three heights (`short short medium`, mirrored), so
 * they balance against each other whatever these numbers are. Only `tall` has to be
 * solved for, and `15.65rem` is measured, not round: it is the height at which the
 * two-tile middle column finishes level with its three-tile neighbours.
 *
 * Below `lg` the columns are dissolved and there is nothing left to balance, so the
 * short and medium panels are given back some height: at one and two columns a 6rem
 * panel is a letterbox its illustration rattles around in. `tall` is unchanged — it is
 * already the tightest fit for the busiest illustrations.
 */
const mediaHeights: Record<CareerOsMediaHeight, string> = {
  short: "h-28 lg:h-24",
  medium: "h-[10rem] lg:h-[8.5rem]",
  tall: "h-[15.65rem]",
};

/**
 * One capability tile: an illustration panel over a title and description.
 *
 * The panel is a fixed height rather than an aspect ratio — its height is what tunes
 * the column balance, and an aspect ratio would hand that back to the tile's width.
 */
export function CareerOsItem({ feature }: { feature: CareerOsFeature }) {
  return (
    <article
      data-career-os="item"
      className={cn(
        "flex flex-col rounded-[1.5rem] border border-black/[0.04] bg-white p-3",
        "shadow-[0_1px_2px_rgba(10,10,11,0.04),0_12px_28px_-16px_rgba(10,10,11,0.16)]",
        "transition-transform duration-500 ease-cinematic hover:-translate-y-1",
      )}
    >
      <div
        className={cn(
          // A query container, not just a box: the panel is ~14rem wide at two
          // columns and ~24rem at one, and the illustrations inside adapt to *this*
          // width rather than the viewport's — a media query cannot tell those two
          // cases apart, since both happen on a phone-to-tablet screen.
          "@container overflow-hidden rounded-[1.125rem] bg-surface",
          mediaHeights[feature.media],
        )}
      >
        <CareerOsIllustration name={feature.illustration} />
      </div>

      <div className="px-3 pt-4 pb-3 sm:pt-5 sm:pb-4">
        <h3 className="text-[1.25rem] font-bold tracking-[-0.02em] text-ink sm:text-[1.375rem]">
          {feature.title}
        </h3>

        <p className="mt-2 text-[0.875rem] leading-[1.6] text-[rgba(10,10,11,0.72)] sm:mt-2.5">
          {feature.description}
        </p>
      </div>
    </article>
  );
}
