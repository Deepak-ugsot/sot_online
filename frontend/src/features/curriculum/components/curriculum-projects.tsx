"use client";

import Image from "next/image";
import { useRef } from "react";

import { RailScrollArrow } from "@/components/ui/rail-scroll-arrow";
import type { CurriculumProject } from "../types/curriculum.types";

type CurriculumProjectsProps = { projects: readonly CurriculumProject[] };

/**
 * "Projects you'll be working on" — a horizontal rail of the semester's builds.
 *
 * **A rail rather than a grid, and the overflow is the affordance.** Three semesters
 * carry four projects and one carries three; a four-up grid would shrink each card's
 * artwork to a thumbnail, and a two-row grid would push the skills and subjects below the
 * fold. At a fixed card width the fourth card is half-visible at the edge, which says
 * there is more without spending vertical space to prove it.
 *
 * **The card width lives in `--curriculum-card`, and the arrow's offset is calculated from
 * it.** The arrow has to sit on the artwork's centre, and the artwork's height is derived
 * from the card width (`card − padding`, at `358/566`) — so three hand-tuned `top` values
 * would silently drift out of true the next time a card is resized. One variable and one
 * `calc()` keep them in step: `0.75rem` of padding above the image, plus half its height,
 * where `358/566/2` is `0.3163`.
 *
 * The rail's scroll position does not need resetting between semesters: the section
 * remounts the whole panel on a tab change, so this container is new each time.
 */
export function CurriculumProjects({ projects }: CurriculumProjectsProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <h3 className="font-display text-[0.9375rem] font-medium text-ink sm:text-base">
        Projects you&apos;ll be working on:
      </h3>

      {/*
        The wrapper carries the positioning so the arrow can sit against the rail's right
        edge. Putting the arrow inside the scroll container instead would make it scroll
        away with the cards.
      */}
      <div className="relative mt-4 [--curriculum-card:15.5rem] sm:[--curriculum-card:17.5rem] lg:[--curriculum-card:19rem]">
        <div
          ref={viewportRef}
          role="group"
          aria-label="Semester projects"
          tabIndex={0}
          // The gutter bleed (`-mx-*` against a matching `px-*`) lets the rail run off the
          // panel's edge instead of stopping short in a box, and `scroll-pl-*` puts a
          // snapped card back on that same gutter. All three track the panel's own padding.
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 px-4 pb-2 sm:-mx-6 sm:scroll-pl-6 sm:px-6 lg:-mx-7 lg:scroll-pl-7 lg:px-7"
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="flex w-[var(--curriculum-card)] flex-none snap-start flex-col rounded-xl bg-surface p-3"
            >
              <div className="relative aspect-[566/358] w-full overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 256px, 232px"
                  // Only the first two cards of the opening semester are ever on screen
                  // before an interaction; the rest are a swipe or a tab away.
                  loading={index < 2 ? "eager" : "lazy"}
                  className="object-cover"
                />
              </div>

              <h4 className="mt-3.5 font-display text-[0.8125rem] font-semibold leading-snug text-ink sm:text-sm">
                {project.title}
              </h4>
              <p className="mt-1.5 font-display text-xs leading-relaxed text-ink-muted">
                {project.description}
              </p>
            </article>
          ))}
        </div>

        {/* Centred on the artwork, not the card — see the note above the component. */}
        <RailScrollArrow
          viewportRef={viewportRef}
          className="right-1 top-[calc(0.75rem_+_(var(--curriculum-card)_-_1.5rem)_*_0.3163)] -translate-y-1/2"
        />
      </div>
    </div>
  );
}
