/** "The **Top 10%** Get More / Than a Certificate" */
export type TopTenPercentHeadingCopy = {
  /** "The" — before the red run. */
  lead: string;
  /** "Top 10%" — the red run, mid-line. */
  accent: string;
  /** "Get More" — after the red run, same line. */
  trail: string;
  /** "Than a Certificate" — the second line. */
  nextLine: string;
};

export type TopTenPercentArtwork = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** The handwritten "3-month paid internship" note and the arrow pointing at the figure. */
export type TopTenPercentAnnotation = {
  note: TopTenPercentArtwork;
  arrow: TopTenPercentArtwork;
};
