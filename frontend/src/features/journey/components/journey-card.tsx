import Image from "next/image";

import { cn } from "@/lib/utils";
import type { JourneyTrack } from "../types/journey.types";

type JourneyCardProps = {
  track: JourneyTrack;
  /** The one open card. Exactly one is active at a time — the gallery guarantees it. */
  isActive: boolean;
  /** Opens this card. Fired by pointer, tap and keyboard focus alike. */
  onActivate: () => void;
};

/**
 * Growth factors for the expanding row, in the reference's own proportions.
 *
 * upGrad Enterprise's "Our Expertise" gives its open card `30%` against `14%` for the
 * closed ones. Those percentages are written for its six cards and its full-width
 * track; carried over here they would not add up, since this gallery holds four cards
 * beside the heading rather than six below it. The *ratio* is what transfers, so it is
 * expressed as grow factors and the four cards divide whatever width they are given:
 * `15 : 7 : 7 : 7` puts the open card on 41.7% and each closed one on 19.4%.
 *
 * The point of the ratio is that a closed card stays a card. At the 4:1 this used to
 * run, the three closed ones came out ~102px — slivers too narrow to read a title in.
 */
const GROW_OPEN = "xl:grow-[15]";
const GROW_CLOSED = "xl:grow-[7]";

/** The reference's easing — `easeOutCubic`, not the page's `--ease-cinematic`. */
const EXPAND_EASE = "xl:ease-[cubic-bezier(0.215,0.61,0.355,1)]";

/**
 * One track in the gallery: a photo panel that expands to reveal more of itself.
 *
 * Opening is driven by the gallery's state rather than `:hover`, so a card stays open
 * after the cursor leaves it — see `JourneyGallery` for why that cannot be CSS.
 *
 * Three events open it, covering all three ways in:
 *
 * - `onMouseEnter` — the pointer behaviour that was asked for.
 * - `onClick` — touch has no hover at all, so without this a phone would be stuck on
 *   whichever card happened to be first.
 * - `onFocus` — keeps keyboard tabbing in step with the pointer, and it costs nothing
 *   here because focus can only land inside a card that is already open.
 *
 * **Every card shows its title, open or closed**, which is the reference's rule and
 * the reason its closed cards read as cards rather than as spacers. Only the *size*
 * changes — `1.25rem` closed, `1.5rem` open — so opening a card is a change of
 * emphasis rather than a reveal, and nothing has to be tapped before it can be read.
 *
 * **Below `xl` `isActive` styles nothing.** The gallery is a scroller there, so every
 * card holds the reference's `20rem` width and its title is already at full size. The flag is still tracked rather than branched on in JS — the open/closed look
 * lives entirely in these classes, so the breakpoint is the one place the two
 * behaviours part.
 */
export function JourneyCard({ track, isActive, onActivate }: JourneyCardProps) {
  return (
    <li
      data-journey="card"
      onMouseEnter={onActivate}
      onClick={onActivate}
      onFocus={onActivate}
      className={cn(
        // `4px`, the reference's radius — enough to read as a card, not as a pill.
        "relative min-w-0 overflow-hidden rounded-[4px] bg-ink",
        // Scroller: the reference's `min-width: 20rem`, so one whole track fills a
        // phone and the next is cut by the edge. This is the width up to `xl`, not
        // just on phones — see `JourneyGallery` for why the row waits that long.
        "w-80 shrink-0 snap-start",
        // Expanding row: widths go back to being shares of the track.
        "xl:w-auto xl:shrink xl:basis-0",
        "xl:transition-[flex-grow] xl:duration-500",
        EXPAND_EASE,
        isActive ? GROW_OPEN : GROW_CLOSED,
      )}
    >
      {/*
        Sized for the *open* card, which is the widest any of them gets: 320px on the
        scroller, and 268-280px once the row expands one. The closed cards pull the
        same file and crop it, so quoting their ~125px here would only fetch art too
        small for the one card actually being read.
      */}
      <Image
        src={track.image}
        // Decorative: the title beside it names the track.
        alt=""
        fill
        sizes="(min-width: 1280px) 280px, 320px"
        className="object-cover"
      />

      {/* Scrim — the title sits at the bottom over an unknown photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.05)_45%,transparent_70%)]"
      />

      <span className="absolute top-5 left-5 z-10 rounded-full bg-white px-2 py-[3px] font-display text-sm whitespace-nowrap text-brand">
        {track.year}
      </span>

      {/*
        Bounded by `left-5 right-5` rather than a fixed width: the card is 320px on the
        scroller, ~138px closed and ~296px open, and one measurement cannot serve all
        three — a width wide enough for the open card would be clipped by the closed one.
      */}
      <span
        className={cn(
          "absolute right-5 bottom-5 left-5 z-10 font-display leading-[1.2] font-bold text-white",
          "text-2xl transition-[font-size] duration-200",
          isActive ? "xl:text-2xl" : "xl:text-base",
        )}
      >
        {track.title}
      </span>
    </li>
  );
}
