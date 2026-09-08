/** One stage of the two-year journey, rendered as a full-width card. */
export type GalleryCard = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  /** Large display text over the media panel. `\n` renders as a line break. */
  overlay: string;
  title: string;
  description: string;
  /**
   * Path into `public/assets/Journey/`.
   *
   * Optional: a card with no artwork yet renders on its gradient alone, which is a
   * finished-looking panel rather than a broken one. Add the file and the photo takes
   * over with no other change.
   */
  image?: string;
  /**
   * CSS `background-image` for the media panel, shown behind the photo.
   *
   * It does three jobs: it fills the panel while the photo loads, it stands in
   * entirely for a card that has no photo yet, and it keeps the overlay text legible
   * either way — so the card never flashes white and never looks broken.
   *
   * Carried as data rather than a utility class because each card has its own
   * bespoke three-stop gradient — there is no scale or token these belong to, and
   * inventing six one-off classes would only hide them from the card data.
   */
  gradient: string;
};

/**
 * The section heading is split so the second line can carry the brand red, matching
 * the hero and career sections.
 */
export type GalleryHeadingCopy = {
  lead: string;
  accent: string;
};
