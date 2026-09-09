/**
 * One line of the stair-stepped heading.
 *
 * The heading is data rather than three hard-coded spans because its shape is the
 * point: "Built for" / "Students" / "Who Want More." are set as three separate lines
 * with the middle one stepped in, and a component that reads them from a list cannot
 * quietly lose a step when the copy changes.
 */
export type BuiltForStudentsHeadingLine = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  /** The part of the line set in `ink`. */
  text: string;
  /** Trailing phrase set in the brand red, if this line carries one. */
  accent?: string;
  /**
   * Whether the line is stepped in from the column's left edge.
   *
   * A flag rather than an indent value: there is exactly one step in this heading and
   * its size is a typographic decision that belongs with the type, not with the copy.
   */
  isIndented?: boolean;
};

/** One line of the "is this you?" checklist under the heading. */
export type BuiltForStudentsQualifier = {
  id: string;
  text: string;
};

/** The artwork beside the copy. */
export type BuiltForStudentsArtwork = {
  src: string;
  /**
   * Empty on purpose — see the constant for why this render is decorative.
   */
  alt: string;
  /** Intrinsic pixel size, so Next can reserve the box and avoid a layout shift. */
  width: number;
  height: number;
};

/** The short, quiet claim that closes the section. */
export type BuiltForStudentsClosing = {
  title: string;
  body: string;
};
