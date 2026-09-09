import Image from "next/image";

import { cn } from "@/lib/utils";
import type {
  LearnFromPeopleMentor,
  LearnFromPeopleTone,
} from "../types/learn-from-people.types";

type LearnFromPeopleCardProps = {
  mentor: LearnFromPeopleMentor;
};

/**
 * The four tints, as a gradient running from near-white at the copy to the colour at
 * the artwork.
 *
 * Written out as whole static strings because Tailwind cannot build class names at
 * runtime — `from-${tone}` compiles to nothing. Hex values rather than palette steps:
 * these are washes several shades paler than anything in `@theme`, and promoting four
 * one-off tints to design tokens would invite them to be used as if they were part of
 * the system.
 */
const TONE_CLASSES: Record<LearnFromPeopleTone, string> = {
  crimson: "from-white via-[#fdf3f3] to-[#f9e0e0]",
  azure: "from-white via-[#f2f7fe] to-[#dce8fb]",
  emerald: "from-white via-[#f3faf5] to-[#e0efe5]",
  violet: "from-white via-[#f7f4fd] to-[#e7e1f8]",
};

/**
 * One mentor: the achievement and its detail on the left, the artwork on the right.
 *
 * **The artwork is sized by height, not width.** The four PNGs range from a portrait
 * medal to a wide laptop scene, so a shared width would render the medal half again as
 * tall as the rest and force its card taller than the one beside it. A fixed box with
 * `object-contain` instead lets each illustration keep its own proportions while every
 * card reads at the same scale — and nothing is ever cropped, which a `cover` fit would
 * do to the medal's ribbon.
 *
 * `items-center` on the row: the copy is three or four lines depending on the width,
 * and the artwork should stay level with the middle of it rather than hang off the top.
 *
 * The box drops to 100px below `sm`. At the `sm` size a phone leaves the copy barely
 * 200px, which puts "Senior Backend Engineer" on three lines and "Competitive
 * Programming Mentor" on three more — the card stops being a card and becomes a narrow
 * column of fragments. Shrinking the artwork is the cheaper trade: it is the thing on
 * the card that loses the least by being smaller.
 */
export function LearnFromPeopleCard({ mentor }: LearnFromPeopleCardProps) {
  return (
    <li
      data-learn-from-people="card"
      className={cn(
        "group flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br px-6 py-7 sm:gap-5 sm:px-8 sm:py-9",
        TONE_CLASSES[mentor.tone],
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <h3 className="font-display text-[clamp(1.125rem,1.9vw,1.4375rem)] font-medium text-ink">
          {mentor.title}
        </h3>

        <p className="font-display text-[clamp(0.8125rem,1.15vw,0.9375rem)] font-medium text-brand">
          {mentor.role}
        </p>

        <p className="font-display text-[clamp(0.8125rem,1.15vw,0.9375rem)] text-pretty text-ink-muted">
          {mentor.background}
        </p>
      </div>

      {/*
        `aria-hidden` with an empty `alt`: the illustration is a picture of what the
        card's own heading already says, so describing it would make a screen reader
        read the same thing twice.
      */}
      <div
        aria-hidden="true"
        className="h-24 w-25 shrink-0 sm:h-40 sm:w-44 lg:h-44 lg:w-48"
      >
        <Image
          src={mentor.image.src}
          alt={mentor.image.alt}
          width={mentor.image.width}
          height={mentor.image.height}
          sizes="(min-width: 1024px) 12rem, (min-width: 640px) 11rem, 6.25rem"
          /*
            The artwork pushes forward and tips slightly on hover — the same treatment
            the global-ambition cards use, and slow enough (700ms) that it reads as the
            render settling rather than snapping.

            The rotation is what keeps it from looking like a plain zoom: 1.5° is below
            the angle at which a viewer reads "tilted" and just above the one where they
            read nothing at all. Anti-clockwise on every card, so a row of them tips the
            same way instead of fanning.

            Only `transform` transitions, so the browser can keep the whole thing on the
            compositor. Tailwind's `hover:` is behind `@media (hover: hover)`, so a touch
            device never gets a state that would stick after the tap.
          */
          className="h-full w-full object-contain object-center transition-transform duration-700 ease-cinematic group-hover:scale-[1.06] group-hover:-rotate-[1.5deg]"
        />
      </div>
    </li>
  );
}
