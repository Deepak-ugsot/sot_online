/**
 * Public API for the beyond-college feature.
 *
 * Routes import from `@/features/beyond-college` only — never from an internal
 * component path.
 */
export { BeyondCollegeSection } from "./components/beyond-college-section";
export type {
  BeyondCollegeHeadingCopy,
  BeyondCollegeItem,
  BeyondCollegePanel,
  BeyondCollegePanelTone,
} from "./types/beyond-college.types";
