/**
 * The heading is split so the closing phrase can be rendered in the accent face and
 * brand red — the same lead/accent shape the hero, buildspace and ecosystem sections
 * use. Here the accent stays *inline*, finishing the sentence rather than dropping to
 * a line of its own.
 */
export type NotAnotherCourseHeadingCopy = {
  lead: string;
  accent: string;
};

/** Which of the composition's four corners a label sits in from 1100px up. */
export type NotAnotherCourseCorner =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/**
 * One of the four peer-group labels floating around the collage.
 *
 * These are markup, not part of `peer_group.png` — the artwork is only the students.
 * Keeping them in the DOM means the text is selectable, translatable, readable by a
 * screen reader and re-typesettable at any width, none of which a baked-in label is.
 */
export type NotAnotherCoursePeerLabel = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  /** The role, e.g. "Coders". */
  title: string;
  /** The line under it, e.g. "DSA, Competitive Programming". */
  meta: string;
  icon: NotAnotherCoursePeerIconName;
  /**
   * Which corner this occupies from 1100px up.
   *
   * It selects a placement from a lookup of *static* class strings rather than
   * building one by interpolation: Tailwind scans source text, so a class assembled at
   * runtime is never generated and the label would render unpositioned.
   *
   * Below 1100px it has no effect — all four fall into an ordinary grid under the
   * collage.
   */
  corner: NotAnotherCourseCorner;
};

/** The four glyphs, named by role rather than by vendor component. */
export type NotAnotherCoursePeerIconName = "code" | "bot" | "box" | "github";

/** The two-line sign-off under the collage. */
export type NotAnotherCourseClosingCopy = {
  lead: string;
  accent: string;
};
