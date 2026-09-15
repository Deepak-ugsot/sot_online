/**
 * Public API for the real-world feature.
 *
 * Routes import from `@/features/real-world` only — never from an internal component
 * path.
 */
export { RealWorldSection } from "./components/real-world-section";
export type {
  RealWorldExperience,
  RealWorldHeadingCopy,
  RealWorldRibbon,
} from "./types/real-world.types";
