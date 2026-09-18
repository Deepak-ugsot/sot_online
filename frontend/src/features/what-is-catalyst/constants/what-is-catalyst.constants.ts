import type {
  CatalystArtwork,
  CatalystEmployerLogo,
  CatalystHeadingCopy,
} from "../types/what-is-catalyst.types";

/**
 * Copy and artwork for the "What is uGSOT Catalyst?" section. Kept out of JSX so
 * marketing changes never touch a component — see `features/hero/constants` for the
 * pattern.
 */

export const whatIsCatalystHeading: CatalystHeadingCopy = {
  lead: "What is",
  accent: "uGSOT Catalyst?",
} as const;

export const whatIsCatalystDescription =
  "uGSOT Catalyst is an online 2-year technology accelerator built to run alongside your college journey giving you the skills, platforms, projects, mentorship and opportunities to become a stronger software engineer.";

/** Heads the logo marquee. Short enough to stay on one line at every width. */
export const whatIsCatalystEmployersLabel = "Built by people who've worked at";

/**
 * The hand and its fan of cards.
 *
 * **A transparent PNG on the section's own ground**, so it must never be given a plate
 * or a rounded container — the render's own soft shadows are what seat it, and a box
 * behind it would show up as a rectangle around a cut-out.
 */
export const catalystArtwork: CatalystArtwork = {
  src: "/assets/catalyst_pillars.png",
  alt: "A hand fanning out six cards: a structured learning journey from fundamentals to real-world skills, building real projects, AI-native learning, open source contributions, industry mentorship, and career opportunities with internship and placement support.",
  width: 1332,
  height: 1228,
} as const;

/**
 * Brand marks live in `public/companyLogo/`.
 *
 * **The filenames' capitalisation is load-bearing** — they are passed through
 * verbatim, and macOS resolves `google.png` just fine where the Linux deploy target
 * does not. A wrong case here passes every local check and 404s only in production.
 */
const companyLogo = (file: string) => `/companyLogo/${file}`;

/**
 * The six employers, in the reference's order.
 *
 * **Every one of these files is 177px tall**, whatever its width — so the marquee sets
 * a single height and lets each width follow. That is also why nothing here needs a
 * per-logo size nudge: the marks are already trimmed to one optical height in the
 * source files, including Goldman Sachs' two-line lockup.
 *
 * This list is a claim about where the team has worked. It is not a place to pad the
 * row out with whatever else is in `public/companyLogo/` — the row drifting is a
 * treatment, not a reason to add logos.
 */
export const catalystEmployerLogos: readonly CatalystEmployerLogo[] = [
  {
    id: "flipkart",
    name: "Flipkart",
    src: companyLogo("Flipkart.png"),
    width: 583,
    height: 177,
  },
  {
    id: "goldman-sachs",
    name: "Goldman Sachs",
    src: companyLogo("GoldmanSachs.png"),
    width: 382,
    height: 177,
  },
  {
    id: "google",
    name: "Google",
    src: companyLogo("Google.png"),
    width: 486,
    height: 177,
  },
  {
    id: "groww",
    name: "Groww",
    src: companyLogo("Groww.png"),
    width: 547,
    height: 177,
  },
  {
    id: "haptik",
    name: "Haptik",
    src: companyLogo("Haptik.png"),
    width: 402,
    height: 177,
  },
  {
    id: "accenture",
    name: "Accenture",
    src: companyLogo("Accenture.png"),
    width: 623,
    height: 177,
  },
] as const;

/**
 * How long one full pass of the logo marquee takes.
 *
 * Slow on purpose. This band sits under a paragraph the reader is still reading, and
 * anything brisk enough to notice turns a credential strip into something competing
 * for attention — the drift is meant to be caught out of the corner of the eye.
 */
export const CATALYST_MARQUEE_SECONDS = 38;

/**
 * Animation hooks, by `data-what-is-catalyst` attribute rather than class name, so
 * restyling a component can never silently break the reveal. Mirrors
 * `GLOBAL_AMBITION_SELECTORS`.
 */
export const WHAT_IS_CATALYST_SELECTORS = {
  copy: '[data-what-is-catalyst="copy"]',
  employers: '[data-what-is-catalyst="employers"]',
  artwork: '[data-what-is-catalyst="artwork"]',
} as const;
