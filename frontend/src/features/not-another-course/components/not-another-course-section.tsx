"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  notAnotherCourseClosing,
  notAnotherCourseHeading,
  notAnotherCourseMedia,
  notAnotherCoursePeerLabels,
  notAnotherCourseSubtitle,
} from "../constants/not-another-course.constants";
import { useNotAnotherCourseReveal } from "../hooks/use-not-another-course-reveal";
import { NotAnotherCourseLabel } from "./not-another-course-label";

/**
 * "Your college determines your campus. It shouldn't determine your peer group." — the
 * collage of students ringed by the four archetypes they might be, and a sign-off under
 * it.
 *
 * **The labels overlap the artwork rather than sitting beside it.** Laying them out as
 * columns either squeezes the collage or pushes the labels to the page edges; the
 * photographs step down toward the middle and leave all four outer corners open, so the
 * labels are lifted out of flow into those instead. See `CORNER_PLACEMENT` for the
 * numbers and what ties them to this particular render.
 *
 * Below 1100px there is not enough width for that overlap to read, so the labels drop
 * into a grid beneath the collage. The switch point is set by the content rather than a
 * Tailwind breakpoint — neither `lg` (1024) nor `xl` (1280) lands close enough to where
 * the composition stops fitting.
 */
export function NotAnotherCourseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useNotAnotherCourseReveal(sectionRef);

  return (
    <section
      id="not-another-course"
      ref={sectionRef}
      aria-labelledby="notcourse-heading"
      className="relative bg-surface"
    >
      <div className="mx-auto max-w-[100rem] px-6 py-18 min-[1100px]:py-25">
        <div
          data-notcourse="heading"
          className="mx-auto flex max-w-[56rem] flex-col items-center gap-5 text-center"
        >
          <h2
            id="notcourse-heading"
            className="type-heading text-balance text-[clamp(1.75rem,3.4vw,3rem)] text-ink"
          >
            {notAnotherCourseHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {notAnotherCourseHeading.accent}
            </span>
          </h2>

          <p className="max-w-[52rem] font-display text-pretty text-[clamp(0.9375rem,1.3vw,1.0625rem)] leading-[1.6] text-ink-muted">
            {notAnotherCourseSubtitle}
          </p>
        </div>

        {/*
          `relative` is load-bearing: it is what the absolutely placed labels resolve
          against from 1100px up. Without it they would escape to the section and land
          against the page edges instead of the artwork's corners.
        */}
        <div className="relative mx-auto mt-12 w-full max-w-[86rem] min-[1100px]:mt-16">
          {/*
            The collage takes the middle 62% on desktop, which is what leaves the outer
            band either side for the labels to sit over.
          */}
          <div
            data-notcourse="media"
            className="mx-auto w-full max-w-[46rem] min-[1100px]:max-w-none min-[1100px]:w-[62%]"
          >
            <Image
              src={notAnotherCourseMedia.src}
              alt={notAnotherCourseMedia.alt}
              width={notAnotherCourseMedia.width}
              height={notAnotherCourseMedia.height}
              sizes="(min-width: 1100px) 62vw, 100vw"
              priority={false}
              className="h-auto w-full"
            />
          </div>

          {/*
            A grid under the collage below 1100px; lifted into its corners above. The
            wrapper's gap and top margin only apply while they are in flow — once each
            label is absolute it is out of the grid entirely.
          */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 min-[1100px]:mt-0 min-[1100px]:block">
            {notAnotherCoursePeerLabels.map((label) => (
              <NotAnotherCourseLabel key={label.id} label={label} />
            ))}
          </div>
        </div>

        <div
          data-notcourse="closing"
          className="mx-auto mt-12 max-w-[48rem] text-center min-[1100px]:mt-16"
        >
          <p className="type-heading text-balance text-[clamp(1.25rem,2.1vw,1.75rem)] text-ink">
            {notAnotherCourseClosing.lead}
          </p>
          <p className="type-heading text-balance text-[clamp(1.25rem,2.1vw,1.75rem)] font-accent font-medium text-brand">
            {notAnotherCourseClosing.accent}
          </p>
        </div>
      </div>
    </section>
  );
}
