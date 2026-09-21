import type {
  HackathonsArtwork,
  HackathonsCadence,
  HackathonsHeadingCopy,
} from "../types/hackathons.types";

/**
 * Copy and artwork for the Hackathons section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the pattern.
 */

/** "Build. Compete. / **Win.** [₹20 Lakhs]" */
export const hackathonsHeading: HackathonsHeadingCopy = {
  lead: "Build. Compete.",
  accent: "Win.",
  prize: "₹20 Lakhs",
} as const;

/**
 * The paragraph, one string per sentence.
 *
 * The design sets each sentence on its own line, and the break falls between them
 * rather than wherever the measure puts it — so they are kept apart here and rendered
 * as two lines, each free to wrap on its own where the column is too narrow.
 */
export const hackathonsDescription: readonly string[] = [
  "Put your engineering skills to the test through hackathons and coding competitions.",
  "Build real solutions, compete with top talent, and win exciting rewards.",
] as const;

export const hackathonsCadence: HackathonsCadence = {
  label: "Every 6 months",
  lines: [
    "Hackathons. Coding Competitions.",
    "Real problems. Real solutions. Real rewards.",
  ],
} as const;

/**
 * The student in the headset.
 *
 * **A cut-out on transparency that fades out at its own foot**, so it must never be
 * given a plate or a container of its own: the fade is what seats the figure on the
 * section's ground, and a box behind it would show up as a rectangle the torso stops at.
 */
export const hackathonsArtwork: HackathonsArtwork = {
  src: "/assets/hackathons/student-headset.png",
  alt: "A student looking up, wearing a red glass headset that shows a code symbol and the words Hack, Build, Solve, Win.",
  width: 520,
  height: 617,
} as const;

/**
 * Animation hooks, by `data-hackathons` attribute rather than class name, so restyling a
 * component can never silently break the reveal. Mirrors `NEXT_OPPORTUNITY_SELECTORS`.
 */
export const HACKATHONS_SELECTORS = {
  copy: '[data-hackathons="copy"]',
  beat: '[data-hackathons="beat"]',
  prize: '[data-hackathons="prize"]',
  artwork: '[data-hackathons="artwork"]',
} as const;
