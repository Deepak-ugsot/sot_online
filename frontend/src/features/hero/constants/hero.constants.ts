import type { HeroCta, HeroHeadlineCopy } from "../types/hero.types";

/**
 * All hero copy lives here rather than inline in JSX, so marketing changes never
 * require touching a component — and so this file is the single thing to swap when
 * the copy moves to a CMS.
 */

/**
 * `accent` is the product name, so it stays whole — the split is placed around it
 * rather than at the sentence boundary. `tail` is a block, so the second sentence
 * always starts its own line.
 */
export const heroHeadline: HeroHeadlineCopy = {
  lead: "Your college gives you a degree.",
  accent: "uGSOT Catalyst",
  tail: "helps you catalyze it.",
};

/**
 * Two sentences, two array entries — rendered as separate blocks so the break always
 * lands between them rather than wherever the measure happens to run out. The first
 * line carries the degree list and is the longer of the two; leaving both in one
 * paragraph let "We become your parallel technology ecosystem." start mid-line.
 *
 * Each entry still wraps freely within itself, so narrow viewports reflow onto more
 * lines rather than overflowing the stage.
 */
export const heroSubtext: readonly string[] = [
  "An online 2-year technology accelerator you pursue alongside your existing B.Tech / B.E. / BCA / B.Sc. program.",
  "We become your parallel technology ecosystem.",
] as const;

/**
 * Set uppercase in the string rather than with `text-transform`, because the brand's
 * lowercase `u` has to survive — `uppercase` would render it "UGSOT".
 */
export const heroCtas: readonly HeroCta[] = [
  { label: "APPLY TO uGSOT CATALYST", href: "#apply", variant: "primary" },
  {
    label: "DOWNLOAD BROCHURE",
    // Still the curriculum anchor: there is no brochure PDF to fetch yet, and this is
    // where the label used to send the reader. Point it at the file once it lands.
    href: "#curriculum",
    variant: "secondary",
    icon: "download",
  },
] as const;

/**
 * Names the audience while the CTAs are still on screen, so a third-year reader can
 * self-select out before applying — and a first-year reader can recognise themselves.
 *
 * Set in brand red rather than the muted white the rest of the block uses: it is a
 * qualifier the reader is meant to stop on, not a footnote to skim. See the component
 * for what keeps it legible over the footage.
 */
export const heroFootnote =
  "Designed primarily for ambitious Year 1 & Year 2 students.";

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
  footnote: '[data-hero="footnote"]',
} as const;
