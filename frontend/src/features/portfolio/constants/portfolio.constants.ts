import type { PortfolioArtwork, PortfolioHeadingCopy } from "../types/portfolio.types";

/**
 * Copy and artwork for the Portfolio section. Kept out of JSX so marketing changes never
 * touch a component — see `features/hero/constants` for the pattern.
 */

/** "Build. Showcase. / **Get Noticed.**" */
export const portfolioHeading: PortfolioHeadingCopy = {
  lead: "Build. Showcase.",
  accent: "Get Noticed.",
} as const;

export const portfolioDescription =
  "By the end of your 2-year accelerator, build a strong developer portfolio that showcases your projects, technical skills, and real-world work ready to share with the world.";

/**
 * The laptop render. 525×480, a cut-out on transparency — it gets no plate of its own.
 * Set at the file's own size, which is what the design has it at.
 */
export const portfolioArtwork: PortfolioArtwork = {
  src: "/assets/portfolio/developer-portfolio.png",
  alt: "A laptop showing a developer's portfolio site, linked to cards for their tech stack, projects, open source contributions, achievements and a live portfolio link.",
  width: 525,
  height: 480,
} as const;

/**
 * Animation hooks, by `data-portfolio` attribute rather than class name, so restyling a
 * component can never silently break the reveal. Mirrors `LEARNING_ROUTINE_SELECTORS`.
 */
export const PORTFOLIO_SELECTORS = {
  copy: '[data-portfolio="copy"]',
  artwork: '[data-portfolio="artwork"]',
} as const;
