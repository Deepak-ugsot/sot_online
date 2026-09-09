/**
 * The heading is split so the product's name can be rendered in the accent face and brand
 * red, matching the hero, showcase and ecosystem sections.
 *
 * **The accent leads here, where those sections trail it.** The line names the product and
 * then says what it is, so the red is the first thing on the line rather than the payoff at
 * the end of it.
 */
export type BuildspaceHeadingCopy = {
  /** Rendered in the accent face and brand red, ahead of the rest of the line. */
  accent: string;
  /** The rest of the heading, in white. */
  trail: string;
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
