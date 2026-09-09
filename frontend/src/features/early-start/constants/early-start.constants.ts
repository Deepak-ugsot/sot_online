import type {
  EarlyStartCalloutCopy,
  EarlyStartHeadingCopy,
  EarlyStartStep,
} from "../types/early-start.types";

/**
 * Copy for the Early Start section. Kept out of JSX so marketing changes never touch a
 * component — see `features/hero/constants` for the pattern.
 */

/** "Your Career Doesn't Start In **Final Year.**" */
export const earlyStartHeading: EarlyStartHeadingCopy = {
  lead: "Your Career Doesn't Start In",
  accent: "Final Year.",
} as const;

/**
 * The attribution under the heading. "INTERNSHALA" is upper-cased in the copy rather
 * than by a `uppercase` utility: it is how the brand sets its own name, so it should
 * survive being copied out of the page.
 */
export const earlyStartSubtitle =
  "Powered by the INTERNSHALA ecosystem";

/**
 * The six stages, in the order they happen.
 *
 * Order is the whole argument here — the section's claim is that this sequence starts
 * years before final year — so these are rendered as an ordered list and the timeline
 * rail is drawn behind them. Adding a stage in the middle needs nothing but a new
 * record in the right place.
 */
export const earlyStartSteps: readonly EarlyStartStep[] = [
  {
    id: "learn",
    title: "Learn",
    description: "Build the skills and knowledge you need to succeed.",
  },
  {
    id: "build",
    title: "Build",
    description: "Turn your skills into real projects and a strong portfolio.",
  },
  {
    id: "internship-ready",
    title: "Become Internship Ready",
    description:
      "Develop the technical and professional skills employers look for.",
  },
  {
    id: "discover",
    title: "Discover Opportunities",
    description:
      "Find internships and opportunities that match your skills and goals.",
  },
  {
    id: "apply",
    title: "Apply",
    description:
      "Apply with confidence using a strong profile, résumé, and preparation.",
  },
  {
    id: "experience",
    title: "Gain Experience",
    description: "Get real-world exposure and start building your career early.",
  },
] as const;

/**
 * The red card. `#apply` is the site-wide application anchor every CTA points at until
 * that route exists — see `features/compete/constants`.
 */
export const earlyStartCallout: EarlyStartCalloutCopy = {
  claim: "Start building experience while others are still building resumes.",
  cta: {
    label: "Apply to uGSOT Beyond",
    href: "#apply",
  },
} as const;

/**
 * Hooks reach for these `data-*` attributes rather than class names, so restyling a
 * component can never silently break the reveal. Mirrors `CURRICULUM_SELECTORS`.
 */
export const EARLY_START_SELECTORS = {
  heading: '[data-early-start="heading"]',
  /** The `<ol>` — the scroll trigger the rail's draw is scrubbed against. */
  list: '[data-early-start="list"]',
  dot: '[data-early-start="dot"]',
  /** One SVG segment per step, in document order. */
  rail: '[data-early-start="rail"]',
  /** A step's text column. Animated instead of the whole row — see the hook. */
  copy: '[data-early-start="copy"]',
  callout: '[data-early-start="callout"]',
} as const;
