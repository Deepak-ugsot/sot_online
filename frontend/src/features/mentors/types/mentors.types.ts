/** A company logo shown in the marquee. */
export type CompanyLogo = {
  /** Also the React key, and the name used in the screen-reader summary. */
  name: string;
  src: string;
  /** Intrinsic pixel dimensions — passed to `next/image` so it reserves the right box. */
  width: number;
  height: number;
};

/** Which way a marquee row travels. */
export type MarqueeDirection = "left" | "right";

/** One scrolling row of logos. */
export type MentorsMarqueeRow = {
  id: string;
  direction: MarqueeDirection;
  /**
   * Seconds for one full loop. Deliberately different per row — identical durations
   * would let the rows line up and read as one moving block rather than three.
   */
  durationSeconds: number;
  logos: readonly CompanyLogo[];
};
