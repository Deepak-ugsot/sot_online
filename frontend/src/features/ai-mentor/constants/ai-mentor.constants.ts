/**
 * Copy and artwork for the AI Mentor section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

/**
 * Split in two so the last word can carry the brand red, the way every other two-tone
 * heading on the page is built.
 *
 * Two strings rather than one with markup in it: this file is read by whoever edits
 * the copy, and a `<span>` in the middle of a sentence is a styling decision that
 * belongs in the component. `lead` carries the line break as a `\n`, rendered with
 * `whitespace-pre-line`, so the break stays with the copy rather than becoming a
 * `<br />` in JSX.
 */
export const aiMentorHeading = {
  lead: "Don't just build for yourself.\nBuild with the",
  accent: "world.",
} as const;

export const aiMentorDescription =
  "Build the technical ability, contribution history and developer discipline required to aim for opportunities such as Google Summer of Code.";

/**
 * The path through open source, in order — from first commit to a GSoC application.
 * Rendered as a list of chips under the description.
 *
 * The order is the point: they read as steps, not as a feature list, which is why
 * "Git/GitHub" is first and "Aim for GSoC" is last.
 */
export const aiMentorCapabilities: readonly string[] = [
  "Git/GitHub",
  "Read Large Codebases",
  "Find Issues",
  "First PR",
  "Work With Maintainers",
  "Consistent Contributions",
  "Aim for GSoC",
] as const;

/**
 * The line that closes the block, under the chips — split so the second half can carry
 * the brand red, like the heading above it.
 *
 * It is the section's payoff rather than a caption: the chips list the steps, and this
 * says what the steps add up to. That is why it is set at heading weight and not as
 * another line of body copy.
 */
export const aiMentorClosing = {
  lead: "Turn GitHub into your public",
  accent: "engineering resume.",
} as const;

/**
 * The figure — a cut-out PNG on a fully transparent background, so it reads as
 * standing in the section rather than sitting in a photo box.
 *
 * `width` / `height` are the file's real pixels, used to reserve the box's ratio.
 */
export const aiMentorPortrait = {
  src: "/assets/git_ai.png",
  width: 707,
  height: 653,
  /**
   * Decorative, so deliberately empty.
   *
   * It is a stylised render of an android holding a GitHub mark, not information: the
   * heading beside it already says "Build with the world" and the description names
   * open source and GSoC outright. Describing the render would make a screen reader
   * announce the artwork's styling and nothing a sighted reader learns from it.
   */
  alt: "",
} as const;

/**
 * Height of the light band across the top of the section, which the figure's head
 * breaks into.
 *
 * A fixed height rather than the reference's "15–20% of the section", and
 * deliberately: the section's height is set by its own copy, so a percentage band
 * would need the copy to clear a distance that the copy itself defines.
 *
 * `lg:h-28` (112px) is what keeps it inside that 15–20% at both ends of the desktop
 * range — the section is ~700px tall at 1440 (16%) and ~566px at 1024, where the
 * earlier `h-32` came out at 23%.
 */
export const AI_MENTOR_BAND_HEIGHT = "h-20 sm:h-24 lg:h-28";

/**
 * Animation hooks, by `data-ai-mentor` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const AI_MENTOR_SELECTORS = {
  copy: '[data-ai-mentor="copy"]',
  portrait: '[data-ai-mentor="portrait"]',
} as const;
