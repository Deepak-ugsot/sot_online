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
  | "career";

/**
 * Height of a tile's media panel.
 *
 * This is the only knob that tunes the masonry: the three columns hold different
 * numbers of tiles, and these heights are what bring their bottoms back level.
 */
export type CareerOsMediaHeight = "short" | "medium" | "tall";

/** One capability tile: illustration panel, title, description. */
export type CareerOsFeature = {
  kind: "feature";
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  illustration: CareerOsIllustrationName;
  media: CareerOsMediaHeight;
  title: string;
  description: string;
};

/** The red call-to-action tile. One per grid — it is the composition's focal point. */
export type CareerOsSpotlight = {
  kind: "spotlight";
  id: string;
  title: string;
  description: string;
  href: string;
};

/** Anything the grid can render in a column. */
export type CareerOsTile = CareerOsFeature | CareerOsSpotlight;

/** One vertical stack of tiles at three columns. */
export type CareerOsColumn = readonly CareerOsTile[];
