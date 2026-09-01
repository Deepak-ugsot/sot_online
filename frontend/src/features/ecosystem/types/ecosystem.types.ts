/** One partner logo card in the fanned collage. */
export type EcosystemLogo = {
  /** Stable React key — also the filename in `public/assets/ecosystem/`. */
  id: string;
  /** Brand name. Used as the image's alt text, so it is real content. */
  name: string;
  image: string;
  /** Intrinsic pixel size of the artwork, for `next/image`. */
  width: number;
  height: number;
  /**
   * Fan angle in degrees at full strength. The cards overlap, so this is the whole
   * scatter effect — see `EcosystemCollage` for why it travels as a custom property,
   * and why narrow viewports scale it rather than carrying angles of their own.
   */
  rotation: number;
};

/** One figure in the stat bar. */
export type EcosystemStat = {
  /** What is being counted, e.g. "Learners". The `<dt>`. */
  label: string;
  /** The figure itself, e.g. "10 M+". The `<dd>`. */
  value: string;
};

/**
 * The heading is split so the trailing phrase can be rendered in the accent serif and
 * brand red, matching the hero, showcase and gallery sections.
 */
export type EcosystemHeadingCopy = {
  lead: string;
  accent: string;
};
