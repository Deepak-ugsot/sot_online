import type {
  NotAnotherCourseClosingCopy,
  NotAnotherCourseHeadingCopy,
  NotAnotherCoursePeerLabel,
} from "../types/not-another-course.types";

/**
 * Copy for the peer-group section. Kept out of JSX so marketing changes never touch a
 * component — see `features/hero/constants` for the same pattern.
 */

/**
 * The accent closes the sentence inline rather than dropping to its own line.
 *
 * No `max-width` drives the break: the heading wraps wherever its own measure puts it.
 * An earlier version of this section stated the break in the data because the artwork's
 * composition depended on it; this one does not, and a stated break would only fight the
 * balancer at sizes it was not measured for.
 */
export const notAnotherCourseHeading: NotAnotherCourseHeadingCopy = {
  lead: "Your college determines your campus. It shouldn't determine",
  accent: "Your peer group.",
};

export const notAnotherCourseSubtitle =
  "Maybe you're the only student in your classroom obsessed with Codeforces. Maybe nobody around you knows what GSoC is. Maybe you want to build at midnight while everyone else is preparing only for semester exams. Find your tribe.";

/**
 * The four peer archetypes ringing the collage.
 *
 * Order here is DOM order, which is also the reading order: the two top corners first,
 * left before right, then the two bottom ones. On desktop they are lifted out of flow
 * into the corners, so this array is the only thing fixing what a screen reader
 * announces first.
 */
export const notAnotherCoursePeerLabels: readonly NotAnotherCoursePeerLabel[] = [
  {
    id: "coders",
    title: "Coders",
    meta: "DSA, Competitive Programming",
    icon: "code",
    corner: "top-left",
  },
  {
    id: "ai-hackers",
    title: "AI Hackers",
    meta: "GenAI, Agents, AI Engineering",
    icon: "bot",
    corner: "top-right",
  },
  {
    id: "builders",
    title: "Builders",
    meta: "Products, AI, Systems",
    icon: "box",
    corner: "bottom-left",
  },
  {
    id: "open-source",
    title: "Open-Source Contributor",
    meta: "GitHub, GSoC, Communities",
    icon: "github",
    corner: "bottom-right",
  },
] as const;

/** The sign-off under the collage: a dark statement, then the accented answer to it. */
export const notAnotherCourseClosing: NotAnotherCourseClosingCopy = {
  lead: "Ambition is contagious.",
  accent: "Surround yourself with more of it.",
};

/**
 * The collage: five students at their laptops around a central figure.
 *
 * **The labels are not baked in.** The file is only the photography and the red arch;
 * every piece of text around it is markup — see `notAnotherCoursePeerLabels`.
 *
 * A local asset, so `next/image` optimises it at build time and no `remotePatterns`
 * entry is needed. Intrinsic size is passed rather than `fill`, so the box is reserved
 * from the file's own ratio and nothing below it jumps as the image loads.
 */
export const notAnotherCourseMedia = {
  src: "/assets/peer_group.png",
  width: 894,
  height: 530,
  /**
   * Real alt text, not `""` — the image carries the section's meaning (a peer group,
   * not one student) and the surrounding copy does not restate it.
   */
  alt: "Six students working at their laptops, arranged around one another as a single peer group.",
} as const;

/**
 * Animation hooks, by `data-notcourse` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const NOT_ANOTHER_COURSE_SELECTORS = {
  heading: '[data-notcourse="heading"]',
  media: '[data-notcourse="media"]',
  label: '[data-notcourse="label"]',
  closing: '[data-notcourse="closing"]',
} as const;
