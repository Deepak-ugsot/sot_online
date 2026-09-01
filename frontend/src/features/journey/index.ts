/**
 * Public API for the journey feature.
 *
 * Routes import from `@/features/journey` only — never from an internal component path.
 */
export { JourneySection } from "./components/journey-section";
export type {
  JourneyHeadingCopy,
  JourneyTrack,
} from "./types/journey.types";
