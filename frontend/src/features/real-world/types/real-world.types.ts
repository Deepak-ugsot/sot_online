/**
 * The heading is split so its last phrase can be set in brand red, matching the hero,
 * curriculum, early-start and ecosystem sections.
 */
export type RealWorldHeadingCopy = {
  /** First line, set whole. */
  lead: string;
  /** Second line up to the accent. */
  trail: string;
  /** The red phrase that closes the second line. */
  accent: string;
};

/**
 * One label on a ribbon — a thing students actually do, named in two or three words.
 *
 * No colour here: the ribbon alternates black and red strictly down its length, so a
 * chip's ground is a function of its position and nothing else. Authoring it per
 * experience would let the two disagree.
 */
export type RealWorldExperience = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  label: string;
};

/**
 * One of the two crossing ribbons.
 *
 * Both render the same experiences in the same order. What separates them is purely
 * geometric — where they sit, how far they tilt, which way they travel and how fast —
 * so a ribbon is a placement, not a second copy of the content.
 */
export type RealWorldRibbon = {
  id: string;
  /**
   * Vertical centre as a percentage of the stage, before rotation. The pair is set so
   * the ribbons almost touch at the left edge and fan apart to the right.
   */
  top: number;
  /** Tilt in degrees. Negative climbs to the right, positive falls to the right. */
  angle: number;
  /** Which way the labels travel. */
  direction: "leftward" | "rightward";
  /** Seconds for one full repeat. The two differ so the pair never falls into step. */
  seconds: number;
};
