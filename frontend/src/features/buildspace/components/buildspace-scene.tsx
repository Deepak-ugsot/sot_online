import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import {
  BUILDSPACE_SCENE_ASPECT,
  buildspaceCards,
  buildspaceCharacter,
  buildspaceLaptop,
} from "../constants/buildspace.constants";
import type { BuildspaceLayer } from "../types/buildspace.types";

/** Percentage placement, handed to CSS so the class strings stay static. */
const placement = (layer: BuildspaceLayer) =>
  ({
    "--left": `${layer.left}%`,
    "--top": `${layer.top}%`,
    "--size": `${layer.size}%`,
  }) as CSSProperties;

/**
 * Absolute over the scene from `sm` up, part of an ordinary wrapped flow below it.
 *
 * The percentages only work while the scene has real width to spread across; at phone
 * width they crowd every layer into an overlapping stack, so below `sm` the overlay is
 * dropped entirely.
 */
const LAYER = "min-[641px]:absolute min-[641px]:left-[var(--left)] min-[641px]:top-[var(--top)] min-[641px]:w-[var(--size)]";

/**
 * The product collage: five feature cards scattered around the laptop, with the
 * student in front.
 *
 * **Every layer is positioned as a percentage of a fixed-ratio box.** That is what
 * lets the arrangement scale as one piece — the scene holds `1340 / 790` at every
 * width, so a card at `left: 74%` keeps its place instead of drifting as the container
 * grows. Heights come from each image's own ratio rather than a second percentage, so
 * the same numbers still lay out once the scene stops being a fixed-ratio box on
 * phones.
 *
 * The cards are a `<ul>` — each names a real part of the product. Their labels are
 * baked into the artwork, so `alt` is the only place those names exist as text.
 */
export function BuildspaceScene() {
  return (
    <div
      data-buildspace="scene"
      style={{ aspectRatio: BUILDSPACE_SCENE_ASPECT } as CSSProperties}
      className={cn(
        // `relative` is what every absolute layer below resolves against — without it
        // they escape to the section and the whole arrangement drifts.
        "relative",
        // Phone: a plain wrapped flow — the card rail, then the laptop, then the
        // student over it.
        // Sized off the *viewport height*, not just a width cap: the stage that holds
        // this is a full viewport tall and the scene is the only thing in it, so the
        // limit that actually binds is vertical. `88vh * ratio` is the widest the box
        // can be and still fit, and the `88rem` cap keeps it from running away on very
        // tall windows. Every layer inside is a percentage, so raising this one number
        // scales the whole collage as a piece.
        "flex w-full max-w-[min(88rem,calc(88vh*1340/790))] flex-wrap items-start justify-center gap-3.5 pb-6",
        "max-[640px]:!aspect-auto",
        // From `sm`: the overlay scene.
        "min-[641px]:block min-[641px]:gap-0 min-[641px]:pb-0",
        // Between `sm` and 900px there is not enough height for the ratio to hold a
        // readable scene, so it grows to a floor instead. Both are scoped to that band
        // — on the phone layout the scene is an ordinary flow and sizes to its content.
        // Below 901px there is no pin and no full-height stage, so the vh-derived cap
        // above would squeeze the scene against a short phone viewport for no reason.
        "max-[900px]:!max-w-[67.5rem]",
        "min-[641px]:max-[900px]:!aspect-auto min-[641px]:max-[900px]:min-h-[38.75rem]",
      )}
    >
      {/*
        Below `sm` the five cards are a horizontal snap rail rather than a grid, and
        that is the whole phone layout in one decision. Two-up at 375px each card is
        133px wide — every one of them is a dense product screenshot, so at that size
        the UI inside is unreadable noise and only the baked-in label survives. On the
        rail a card is 70vw, wide enough to read, and the half-visible next card is the
        affordance that says to keep swiping.

        It bleeds past the stage's gutter (`-mx-6` against a matching `px-6`) so the
        rail reads as running off the edge of the screen instead of stopping short in a
        box, and `scroll-pl-6` puts a snapped card back on that same gutter. The
        vertical padding is only there to keep each card's drop shadow from being
        clipped by the scroll container.
      */}
      <ul
        className={cn(
          "-mx-6 flex w-[calc(100%+3rem)] shrink-0 snap-x snap-mandatory items-start gap-3.5 overflow-x-auto scroll-pl-6 px-6 py-2",
          // The rail is self-evidently swipeable; a scrollbar under it only adds noise.
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          // From `sm` the cards go back to being absolute layers of the scene itself,
          // so the list must stop being a box of its own.
          "min-[641px]:contents",
        )}
      >
        {buildspaceCards.map((card) => (
          <li
            key={card.id}
            data-buildspace="card"
            style={placement(card)}
            className={cn(
              "w-[70vw] max-w-[17.5rem] shrink-0 snap-start",
              LAYER,
              "min-[641px]:max-w-none min-[641px]:z-20",
            )}
          >
            <Image
              src={card.image}
              alt={card.label}
              width={card.width}
              height={card.height}
              sizes="(min-width: 641px) 15vw, 70vw"
              className="h-auto w-full rounded-[10px] shadow-[0_12px_28px_-10px_rgba(10,10,11,0.35)]"
            />
          </li>
        ))}
      </ul>

      {/*
        Behind the cards and the student — the plate the whole composition sits on.
      */}
      <div
        data-buildspace="laptop"
        style={placement(buildspaceLaptop)}
        className={cn("w-full basis-full", LAYER, "min-[641px]:z-10 min-[641px]:basis-auto")}
      >
        <Image
          src={buildspaceLaptop.image}
          alt=""
          aria-hidden="true"
          width={buildspaceLaptop.width}
          height={buildspaceLaptop.height}
          sizes="(min-width: 641px) 50vw, 100vw"
          className="h-auto w-full"
        />
      </div>

      {/*
        Decorative: the student illustrates the copy rather than adding to it, and
        naming them would only interrupt a screen reader between the heading and the
        five cards. On the phone layout they sit under the laptop, pulled up so they
        still overlap it rather than floating alone at the bottom.
      */}
      <div
        data-buildspace="character"
        style={placement(buildspaceCharacter)}
        // `basis-full` gives the student their own row; `max-w` is what actually sizes
        // them there, because a flex basis outranks `width` on the main axis.
        className={cn(
          "mx-auto -mt-[18%] max-w-[60%] basis-full",
          LAYER,
          "min-[641px]:mx-0 min-[641px]:mt-0 min-[641px]:max-w-none min-[641px]:basis-auto min-[641px]:z-30",
        )}
      >
        <Image
          src={buildspaceCharacter.image}
          alt=""
          aria-hidden="true"
          width={buildspaceCharacter.width}
          height={buildspaceCharacter.height}
          sizes="(min-width: 641px) 35vw, 60vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
