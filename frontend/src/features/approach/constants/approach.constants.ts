import type { ApproachWord } from "../types/approach.types";

/**
 * Copy for the Approach section. Kept out of JSX so marketing changes never touch a
 * component — see `features/hero/constants` for the same pattern.
 */

export const approachEyebrow = "Our Approach";

/**
 * The words revealed one per scroll step.
 *
 * `AI‑Powered` and `Career‑Ready` use a non-breaking hyphen (U+2011), matching the
 * reference. The words are `nowrap` anyway, but this keeps them unbreakable if that
 * ever changes.
 *
 * `accent` puts the two middle pillars in brand red, so the stack opens and closes
 * in ink with the colour carried in its centre.
 */
export const approachWords: readonly ApproachWord[] = [
  { id: "mentorship", label: "Mentorship" },
  { id: "projects", label: "Projects", accent: true },
  { id: "ai-powered", label: "AI‑Powered", accent: true },
  { id: "career-ready", label: "Career‑Ready" },
] as const;

/**
 * Animation hooks, by `data-approach` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const APPROACH_SELECTORS = {
  stage: '[data-approach="stage"]',
  row: '[data-approach="row"]',
} as const;
