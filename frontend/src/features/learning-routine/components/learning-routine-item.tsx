import Image from "next/image";

import type { LearningRoutineItem as Item } from "../types/learning-routine.types";

/**
 * One part of the class model: the render, then its title and a line of support.
 *
 * **`items-center`, where the next-opportunity benefits use `items-start`.** These
 * renders are four different heights (56–67px) at one width, and the copy beside them
 * is always a title over two lines — so centring is what makes the four read as one
 * set, and there is no wrap here to send an icon drifting down its row.
 *
 * The render sits in a fixed 95px box, the files' shared width, so every title starts
 * on the same line down the column whatever the picture's shape.
 *
 * A Server Component: nothing here moves on its own, and the section's reveal reaches
 * it by `data-learning-routine` attribute.
 */
export function LearningRoutineItem({ item }: { item: Item }) {
  return (
    <li data-learning-routine="item" className="flex items-center gap-3">
      <Image
        src={item.icon.src}
        // `aria-hidden` with an empty `alt`: each render is a picture of what its own
        // title says, and describing it would only make a screen reader say it twice.
        alt=""
        aria-hidden="true"
        width={item.icon.width}
        height={item.icon.height}
        // The files' own size — they are 1× exports, so they are never scaled up.
        className="h-auto w-[4.5rem] shrink-0 sm:w-[5.9375rem]"
      />

      {/* `min-w-0` so a long title wraps instead of forcing the row past its track. */}
      <div className="min-w-0">
        <h3 className="font-display text-[clamp(1rem,1.3vw,1.125rem)] leading-snug font-medium text-ink/90">
          {item.title}
        </h3>

        <p className="mt-1.5 text-pretty text-[clamp(0.8125rem,1vw,0.875rem)] leading-[1.3] text-ink-muted">
          {item.description}
        </p>
      </div>
    </li>
  );
}
