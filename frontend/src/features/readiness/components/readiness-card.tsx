import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ReadinessStep } from "../types/readiness.types";

type ReadinessCardProps = {
  step: ReadinessStep;
  /** Position in the row. Odd cards are the ones that drop. */
  index: number;
  /** Cards visible before any scrolling should not wait for lazy loading. */
  priority?: boolean;
};

/**
 * One step: a full-bleed photo with the title and its line of copy over the foot.
 *
 * **The description is always on show, never revealed on hover.** The design prints
 * all seven descriptions at once — the row is read as a sequence, and a step whose
 * copy only appears under the pointer cannot be read as part of one. It also puts the
 * touch and pointer renderings back in agreement, which the hover version could only
 * approximate with a `(hover: hover)` guard.
 *
 * **The scrim is two stacked layers, not one gradient that changes.** A resting scrim
 * deep enough to seat both lines of type, and a light second layer that fades in over
 * it on hover. Swapping a single `background-image` between two gradients would not
 * animate reliably — CSS only interpolates gradients that match stop for stop — so the
 * transition is opacity on a second layer, which always animates.
 *
 * **The hover layer is deliberately weak, because the two compound.** Now that the
 * description no longer has to be revealed from behind it, its only job is a slight
 * settle under the pointer — at its old strength the pair reached 98% black and the
 * photograph stopped existing on hover.
 *
 * The resting scrim ramps in four stops rather than two. The copy occupies roughly the
 * bottom quarter of the card, so that is where the darkness has to be (85% at the
 * foot) — but arriving there in one straight run from the middle draws a visible band
 * across the photograph. Fading in earlier and more gradually puts the weight under
 * the type without the card looking like it has a bar across it.
 *
 * Neither scrim is optional. These images run from a light product mock to a near
 * black screen and the copy is white on all of them.
 */
export function ReadinessCard({ step, index, priority = false }: ReadinessCardProps) {
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
        // Every second card drops, which is what stops seven cards reading as one bar.
        // Only once the row is pinned — on a hand-swiped row it would just cost height.
        index % 2 === 1 && "min-[901px]:mt-[4.375rem]",
      )}
    >
      <div className="absolute inset-0" style={{ backgroundImage: step.gradient }}>
        <Image
          src={step.image}
          // Decorative: the title names the step and the description restates it.
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 901px) 327px, 72vw"
          className="object-cover transition-transform duration-600 ease-cinematic group-hover:scale-105"
        />
      </div>

      {/* Resting scrim: deep enough to seat the title and the line under it. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_18%,rgba(0,0,0,0.3)_48%,rgba(0,0,0,0.7)_76%,rgba(0,0,0,0.85)_100%)]"
      />

      {/*
        Hover scrim: a light deepening of the foot, not a second full-strength wash.

        It stacks *on top of* the resting scrim, so its values compound — the two
        together reached 98% black at the foot, which turned every card into a flat
        panel the moment the pointer arrived. Kept transparent through the top third
        and topping out at 38%, the pair lands near 91% under the type and barely
        touches the middle of the photograph, which is the part worth keeping.
      */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-[450ms] ease-cinematic",
          "bg-[linear-gradient(180deg,transparent_32%,rgba(0,0,0,0.14)_60%,rgba(0,0,0,0.3)_84%,rgba(0,0,0,0.38)_100%)]",
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
          {step.title}
        </h3>

        <p className="mt-2 font-display text-sm leading-[1.45] text-white/85">
          {step.description}
        </p>
      </div>
    </article>
  );
}
