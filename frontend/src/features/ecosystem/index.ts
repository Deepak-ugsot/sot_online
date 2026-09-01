/**
 * Public API for the ecosystem feature.
 *
 * Routes import from `@/features/ecosystem` only — never from an internal component path.
 */
export { EcosystemSection } from "./components/ecosystem-section";
export type {
  EcosystemHeadingCopy,
  EcosystemLogo,
  EcosystemStat,
} from "./types/ecosystem.types";
