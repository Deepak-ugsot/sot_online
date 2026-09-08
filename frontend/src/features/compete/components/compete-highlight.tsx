import Image from "next/image";

import { cn } from "@/lib/utils";
import type { CompeteHighlight as CompeteHighlightData } from "../types/compete.types";

type CompeteHighlightProps = {
  highlight: CompeteHighlightData;
  /**
   * Whether this is the first item in its column — true for the top item of each of
   * the two columns.
   */
  isFirstInColumn: boolean;
  /**
   * Whether this is the very first item in the section.
   *
   * The two are not the same, and the difference is the whole point: on a phone the
   * columns collapse into one list, so the second column's top item needs a rule above
   * it like any other row, while at `lg` it starts a fresh column and must not. Only
   * the very first item never has a rule. A `first:` variant cannot express this — the
   * two lists are separate `<ul>`s, so each has its own first child at every width.
   */
  isFirstOverall: boolean;
};

/**
 * One highlight: the icon on the left, the title and its line of detail on the right.
 *
 * `items-start` rather than centring: the icon is a fixed square and the copy beside it
 * is one or three lines depending on the width, so a centred icon drifts down the block
 * as the text wraps. Aligned to the top it stays level with the title, which is what
 * the eye pairs it with.
 */
export function CompeteHighlight({
  highlight,
  isFirstInColumn,
  isFirstOverall,
}: CompeteHighlightProps) {
  return (
    <li
      className={cn(
        "flex items-start gap-4 sm:gap-5",
        // The rule and the space it needs are one decision, so they travel together.
        !isFirstOverall && "mt-7 border-t border-black/10 pt-7 sm:mt-8 sm:pt-8",
        // …and the second column's top item drops both at `lg`, where it stops being
        // the next row in a list and starts being the head of its own column.
        isFirstInColumn &&
          !isFirstOverall &&
          "lg:mt-0 lg:border-t-0 lg:pt-0",
      )}
    >
      {/*
        `aria-hidden` with an empty `alt`: each icon is a picture of the thing its own
        title names, so describing it would make a screen reader read every heading
        twice.
      */}
      <span aria-hidden="true" className="shrink-0">
        <Image
          src={highlight.image.src}
          alt=""
          width={highlight.image.width}
          height={highlight.image.height}
          sizes="(min-width: 1024px) 6rem, 4.5rem"
          className="h-auto w-[3.75rem] object-contain sm:w-[4.5rem]"
        />
      </span>

      <span className="min-w-0">
        <span className="block type-heading text-[clamp(1.0625rem,1.5vw,1.375rem)] text-ink">
          {highlight.title}
        </span>
        <span className="mt-2 block text-[clamp(0.875rem,1.1vw,1.0625rem)] leading-relaxed text-ink-muted">
          {highlight.description}
        </span>
      </span>
    </li>
  );
}
