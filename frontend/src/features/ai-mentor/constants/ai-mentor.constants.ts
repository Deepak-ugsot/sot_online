/**
 * Copy for the AI Mentor section. Kept out of JSX so marketing changes never touch a
 * component — see `features/hero/constants` for the same pattern.
 */

export const aiMentorEyebrow = "AI Mentor";

export const aiMentorHeading = "Meet your personal AI Career Mentor.";

/** `24×7` uses a real multiplication sign (U+00D7), not the letter x. */
export const aiMentorTagline = "Available 24×7.";

export const aiMentorCapabilities: readonly string[] = [
  "Ask questions",
  "Review your code",
  "Generate notes",
  "Prepare for interviews",
  "Plan your learning",
  "Track your progress",
  "Practice coding",
] as const;

/**
 * TEMPORARY — a stand-in video while the real product walkthrough is produced.
 *
 * The design calls for an animated chat demo here. Swap `videoId` when the real
 * footage exists, or replace `YouTubeEmbed` outright if the panel goes back to being
 * a chat mock-up.
 */
export const aiMentorVideo = {
  videoId: "xNipeHlgUGA",
  title: "AI Career Mentor walkthrough",
} as const;

/**
 * Animation hooks, by `data-ai-mentor` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const AI_MENTOR_SELECTORS = {
  copy: '[data-ai-mentor="copy"]',
  media: '[data-ai-mentor="media"]',
} as const;
