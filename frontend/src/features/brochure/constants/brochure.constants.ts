import type { BrochureCta, BrochureHeadlineCopy } from "../types/brochure.types";

/**
 * Copy for the `/brochure` holding page. Kept out of JSX so the wording can change
 * without touching a component — the same pattern as `features/hero/constants`.
 *
 * Every string here is written to be deleted: this whole feature is a placeholder for
 * a PDF that does not exist yet. When it lands, the hero CTA points at the file and
 * this route goes with it.
 */

/**
 * Sits above the headline, next to a pulsing dot.
 *
 * Set in caps here rather than with a `uppercase` utility, because the brand's
 * lowercase "u" has to survive — `text-transform` would render it "UGSOT". The hero's
 * CTA labels are written the same way for the same reason.
 *
 * Three words, not four: at this tracking "uGSOT Catalyst · Programme Brochure"
 * wrapped the pill onto two lines at 375px, which left the status dot floating beside
 * a block of text rather than reading as one label. "Programme" is on the cover
 * anyway.
 */
export const brochureEyebrow = "uGSOT CATALYST BROCHURE";

/**
 * Split the same way the hero's is — display sans for the lead, the red accent face
 * for the word that carries the message — so the two pages read as one brand.
 */
export const brochureHeadline: BrochureHeadlineCopy = {
  lead: "Coming",
  accent: "Soon.",
};

/**
 * Two blocks rather than one paragraph, so the break always lands between the
 * promise and the reason rather than wherever the measure runs out.
 *
 * The first line is the sentence the reader came for and is deliberately the plainest
 * thing on the page: someone who clicked "Download Brochure" wants to know whether
 * they are getting a file, and every word before that answer is in their way.
 */
export const brochureSubtext: readonly string[] = [
  "The uGSOT Catalyst brochure will be available soon.",
  "We're putting the final pages together — the full programme, the two-year curriculum and where it leads, in one download.",
] as const;

/**
 * Neither CTA pretends to be the download. The reader arrived wanting a file we do
 * not have, so both offers are "here is the same information, on the site" — the
 * curriculum first, because that is the bulk of what a brochure would have said.
 */
export const brochureCtas: readonly BrochureCta[] = [
  { label: "EXPLORE THE CURRICULUM", href: "/#curriculum", variant: "primary" },
  { label: "BACK TO HOME", href: "/", variant: "secondary" },
] as const;

/** The mock cover beside the copy. Never a real document — see `BrochureCover`. */
export const brochureCover = {
  title: "uGSOT Catalyst",
  subtitle: "Two-Year Programme Brochure",
  edition: "2026 Edition",
  /** Stamped across the corner of the sheet. */
  ribbon: "Coming Soon",
  /**
   * The contents list on the cover. Real section names, because inventing chapter
   * titles for a document nobody has written is the one thing on this page that
   * would actually mislead.
   */
  contents: [
    "The programme",
    "Curriculum, year by year",
    "Projects & portfolio",
    "Mentorship & community",
    "Careers & outcomes",
    "Fees & admissions",
  ],
} as const;

/** Sits under the CTAs, in the smallest type on the page. */
export const brochureFootnote =
  "Applications for ambitious Year 1 & Year 2 students are open now.";
