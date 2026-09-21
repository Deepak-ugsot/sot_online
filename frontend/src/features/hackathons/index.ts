/**
 * Public API for the hackathons feature.
 *
 * Routes import from `@/features/hackathons` only — never from an internal component
 * path.
 */
export { HackathonsSection } from "./components/hackathons-section";
export type {
  HackathonsArtwork,
  HackathonsCadence,
  HackathonsHeadingCopy,
} from "./types/hackathons.types";
