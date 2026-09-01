import type { HeroCta, HeroHeadlineCopy } from "../types/hero.types";

/**
 * All hero copy lives here rather than inline in JSX, so marketing changes never
 * require touching a component — and so this file is the single thing to swap when
 * the copy moves to a CMS.
 */

export const heroHeadline: HeroHeadlineCopy = {
  lead: "Become a Top",
  accent: "Software Engineer",
  tail: "No Matter Which College You're In",
};

export const heroSubtext =
  "A 2-year online software engineering program you complete alongside your degree — with live mentorship from working engineers, production-grade projects, and dedicated placement support.";

export const heroCtas: readonly HeroCta[] = [
  { label: "Start Your Journey", href: "#apply", variant: "primary" },
  { label: "Explore the Curriculum", href: "#curriculum", variant: "secondary" },
] as const;

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
  headline: '[data-hero="headline"]',
  copyScrim: '[data-hero="copy-scrim"]',
  subtext: '[data-hero="subtext"]',
  cta: '[data-hero="cta"]',
} as const;
