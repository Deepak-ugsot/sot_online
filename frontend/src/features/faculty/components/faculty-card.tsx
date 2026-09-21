import Image from "next/image";
import type { CSSProperties } from "react";

import { facultyCompaniesLabel } from "../constants/faculty.constants";
import type { FacultyMember } from "../types/faculty.types";

type FacultyCardProps = {
  member: FacultyMember;
  /**
   * `true` on every copy of the row after the first. The marquee is hidden from
   * assistive tech there, and the logos drop their `alt` with it — see
   * `FacultyMarquee` for why the row exists more than once.
   */
  duplicate?: boolean;
};

/**
 * One faculty card: the cut-out portrait, the name and role, and the companies behind
 * them as logos.
 *
 * **The spacing after the card is the item's own right padding, not a `gap` on the
 * track.** A `gap` sits only *between* children, so there would be none between the last
 * card of one copy and the first of the next, and the seam would close up once per loop.
 * Carried on the item, it is inside the width the marquee's `-100%` is measured from.
 *
 * The portrait sits flush with the card's top edge — the file has its own transparent
 * headroom above the hair, which is what the design's top margin actually is.
 *
 * **Every card in the row is the same height.** Roles run one or two lines and people
 * list one company or six, so the article fills its item (`h-full` — a flex row stretches
 * its items to the tallest) and the logos are pushed to its foot with `mt-auto`. The row
 * then reads as one set of cards with their logos on a shared line, whatever each holds.
 */
export function FacultyCard({ member, duplicate = false }: FacultyCardProps) {
  return (
    <li className="shrink-0 pr-4 motion-reduce:snap-start sm:pr-6">
      <article className="flex h-full w-[17.5rem] flex-col rounded-2xl border border-black/[0.04] bg-white px-5 pb-5 sm:w-[20.75rem]">
        <div className="px-1">
          <Image
            src={member.photo.src}
            alt={member.photo.alt}
            width={member.photo.width}
            height={member.photo.height}
            sizes="(min-width: 640px) 17.75rem, 14.5rem"
            className="h-auto w-full select-none"
          />
        </div>

        <h3 className="mt-2.5 font-display text-[1.125rem] leading-[1.3] font-medium text-ink sm:text-[1.25rem]">
          {member.name}
        </h3>

        <p className="mt-1 font-display text-[0.75rem] text-brand italic sm:text-[0.8125rem]">
          {member.role}
        </p>

        {/*
          A wrapping row, because the lists run from one mark to six. At the card's width
          a six-mark list breaks three and three, which is how the design sets it.
          `mt-auto` pins the row to the card's foot (see the component's note); `pt-5` is
          the least air it keeps under the role when a card is at its tallest.
        */}
        <ul
          aria-label={facultyCompaniesLabel}
          // `--logo-h` is the one height every mark shares; a mark with a `scale` in its
          // data multiplies it (see `FacultyCompany`).
          className="mt-auto flex flex-wrap items-center gap-x-3.5 gap-y-2.5 pt-5 [--logo-h:1.25rem] sm:[--logo-h:1.4375rem]"
        >
          {member.companies.map((company) => (
            <li key={company.id}>
              <Image
                src={company.logo.src}
                alt={duplicate ? "" : company.name}
                width={company.logo.width}
                height={company.logo.height}
                sizes="8.5rem"
                // One height for every mark, so the widths follow — times the mark's own
                // `scale` where it has one.
                style={
                  company.logo.scale
                    ? ({ "--logo-scale": company.logo.scale } as CSSProperties)
                    : undefined
                }
                className="h-[calc(var(--logo-h)*var(--logo-scale,1))] w-auto"
              />
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
