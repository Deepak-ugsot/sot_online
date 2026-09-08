/**
 * Public API for the transformation feature.
 *
 * Routes import from `@/features/transformation` only — never from an internal
 * component path.
 */
export { TransformationSection } from "./components/transformation-section";
export type {
  TransformationHeadingCopy,
  TransformationStep,
} from "./types/transformation.types";
