"use client";

import { cn } from "@/lib/utils";
import { curriculumSemesters } from "../constants/curriculum.constants";

type CurriculumHeaderProps = {
  index: number;
  isOpen: boolean;
  onSelect: (index: number) => void;
  /** `id` of the single panel every header controls. */
  panelId: string;
};

/**
 * Explicit column per header, so the desktop row cannot be re-ordered by grid
 * auto-placement.
 *
 * The panel sits *between* headers in the DOM — it has to, for the accordion — and with
 * only `row-start-1` on the headers the auto-placement cursor would step over the columns
 * the panel occupies and push the later headers out of the row. Pinning each header to its
 * own column removes the question. Written out because Tailwind needs static class names.
 */
const COLUMN = [
  "lg:col-start-1",
  "lg:col-start-2",
  "lg:col-start-3",
  "lg:col-start-4",
] as const;

/** The chevron that marks a collapsed accordion row. Hidden once the layout is tabs. */
function AccordionChevron({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "h-4 w-4 flex-none transition-transform duration-300 ease-cinematic lg:hidden",
        isOpen && "rotate-180",
      )}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

/**
 * One semester's header — an accordion row on small screens, a tab in a row of four from
 * `lg` up.
 *
 * **The semantics are a disclosure, not a tablist, and that is deliberate.** ARIA roles
 * cannot change at a breakpoint, so a `role="tab"` accurate on desktop would be wrong on
 * the phone layout — and a `tablist` is not allowed to contain the panel, which the
 * accordion ordering requires it to. `aria-expanded` + `aria-controls` describes both
 * layouts truthfully: four buttons, each revealing the same region. It also means all four
 * stay in the tab order, which is what a keyboard user expects of an accordion.
 */
export function CurriculumHeader({
  index,
  isOpen,
  onSelect,
  panelId,
}: CurriculumHeaderProps) {
  const semester = curriculumSemesters[index];

  return (
    <button
      type="button"
      id={`${panelId}-header-${semester.id}`}
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={() => onSelect(index)}
      className={cn(
        "group flex w-full items-center justify-between gap-3 border-b border-hairline px-4 py-3 text-left transition-colors duration-300 ease-cinematic",
        "lg:row-start-1 lg:flex-col lg:items-start lg:gap-1.5 lg:py-3.5",
        COLUMN[index],
        isOpen ? "bg-brand text-white" : "bg-white text-ink hover:bg-surface",
        // The vertical rule between tabs only exists in the desktop row; stacked, the
        // headers are separated by their own bottom border. The active tab drops it either
        // way — a rule butting into the red block reads as a seam in it.
        !isOpen && "lg:border-r lg:border-hairline lg:last:border-r-0",
      )}
    >
      {/*
        Stacked, the eyebrow and title sit side by side so a collapsed row stays one line
        tall and all four fit on screen at once. From `lg` the header becomes a tab and they
        stack, which is what the two `lg:` direction switches above are for.
      */}
      <span className="flex min-w-0 flex-1 items-center gap-2.5 lg:flex-col lg:items-start lg:gap-1.5">
        <span
          className={cn(
            "flex-none font-display text-[0.625rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
            isOpen ? "text-white/90" : "text-ink-muted",
          )}
        >
          {semester.label}
        </span>
        <span className="font-display text-[0.8125rem] font-medium leading-snug sm:text-sm">
          {semester.title}
        </span>
      </span>

      <AccordionChevron isOpen={isOpen} />
    </button>
  );
}
