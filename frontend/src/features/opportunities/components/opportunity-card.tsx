import Image from "next/image";

import type { Opportunity } from "../types/opportunities.types";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

/**
 * One card on the arc: an image panel above a title and description.
 *
 * **Centred by negative margin, not by transform.** The card is absolutely positioned
 * at the arc's origin and pulled back by half its own size. A `-translate-1/2` would
 * be the usual way to do that, but the carousel writes `transform` on every frame and
 * would overwrite it. Margins stay out of that fight entirely.
 *
 * Under reduced motion the card returns to normal flow (`static`, no negative margin)
 * so the CSS fallback can lay them all out as a plain scrollable row.
 */
export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <article
      data-opportunities="card"
      className={
        // Size is declared once as `--card-w`/`--card-h`; the centring margins are
        // derived from it, so the two can never drift apart when the size changes.
        //
        // Each dimension is `min(px, vh)` so the card shrinks on a short viewport
        // instead of being clipped by the arc's overflow. Both axes scale by the same
        // factor, which keeps the card's proportions fixed as it shrinks.
        //
        // From `768px` up the **width** is the design's original (260px) scaled by
        // 1.128, which lands the readable part of the fan on the page's shared `84rem`
        // measure. `RADIUS` in `arc-layout` carries the same factor — those two must
        // move together or the arc either closes up on itself or spreads out into an
        // evenly-spaced row.
        //
        // The **height** is deliberately not on that leash. Nothing in the arc geometry
        // depends on it, so it was taken down from `28.2rem` to `26rem` — a shorter,
        // less portrait card — without touching the radius. Height is the one dimension
        // here that can be tuned on its own; width cannot.
        //
        // Below `768px` the originals stand: there is no shared measure to hit on a
        // phone, and the arc is already as large as the viewport allows.
        //
        // The `vh` half of each `min()` is the short-viewport ceiling, and it sits
        // lower than the `rem` half implies: the stage also has to fit the header
        // clearance, the heading and the scroll hint, and it clips. On a tall window
        // the `rem` ceiling wins and the card is at full size regardless.
        "[--card-h:min(17.75rem,40.6vh)] [--card-w:min(12.5rem,28.6vh)] " +
        "min-[768px]:[--card-h:min(26rem,48vh)] min-[768px]:[--card-w:min(18.33rem,33.8vh)] " +
        "absolute top-0 left-0 flex h-[var(--card-h)] w-[var(--card-w)] flex-col overflow-hidden rounded-xl bg-white " +
        "-mt-[calc(var(--card-h)/2)] -ml-[calc(var(--card-w)/2)] " +
        "[backface-visibility:hidden] will-change-transform " +
        "motion-reduce:static motion-reduce:m-0 motion-reduce:flex-none"
      }
    >
      {/*
        58% of the card, but allowed to shrink — the copy below is `flex-none`, so on a
        short viewport the panel gives up height instead of the description being
        clipped by the card's `overflow-hidden`.

        Flexbox only shrinks it when the two would otherwise exceed the card, which on
        any normal window they do not: every card's copy sits under 42%, so the panel
        holds exactly 58% and the set reads as one. It only varies in the regime
        where the alternative was losing a line of text.
      */}
      <div
        className="relative h-[58%] min-h-[38%] w-full"
        style={{ backgroundImage: opportunity.gradient }}
      >
        <Image
          src={opportunity.image}
          // Decorative: the title and description carry the card's meaning.
          alt=""
          fill
          sizes="293px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-none flex-col px-5 py-[18px]">
        <h3 className="text-base font-bold tracking-[-0.01em] text-ink">
          {opportunity.title}
        </h3>
        <p className="mt-2 text-[12.5px] leading-normal text-[rgba(30,32,34,0.75)]">
          {opportunity.description}
        </p>
      </div>
    </article>
  );
}
