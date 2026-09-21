import Image from "next/image";

import type { Leader } from "../types/leaders.types";

/**
 * One leader: the portrait, cut on its diagonal, with the caption set in the corner the
 * cut leaves open.
 *
 * **Portrait and caption share one grid cell.** A grid cell is as tall as its tallest
 * occupant, so a caption that wraps to more lines than the design's — a phone, a longer
 * bio — pushes the card down instead of spilling out of it, which an absolutely
 * positioned caption would do.
 *
 * **The caption is placed in the portrait's own proportions.** Its margins are
 * percentages, and a `margin-top` percentage resolves against the *width* of the cell,
 * not its height — which is what lets one number put the caption's first line at the
 * same point on the portrait at every card width. The numbers are the design's own,
 * measured on the 360×571 frame: the name's cap line at y≈409 and the column at x≈177,
 * both just clear of the cut.
 *
 * The type scales with the card for the same reason (the figure is the query container,
 * and `cqw` is a percentage of its width), so the caption keeps its place in the
 * composition instead of outgrowing the corner. Each size has a floor so it never drops
 * below readable; below the design's width it wraps to more lines rather than shrinking
 * further. The name alone does not wrap — the design lets it run past the bio's measure
 * ("Mehul Khandhedia" does), and a two-line name in that corner reads as two people.
 */
export function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <li
      data-leaders="card"
      // Widths per layout: one column, then two (the third centred beneath), then
      // three. `22.5rem` is the portrait file's own width — past it the photo only
      // softens, and the caption's type has already reached its design size.
      className="w-full max-w-[22.5rem] sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-5rem)/3)]"
    >
      <figure className="@container grid">
        <Image
          src={leader.portrait.src}
          alt={leader.portrait.alt}
          width={leader.portrait.width}
          height={leader.portrait.height}
          sizes="(min-width: 640px) 22.5rem, calc(100vw - 2.5rem)"
          className="col-start-1 row-start-1 h-auto w-full select-none"
        />

        {/*
          `mr-[8.2%]` is the bio's measure (~153px on the 360px frame), and it is pinned
          from both sides by the design's own line breaks: "Curated 35,000+ career" has to
          fit on one line (151px) and "Amazon, PayPal, Walmart," must not (156px). Measured
          against the fallback face — Neue Montreal 404s in this repo, see `globals.css` —
          so measure again if that file lands.
        */}
        <figcaption className="col-start-1 row-start-1 mt-[112.2%] mr-[8.2%] ml-[49.2%] self-start font-display">
          <h3 className="text-[clamp(0.9375rem,5cqw,1.125rem)] leading-[1.25] font-bold whitespace-nowrap text-brand">
            {leader.name}
          </h3>

          <p className="mt-[0.43em] text-[clamp(0.75rem,3.61cqw,0.8125rem)] leading-[1.31] font-semibold text-ink">
            {leader.roles.map((role) => (
              <span key={role} className="block">
                {role}
              </span>
            ))}
          </p>

          <p className="mt-[0.27em] text-[clamp(0.75rem,3.61cqw,0.8125rem)] leading-[1.31] text-ink-muted">
            {leader.bio}
          </p>
        </figcaption>
      </figure>
    </li>
  );
}
