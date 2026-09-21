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

/** A brand mark in the partnership lockup above the heading. */
export type NextOpportunityLogo = {
  src: string;
  /** The brand's name. The mark *is* the content, so this is never empty. */
  alt: string;
  /** The file's real pixels, so `next/image` reserves the right ratio. */
  width: number;
  height: number;
};

/**
 * The isometric Internshala scene: a laptop on a plinth inside a red panel, with the
 * things the platform opens up — internships, top companies, remote and on-site roles,
 * applying — floating round it on cards.
 *
 * **A cut-out on transparency.** The red panel is drawn in the file and the cards
 * overhang it, so the render needs no plate of its own and sits on any ground.
 */
export type NextOpportunityArtwork = {
  src: string;
  /**
   * What the render says, for a reader who cannot see it. Its cards name things the
   * copy does not ("Top Companies", "Opportunities Beyond Borders"), so it is written
   * out rather than left empty.
   */
  alt: string;
  width: number;
  height: number;
};
