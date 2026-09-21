/**
 * The heading is split so "World's Top Tech" can carry the brand red, and so the line
 * breaks where the design breaks it — after "and".
 */
export type FacultyHeadingCopy = {
  lead: string;
  /** Set in brand red. */
  accent: string;
  /** The rest of the first line. */
  trail: string;
  /** The second line. */
  nextLine: string;
};

/** A company a faculty member has worked at, shown on the card as its logo. */
export type FacultyCompany = {
  id: string;
  /** The company's name. Becomes the logo's `alt` — the mark *is* the content. */
  name: string;
  logo: {
    src: string;
    /** The file's real pixels, so `next/image` reserves the right ratio. */
    width: number;
    height: number;
    /**
     * Multiplies the one height every mark shares. Only for a mark whose wordmark takes
     * up less of its own height than the rest do — the upGrad lockup carries a subline
     * under its wordmark, so at the shared height it reads a size smaller than its
     * neighbours. Leave it out and the mark sets at the shared height.
     */
    scale?: number;
  };
};

/** One card in the faculty marquee. */
export type FacultyMember = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  name: string;
  /** Set in red italic under the name. */
  role: string;
  photo: {
    src: string;
    /** Empty on purpose — see the constants for why. */
    alt: string;
    width: number;
    height: number;
  };
  companies: readonly FacultyCompany[];
};
