/**
 * How a card is placed in the grid.
 *
 * - `default` — one column.
 * - `featured` — one column, but it breaks the row's top and bottom line so it reads
 *   as the centre of the block. It is the only card on a white ground.
 * - `wide` — spans the full grid.
 */
export type GlobalAmbitionCardSize = "default" | "featured" | "wide";

/** One opportunity card. */
export type GlobalAmbitionCard = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  /** The small red label above the title: the kind of opportunity this is. */
  track: string;
  title: string;
  description: string;
  /**
   * The card's artwork.
   *
   * `width` / `height` are the file's real pixels. They are not layout — the media
   * box sizes itself — but `next/image` needs them to reserve the right ratio, and
   * they are what makes a wrong crop obvious when one of these files is replaced.
   */
  image: {
    src: string;
    width: number;
    height: number;
  };
  /** The card's background, as a CSS `background` value. */
  tint: string;
  size: GlobalAmbitionCardSize;
  /**
   * Inset classes for the artwork inside the media track the card reserves, per card.
   *
   * Carried as data rather than derived from `size`, because every one of these
   * renders is cropped differently — the ICPC medal is tall and centred, the laptop
   * and the GSoC packet are cut off by the card's right edge, the internship badge
   * hangs off it. There is no scale these belong to, and inventing presets would
   * only hide the numbers from the card they describe.
   */
  mediaClassName: string;
};

/**
 * The section heading is split so the last word can carry the brand red, matching
 * every other two-tone heading on the page.
 */
export type GlobalAmbitionHeadingCopy = {
  lead: string;
  accent: string;
};
