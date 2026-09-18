import Image from "next/image";

import { CATALYST_MARQUEE_SECONDS } from "../constants/what-is-catalyst.constants";
import type { CatalystEmployerLogo } from "../types/what-is-catalyst.types";

/**
 * How many copies of the logo set the row holds.
 *
 * **Three, not two, and the number is a constraint rather than a preference.** Each
 * track travels a full -100% of its own width, so at the end of a cycle the remaining
 * `copies - 1` tracks are all that is left covering the window: the row only loops
 * seamlessly while `(copies - 1) x trackWidth` is at least as wide as the window. The
 * six marks measure about 770px; between `sm` and `lg` this column is the full page
 * width and reaches ~975px, which two copies cannot cover and three can.
 */
const TRACK_COPIES = 3;

type CatalystEmployerMarqueeProps = {
  logos: readonly CatalystEmployerLogo[];
};

type EmployerTrackProps = {
  logos: readonly CatalystEmployerLogo[];
  /**
   * `true` for every copy after the first.
   *
   * A marquee needs the same content two or three times over to loop, but a screen
   * reader must hear the list once — otherwise the six employers are read out three
   * times in a row. The duplicates are hidden from assistive tech and their images
   * carry an empty `alt`, so only the first copy is content.
   */
  duplicate?: boolean;
};

/** One copy of the logo set. */
function EmployerTrack({ logos, duplicate = false }: EmployerTrackProps) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      style={{ animationDuration: `${CATALYST_MARQUEE_SECONDS}s` }}
      className={[
        "flex w-max shrink-0 items-center",
        "motion-safe:animate-marquee-left",
        // Stops the drift while the pointer is over the band, so a reader who wants
        // to look at one mark is not chasing it across the column.
        "group-hover:[animation-play-state:paused]",
        // Under reduced motion nothing moves, so the row would simply be clipped at
        // the column's edge and the last mark or two would be unreachable. The copies
        // drop out and the single remaining one wraps instead — same six logos, no
        // motion, nothing lost.
        "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:gap-y-5",
        duplicate ? "motion-reduce:hidden" : "",
      ].join(" ")}
    >
      {logos.map((logo) => (
        // The gap is the item's own right padding rather than a `gap` on the track.
        // A `gap` sits *between* children, so there would be none between the last
        // mark of one copy and the first of the next — the seam would close up once
        // per cycle. Carried on the item, the spacing is inside the width the -100%
        // translation is measured from, so the rhythm holds across the join.
        <li key={logo.id} className="shrink-0 pr-10 sm:pr-14">
          <Image
            src={logo.src}
            // The mark *is* the content here — the line above the band ends on
            // "worked at", and these names finish it.
            alt={duplicate ? "" : logo.name}
            width={logo.width}
            height={logo.height}
            // Every file in the set is 177px tall, so one height lets each width
            // follow and the marks share an optical size with no per-logo nudge.
            className="h-7 w-auto object-contain sm:h-8"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * The employer marks, drifting leftward for as long as the section is on screen.
 *
 * **It moves rather than scrolls because the row is wider than the column it sits in.**
 * Six marks at a legible height measure past 750px against roughly 600px of a half-page
 * column, so something had to give: shrinking them until their own type stopped being
 * readable, wrapping them onto a second line — which turns a one-line credential into a
 * block — or letting the row run. A marquee keeps every mark at one optical height at
 * every width and needs no affordance at all, since nothing is waiting to be operated.
 *
 * The loop is the same trick the `real-world` ribbons and the `one-program` rails use:
 * identical tracks side by side, each translated a full -100% of its own width, so when
 * one has slid exactly off the left its neighbour is standing precisely where it began.
 * It only holds while every copy renders the same logos — see `TRACK_COPIES` for how
 * many are needed and why.
 *
 * A Server Component: the motion is a CSS animation, and hovering to pause it is a CSS
 * `group` away.
 */
export function CatalystEmployerMarquee({ logos }: CatalystEmployerMarqueeProps) {
  return (
    <div className="group relative">
      {/* `overflow-hidden` is the window the band passes behind. It is dropped under
          reduced motion, where the row wraps instead of running. */}
      <div className="flex overflow-hidden motion-reduce:overflow-visible">
        {Array.from({ length: TRACK_COPIES }, (_, copy) => (
          <EmployerTrack key={copy} logos={logos} duplicate={copy > 0} />
        ))}
      </div>

      {/*
        The window's edges, so marks enter and leave rather than being cut off mid-
        wordmark. The colour is the section's own ground — these are a crop, not a
        gradient of their own — and they are gone under reduced motion, where there is
        no edge for anything to cross.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-surface to-transparent motion-reduce:hidden"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface to-transparent motion-reduce:hidden"
      />
    </div>
  );
}
