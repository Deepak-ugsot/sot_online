/**
 * Public API for the curriculum feature.
 *
 * Routes import from `@/features/curriculum` only — never from an internal component path.
 */
export { CurriculumSection } from "./components/curriculum-section";
export type {
  CurriculumHeadingCopy,
  CurriculumProject,
  CurriculumSemester,
} from "./types/curriculum.types";
