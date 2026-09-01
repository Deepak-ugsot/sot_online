/** One project card in the marquee. Every card shares the same footprint. */
export type ShowcaseProject = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  title: string;
  description: string;
  /** TEMPORARY — placeholder photography. See `@/lib/placeholder-image`. */
  image: string;
};

/**
 * The heading is split so the middle word can be rendered in the accent serif and
 * brand red, matching the hero, career and gallery sections.
 */
export type ShowcaseHeadingCopy = {
  lead: string;
  accent: string;
  trail: string;
};
