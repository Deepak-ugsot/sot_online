/**
 * Public API for the buildspace feature.
 *
 * Routes import from `@/features/buildspace` only — never from an internal component path.
 */
export { BuildspaceSection } from "./components/buildspace-section";
export type {
  BuildspaceCard,
  BuildspaceHeadingCopy,
  BuildspaceLayer,
  BuildspaceSubtitleCopy,
} from "./types/buildspace.types";
