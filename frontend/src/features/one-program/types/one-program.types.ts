/** One capability tile in a drifting column. */
export type OneProgramCapability = {
  /** Stable React key — also the filename in `public/assets/one_program/`. */
  id: string;
  /** The capability's name, printed under the icon. Real content, so it is the alt text too. */
  label: string;
  image: string;
};

/**
 * A column drift, as a direction and a period.
 *
 * `up` and `down` map to the `marquee-up` / `marquee-down` keyframes in `globals.css`.
 * `seconds` is per column rather than shared: three rails on one duration drift in
 * lockstep and read as a single block sliding, which is the one thing the effect is
 * meant to avoid.
 */
export type OneProgramRail = {
  id: string;
  direction: "up" | "down";
  seconds: number;
  items: readonly OneProgramCapability[];
};

/**
 * Two parts so the first line can be set in the accent serif and brand red while the
 * second stays in ink — the same split the hero, gallery and ecosystem headings use.
 */
export type OneProgramHeadingCopy = {
  accent: string;
  tail: string;
};

/**
 * The price block. Split into its parts rather than one formatted string so the figure
 * can carry the display size and the rest cannot accidentally inherit it.
 */
export type OneProgramPricing = {
  /** The headline figure, e.g. "₹50,000". */
  amount: string;
  /** What the figure buys, e.g. "/year". Set small, beside the amount. */
  period: string;
  /** The line under it — total fee and the per-day equivalent. */
  footnote: string;
};

/** The section's call to action. */
export type OneProgramCta = {
  label: string;
  href: string;
};
