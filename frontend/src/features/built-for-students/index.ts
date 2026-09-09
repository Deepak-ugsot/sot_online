/**
 * Public API for the built-for-students feature.
 *
 * Routes import from `@/features/built-for-students` only — never from an internal
 * component path.
 */
export { BuiltForStudentsSection } from "./components/built-for-students-section";
export type {
  BuiltForStudentsArtwork,
  BuiltForStudentsClosing,
  BuiltForStudentsHeadingLine,
  BuiltForStudentsQualifier,
} from "./types/built-for-students.types";
