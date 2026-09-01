/** One opportunity card on the arc. */
export type Opportunity = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  title: string;
  description: string;
  /** Path under `public/assets/oppertunity/`. Decorative — the card renders `alt=""`. */
  image: string;
  /**
   * CSS `background-image` for the media panel, shown behind the photo.
   *
   * Fills the panel while the photo loads and if it fails, so a card never flashes
   * white as it swings through the arc.
   */
  gradient: string;
};
