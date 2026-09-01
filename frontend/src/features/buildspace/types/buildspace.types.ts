/**
 * One image layer in the scene.
 *
 * Position and size are percentages of the scene box, which is why the scene keeps a
 * fixed aspect ratio — the whole arrangement then scales as one piece.
 *
 * Only the width is given: height follows the artwork's own ratio. The reference sizes
 * these with a fixed box plus `object-contain`, which comes to the same rendered
 * rectangle, but this way the layer needs no height to lay out — so the same numbers
 * still work on phones, where the scene stops being a fixed-ratio box at all.
 */
export type BuildspaceLayer = {
  image: string;
  /** Intrinsic pixel size of the artwork, for `next/image`. */
  width: number;
  height: number;
  /** Position within the scene, as a percentage of its box. */
  left: number;
  top: number;
  /** Rendered width, as a percentage of the scene. */
  size: number;
};

/** One floating feature card. */
export type BuildspaceCard = BuildspaceLayer & {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  /**
   * What the card shows. Used as the image's alt text.
   *
   * The visible label ("Workspace", "AI Review", …) is baked into the artwork, so this
   * is the only place that name exists as text a screen reader can reach.
   */
  label: string;
};

/**
 * The subtitle is split so the middle phrase can be rendered as a solid brand-red
 * badge without putting markup in the copy.
 */
export type BuildspaceSubtitleCopy = {
  lead: string;
  badge: string;
  trail: string;
};

/**
 * The heading is split so the trailing word can be rendered in the accent serif and
 * brand red, matching the hero, showcase and ecosystem sections.
 */
export type BuildspaceHeadingCopy = {
  lead: string;
  accent: string;
};
