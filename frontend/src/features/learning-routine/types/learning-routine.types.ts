/**
 * The heading, in the two lines the design sets it on, with "24 months" in brand red
 * like every other two-tone heading on the page.
 */
export type LearningRoutineHeadingCopy = {
  /** First line, up to the accent. */
  lead: string;
  /** "24 months" — closes the first line. */
  accent: string;
  /** The second line. */
  nextLine: string;
};

/** One part of the class model: its render, what it is, and what it does. */
export type LearningRoutineItem = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  title: string;
  description: string;
  /**
   * The little lit render beside the copy — an illustration in the next-opportunity
   * benefits' style, not a glyph, so it cannot be swapped for a Lucide icon. Every
   * file is 95px wide; the heights differ, and the row centres each on its copy.
   */
  icon: {
    src: string;
    width: number;
    height: number;
  };
};

/** The dark "Your Learning Routine" card. */
export type LearningRoutineArtwork = {
  src: string;
  /**
   * Written out rather than left empty: the card's labels are pixels, and the cycle
   * they describe — the order the four parts repeat in — is said nowhere else.
   */
  alt: string;
  width: number;
  height: number;
};
