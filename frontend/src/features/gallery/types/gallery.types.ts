/** One stage of the two-year journey, rendered as a full-width card. */
export type GalleryCard = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  /** Large display text over the media panel. `\n` renders as a line break. */
  overlay: string;
  title: string;
  description: string;
  /** Path into `public/assets/Journey/`. */
  image: string;
  /**
   * CSS `background-image` for the media panel, shown behind the photo.
   *
   * Not dead weight now that there is an image: it fills the panel while the photo
   * loads and if the photo fails, so the card never flashes white and the overlay
   * text stays legible either way.
   *
   * Carried as data rather than a utility class because each card has its own
   * bespoke three-stop gradient — there is no scale or token these belong to, and
   * inventing four one-off classes would only hide them from the card data.
   */
  gradient: string;
};

/**
 * The section heading is split so the second line can be rendered in the accent
 * serif and brand red, matching the hero and career sections.
 */
export type GalleryHeadingCopy = {
  lead: string;
  accent: string;
};
