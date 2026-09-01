/** One metric card in the readiness row. */
export type ReadinessMetric = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  /** Sits over the image, always visible. */
  label: string;
  /** Revealed under the label on hover. */
  description: string;
  /** Path into `public/assets/Career/`. */
  image: string;
  /**
   * CSS `background-image` for the panel behind the photo.
   *
   * Fills the card while the photo loads and if it fails, so a card never flashes
   * white behind its gradient body.
   */
  gradient: string;
};
