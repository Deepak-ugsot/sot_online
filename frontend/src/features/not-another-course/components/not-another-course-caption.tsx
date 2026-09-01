import { cn } from "@/lib/utils";
import type { NotAnotherCourseCaption } from "../types/not-another-course.types";

/**
 * Desktop placement per side, as percentages of the composition box.
 *
 * **Static strings on purpose.** Tailwind scans source text, so a class built by
 * interpolating `side` would never be generated and the caption would render
 * unpositioned.
 *
 * The numbers put each caption in a corner the artwork leaves empty, so the two
 * overlap the image's box without ever touching its content: the collage occupies the
 * middle 65% of the composition, and its own bottom-left and top-right are open. The
 * left caption reaches to 28% and the red shape does not start until 33%; the right
 * caption starts at 72% and sits above the code panel.
 *
 * Both are therefore tied to *this* artwork — swap `course.png` for a render with
 * different margins and these need re-checking.
 */
const SIDE_PLACEMENT: Record<NotAnotherCourseCaption["side"], string> = {
  left: "min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-[68%] min-[1100px]:w-[28%]",
  right:
    "min-[1100px]:absolute min-[1100px]:right-0 min-[1100px]:top-[13%] min-[1100px]:w-[28%]",
};

type NotAnotherCourseCaptionProps = {
  caption: NotAnotherCourseCaption;
};

/**
 * One flanking caption: a brand-red label over a line of body copy.
 *
 * Below 1100px it is an ordinary block under the collage; from there up it is lifted
 * out of flow into the artwork's empty corner. Being absolute is what lets the
 * composition box stay exactly as tall as the image.
 */
export function NotAnotherCourseCaption({
  caption,
}: NotAnotherCourseCaptionProps) {
  return (
    <div
      data-notcourse="caption"
      // Read by the reveal so each caption enters from the side it sits on. The class
      // string alone cannot be introspected, so the side is published as data.
      data-side={caption.side}
      className={cn("flex flex-col gap-2", SIDE_PLACEMENT[caption.side])}
    >
      <h3 className="font-display text-lg font-semibold text-brand">
        {caption.title}
      </h3>

      <p className="font-display text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.55] text-ink-muted">
        {caption.body}
      </p>
    </div>
  );
}
