import { CheckIcon } from "@/components/ui/check-icon";
import { dashboardChecklistRows } from "../constants/dashboard.constants";

/**
 * The two rows of ticked dashboard capabilities — centred from `990px`, left-aligned
 * below it so the ticks line up in one column instead of zig-zagging.
 *
 * `990px` is where the first row stops fitting on one line (see `DashboardSection`),
 * which is a different threshold from the `700px` the labels use to stop wrapping.
 *
 * **Below it the rows are columns, not wrapped rows.** Left-aligning a wrapping row
 * only lines up whichever item starts each line — the other ticks still land wherever
 * the wrap put them, which was four different left edges at 780px. One item per line
 * is what puts all seven ticks in a single column. The two lists then read as one
 * list, so their own gap matches the gap between them.
 *
 * Rows are separate lists rather than one wrapping list: the split is chosen so both
 * lines come out close in width, and letting the browser reflow a single list would
 * throw that balance away.
 *
 * Items are `nowrap` so a label never breaks mid-phrase, except below `700px` where
 * the longest one ("Hackathons & Internship Applications") cannot fit on one line.
 */
export function DashboardChecklist() {
  return (
    <div
      data-dashboard="checklist"
      className="flex w-full flex-col items-start gap-6 min-[990px]:items-center min-[990px]:gap-8"
    >
      {dashboardChecklistRows.map((row) => (
        // The column gap is fluid, not a flat value. A flat 70px would need 1029px for
        // the first row's four items against the 1040px available at most, leaving no
        // margin before a narrower viewport drops "Product Showcases" onto a line of
        // its own — the container is capped so it cannot absorb the difference. The
        // clamp keeps the rows airy while guaranteeing they stay on one line.
        <ul
          key={row.id}
          className="flex w-full list-none flex-col items-start gap-y-6 min-[990px]:flex-row min-[990px]:flex-wrap min-[990px]:items-center min-[990px]:justify-center min-[990px]:gap-x-[clamp(1.5rem,4vw,3rem)]"
        >
          {row.items.map((item) => (
            <li
              key={item}
              data-dashboard="checklist-item"
              className="inline-flex items-start gap-3 font-display text-lg font-medium whitespace-normal text-ink min-[700px]:items-center min-[700px]:whitespace-nowrap"
            >
              <CheckIcon className="h-6 w-6 shrink-0 text-brand" />
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
