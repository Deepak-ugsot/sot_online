/** The two lines of the section heading, split so the second can carry the brand red. */
export type ReadinessHeadingCopy = {
  /** Set in `ink`. */
  lead: string;
  /** Set in `brand`, on its own line. */
  accent: string;
};

/** One step of the two-year programme, as a card in the row. */
export type ReadinessStep = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  /** Sits over the foot of the photo. */
  title: string;
  /** One line under the title, always visible. */
  description: string;
  /** Path into `public/assets/`. */
  image: string;
  /**
   * CSS `background-image` for the panel behind the photo.
   *
   * Fills the card while the photo loads and if it fails, so a card never flashes
   * white behind its gradient body. Each one is picked to sit close to its own
   * photograph, so the swap-in is a settle rather than a jump.
   */
  gradient: string;
};
