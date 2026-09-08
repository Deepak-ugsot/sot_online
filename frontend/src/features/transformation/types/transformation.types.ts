/** One step of the two-year arc, rendered as a panel in the accordion. */
export type TransformationStep = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  /** The step's number, as it is printed: "01", not 1. */
  number: string;
  title: string;
  description: string;
  /**
   * The panel's ground, as a CSS `background` value.
   *
   * Carried as data rather than as a class, because each of the seven is its own hue
   * and they belong to this block alone — there is no scale for them to be a rung on,
   * and inventing seven one-off utility classes would only hide them from the step
   * they describe.
   */
  tint: string;
  /**
   * The illustration, shown only while the panel is open.
   *
   * `width` / `height` are the file's real pixels, used to reserve the box's ratio.
   */
  image: {
    src: string;
    width: number;
    height: number;
  };
};

/**
 * A heading split so the second line can carry the brand red, matching every other
 * two-tone heading on the page.
 */
export type TransformationHeadingCopy = {
  lead: string;
  accent: string;
};
