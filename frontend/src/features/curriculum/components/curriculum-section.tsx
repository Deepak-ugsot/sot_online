"use client";

import { Fragment, useRef, useState } from "react";

import {
  curriculumHeading,
  curriculumSemesters,
  curriculumSubtitle,
} from "../constants/curriculum.constants";
import { useCurriculumPanelTransition } from "../hooks/use-curriculum-panel-transition";
import { useCurriculumReveal } from "../hooks/use-curriculum-reveal";
import { CurriculumHeader } from "./curriculum-header";
import { CurriculumProjects } from "./curriculum-projects";
import { CurriculumSkills, CurriculumSubjects } from "./curriculum-subjects";

/** Ties every header to the one panel, for `aria-controls` / `aria-labelledby`. */
const PANEL_ID = "curriculum-panel";

/**
 * "A curriculum built around how engineers actually learn." — the four semesters as an
 * accordion on small screens and a tabbed panel from `lg` up.
 *
 * **Both layouts are the same DOM, rearranged by one grid — there is no media-query hook
 * and nothing is rendered twice.** The panel sits *between* the headers in source order,
 * right after the open one, which is exactly accordion order and what a single-column grid
 * gives for free. From `lg` the grid becomes four columns, every header is pinned to row 1
 * and its own column, and the panel is placed explicitly in row 2 spanning all four — a
 * row of tabs above one panel.
 *
 * Rendering both variants and hiding one with `lg:hidden` was the alternative, and it would
 * duplicate the whole panel — four project cards and their artwork — in the markup. A
 * `matchMedia` hook was the other, and it costs a wrong-layout first paint on every load.
 *
 * **One semester is always open.** A collapsible-to-nothing accordion would leave the
 * desktop layout, which shares this state, showing a row of tabs above an empty panel.
 * Switching is therefore always a close *and* an open, which is why the transition is a
 * height morph on the one panel rather than a pair of expand/collapse tweens — see
 * `useCurriculumPanelTransition`.
 *
 * A Client Component because it owns which semester is open.
 */
export function CurriculumSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  useCurriculumReveal(sectionRef);

  // Replaces `setOpenIndex` at every call site: the hook has to read the outgoing
  // panel's height before React swaps it out, so selecting has to go through it.
  const handleSelect = useCurriculumPanelTransition(
    panelRef,
    openIndex,
    setOpenIndex,
  );

  const open = curriculumSemesters[openIndex];

  return (
    <section
      id="curriculum"
      ref={sectionRef}
      aria-labelledby="curriculum-heading"
      className="relative bg-surface py-14 lg:py-20"
    >
      <div className="mx-auto max-w-[72rem] px-6 sm:px-8">
        <div
          data-curriculum="heading"
          className="mx-auto flex max-w-[44rem] flex-col items-center gap-3 text-center"
        >
          <h2
            id="curriculum-heading"
            className="type-heading text-balance text-[clamp(1.625rem,3.2vw,2.5rem)] text-ink"
          >
            {curriculumHeading.lead}{" "}
            <span className="text-brand">{curriculumHeading.accent}</span>{" "}
            {curriculumHeading.trail}
          </h2>

          <p className="font-display text-pretty text-[clamp(0.9375rem,1.3vw,1.0625rem)] text-ink-muted">
            {curriculumSubtitle}
          </p>
        </div>

        {/*
          `overflow-hidden` is load-bearing, not tidiness: the open header is a solid red
          block that runs into the card's corners, and without clipping it squares them off
          against the card's own radius.
        */}
        <div
          data-curriculum="panel"
          className="mt-8 overflow-hidden rounded-2xl bg-white shadow-[0_18px_44px_-28px_rgba(10,10,11,0.2)] lg:mt-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4">
            {curriculumSemesters.map((semester, index) => (
              <Fragment key={semester.id}>
                <CurriculumHeader
                  index={index}
                  isOpen={index === openIndex}
                  onSelect={handleSelect}
                  panelId={PANEL_ID}
                />

                {/*
                  Only the open semester's panel is in the tree, and `key={open.id}`
                  remounts it on every change. That is what makes switching a clean swap:
                  the project rail's scroll position, and any focus inside the outgoing
                  panel, go with it — otherwise a viewer who had scrolled to the last
                  project of Semester 1 would land mid-rail in Semester 2.
                */}
                {index === openIndex ? (
                  <div
                    key={open.id}
                    ref={panelRef}
                    id={PANEL_ID}
                    role="region"
                    aria-labelledby={`${PANEL_ID}-header-${open.id}`}
                    className="flex flex-col gap-7 border-b border-hairline px-4 py-6 sm:px-6 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:gap-8 lg:border-b-0 lg:px-7 lg:py-7"
                  >
                    <CurriculumProjects projects={open.projects} />
                    <CurriculumSkills skills={open.skills} />

                    {/* The rule separating outcomes from the modules that teach them. */}
                    <div className="border-t border-hairline pt-7 lg:pt-8">
                      <CurriculumSubjects subjects={open.subjects} />
                    </div>
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
