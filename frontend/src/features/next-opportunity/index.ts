/**
 * Public API for the next-opportunity feature.
 *
 * Routes import from `@/features/next-opportunity` only — never from an internal
 * component path.
 */
export { NextOpportunitySection } from "./components/next-opportunity-section";
export type {
  NextOpportunityArtwork,
  NextOpportunityBenefit,
  NextOpportunityHeadingCopy,
} from "./types/next-opportunity.types";
