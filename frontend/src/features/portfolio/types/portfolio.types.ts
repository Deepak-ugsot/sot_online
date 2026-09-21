/**
 * The heading, in the design's two lines: the ink claim, then the red payoff — which is
 * the whole of the second line rather than one word of it.
 */
export type PortfolioHeadingCopy = {
  /** "Build. Showcase." */
  lead: string;
  /** "Get Noticed." — set in brand red on its own line. */
  accent: string;
};

/** The laptop with the finished portfolio on it and its parts floating round it. */
export type PortfolioArtwork = {
  src: string;
  /**
   * Written out rather than left empty: the cards name what a portfolio is made of —
   * tech stack, projects, open source, achievements, a live URL — which the paragraph
   * only gestures at.
   */
  alt: string;
  /** The file's real pixels, so `next/image` reserves the right ratio. */
  width: number;
  height: number;
};
