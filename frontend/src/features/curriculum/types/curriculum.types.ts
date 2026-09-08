/**
 * The heading is split so one word can be rendered in brand red, matching the hero,
 * showcase and ecosystem sections.
 */
export type CurriculumHeadingCopy = {
  lead: string;
  accent: string;
  trail: string;
};

/** One project card in a semester's rail. */
export type CurriculumProject = {
  /** Stable React key — do not derive keys from copy, which is editable. */
  id: string;
  title: string;
  description: string;
  image: string;
};

/**
 * One semester tab and everything its panel shows.
 *
 * `label` is the tab's small eyebrow ("Semester 1") and `title` the track name beneath
 * it, because the tab shows both and they are not derivable from each other.
 */
export type CurriculumSemester = {
  id: string;
  label: string;
  title: string;
  projects: readonly CurriculumProject[];
  /** Outcome pills — what the semester leaves you able to do. */
  skills: readonly string[];
  /** The taught modules, listed in the "All Subjects" panel. */
  subjects: readonly string[];
};
