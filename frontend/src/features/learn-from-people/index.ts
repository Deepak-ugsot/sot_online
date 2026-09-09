/**
 * Public API for the learn-from-people feature.
 *
 * Routes import from `@/features/learn-from-people` only — never from an internal
 * component path.
 */
export { LearnFromPeopleSection } from "./components/learn-from-people-section";
export type {
  LearnFromPeopleHeadingCopy,
  LearnFromPeopleMentor,
  LearnFromPeopleTone,
} from "./types/learn-from-people.types";
