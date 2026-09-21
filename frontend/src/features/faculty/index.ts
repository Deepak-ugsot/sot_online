/**
 * Public API for the faculty feature.
 *
 * Routes import from `@/features/faculty` only — never from an internal component path.
 */
export { FacultySection } from "./components/faculty-section";
export type {
  FacultyCompany,
  FacultyHeadingCopy,
  FacultyMember,
} from "./types/faculty.types";
