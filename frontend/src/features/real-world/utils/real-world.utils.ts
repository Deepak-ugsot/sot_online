import type { RealWorldExperience } from "../types/real-world.types";

/** One chip on a ribbon: a label and the ground it sits on. */
export type RealWorldSegment = {
  key: string;
  label: string;
  tone: "ink" | "brand";
};

/**
 * How many times the experiences repeat inside a single track.
 *
 * Not a taste decision — it is the loop's covering constraint. The ribbon is laid out
 * as two identical tracks side by side and slid by exactly one track's width, so at the
 * extreme of the cycle only *one* track is covering the screen. A track therefore has to
 * be at least as wide as the ribbon's visible span, and the ribbon is deliberately wider
 * than the viewport so its rotated ends never expose a corner.
 *
 * One repeat of the six experiences measures roughly 1200px at the type's full size. At
 * three repeats a track is ~3600px, which covers the visible span of a stage up to about
 * 3000px wide — every desktop this will meet, with room over. Two repeats does not: it
 * lands around 2400px and starts showing a gap at the right edge of a wide display, where
 * the loop is otherwise invisible.
 *
 * Raise it if the type scale grows or an experience is removed; the cost is a handful of
 * static `div`s that never move on their own.
 */
const TRACK_REPEATS = 3;

/**
 * Expands the experiences into the chips of one track.
 *
 * **The colours alternate strictly by position**, black then red the whole way down, so
 * the ground is computed from the flat index rather than authored per experience — the
 * two cannot then disagree.
 *
 * The parity is read across the *whole track*, not per repeat, which is what keeps the
 * alternation running through the seam where one repeat meets the next. That holds as
 * long as the list has an even length: an odd one flips the phase on every repeat, and
 * two chips of the same colour end up adjacent where the loop closes.
 */
export function buildRibbonTrack(
  experiences: readonly RealWorldExperience[],
): readonly RealWorldSegment[] {
  const segments: RealWorldSegment[] = [];

  for (let repeat = 0; repeat < TRACK_REPEATS; repeat += 1) {
    experiences.forEach((experience) => {
      segments.push({
        key: `${repeat}-${experience.id}`,
        label: experience.label,
        tone: segments.length % 2 === 0 ? "ink" : "brand",
      });
    });
  }

  return segments;
}
