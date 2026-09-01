import Image from "next/image";

import type { ShowcaseProject } from "../types/showcase.types";

type ShowcaseCardProps = {
  project: ShowcaseProject;
  /** Cards in the duplicate track are decorative — see `ShowcaseSection`. */
  hidden?: boolean;
};

/**
 * One project in the marquee.
 *
 * Every card is the same 262×260 footprint, stepping down to 220×218 on small
 * phones. A single size is what lets the row read as an even, continuously moving
 * strip; the earlier fanned arch depended on varying heights and a bottom-aligned
 * row, neither of which survives a marquee.
 *
 * The artwork is portrait (600×833) and the card is close to square, so `object-cover`
 * crops to roughly the middle of each image — that is where the app screens sit.
 */
export function ShowcaseCard({ project, hidden = false }: ShowcaseCardProps) {
  return (
    <article
      data-showcase="card"
      aria-hidden={hidden || undefined}
      className={
        "relative h-[13.625rem] w-[13.75rem] flex-none overflow-hidden rounded-2xl bg-white " +
        "min-[601px]:h-[16.25rem] min-[601px]:w-[16.375rem]"
      }
    >
      <Image
        src={project.image}
        alt=""
        fill
        // Widest the card ever gets; the duplicate track shows the same files.
        sizes="(min-width: 601px) 262px, 220px"
        className="object-cover"
      />

      {/* Scrim — the caption sits at the bottom over an unknown photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85),rgba(0,0,0,0.15)_42%,transparent)]"
      />

      <div className="absolute bottom-0 left-0 z-10 w-full p-3">
        <h3 className="text-[13px] leading-[1.25] font-bold tracking-[-0.02em] text-white">
          {project.title}
        </h3>
        <p className="mt-[3px] text-[10.5px] leading-[1.3] font-medium text-white/80">
          {project.description}
        </p>
      </div>
    </article>
  );
}
