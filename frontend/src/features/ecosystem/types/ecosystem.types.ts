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
 * Three parts so the middle phrase can be rendered in the accent serif and brand red,
 * matching the hero, showcase and gallery sections, while `lead` and `tail` stay in
 * white. `tail` carries the line break as a `\n` — see `EcosystemSection`.
 */
export type EcosystemHeadingCopy = {
  lead: string;
  accent: string;
  tail: string;
};

/**
 * The closing line under the stats. Same three-part shape as the heading, but with no
 * line break — it is one sentence with the brand name picked out in red partway
 * through it.
 */
export type EcosystemClosingCopy = {
  lead: string;
  accent: string;
  tail: string;
};
