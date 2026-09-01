import type {
  NotAnotherCourseCaption,
  NotAnotherCourseHeadingCopy,
} from "../types/not-another-course.types";

/**
 * Copy for the "Not Another Course" section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

/**
 * Only the closing phrase is accented, and the break before it is stated here rather
 * than left to measurement.
 *
 * An earlier version drove the break from a `max-width` on the line, copying the
 * reference. That only lands for the exact typeface it was measured against — with the
 * fallback face it broke as "A Career Operating / System." instead. Stating it in the
 * data holds whichever font loads.
 */
export const notAnotherCourseHeading: NotAnotherCourseHeadingCopy = {
  lead: "Not Another Course. A Career",
  accent: "Operating System",
};

/**
 * The two captions flanking the collage.
 *
 * Order here is DOM order, which is also the reading order: left caption first. On
 * desktop they are lifted out of flow to opposite sides, so this is the only thing
 * fixing what a screen reader announces first.
 */
export const notAnotherCourseCaptions: readonly NotAnotherCourseCaption[] = [
  {
    id: "beyond-coding",
    title: "Beyond Coding",
    body: "Most platforms teach you to code. Career OS guides you from college to your first software engineering job.",
    side: "left",
  },
  {
    id: "career-ready",
    title: "Career-Ready, From Day One",
    body: "Build real skills, projects, and experience for your software engineering career.",
    side: "right",
  },
] as const;

/**
 * The composed product shot: a student at a laptop, ringed by floating learning,
 * code and outcome panels.
 *
 * A local asset, so `next/image` optimises it at build time and no `remotePatterns`
 * entry is needed — the `images.unsplash.com` host this section used to require has
 * been dropped from `next.config.ts` along with the stock photo it allowed.
 *
 * Intrinsic size is passed rather than `fill`, so the box is reserved from the file's
 * own ratio and the captions below it never jump as the image loads.
 */
export const notAnotherCourseMedia = {
  src: "/assets/course.png",
  width: 799,
  height: 471,
  /**
   * Real alt text, not `""` — unlike the decorative card art elsewhere, this image
   * carries the section's meaning and is not restated by the surrounding copy.
   */
  alt: "A student building a project at her laptop, surrounded by her learning track, live code and a graduate heading to work.",
} as const;

/**
 * Animation hooks, by `data-notcourse` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const NOT_ANOTHER_COURSE_SELECTORS = {
  heading: '[data-notcourse="heading"]',
  media: '[data-notcourse="media"]',
  caption: '[data-notcourse="caption"]',
} as const;
