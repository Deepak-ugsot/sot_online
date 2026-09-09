import { oneProgramRails } from "../constants/one-program.constants";
import type { OneProgramRail } from "../types/one-program.types";
import { OneProgramCard } from "./one-program-card";

type TrackProps = {
  rail: OneProgramRail;
  /** The duplicate. Hidden from the accessibility tree — see `OneProgramRails`. */
  clone?: boolean;
};

/**
 * The animation utilities per direction, written out in full because Tailwind cannot
 * build class names at runtime — `animate-marquee-${direction}` compiles to nothing.
 * All four keyframes are declared in `globals.css`.
 *
 * A rail's direction is one idea expressed on whichever axis the layout is using: `up`
 * is up in a column and left in a row, `down` is down and right. Both are "away from the
 * reading origin" and "back toward it" respectively, so a rail keeps its relationship to
 * its neighbours across the breakpoint even though the axis flips.
 */
const DIRECTION_CLASSES: Record<OneProgramRail["direction"], string> = {
  up: "motion-safe:max-sm:animate-marquee-left motion-safe:sm:animate-marquee-up",
  down: "motion-safe:max-sm:animate-marquee-right motion-safe:sm:animate-marquee-down",
};

/**
 * One copy of a rail's tiles — a column from `sm`, a row below it.
 *
 * **The gap between tiles lives inside the track, and so does the one after the last
 * tile** — that is what the trailing `pb-4` / `pr-4` is, and it is load-bearing. The loop
 * works by translating a track exactly -100% of its own length, so the track has to
 * measure the full repeat. Put the trailing gap on the parent as a `gap` instead and
 * every cycle lands 16px short, which shows as the whole rail jolting once per loop.
 *
 * The period arrives as an inline `animationDuration` rather than a class: it is a
 * per-rail number from the constants file, and enumerating three arbitrary durations as
 * Tailwind classes would put content data into a style map. It is read against the
 * track's own length, so one number gives a comparable speed on either axis.
 */
function OneProgramTrack({ rail, clone = false }: TrackProps) {
  return (
    <ul
      aria-hidden={clone || undefined}
      style={{ animationDuration: `${rail.seconds}s` }}
      className={`flex shrink-0 flex-col gap-4 pb-4 group-hover:[animation-play-state:paused] motion-safe:max-sm:flex-row motion-safe:max-sm:pr-4 motion-safe:max-sm:pb-0 ${DIRECTION_CLASSES[rail.direction]} ${clone ? "motion-reduce:hidden" : ""}`}
    >
      {rail.items.map((item) => (
        <OneProgramCard key={item.id} capability={item} />
      ))}
    </ul>
  );
}

/**
 * The three drifting rails of capability tiles — columns on a desktop, rows on a phone.
 *
 * **Each rail holds two identical tracks.** Translating a track a full -100% of its own
 * length moves it exactly its own measure, which puts its twin precisely where it began —
 * so the cycle restarts with no visible jump. The same trick the logo marquee uses, and
 * it holds only while both tracks render the same tiles. The duplicate is `aria-hidden`,
 * so a screen reader meets the eighteen capabilities once rather than thirty-six times.
 *
 * **The axis flips below `sm`, it does not just get narrower.** Three columns sharing a
 * phone's width leave each tile about 100px — enough to render, but the labels break to
 * three lines and the icons shrink to the point where the density stops reading as
 * abundance and starts reading as clutter. Turned on their side the same eighteen tiles
 * get a full 136px each and scroll through the one dimension a phone actually has to
 * spare. It is the same three rails either way: same tiles, same order, same periods —
 * only `flex-direction` and the axis of the keyframes change.
 *
 * The drift pauses on hover. The labels are short but they are moving, and a reader who
 * has stopped on one has said what they want.
 *
 * **Under reduced motion the whole device unwinds rather than freezing mid-drift.** A
 * stopped marquee is a rail clipped at both ends by a fade, which reads as broken rather
 * than as still. So every moving part is gated behind `motion-safe` and nothing is left
 * to override: no animation, no clone, no mask, no fixed height, and the mobile axis
 * flip does not happen either. What is left at every width is three plain columns of
 * tiles — which is what the section is underneath, and the reason the fallback needs no
 * horizontal scrolling of its own.
 */
export function OneProgramRails() {
  return (
    /*
      `overflow-hidden` is unconditional and safe to leave that way: under reduced motion
      the height is unset and the rails are ordinary columns, so there is nothing outside
      the box to clip.
    */
    <div
      data-one-program="rails"
      className="group flex gap-3 overflow-hidden motion-safe:max-sm:flex-col motion-safe:max-sm:gap-4 motion-safe:max-sm:[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-safe:sm:h-[clamp(26rem,42vw,32rem)] motion-safe:sm:[mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] sm:gap-4"
    >
      {oneProgramRails.map((rail) => (
        /*
          `min-w-0` on the column: without it a flex child refuses to shrink below the
          intrinsic width of its widest tile, and "Open Source + GSoC Guidance" would
          push the three columns past a narrow viewport.

          No `gap` here on purpose — the two tracks have to meet flush for the loop to
          close. See `OneProgramTrack`.

          The middle rail starts nudged back by half a tile so the three are not aligned
          in a row on the first frame, before anything has moved. On the same axis the
          rail travels, so it is a top offset in a column and a left one in a row.
        */
        <div
          key={rail.id}
          className={`flex min-w-0 flex-1 flex-col motion-safe:max-sm:w-full motion-safe:max-sm:flex-none motion-safe:max-sm:flex-row ${rail.direction === "down" ? "motion-safe:max-sm:-ml-10 motion-safe:sm:-mt-10" : ""}`}
        >
          <OneProgramTrack rail={rail} />
          <OneProgramTrack rail={rail} clone />
        </div>
      ))}
    </div>
  );
}
