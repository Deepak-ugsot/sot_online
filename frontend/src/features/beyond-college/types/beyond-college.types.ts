import type { BeyondCollegeIconName } from "../components/beyond-college-icon";

/** One row inside a panel: an icon, a label, and a line of detail. */
export type BeyondCollegeItem = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  icon: BeyondCollegeIconName;
  title: string;
  description: string;
};

/**
 * Which of the two panels this is.
 *
 * Not a colour name: the two differ in more than colour — the accelerator's icons sit
 * on their own tinted plates, the college's do not — and a `tone: "red"` would have to
 * be read as "and also the one with the icon plates".
 */
export type BeyondCollegePanelTone = "college" | "accelerator";

/** One of the two side-by-side panels. */
export type BeyondCollegePanel = {
  tone: BeyondCollegePanelTone;
  /**
   * Set in caps in the string rather than with `text-transform`, because
   * "uGSOT BEYOND" has to keep its lowercase `u` — `uppercase` would render "UGSOT".
   */
  title: string;
  /**
   * The oversized ghost word set behind the title and cropped by the panel's top
   * edge. Held separately rather than sliced off `title` at render time: the split is
   * an editorial choice ("YOUR", "uGSOT"), not a rule about first words, and deriving
   * it would make the mark change shape the moment marketing reworded a title.
   */
  watermark: string;
  subtitle: string;
  items: readonly BeyondCollegeItem[];
};

/**
 * A heading split so the last phrase can carry the brand red, matching every other
 * two-tone heading on the page. Used for both the section heading and the closing line.
 */
export type BeyondCollegeHeadingCopy = {
  lead: string;
  accent: string;
};
