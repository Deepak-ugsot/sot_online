/**
 * Public API for the one-program feature.
 *
 * Routes import from `@/features/one-program` only — never from an internal component
 * path.
 */
export { OneProgramSection } from "./components/one-program-section";
export type {
  OneProgramCapability,
  OneProgramCta,
  OneProgramHeadingCopy,
  OneProgramPricing,
  OneProgramRail,
} from "./types/one-program.types";
