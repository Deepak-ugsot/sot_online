import { cn } from "@/lib/utils";
import type { NotAnotherCoursePeerLabel } from "../types/not-another-course.types";
import { NotAnotherCourseIcon } from "./not-another-course-icon";

/**
 * Desktop placement per corner, as percentages of the composition box.
 *
 * **Static strings on purpose.** Tailwind scans source text, so a class built by
 * interpolating `corner` would never be generated and the label would render
 * unpositioned.
 *
 * The four sit *over* the artwork's outer edges rather than beside it: the collage
 * takes the middle 62% (19%–81%), and each label reaches a few percent past the edge
 * nearest it so it reads as pinned to a face rather than floating in the margin. The
 * two top labels are higher than the two bottom ones by design — the artwork's own
 * photographs step down toward the middle, and matching that keeps the ring from
 * looking like a rectangle.
 *
 * **Widths are `rem`, not percentages, and that is not an oversight.** The Figma canvas
 * is 2000px wide where this container is 1376, so a percentage that comfortably fits
 * "DSA, Competitive Programming" there wraps it to three lines here. Sizing each label to
 * its own text keeps the *reading* right, and the percentage offsets keep the placement
 * right.
 *
 * All of this is tied to *this* artwork. Swap `peer_group.png` for a render with
 * different margins and every number here needs re-checking.
 */
const CORNER_PLACEMENT: Record<NotAnotherCoursePeerLabel["corner"], string> = {
  "top-left":
    "min-[1100px]:absolute min-[1100px]:left-[3%] min-[1100px]:top-[15%] min-[1100px]:w-[19rem]",
  "top-right":
    "min-[1100px]:absolute min-[1100px]:right-[3%] min-[1100px]:top-[10%] min-[1100px]:w-[18rem]",
  "bottom-left":
    "min-[1100px]:absolute min-[1100px]:left-[1%] min-[1100px]:top-[72%] min-[1100px]:w-[17rem]",
  "bottom-right":
    "min-[1100px]:absolute min-[1100px]:right-[1%] min-[1100px]:top-[62%] min-[1100px]:w-[21rem]",
};

type NotAnotherCourseLabelProps = {
  label: NotAnotherCoursePeerLabel;
};

/**
 * One floating peer label: a red icon tile beside a role and the ground it covers.
 *
 * Below 1100px it is an ordinary card in a grid under the collage; from there up it is
 * lifted out of flow into its corner. Being absolute is what lets the composition box
 * stay exactly as tall as the image.
 */
export function NotAnotherCourseLabel({ label }: NotAnotherCourseLabelProps) {
  return (
    <div
      data-notcourse="label"
      // Read by the reveal so each label enters from the side it sits on. The class
      // string alone cannot be introspected, so the corner is published as data.
      data-corner={label.corner}
      className={cn(
        "flex items-center gap-3 rounded-[14px] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(10,10,11,0.04),0_12px_28px_-12px_rgba(10,10,11,0.18)] ring-1 ring-black/[0.04]",
        CORNER_PLACEMENT[label.corner],
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-brand text-white"
      >
        <NotAnotherCourseIcon
          name={label.icon}
          className="h-[18px] w-[18px]"
        />
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="font-display text-[0.9375rem] font-semibold leading-tight text-ink">
          {label.title}
        </span>
        <span className="font-display text-[0.8125rem] leading-snug text-ink-muted">
          {label.meta}
        </span>
      </span>
    </div>
  );
}
