/**
 * The heading, split into the two lines the design sets it on, with the last word
 * carrying the brand red like every other two-tone heading on the page.
 *
 * The break is held in the data rather than left to the measure: "Your Next
 * Opportunity Could Be Anywhere." is short enough that a column a little wider or a
 * little narrower moves the break from after "Opportunity" to after "Could", and the
 * second reading is the wrong one — it strands "Be Anywhere." as a fragment.
 */
export type NextOpportunityHeadingCopy = {
  /** First line, whole. */
  lead: string;
  /** Second line, up to the accent. */
  trail: string;
  /** The red word that closes the heading. */
  accent: string;
};

/** One reason the opportunity could be anywhere. */
export type NextOpportunityBenefit = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  title: string;
  description: string;
  /**
   * The little 3D render beside the copy.
   *
   * These are illustrations, not icons in the site's usual sense: they are lit, they
   * carry their own red accent marks, and they are not on the grid or the weight any
   * Lucide glyph is drawn to — so they cannot be swapped for one. `width` / `height`
   * are the files' real pixels, which `next/image` needs to reserve the right ratio.
   */
  icon: {
    src: string;
    width: number;
    height: number;
  };
};

/**
 * The astronaut holding up the Internshala board over a globe.
 *
 * **Its ground is not transparent** — the file is a flat `#f3f4f6` plate, which is the
 * section's own `surface`. That is why it can be dropped straight onto the section
 * with no treatment and no plate of its own, and equally why the section's background
 * cannot be changed without the render showing up as a rectangle.
 */
export type NextOpportunityArtwork = {
  src: string;
  /**
   * What the render says, for a reader who cannot see it. It repeats the section's
   * own argument rather than describing the picture literally — "astronaut" is not
   * what it is there to say.
   */
  alt: string;
  width: number;
  height: number;
};
