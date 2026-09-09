import type {
  BuildspaceChapter,
  BuildspaceCtaCopy,
  BuildspaceCursorBeat,
  BuildspaceHeadingCopy,
} from "../types/buildspace.types";

/**
 * Copy and tour data for the BuildSpace section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

export const buildspaceHeading: BuildspaceHeadingCopy = {
  accent: "BuildSpace",
  trail: "- your engineering playground inside Beyond",
};

/**
 * The small label that opens the left column.
 *
 * **It names what the window beside it is** — a tour of the product, not a screenshot —
 * which is the one thing the composition cannot say for itself. Deliberately not a second
 * "free" claim: the subtitle already makes that one, and two of them inside eight words
 * reads as a pitch rather than as a fact.
 */
export const buildspaceEyebrow = "Inside BuildSpace";

/**
 * One plain sentence, not the split lead/badge/trail of the old light layout. The red
 * badge existed to lift "FREE ACCESS" off a pale ground; on the dark section the whole
 * line is already high-contrast white and a red block in the middle of it only breaks
 * the sentence up.
 */
export const buildspaceSubtitle =
  "As an SOT online student, get FREE ACCESS to BuildSpace to build real projects and in-demand skills.";

export const buildspaceCta: BuildspaceCtaCopy = {
  label: "Explore BuildSpace",
  href: "#apply",
};

/** The demo canvas's intrinsic size. Every coordinate below is in these pixels. */
export const BUILDSPACE_CANVAS_WIDTH = 1280;
export const BUILDSPACE_CANVAS_HEIGHT = 880;

/**
 * The tour, in order: pick a project, plan it, get it reviewed, build it, show the
 * commit trail, ship it — then the sign-off.
 *
 * **Durations are the whole pacing model.** Each chapter's internal animation (the
 * answer typing itself out, the score bars filling, the tasks ticking over) is derived
 * from the fraction of its own duration that has elapsed, so lengthening a chapter
 * slows its contents down rather than adding dead time at the end. The chapters that
 * type or reveal in sequence therefore need noticeably more room than the ones that are
 * simply read.
 */
export const buildspaceChapters: BuildspaceChapter[] = [
  { id: "project", chapter: "Project", title: "Pick a real project", duration: 4200 },
  { id: "plan", chapter: "Plan", title: "Plan it before you build", duration: 7200 },
  { id: "review", chapter: "AI Review", title: "AI reviews your thinking", duration: 7000 },
  { id: "build", chapter: "Build", title: "Build it for real", duration: 6000 },
  { id: "github", chapter: "GitHub", title: "Your GitHub activity counts", duration: 5400 },
  { id: "ship", chapter: "Ship", title: "Ship it", duration: 6400 },
  { id: "outro", chapter: "Ship", title: "From learning to shipping", duration: 4600 },
];

/**
 * Where the simulated pointer goes in each chapter, in canvas pixels, indexed to match
 * `buildspaceChapters`.
 *
 * **These are hand-placed against the rendered canvas, not derived.** Deriving them would
 * mean measuring a target element every frame, which is a layout read inside the tour
 * loop for a pointer that only needs to be near the right button. The trade is that
 * moving a panel's controls means re-checking the beat that clicks them.
 *
 * `null` means the chapter is read rather than operated — the commit chart and the
 * sign-off have nothing to press, and a pointer hovering over them with no target only
 * asks the eye to follow something that never resolves.
 */
export const buildspaceCursorBeats: (BuildspaceCursorBeat | null)[] = [
  { x: 250, y: 430, clickAt: 0.72 }, // the project card in the trending row
  { x: 700, y: 834, clickAt: 0.9 }, // "Submit for AI Review"
  { x: 1148, y: 846, clickAt: 0.93 }, // "Continue to Build"
  { x: 560, y: 846, clickAt: 0.9 }, // "Open in VS Code"
  null, // the commit chart is read
  { x: 735, y: 581, clickAt: 0.63 }, // "Submit Project for Review"
  null, // the sign-off
];

/** Sign-off lines, revealed one at a time. */
export const buildspaceOutro = {
  lead: "Learn by building.",
  trail: "From learning to shipping.",
  badge: "BuildSpace",
};

export const BUILDSPACE_SELECTORS = {
  glow: '[data-buildspace="glow"]',
  heading: '[data-buildspace="heading"]',
  demo: '[data-buildspace="demo"]',
} as const;
