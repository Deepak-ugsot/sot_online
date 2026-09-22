/**
 * Public API for the top-ten-percent feature.
 *
 * Routes import from `@/features/top-ten-percent` only — never from an internal
 * component path.
 */
export { TopTenPercentSection } from "./components/top-ten-percent-section";
export type {
  TopTenPercentAnnotation,
  TopTenPercentArtwork,
  TopTenPercentHeadingCopy,
} from "./types/top-ten-percent.types";
