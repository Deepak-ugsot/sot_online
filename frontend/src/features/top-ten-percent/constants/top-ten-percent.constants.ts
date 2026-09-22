import type {
  TopTenPercentAnnotation,
  TopTenPercentArtwork,
  TopTenPercentHeadingCopy,
} from "../types/top-ten-percent.types";

/**
 * Copy and artwork for the Top 10% section. Kept out of JSX so marketing changes never
 * touch a component — see `features/hero/constants` for the pattern.
 */

/** "The **Top 10%** Get More / Than a Certificate" */
export const topTenPercentHeading: TopTenPercentHeadingCopy = {
  lead: "The",
  accent: "Top 10%",
  trail: "Get More",
  nextLine: "Than a Certificate",
} as const;

export const topTenPercentDescription =
  "Top 10% of students will get access to a 3-month paid internship with the upGrad ecosystem, gaining hands-on experience while working on real-world projects.";

/**
 * The cohort, walking away from camera under a red rim light — a cut-out on
 * transparency that fades out at its own foot, same treatment as the hackathons figure.
 */
export const topTenPercentArtwork: TopTenPercentArtwork = {
  src: "/assets/top-ten-percent/students.png",
  alt: "A group of students walking away from the camera, lit from behind in red, the lead student wearing a backpack with an arrow icon.",
  width: 996,
  height: 507,
} as const;

/**
 * The handwritten note and the arrow that points from it down to the lead student's
 * backpack. Both are the design's own exported art, not text set in CSS — the note is
 * written in a script no system font matches, and the arrow is a hand-drawn squiggle,
 * not a glyph.
 */
export const topTenPercentAnnotation: TopTenPercentAnnotation = {
  note: {
    src: "/assets/top-ten-percent/internship-note.png",
    alt: "3-month paid internship with the upGrad ecosystem",
    width: 298,
    height: 90,
  },
  arrow: {
    src: "/assets/top-ten-percent/arrow-doodle.png",
    // Decorative only: the note beside it already says what it's pointing at.
    alt: "",
    width: 70,
    height: 64,
  },
} as const;

/**
 * Animation hooks, by `data-top-ten-percent` attribute rather than class name, so
 * restyling a component can never silently break the reveal. Mirrors `HACKATHONS_SELECTORS`.
 */
export const TOP_TEN_PERCENT_SELECTORS = {
  copy: '[data-top-ten-percent="copy"]',
  beat: '[data-top-ten-percent="beat"]',
  artwork: '[data-top-ten-percent="artwork"]',
  annotation: '[data-top-ten-percent="annotation"]',
} as const;
