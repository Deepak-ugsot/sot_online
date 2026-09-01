import { cn } from "@/lib/utils";
import { ecosystemStats } from "../constants/ecosystem.constants";

/**
 * The figures beneath the collage.
 *
 * A `<dl>`: each entry is a term ("Learners") and its value ("10 M+"), which is
 * exactly what a description list is for. The `<dt>` comes first in the DOM so a
 * screen reader announces "Learners, 10 M+", and `flex-col-reverse` puts the figure
 * on top visually without reordering the markup. Wrapping each pair in a `<div>`
 * inside a `<dl>` is valid, and is what lets the pair be laid out as one grid cell.
 *
 * **The rules only appear once the whole set is on a single row.** Below `xl` the grid
 * wraps, and a left-hand rule would then fall down the middle of a row rather than
 * between two neighbours — so the columns are separated by space alone there.
 *
 * **Seven columns wait for `xl` because that is where the container stops growing.**
 * At 1280px each column is 176px, which is the first width that clears the widest
 * figure ("3000+", 136px at full size) with its padding. Showing seven any earlier
 * pushed that figure out over its own rule.
 *
 * The figure is fluid for the same reason: at the narrowest widths a flat 40px
 * overflows a half-width column, so it eases down to 32px there and is back at its
 * designed 40px from 667px up — before the grid ever reaches four columns.
 *
 * **Seven items over two columns leave one orphan, so the last one spans the row.**
 * Left in a single column it sat under the left-hand figure with a hole beside it,
 * reading as a dropped cell rather than the end of the list. The span only applies
 * while the grid is two columns wide; from `md` up the last row is genuinely partial
 * and is left as it falls.
 */
export function EcosystemStats() {
  return (
    <dl
      data-ecosystem="stats"
      className="grid w-full grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-10 xl:grid-cols-7 xl:gap-y-0"
    >
      {ecosystemStats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            // `justify-end` is the *top* of a reversed column: it pins the figures
            // to a shared line so a two-line label ("Corporate clients trained
            // annually") pushes its own label down rather than shoving its figure
            // out of step with the one beside it.
            "flex flex-col-reverse items-center justify-end gap-3 px-2 text-center md:gap-5 xl:px-4",
            index === ecosystemStats.length - 1 && "max-md:col-span-2",
            index > 0 && "xl:border-l xl:border-white/15",
          )}
        >
          <dt className="font-display text-sm text-white md:text-base">
            {stat.label}
          </dt>
          <dd className="m-0 font-display text-[clamp(2rem,6vw,2.5rem)] leading-none font-semibold whitespace-nowrap text-brand">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
