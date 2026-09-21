/**
 * The headline, in the three parts the design sets in three different ways: an ink
 * line, a red word, and the prize reversed out of a red plate beside it.
 */
export type HackathonsHeadingCopy = {
  /** "Build. Compete." — the first line, in ink. */
  lead: string;
  /** "Win." — the red word that opens the second line. */
  accent: string;
  /** "₹20 Lakhs" — white on the brand-red plate. */
  prize: string;
};

/** The block under the paragraph: when it happens, and what it is. */
export type HackathonsCadence = {
  /** "Every 6 months" — bold, over the short red rule. */
  label: string;
  /** One string per line; the design breaks between them on purpose. */
  lines: readonly string[];
};

/** The student in the headset. */
export type HackathonsArtwork = {
  src: string;
  /**
   * Written out rather than left empty: the headset's own "Hack. Build. Solve. Win."
   * is part of what the picture says, and it appears nowhere else in the section.
   */
  alt: string;
  /** The file's real pixels, so `next/image` reserves the right ratio. */
  width: number;
  height: number;
};
