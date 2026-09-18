/**
 * Public API for the what-is-catalyst feature.
 *
 * Routes import from `@/features/what-is-catalyst` only — never from an internal
 * component path.
 */
export { WhatIsCatalystSection } from "./components/what-is-catalyst-section";
export type {
  CatalystArtwork,
  CatalystEmployerLogo,
  CatalystHeadingCopy,
} from "./types/what-is-catalyst.types";
