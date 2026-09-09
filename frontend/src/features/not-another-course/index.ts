/**
 * Public API for the not-another-course feature.
 *
 * Routes import from `@/features/not-another-course` only — never from an internal
 * component path.
 */
export { NotAnotherCourseSection } from "./components/not-another-course-section";
export type {
  NotAnotherCourseClosingCopy,
  NotAnotherCourseCorner,
  NotAnotherCourseHeadingCopy,
  NotAnotherCoursePeerIconName,
  NotAnotherCoursePeerLabel,
} from "./types/not-another-course.types";
