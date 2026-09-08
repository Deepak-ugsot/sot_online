/**
 * Public API for the global-ambition feature.
 *
 * Routes import from `@/features/global-ambition` only — never from an internal
 * component path.
 */
export { GlobalAmbitionSection } from "./components/global-ambition-section";
export type {
  GlobalAmbitionCard,
  GlobalAmbitionCardSize,
  GlobalAmbitionHeadingCopy,
} from "./types/global-ambition.types";
