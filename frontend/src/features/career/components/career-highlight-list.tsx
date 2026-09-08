import { ArrowIcon } from "@/components/ui/arrow-icon";
import { careerHighlights } from "../constants/career.constants";

/**
 * Right column: the hairline-ruled list of programme highlights.
 *
 * Rules come from a `border-t` on the list plus a `border-b` on each row, so the
 * first and last rules sit flush with the list's edges without a trailing double
 * border.
 *
 * **The arrow is aligned to the first line, not to the row.** On a 320px screen the
 * two longest labels wrap, and a centred marker then sits in the gap between their
 * two lines pointing at nothing. `items-start` with a 4px nudge puts it level with
 * the first line's optical centre — which on the single-line rows that every wider
 * screen gets is the same place `items-center` put it.
 */
export function CareerHighlightList() {
  return (
    <ul
      data-career="list"
      className="w-full list-none border-t border-hairline lg:shrink lg:basis-[35rem]"
    >
      {careerHighlights.map((highlight) => (
        <li
          key={highlight.id}
          data-career="item"
          // Tight on phones by design: stacked, these five rows read as one list, and
          // the airier `py-6` spaced them far enough apart that they scanned as five
          // separate blocks. `py-3.5` on a 1.0625rem/1.5 label still clears the 44px
          // touch-target minimum (14 + 26 + 14 = 54px) even before a label wraps.
          className="flex items-start gap-4 border-b border-hairline py-3.5 font-display text-[1.0625rem] font-medium text-ink sm:py-4 sm:text-lg"
        >
          <ArrowIcon
            direction="right"
            // 24×18 keeps the glyph's own 21:16 box unsquashed; a square box here
            // would letterbox it and quietly shrink the arrow instead.
            className="mt-1 h-[18px] w-[24px] shrink-0 text-brand"
          />
          {highlight.label}
        </li>
      ))}
    </ul>
  );
}
