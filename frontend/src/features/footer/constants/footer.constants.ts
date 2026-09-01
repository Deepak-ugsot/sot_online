import type { FooterLinkColumn, SocialLink } from "../types/footer.types";

/**
 * Copy for the footer. Kept out of JSX so marketing changes never touch a component —
 * see `features/hero/constants` for the same pattern.
 */

export const footerCta = {
  /** Two deliberate lines; each is rendered as its own block. */
  headingLines: ["Your Degree Opens Doors.", "Your Skills Build Careers."],
  paragraph:
    "Become part of India's next generation of Future Software Engineers. Start building the skills, confidence, and experience top technology companies look for.",
  link: { label: "Start Your Journey Today", href: "#apply" },
} as const;

export const footerTagline = {
  lead: "The AI-Powered Career OS for",
  staticWord: "Future",
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
      { label: "Admissions", href: "#admissions" },
      { label: "Scholarships", href: "#scholarships" },
      { label: "FAQs", href: "#faqs" },
    ],
  },
  {
    id: "about",
    heading: "About",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms & Conditions", href: "#terms" },
      { label: "Admission Policy", href: "#admission-policy" },
    ],
  },
] as const;

export const footerSocialLinks: readonly SocialLink[] = [
  { platform: "facebook", label: "Facebook", href: "#" },
  { platform: "instagram", label: "Instagram", href: "#" },
  { platform: "x", label: "X", href: "#" },
  { platform: "youtube", label: "YouTube", href: "#" },
] as const;

export const footerCopyright =
  "© 2025 Techiora Labs Private Limited. All rights reserved.";

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
