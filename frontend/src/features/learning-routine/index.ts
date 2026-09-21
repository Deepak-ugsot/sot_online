/**
 * Public API for the learning-routine feature.
 *
 * Routes import from `@/features/learning-routine` only — never from an internal
 * component path.
 */
export { LearningRoutineSection } from "./components/learning-routine-section";
export type {
  LearningRoutineArtwork,
  LearningRoutineHeadingCopy,
  LearningRoutineItem,
} from "./types/learning-routine.types";
