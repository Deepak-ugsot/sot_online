/**
 * The section's artwork — the hand dealing out the six things the accelerator is made
 * of, cards and all.
 *
 * It is one flat render rather than six components, because that is what the design
 * ships: the cards' tilt, their drop shadows and the hand holding the top one are a
 * single lit composition, and rebuilding it in CSS can approximate the fan but not the
 * hand. The consequence is that every word on those cards is pixels, which is what
 * `alt` is for below.
 */
export type CatalystArtwork = {
  src: string;
  /**
   * What the render says, for a reader who cannot see it.
   *
   * Written out rather than left empty: this is not decoration beside copy that
   * already covers it — the six pillars appear nowhere else in the section, so an
   * empty `alt` would drop them from the page entirely.
   */
  alt: string;
  /**
   * The file's real pixels. Not layout — the media box sizes itself — but
   * `next/image` needs them to reserve the right ratio, and they are what makes a
   * wrong crop obvious when this file is replaced.
   */
  width: number;
  height: number;
};

/**
 * The section heading is split so the product's name can carry the brand red,
 * matching every other two-tone heading on the page.
 */
export type CatalystHeadingCopy = {
  lead: string;
  accent: string;
};

/** One brand mark in the "built by people who've worked at" marquee. */
export type CatalystEmployerLogo = {
  id: string;
  /** The company's name. Becomes the image's `alt` — these marks are the content. */
  name: string;
  src: string;
  /** The file's real pixels, so `next/image` reserves the right ratio. */
  width: number;
  height: number;
};
