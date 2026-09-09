"use client";

import { useRef } from "react";

import { useOneProgramReveal } from "../hooks/use-one-program-reveal";
import { OneProgramIntro } from "./one-program-intro";
import { OneProgramRails } from "./one-program-rails";

/**
 * "One Program Instead of Ten." — the claim and the price on the left, the eighteen
 * things the program replaces drifting past on the right.
 *
 * **The right side is not a list of features, it is the argument.** Reading any single
 * tile is beside the point; the density is what says "ten programs", so the tiles move
 * on their own rather than waiting for the reader to scroll them into view.
 *
 * Two columns from `lg`, `5fr / 7fr` rather than an even split: the copy column holds a
 * capped 26rem measure and stops growing, while the rails column takes everything else,
 * so an even split would leave a hole between the button and the first column of tiles.
 * Below `lg` the intro stacks above the rails, which is the only arrangement that leaves
 * the three columns enough width to stay legible.
 *
 * A Client Component only because the reveal hook needs the section element.
 */
export function OneProgramSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useOneProgramReveal(sectionRef);

  return (
    <section
      id="one-program"
      ref={sectionRef}
      aria-labelledby="one-program-heading"
      className="relative bg-surface py-14 lg:py-20"
    >
      <div className="mx-auto grid max-w-[78rem] grid-cols-1 items-center gap-10 px-6 sm:px-8 lg:grid-cols-[5fr_7fr] lg:gap-14">
        <OneProgramIntro />
        <OneProgramRails />
      </div>
    </section>
  );
}
