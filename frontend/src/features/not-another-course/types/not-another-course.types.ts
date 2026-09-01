/**
 * The heading is split so the trailing phrase can be rendered in the accent serif and
 * brand red on its own line — the same lead/accent shape the hero, buildspace and
 * ecosystem sections use.
 */
export type NotAnotherCourseHeadingCopy = {
  lead: string;
  accent: string;
};

/** One of the two captions flanking the collage. */
export type NotAnotherCourseCaption = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  title: string;
  body: string;
  /**
   * Which side of the collage this sits on from 1100px up.
   *
   * It selects a placement from a lookup of *static* class strings rather than
   * building one by interpolation: Tailwind scans source text, so a class assembled at
   * runtime is never generated and the caption would render unpositioned.
   *
   * Below 1100px it has no effect — both captions fall into ordinary flow under the
   * collage.
   */
  side: "left" | "right";
};
