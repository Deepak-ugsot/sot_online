"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  builtForStudentsArtwork,
  builtForStudentsClosing,
  builtForStudentsHeading,
  builtForStudentsQualifiers,
} from "../constants/built-for-students.constants";
import { useBuiltForStudentsReveal } from "../hooks/use-built-for-students-reveal";

/**
 * "Built for Students Who Want More." — the five conditions of the programme beside a
 * graduation cap, with the "this is not a shortcut" caveat set low and to the right.
 *
 * Sits directly above the FAQ, and is the last thing the reader is asked to recognise
 * themselves in before the questions start.
 *
 * **Three columns, each anchored to a different edge of the row.** The copy is
 * top-aligned, the artwork is centred, the caveat sits on the bottom line — which is
 * what keeps the caveat from reading as a sixth bullet. Bottom-aligning it is not
 * decoration: it puts white space between the list and the claim in the one direction
 * a three-column grid has left, since horizontally they are already as far apart as
 * the measure allows.
 *
 * Below `lg` the three stack in reading order — list, artwork, caveat — and the
 * artwork centres itself rather than stretching to the column, because a 788px-wide
 * render blown up to a phone's full width dwarfs the copy it belongs to.
 */
export function BuiltForStudentsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useBuiltForStudentsReveal(sectionRef);

  return (
    <section
      id="built-for-students"
      ref={sectionRef}
      aria-labelledby="built-for-students-heading"
      className="relative bg-surface py-16 sm:py-20 lg:py-24"
    >
      {/* `84rem` matches the career and journey sections, so the page keeps one
          measure down its length. */}
      <div className="mx-auto max-w-[84rem] px-6">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
          <div data-built-for-students="copy" className="lg:col-span-5">
            <h2
              id="built-for-students-heading"
              className="type-heading text-[clamp(2rem,4.2vw,3.5rem)] font-bold text-ink"
            >
              {builtForStudentsHeading.map((line) => (
                /*
                  `block` on a span rather than three `<p>`s or a `<br />`: this is one
                  heading, and the lines are its shape, not separate statements. The
                  step is set in `em` so it tracks the heading's clamp — at a fixed
                  `px` the indent would swallow the line on a phone and barely register
                  at the 56px cap.
                */
                <span
                  key={line.id}
                  className={line.isIndented ? "block ps-[1.8em]" : "block"}
                >
                  {line.text}
                  {line.accent ? (
                    <>
                      {" "}
                      <span className="text-brand">{line.accent}</span>
                    </>
                  ) : null}
                </span>
              ))}
            </h2>

            {/*
              A real `<ul>` with real markers. These are five parallel conditions, and
              the bullets are what say so — a screen reader announcing "list, 5 items"
              is carrying the same information the dots carry visually.

              `marker:text-ink` because the copy is muted and the dots are not: in the
              reference the markers sit at full strength against grey text, which is
              what stops five short lines reading as one soft paragraph.

              The indent is `ps-*` + `list-outside`, so a wrapping line aligns under
              the first word rather than under the dot.
            */}
            <ul className="mt-9 flex list-outside list-disc flex-col gap-4 ps-5 text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.55] text-ink-muted marker:text-ink lg:mt-11 lg:gap-5">
              {builtForStudentsQualifiers.map((qualifier) => (
                <li key={qualifier.id}>{qualifier.text}</li>
              ))}
            </ul>
          </div>

          {/*
            Centred in its column at every width, and capped: the render is nearly
            square, so letting it fill a wide column would make it taller than the
            five-line list beside it and turn the artwork into the subject of the
            section.
          */}
          <div
            data-built-for-students="artwork"
            className="flex justify-center lg:col-span-4 lg:self-center"
          >
            <Image
              src={builtForStudentsArtwork.src}
              alt={builtForStudentsArtwork.alt}
              width={builtForStudentsArtwork.width}
              height={builtForStudentsArtwork.height}
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 20rem, 70vw"
              className="h-auto w-full max-w-[17rem] sm:max-w-[20rem] lg:max-w-[28rem]"
              priority={false}
            />
          </div>

          {/*
            `lg:self-end` is what puts the caveat on the bottom line of the row — the
            grid's own `items-start` holds the other two columns at the top, so this is
            the only thing that drops, and it lands with its last line level with the
            last bullet. That shared bottom edge is the whole reason it can sit this
            far from the list and still read as belonging to the same section.
          */}
          <div data-built-for-students="closing" className="lg:col-span-3 lg:self-end">
            <p className="type-heading text-[clamp(1.125rem,1.9vw,1.5rem)] font-bold text-ink">
              {builtForStudentsClosing.title}
            </p>
            <p className="mt-3 max-w-[24rem] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.55] text-ink-muted">
              {builtForStudentsClosing.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
