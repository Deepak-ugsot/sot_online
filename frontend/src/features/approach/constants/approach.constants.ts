import type { ApproachWord } from "../types/approach.types";

/**
 * Copy for the Approach section. Kept out of JSX so marketing changes never touch a
 * component — see `features/hero/constants` for the same pattern.
 */

/**
 * The lead-in, and half of one sentence: it runs straight into the three words below
 * it — "You don't need more content. You need DIRECTION, DISCIPLINE, ECOSYSTEM." That
 * is why it is set as a readable sentence rather than as the small letterspaced label
 * this slot used to hold; a micro-eyebrow cannot carry a clause.
 */
export const approachLead = "You don't need more content. You need";

/**
 * The words revealed one per scroll step, completing the sentence `approachLead`
 * starts.
 *
 * `accent` puts the middle word in brand red, so the stack opens and closes in ink
 * with the colour carried at its centre.
 */
export const approachWords: readonly ApproachWord[] = [
  { id: "direction", label: "Direction" },
  { id: "discipline", label: "Discipline", accent: true },
  { id: "ecosystem", label: "Ecosystem" },
] as const;

/**
 * Animation hooks, by `data-approach` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const APPROACH_SELECTORS = {
  stage: '[data-approach="stage"]',
  row: '[data-approach="row"]',
} as const;
