/**
 * Which of the two right-hand columns a highlight sits in.
 *
 * The reference staggers them: the `platforms` column runs from the top of the
 * section, the `preparation` column starts lower, level with the CTA. Carried on the
 * item rather than derived from its index so re-ordering the copy cannot silently move
 * something into the wrong column.
 */
export type CompeteColumn = "preparation" | "platforms";

/** One highlight: an icon, a title, and a line of detail. */
export type CompeteHighlight = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  title: string;
  description: string;
  column: CompeteColumn;
  /**
   * The icon. `width` / `height` are the file's real pixels, used to reserve the
   * box's ratio.
   */
  image: {
    src: string;
    width: number;
    height: number;
  };
};
