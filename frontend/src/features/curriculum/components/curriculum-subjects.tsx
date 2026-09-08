import type { CurriculumSemester } from "../types/curriculum.types";

type CurriculumSubjectsProps = { subjects: CurriculumSemester["subjects"] };

/**
 * "Skills you'll Build" and "All Subjects" — the two lists under the project rail.
 *
 * They live in one file because they are one block in the design: outcome pills, a rule,
 * then the taught modules that produce them.
 */

export function CurriculumSkills({ skills }: { skills: CurriculumSemester["skills"] }) {
  return (
    <div>
      <h3 className="font-display text-[0.9375rem] font-medium text-ink sm:text-base">
        Skills you&apos;ll Build:
      </h3>

      <ul className="mt-4 flex list-none flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-md border border-brand px-3 py-1.5 font-display text-xs font-medium text-brand"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The ruled document mark beside the "All Subjects" heading. */
function SubjectsIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="h-[1.125rem] w-[1.125rem] text-brand"
    >
      <path d="M4.5 2.75h11a.75.75 0 0 1 .75.75v13a.75.75 0 0 1-.75.75h-11a.75.75 0 0 1-.75-.75v-13a.75.75 0 0 1 .75-.75Z" />
      <path d="M7 6.5h6M7 10h6M7 13.5h3.5" />
    </svg>
  );
}

/** The `>` marker on each subject row. */
function Chevron() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="mt-[0.25rem] h-2.5 w-2.5 flex-none text-brand"
    >
      <path d="M4 2.5 8 6l-4 3.5" />
    </svg>
  );
}

/**
 * The full module list, in a bordered panel.
 *
 * **A two-column grid, which fills across — not CSS `columns`, which fill down.** The
 * design pairs each subject with the one beside it (Python next to Web Essentials, Maths
 * next to DSA), so the list is stored in that row order and the layout has to honour it.
 * `columns-2` would pour the first four down the left column and the rest down the right,
 * which silently re-pairs every row against the approved design.
 *
 * An odd count simply leaves the last cell empty, which is what Semester 1's seven do.
 */
export function CurriculumSubjects({ subjects }: CurriculumSubjectsProps) {
  return (
    <div className="rounded-xl border border-hairline p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <SubjectsIcon />
        <h3 className="font-display text-[0.9375rem] font-medium text-ink">
          All Subjects
        </h3>
      </div>

      <ul className="mt-3.5 grid list-none grid-cols-1 gap-x-8 sm:grid-cols-2">
        {subjects.map((subject) => (
          <li key={subject} className="flex items-start gap-2.5 py-1.5">
            <Chevron />
            <span className="font-display text-xs leading-relaxed text-ink sm:text-[0.8125rem]">
              {subject}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
