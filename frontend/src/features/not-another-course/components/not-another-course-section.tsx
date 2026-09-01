"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  notAnotherCourseCaptions,
  notAnotherCourseHeading,
  notAnotherCourseMedia,
} from "../constants/not-another-course.constants";
import { useNotAnotherCourseReveal } from "../hooks/use-not-another-course-reveal";
import { NotAnotherCourseCaption } from "./not-another-course-caption";

/**
 * "Not Another Course. A Career Operating System." — a centred heading over the
 * product collage, with a caption tucked into each of the artwork's open corners.
 *
 * **The captions overlap the image's box rather than sitting beside it.** Laying the
 * three out as columns would either squeeze the collage or push the captions to the
 * page edges; the artwork has empty bottom-left and top-right corners, so the captions
 * are lifted out of flow into those instead. See `SIDE_PLACEMENT` for the numbers and
 * what ties them to this particular render.
 *
 * Below 1100px there is not enough width for that overlap to read, so the captions
 * drop into ordinary flow beneath the collage. The switch point is set by the content
 * rather than a Tailwind breakpoint — neither `lg` (1024) nor `xl` (1280) lands close
 * enough to where the three-part composition stops fitting.
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
        <h2
          id="notcourse-heading"
          data-notcourse="heading"
          className="mx-auto max-w-[60rem] text-center type-heading text-[clamp(1.875rem,3.6vw,3.25rem)] text-ink"
        >
          {/* The space survives even though the accent is a block and collapses
              before it — without it the accessible text reads "A CareerOperating
              System." */}
          {notAnotherCourseHeading.lead}{" "}
          <span className="block font-accent font-medium text-brand">
            {notAnotherCourseHeading.accent}
          </span>
        </h2>

        {/*
          `relative` is load-bearing: it is what the absolutely placed captions resolve
          against from 1100px up. Without it they would escape to the section and land
          against the page edges instead of the artwork's corners.
        */}
        <div className="relative mx-auto mt-12 w-full max-w-[86rem] min-[1100px]:mt-16">
          {/*
            The collage takes the middle 65% on desktop, which is what leaves the outer
            28% either side for the captions to sit in.
          */}
          <div
            data-notcourse="media"
            className="mx-auto w-full min-[1100px]:w-[65%]"
          >
            <Image
              src={notAnotherCourseMedia.src}
              alt={notAnotherCourseMedia.alt}
              width={notAnotherCourseMedia.width}
              height={notAnotherCourseMedia.height}
              sizes="(min-width: 1100px) 65vw, 100vw"
              priority={false}
              className="h-auto w-full"
            />
          </div>

          {/*
            In flow under the collage below 1100px; lifted into its corners above.
            The wrapper's gap and top margin only apply while they are in flow — once
            each caption is absolute it is out of the flex layout entirely.
          */}
          <div className="mt-10 flex flex-col gap-9 min-[1100px]:mt-0 min-[1100px]:gap-0">
            {notAnotherCourseCaptions.map((caption) => (
              <NotAnotherCourseCaption key={caption.id} caption={caption} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
