"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { journeyTracks } from "../constants/journey.constants";
import { JourneyCard } from "./journey-card";

/**
 * The programme tracks, ported from upGrad Enterprise's "Our Expertise": an expanding
 * row on wide screens, a horizontal scroller below.
 *
 * **Which card is open is state, not `:hover`.** An earlier version was pure CSS —
 * `hover:grow-[4]` with the first card opening whenever the gallery was not hovered —
 * which meant the row snapped back the instant the cursor left it. Hovering now
 * *activates* a card and it stays open until another is pointed at, so the reader can
 * move the mouse away and keep reading the track they chose.
 *
 * That behaviour cannot be expressed in CSS at all: `:hover` has no memory.
 *
 * **Below `xl` the expanding row is dropped entirely**, which is what the reference
 * does at its own stacking width: `overflow: auto` on the track, `min-width: 20rem` on
 * every card, and no card open or closed — they are all simply themselves. One whole
 * track at a time, and a swipe for the next.
 *
 * **`xl` and not the reference's `992px`, because our track is not its track.** The
 * reference runs its heading above the cards, so the row gets the full `1296px` and
 * can hold a `337px` open card beside five `176px` closed ones. Here the heading sits
 * *beside* the gallery and takes `460px` plus an `80px` gap, so the row is left with
 * `vw - 588`. At 1024 that is 436px, and four cards in the reference's proportions
 * come out 191 / 89 / 89 / 89 — the same slivers this change exists to get rid of.
 * The row only earns its place once the track can hold it: at `1280px` the closed
 * cards are 125px, at 1440 they are 138px. Below that, scrolling shows more.
 *
 * Two breakpoints, then, and they are not the same one: `901px` is where the *section*
 * stops stacking, so it is where the track stops running the full width of the screen
 * and gives up its bleed. `xl` is where the *row* becomes affordable.
 *
 * A `<ul>`: these are the four stages of the programme, so they are content rather
 * than decoration.
 */
export function JourneyGallery() {
  // The first track greets the reader — see `journeyTracks`, where the order is what
  // decides that rather than a flag.
  const [activeId, setActiveId] = useState(journeyTracks[0].id);

  // The flex basis is held back until the row layout at 901px. Below that the section
  // stacks, so the container's main axis is vertical and a basis of 600px would be
  // read as a *height* — overriding the height utilities and leaving a gallery more
  // than twice as tall as it should be.
  return (
    <ul
      data-journey="gallery"
      className={cn(
        // `25rem` and a `16px` gap are the reference's, and it holds that height at
        // every width rather than stepping it down for phones.
        "flex h-100 min-w-0 list-none items-stretch gap-4",
        // The scroller. `-mx-6 px-6` cancels the section's gutter and gives it back as
        // scroll padding, so cards leave and enter at the bezel rather than stopping
        // short of it, while the first still lines up with the heading above it.
        // `scroll-px-6` puts the snap line on that same gutter.
        "no-scrollbar -mx-6 snap-x snap-mandatory scroll-px-6 overflow-x-auto px-6",
        // The bleed goes at 901px, where the section stops stacking: the gallery is a
        // column of the row from there on, not the width of the screen, so there is no
        // gutter left to cancel. It is still a scroller.
        "min-[901px]:mx-0 min-[901px]:scroll-px-0 min-[901px]:px-0 min-[901px]:flex-[1_1_37.5rem]",
        // The scrolling itself goes at `xl`, for the expanding row, which must not clip
        // its own cards.
        "xl:snap-none xl:overflow-visible",
      )}
    >
      {journeyTracks.map((track) => (
        <JourneyCard
          key={track.id}
          track={track}
          isActive={track.id === activeId}
          onActivate={() => setActiveId(track.id)}
        />
      ))}
    </ul>
  );
}
