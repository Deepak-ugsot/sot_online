import Image from "next/image";

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
 */
export function FacultyCard({ member, duplicate = false }: FacultyCardProps) {
  return (
    <li className="shrink-0 pr-4 motion-reduce:snap-start sm:pr-6">
      <article className="flex w-[17.5rem] flex-col rounded-2xl border border-black/[0.04] bg-white px-5 pb-5 sm:w-[20.75rem]">
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
          Two columns sized to their widest mark rather than a wrapping row: at the card's
          width a wrapping row fits three logos on the first line and strands the fourth,
          where the design sets them two by two.
        */}
        <ul
          aria-label={facultyCompaniesLabel}
          className="mt-5 grid grid-cols-[repeat(2,max-content)] items-center gap-x-4 gap-y-2.5"
        >
          {member.companies.map((company) => (
            <li key={company.id}>
              <Image
                src={company.logo.src}
                alt={duplicate ? "" : company.name}
                width={company.logo.width}
                height={company.logo.height}
                sizes="8.5rem"
                // One height for every mark: each file is 177px tall and trimmed to the
                // same optical size, so the widths follow with no per-logo nudge.
                className="h-5 w-auto sm:h-[1.4375rem]"
              />
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
