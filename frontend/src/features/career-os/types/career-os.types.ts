/** One portrait in the Connect & Grow cohort strip. */
export type CareerOsCommunityMember = {
  /** Stable React key. */
  id: string;
  /** Path under `public/`. Every file is square, so one size serves every use. */
  src: string;
};

/** Which illustration a feature tile draws in its media panel. */
export type CareerOsIllustrationName =
  | "learn"
  | "build"
  | "practice"
  | "compete"
  | "connect"
  | "contribute"
  | "track"
  | "prepare";

/**
 * Height of a tile's media panel.
 *
 * This is the only knob that tunes the masonry: the middle column holds two tiles
 * against the outer columns' three, and these heights are what bring their bottoms
 * back level.
 *
 * The outer columns are deliberately the same multiset — `short short medium` — so
 * they balance against each other for free, whatever the numbers end up being. Only
 * `tall` is then left to solve for.
 */
export type CareerOsMediaHeight = "short" | "medium" | "tall";

/** One capability tile: illustration panel, title, description. */
export type CareerOsFeature = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  illustration: CareerOsIllustrationName;
  media: CareerOsMediaHeight;
  title: string;
  description: string;
};

/** One vertical stack of tiles at three columns. */
export type CareerOsColumn = readonly CareerOsFeature[];
