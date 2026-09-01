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
      className="w-full list-none border-t border-hairline lg:shrink lg:basis-[29.8rem]"
    >
      {careerHighlights.map((highlight) => (
        <li
          key={highlight.id}
          data-career="item"
          className="flex items-start gap-4 border-b border-hairline py-5 font-display text-[1.0625rem] font-medium text-ink sm:text-lg"
        >
          <ArrowIcon
            direction="right"
            className="mt-1 h-[18px] w-[18px] shrink-0 text-brand"
          />
          {highlight.label}
        </li>
      ))}
    </ul>
  );
}
