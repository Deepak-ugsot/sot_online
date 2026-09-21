/**
 * The heading is split so its opening words can carry the brand red, and so the line
 * breaks where the design breaks it — after "Shaped", never inside the red run.
 */
export type LeadersHeadingCopy = {
  /** "Built by Leaders" — set in brand red. */
  accent: string;
  /** The rest of the first line. */
  trail: string;
  /** The second line. */
  nextLine: string;
};

/** One leadership portrait, with the caption set in the corner its cut leaves open. */
export type Leader = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  name: string;
  /**
   * Title lines, one string per line.
   *
   * An array because the design breaks some of these on purpose ("Visionary
   * entrepreneur" / "Co-founder, upGrad") where others simply wrap, and a `\n` inside
   * one string would be the one thing in the constants a copywriter could break
   * without noticing.
   */
  roles: readonly string[];
  /** The one-line record under the title. */
  bio: string;
  portrait: {
    src: string;
    /** Empty on purpose — see `leaders` in the constants for why. */
    alt: string;
    /** Intrinsic pixel size, so Next can reserve the box and avoid a layout shift. */
    width: number;
    height: number;
  };
};
