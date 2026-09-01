/**
 * The heading is split so the trailing word can be rendered in the accent serif and
 * brand red, matching the hero, showcase and ecosystem sections.
 */
export type BuildspaceHeadingCopy = {
  lead: string;
  accent: string;
};

/** The white pill under the subtitle. */
export type BuildspaceCtaCopy = {
  label: string;
  href: string;
};

/** One chapter of the product tour. */
export type BuildspaceChapterId =
  | "project"
  | "plan"
  | "review"
  | "build"
  | "github"
  | "ship"
  | "outro";

/**
 * A tour chapter: the screen it shows, the caption in the rail, and how long it holds
 * before the tour advances.
 *
 * `screen` is the workspace step the app chrome should show as active — it is not the
 * same as the chapter id, because `project` browses the library rather than a step and
 * `outro` shows no app at all.
 */
export type BuildspaceChapter = {
  id: BuildspaceChapterId;
  /** Short label for the chapter rail. */
  chapter: string;
  /** The line of narration shown beneath the window. */
  title: string;
  /** How long the chapter holds, in milliseconds. */
  duration: number;
};

/**
 * Where the simulated cursor travels during a chapter, in canvas pixels, and when it
 * presses. `null` parks the cursor off-screen — used by the chapters that are read
 * rather than clicked through.
 */
export type BuildspaceCursorBeat = {
  x: number;
  y: number;
  /** Fraction of the chapter at which the click lands. */
  clickAt: number;
} | null;
