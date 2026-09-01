/** One programme track in the journey gallery. */
export type JourneyTrack = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  /** Year pill shown in the card's top corner, e.g. "1st Year". */
  year: string;
  /** Revealed over the image while the card is the expanded one. */
  title: string;
  /** Path into `public/assets/curriculum/`. */
  image: string;
};

/**
 * The heading is split so the trailing phrase can be rendered in the accent serif and
 * brand red, matching the hero, showcase and ecosystem sections.
 */
export type JourneyHeadingCopy = {
  lead: string;
  accent: string;
};
