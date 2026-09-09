/**
 * Public API for the early-start feature.
 *
 * Routes import from `@/features/early-start` only — never from an internal component
 * path.
 */
export { EarlyStartSection } from "./components/early-start-section";
export type {
  EarlyStartCalloutCopy,
  EarlyStartHeadingCopy,
  EarlyStartStep,
} from "./types/early-start.types";
