import { realWorldExperiences } from "../constants/real-world.constants";
import type { RealWorldRibbon as Ribbon } from "../types/real-world.types";
import { buildRibbonTrack, type RealWorldSegment } from "../utils/real-world.utils";

/**
 * The animation utility per direction, written out in full because Tailwind cannot build
 * class names at runtime — `animate-marquee-${direction}` compiles to nothing. Both
 * keyframes are declared in `globals.css` and shared with the One Program rails.
 *
 * `rightward` is `marquee-right` because that keyframe runs a track from -100% back to 0,
 * which carries its content across the screen from left to right.
 */
const DIRECTION_CLASSES: Record<Ribbon["direction"], string> = {
  rightward: "motion-safe:animate-marquee-right",
  leftward: "motion-safe:animate-marquee-left",
};

/**
 * The chips are sized in `vw` between a floor and a ceiling, and the three values are
 * written together here because they have to scale as one — split across call sites they
 * drift, and a chip whose padding has outgrown its type stops reading as a label.
 *
 * **The floors are set from the phone, not picked as round numbers.** What has to hold at
 * every width is the band's proportion to the stage: the design puts a chip at about a
 * fourteenth of the section's height, and a phone's stage is barely half a desktop's. Left
 * at a comfortable desktop floor the same chip took an eighth of a 375px composition and
 * the ribbons stopped being something the portrait stands behind.
 *
 * The ceilings are the design's own measurements at 1440px: a 203x56 chip against the
 * 200x56 it specifies.
 */
const CHIP_CLASSES =
  "flex shrink-0 items-center whitespace-nowrap px-[clamp(0.7rem,1.45vw,1.35rem)] py-[clamp(0.6rem,1.36vw,1.25rem)] font-display text-[clamp(0.6875rem,1.2vw,1.125rem)] leading-none text-white";

function RibbonSegment({ segment }: { segment: RealWorldSegment }) {
  return (
    <div className={`${CHIP_CLASSES} ${segment.tone === "brand" ? "bg-brand" : "bg-ink"}`}>
      {segment.label}
    </div>
  );
}

/**
 * One copy of a ribbon's chips.
 *
 * **The chips meet flush — there is no `gap` here, and there must not be one.** The loop
 * works by translating a track exactly -100% of its own width, and a ribbon is a
 * continuous band: a gap would both break the band into floating chips and, because the
 * trailing gap would sit outside the track's measured width, land every cycle a few
 * pixels short. The alternating black and red are what separate one label from the next;
 * nothing is drawn between them.
 *
 * The period arrives as an inline `animationDuration` rather than a class: it is a
 * per-ribbon number from the constants file, and enumerating arbitrary durations as
 * Tailwind classes would put content data into a style map. Same reasoning as the One
 * Program rails, which do the same thing.
 */
function RibbonTrack({ ribbon }: { ribbon: Ribbon }) {
  const segments = buildRibbonTrack(realWorldExperiences);

  return (
    <div
      style={{ animationDuration: `${ribbon.seconds}s` }}
      className={`flex shrink-0 items-stretch ${DIRECTION_CLASSES[ribbon.direction]}`}
    >
      {segments.map((segment) => (
        <RibbonSegment key={segment.key} segment={segment} />
      ))}
    </div>
  );
}

/**
 * One tilted, drifting ribbon of experience labels.
 *
 * **It holds two identical tracks.** Translating a track a full -100% of its own width
 * moves it exactly its own measure, which puts its twin precisely where it began — so the
 * cycle restarts with no visible jump. The trick only holds while both tracks render the
 * same chips, which is why both call `buildRibbonTrack` rather than being composed by
 * hand.
 *
 * **It is far wider than the stage, and that is what makes the tilt work.** A rotated band
 * the width of its container pulls its own corners inside the frame and leaves a wedge of
 * bare background at each edge. At `135%`, centred, both ends are outside the stage at
 * every angle the design uses, so the band reads as passing through rather than as
 * sitting in. The section clips it.
 *
 * Position and tilt arrive as an inline transform for the same reason the period does:
 * they are per-ribbon numbers that belong in the constants file. `translate` is written
 * before `rotate` so the band is moved into place and then turned about its own centre —
 * the other order turns the whole coordinate system first and sends the offsets off at an
 * angle.
 */
export function RealWorldRibbon({ ribbon }: { ribbon: Ribbon }) {
  return (
    <div
      style={{
        top: `${ribbon.top}%`,
        transform: `translate(-50%, -50%) rotate(${ribbon.angle}deg)`,
      }}
      className="absolute left-1/2 flex w-[135%]"
    >
      <RibbonTrack ribbon={ribbon} />
      <RibbonTrack ribbon={ribbon} />
    </div>
  );
}
