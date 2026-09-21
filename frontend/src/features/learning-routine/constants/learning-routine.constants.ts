import type {
  LearningRoutineArtwork,
  LearningRoutineHeadingCopy,
  LearningRoutineItem,
} from "../types/learning-routine.types";

/**
 * Copy and artwork for the Learning Routine section. Kept out of JSX so marketing
 * changes never touch a component — see `features/hero/constants` for the pattern.
 */

/** "Here's what **24 months** / will look like" */
export const learningRoutineHeading: LearningRoutineHeadingCopy = {
  lead: "Here's what",
  accent: "24 months",
  nextLine: "will look like",
} as const;

export const learningRoutineSubtitle =
  "A structured class model designed to keep you learning, practicing and progressing every day.";

/** Artwork lives in `public/assets/learning-routine/`. */
const routineImage = (file: string) => `/assets/learning-routine/${file}.png`;

/**
 * The four parts of the class model, in the design's order: across the top row, then
 * across the bottom.
 *
 * The design's first title reads "350+ Live Classess"; the stray `s` is corrected here
 * rather than carried.
 */
export const learningRoutineItems: readonly LearningRoutineItem[] = [
  {
    id: "live-classes",
    title: "350+ Live Classes",
    description: "Instructor led sessions across the program.",
    icon: { src: routineImage("live-classes"), width: 95, height: 56 },
  },
  {
    id: "revision-classes",
    title: "Daily Revision Classes",
    description: "Reinforce concepts and stay on track every day.",
    icon: { src: routineImage("revision-classes"), width: 95, height: 67 },
  },
  {
    id: "doubt-clearing",
    title: "Daily Doubt Clearing",
    description: "Get your questions resolved without waiting.",
    icon: { src: routineImage("doubt-clearing"), width: 95, height: 56 },
  },
  {
    id: "weekly-tests",
    title: "Weekly Tests",
    description: "Assess your understanding and track progress.",
    icon: { src: routineImage("weekly-tests"), width: 95, height: 62 },
  },
] as const;

/**
 * The dark routine card: the four parts on a dashed ring round "Your Learning
 * Routine", with a handwritten "Small steps. Big progress." at its foot.
 *
 * **One flat image, labels and all** — the design's own export at 1×, which is the size
 * it is set at. Its text is therefore pixels (hence the written-out `alt`) and is a
 * little soft on a high-density screen; rebuilding the card as DOM and SVG, the way the
 * Career OS tiles are drawn, is the fix if that matters.
 */
export const learningRoutineArtwork: LearningRoutineArtwork = {
  src: routineImage("learning-routine"),
  alt: "Your learning routine as a repeating cycle: live classes, doubt clearing, weekly tests and revision classes. Small steps, big progress.",
  width: 559,
  height: 371,
} as const;

/**
 * Animation hooks, by `data-learning-routine` attribute rather than class name, so
 * restyling a component can never silently break the reveal. Mirrors
 * `NEXT_OPPORTUNITY_SELECTORS`.
 */
export const LEARNING_ROUTINE_SELECTORS = {
  header: '[data-learning-routine="header"]',
  artwork: '[data-learning-routine="artwork"]',
  item: '[data-learning-routine="item"]',
} as const;
