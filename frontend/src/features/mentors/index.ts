/**
 * Public API for the mentors feature.
 *
 * Routes import from `@/features/mentors` only — never from an internal component path.
 */
export { MentorsSection } from "./components/mentors-section";
export type {
  CompanyLogo,
  MarqueeDirection,
  MentorsMarqueeRow,
} from "./types/mentors.types";
