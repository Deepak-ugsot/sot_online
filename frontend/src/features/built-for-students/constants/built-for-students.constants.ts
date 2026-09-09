import type {
  BuiltForStudentsArtwork,
  BuiltForStudentsClosing,
  BuiltForStudentsHeadingLine,
  BuiltForStudentsQualifier,
} from "../types/built-for-students.types";

/**
 * Copy and artwork for the Built for Students section. Kept out of JSX so marketing
 * changes never touch a component — see `features/hero/constants` for the pattern.
 */

/**
 * Three lines, with the middle one stepped in.
 *
 * Separate lines rather than one sentence with `whitespace-pre-line`, because the
 * break is not the only thing that differs between them: "Students" is also indented,
 * and only the last line carries the red. Each line therefore needs to be its own
 * element regardless, so it may as well be its own record.
 */
export const builtForStudentsHeading: readonly BuiltForStudentsHeadingLine[] = [
  { id: "built-for", text: "Built for" },
  { id: "students", text: "Students", isIndented: true },
  { id: "who-want-more", text: "Who Want", accent: "More." },
] as const;

/**
 * The five conditions, written in the second person.
 *
 * They are a list and marked up as one: five parallel statements that describe the
 * same reader, not a sequence of steps, so the order carries no meaning beyond
 * ambition first and the time cost last — the one that asks the most is left until the
 * reader has already recognised themselves in the four above it.
 */
export const builtForStudentsQualifiers: readonly BuiltForStudentsQualifier[] = [
  { id: "ambition", text: "Your ambition is bigger than your college syllabus" },
  { id: "early", text: "You want to start early" },
  { id: "coding", text: "You enjoy or want to learn coding deeply" },
  { id: "build", text: "You want to build, compete and contribute" },
  { id: "time", text: "You're prepared to invest consistent time for two years" },
] as const;

/**
 * The graduation cap on a stack of books.
 *
 * `alt` is empty because the render is decorative: it restates "students" and
 * "college", which the heading and the list next to it already say in words. A
 * description here would only make a screen reader read the same idea twice.
 *
 * The intrinsic size is the file's own 788×776, passed through so Next reserves the
 * right box before the PNG arrives.
 */
export const builtForStudentsArtwork: BuiltForStudentsArtwork = {
  src: "/assets/degree_cap.png",
  alt: "",
  width: 788,
  height: 776,
};

/**
 * The counterweight to the list.
 *
 * It sits low and to the right, away from the checklist, because it is answering a
 * different question: the list says who the programme is for, this says what it is
 * not. Set apart, the two read as claim and caveat rather than as a sixth bullet.
 */
export const builtForStudentsClosing: BuiltForStudentsClosing = {
  title: "This is not a shortcut.",
  body: "It's an accelerator for students willing to put in the work.",
};

/**
 * Animation hooks, by `data-built-for-students` attribute rather than class name, so
 * restyling a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const BUILT_FOR_STUDENTS_SELECTORS = {
  /** The heading and the checklist, animated as one block. */
  copy: '[data-built-for-students="copy"]',
  artwork: '[data-built-for-students="artwork"]',
  closing: '[data-built-for-students="closing"]',
} as const;
