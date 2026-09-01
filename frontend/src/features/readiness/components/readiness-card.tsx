import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ReadinessMetric } from "../types/readiness.types";

type ReadinessCardProps = {
  metric: ReadinessMetric;
  /** Position in the row. Odd cards are the ones that drop. */
  index: number;
  /** Cards visible before any scrolling should not wait for lazy loading. */
  priority?: boolean;
};

/**
 * One metric: a full-bleed photo with the label over it, and the description opening
 * under the label on hover.
 *
 * **The scrim is two stacked layers, not one gradient that changes.** A resting scrim
 * that only tints the foot of the card, and a hover scrim reaching most of the way up
 * that fades in over it. Swapping a single `background-image` between two gradients
 * would not animate reliably — CSS only interpolates gradients that match stop for
 * stop — so the transition is opacity on a second layer, which always animates.
 *
 * The resting scrim ramps in four stops rather than two. The label occupies roughly
 * the bottom 12% of the card, so that is where the darkness has to be (80% at the
 * foot) — but arriving there in one straight run from 55% draws a visible band across
 * the photograph. Fading in earlier and more gradually puts the weight under the type
 * without the card looking like it has a bar across it.
 *
 * Neither scrim is optional. These photographs run from bright interiors to near
 * black and the copy is white on all of them.
 */
export function ReadinessCard({ metric, index, priority = false }: ReadinessCardProps) {
  return (
    <article
      data-readiness="card"
      className={cn(
        "group relative shrink-0 snap-start overflow-hidden rounded-xl bg-black",
        // Below the pin threshold the width is taken off the viewport rather than
        // fixed, so a slice of the next card always shows — on a hand-swiped row that
        // peek is the only affordance there is, and a fixed 280px loses it entirely on
        // a 320px screen. Capped at the same 280px it used to be so a wide phone in
        // landscape does not get one enormous card. `aspect-[14/17]` is the 280×340
        // proportion the card was drawn at, held as the width moves.
        "aspect-[14/17] w-[min(72vw,17.5rem)]",
        "min-[901px]:aspect-auto min-[901px]:h-[24.4375rem] min-[901px]:w-[20.4375rem]",
        // Every second card drops, which is what stops eight cards reading as one bar.
        // Only once the row is pinned — on a hand-swiped row it would just cost height.
        index % 2 === 1 && "min-[901px]:mt-[4.375rem]",
      )}
    >
      <div className="absolute inset-0" style={{ backgroundImage: metric.gradient }}>
        <Image
          src={metric.image}
          // Decorative: the label names the metric and the description restates it.
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 901px) 327px, 72vw"
          className="object-cover transition-transform duration-600 ease-cinematic group-hover:scale-105"
        />
      </div>

      {/* Resting scrim: just enough to seat the label. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.25)_62%,rgba(0,0,0,0.62)_84%,rgba(0,0,0,0.8)_100%)]"
      />

      {/* Hover scrim: rises from the foot of the card to near its top. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-[450ms] ease-cinematic",
          "bg-[linear-gradient(180deg,transparent_10%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.72)_78%,rgba(0,0,0,0.85)_100%)]",
          "group-hover:opacity-100",
        )}
      />

      <div className="absolute inset-x-0 bottom-0 p-4 min-[901px]:p-5">
        {/*
          24px, growing to 26px on hover. Font size rather than a transform: the title
          sits in normal flow with the description beneath it, and scaling would slide
          it off its own baseline instead of pushing the copy down with it.
        */}
        <h3
          className={cn(
            "font-display text-2xl font-bold tracking-[-0.029em] text-white",
            "transition-[font-size] duration-[450ms] ease-cinematic",
            "group-hover:text-[1.625rem]",
          )}
        >
          {metric.label}
        </h3>

        {/*
          The description stays in the DOM and un-hidden throughout — only its wrapper's
          height is animated — so screen readers reach it whether or not the reveal ever
          plays. `max-h-40` is a ceiling the copy fits under, not a measured height:
          `max-height` is the only way to transition to `auto`.
        */}
        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-[450ms] ease-cinematic",
            // Collapsed only where a pointer can actually hover. Without the guard a
            // touch device would render every description shut with no way to open
            // it; gated this way, touch gets them open from the start. Written out in
            // full rather than composed from a shared prefix — Tailwind scans source
            // text for whole class names, so an interpolated variant is never
            // generated and the rule silently does not exist.
            "[@media(hover:hover)_and_(pointer:fine)]:max-h-0",
            "[@media(hover:hover)_and_(pointer:fine)]:opacity-0",
            // Tailwind's own `group-hover` is `(hover: hover)`-gated, so it re-opens
            // the wrap on exactly the devices the two rules above collapse it on.
            "group-hover:max-h-40 group-hover:opacity-100",
          )}
        >
          <p className="mt-2 font-display text-sm leading-[1.45] text-white/85">
            {metric.description}
          </p>
        </div>
      </div>
    </article>
  );
}
