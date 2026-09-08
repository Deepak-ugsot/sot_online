import type { HeroCta, HeroHeadlineCopy } from "../types/hero.types";

/**
 * All hero copy lives here rather than inline in JSX, so marketing changes never
 * require touching a component — and so this file is the single thing to swap when
 * the copy moves to a CMS.
 */

/**
 * Positions the programme before the headline makes its claim: without it, "uGSOT
 * Beyond" arrives as a name nobody has been introduced to yet.
 *
 * Sentence case, not the uppercase micro-label used elsewhere on the page. This one
 * is a readable phrase rather than a section tag, and at `0.2em` uppercase tracking
 * it would run wider than the subtext it sits above.
 */
export const heroEyebrow = "Technology Accelerator, by upGrad School of Technology";

/**
 * `accent` is the product name, so it stays whole — the split is placed around it
 * rather than at the sentence boundary. `tail` is a block, so the second sentence
 * always starts its own line.
 */
export const heroHeadline: HeroHeadlineCopy = {
  lead: "Your college gives you a degree.",
  accent: "uGSOT Beyond",
  tail: "helps you go beyond it.",
};

export const heroSubtext =
  "A 2-year technology accelerator you pursue alongside your existing college. Code. Build. Compete. Contribute to open source. Become AI-native. Build a serious technology profile before you graduate.";

/**
 * Set uppercase in the string rather than with `text-transform`, because the brand's
 * lowercase `u` has to survive — `uppercase` would render it "UGSOT".
 */
export const heroCtas: readonly HeroCta[] = [
  { label: "APPLY TO uGSOT BEYOND", href: "#apply", variant: "primary" },
  { label: "SEE WHAT YOU'LL BECOME", href: "#curriculum", variant: "secondary" },
] as const;

/**
 * Answers the objection the headline provokes — "do I have to leave my degree?" —
 * while the CTAs are still on screen. Deliberately quieter than the subtext: it is
 * reassurance, not a selling line.
 */
export const heroFootnote =
  "You stay in your current B.Tech / B.E. / BCA / B.Sc. program. We become your parallel technology ecosystem.";

/**
 * Hooks into the hero's scroll animation by `data-hero` attribute rather than by
 * class name, so restyling a component can never silently break the animation.
 *
 * Every component that carries one of these attributes is listed here; keep the two
 * in sync.
 */
export const HERO_SELECTORS = {
  stage: '[data-hero="stage"]',
  video: '[data-hero="video"]',
  eyebrow: '[data-hero="eyebrow"]',
  headline: '[data-hero="headline"]',
  copyScrim: '[data-hero="copy-scrim"]',
  subtext: '[data-hero="subtext"]',
  cta: '[data-hero="cta"]',
  footnote: '[data-hero="footnote"]',
} as const;
