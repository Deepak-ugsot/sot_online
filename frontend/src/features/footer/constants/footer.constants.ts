import type { FooterLinkColumn, SocialLink } from "../types/footer.types";

/**
 * Copy for the footer. Kept out of JSX so marketing changes never touch a component —
 * see `features/hero/constants` for the same pattern.
 */

export const footerCta = {
  /** Two deliberate lines; each is rendered as its own block. */
  headingLines: ["Now choose how", "far you want to go."],
  paragraph:
    "From ICPC and competitive programming to open source, GSoC, AI, internships, and great engineering careers — build the skills and experience that set you apart.",
  link: { label: "Apply to uGSOT Beyond", href: "#apply" },
  /**
   * Eligibility line under the button. Split into three parts because the middle one
   * is set in brand red — the alternative is markup inside a copy string.
   */
  note: {
    before: "For ambitious ",
    highlight: "Year 1 & Year 2",
    after: " students across India",
  },
} as const;

export const footerTagline = {
  /** Wraps on its own — no hard break, so the line count follows the viewport. */
  lead: "Your college gives you a degree. uGSOT Beyond helps you go beyond it.",
} as const;

/**
 * Words cycled through the red highlight box, one every `FOOTER_WORD_INTERVAL_MS`.
 *
 * The box hugs its word, so the highlight visibly resizes as these rotate — that is
 * the design's intent, not a layout bug.
 */
export const footerRotatingWords: readonly string[] = [
  "Software Engineers.",
  "Learn.",
  "Build.",
  "Compete.",
  "Get Hired.",
] as const;

export const FOOTER_WORD_INTERVAL_MS = 1500;

export const footerLinkColumns: readonly FooterLinkColumn[] = [
  {
    id: "quick-links",
    heading: "Quick Links",
    links: [
      { label: "Why Beyond", href: "#why-beyond" },
      { label: "Journey", href: "#journey" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    id: "about",
    heading: "About",
    links: [
      { label: "FAQs", href: "#faqs" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms & Conditions", href: "#terms" },
    ],
  },
] as const;

export const footerSocialLinks: readonly SocialLink[] = [
  { platform: "facebook", label: "Facebook", href: "#" },
  { platform: "instagram", label: "Instagram", href: "#" },
  { platform: "x", label: "X", href: "#" },
  { platform: "youtube", label: "YouTube", href: "#" },
] as const;

/**
 * The bottom bar. This is a positioning disclaimer rather than a copyright line: it
 * is what keeps "Beyond" from reading as a replacement for the full-time campus
 * programme, so it should not be shortened without asking.
 */
export const footerDisclaimer =
  "uGSOT Beyond is a technology accelerator by upGrad School of Technology. It runs alongside your existing college degree and does not replace uGSOT Campus, the full-time higher-education experience offered by upGrad School of Technology.";

/**
 * Animation hooks, by `data-footer` attribute rather than class name, so restyling a
 * component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const FOOTER_SELECTORS = {
  cta: '[data-footer="cta"]',
  watermark: '[data-footer="watermark"]',
  tagline: '[data-footer="tagline"]',
  column: '[data-footer="column"]',
  bottom: '[data-footer="bottom"]',
} as const;
