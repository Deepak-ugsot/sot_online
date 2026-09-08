/**
 * Copy and artwork for the AI Mentor section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

/** Section label above the heading, matching the eyebrow on every other section. */
export const aiMentorEyebrow = "AI Mentor";

/**
 * Split in two so the second half can carry the brand red, the way every other
 * two-tone heading on the page is built (`dashboardHeading`, `notAnotherCourseHeading`).
 *
 * Two strings rather than one with markup in it: this file is read by whoever edits
 * the copy, and a `<span>` in the middle of a sentence is a styling decision that
 * belongs in the component.
 *
 * The two halves run as one sentence and wrap wherever the measure says — there is no
 * forced break between them, so the heading reflows cleanly from 320px to 1920px.
 */
export const aiMentorHeading = {
  lead: "Meet your personal",
  accent: "AI Career Mentor.",
} as const;

/** `24×7` uses a real multiplication sign (U+00D7), not the letter x. */
export const aiMentorDescription =
  "Your 24×7 AI companion for career guidance, code reviews, interview prep, and personalized learning.";

/** The availability claim, rendered as a live-status chip beside the eyebrow. */
export const aiMentorAvailability = "Available 24×7.";

/** Seven peer capabilities, rendered as a list of chips under the description. */
export const aiMentorCapabilities: readonly string[] = [
  "Ask questions",
  "Review your code",
  "Generate notes",
  "Prepare for interviews",
  "Plan your learning",
  "Track your progress",
  "Practice coding",
] as const;

/** `#apply` is the page-wide admissions anchor every primary CTA points at. */
export const aiMentorCta = {
  label: "Start Your Journey Today",
  href: "#apply",
} as const;

/**
 * The mentor figure — a cut-out PNG on a fully transparent background, so it reads as
 * standing in the section rather than sitting in a photo box. Verified: the corners
 * are `alpha: 0` and the subject is `alpha: 253`, with content running to the image's
 * own bottom and right edges. That last part is why it is anchored bottom-right and
 * allowed to run off the section's bottom edge — the crop is already built for it.
 *
 * `width` / `height` are the file's real pixels, used to reserve the box's ratio.
 */
export const aiMentorPortrait = {
  src: "/assets/ai_mentor.png",
  width: 625,
  height: 694,
  /**
   * Decorative, so deliberately empty.
   *
   * It is a stylised render of an AI figure, not information: the heading beside it
   * already says "Meet your personal AI Career Mentor" and the description says what
   * the mentor does. Describing the render would make a screen reader announce the
   * artwork's styling and nothing a sighted reader learns from it.
   */
  alt: "",
} as const;

/**
 * Animation hooks, by `data-ai-mentor` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const AI_MENTOR_SELECTORS = {
  copy: '[data-ai-mentor="copy"]',
  portrait: '[data-ai-mentor="portrait"]',
} as const;
