/**
 * Public API for the Tech Score feature.
 *
 * Routes import from `@/features/tech-score` only — never from an internal component path.
 */
export { TechScoreSection } from "./components/tech-score-section";
export type {
  TechScoreDial,
  TechScoreStat,
  TechScoreStatId,
  TechScoreToolName,
} from "./types/tech-score.types";
