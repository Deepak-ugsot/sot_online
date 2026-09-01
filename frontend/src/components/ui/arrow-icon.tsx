import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

type ArrowDirection = "diagonal" | "right";

type ArrowIconProps = SVGProps<SVGSVGElement> & {
  /** `diagonal` (↗) for CTAs, `right` (→) for list markers. */
  direction?: ArrowDirection;
};

/**
 * Path data per direction. Both are drawn on a 16-unit-tall grid at the same stroke
 * weight so the two glyphs stay consistent, but `right` gets a wider box: as a list
 * marker it reads better long and lean (a drawn-out "→") than as a stubby arrow
 * squeezed into a square. The head geometry is identical in both — only the shaft
 * runs further.
 */
const paths: Record<ArrowDirection, string[]> = {
  diagonal: ["M4.5 11.5 11.5 4.5", "M5.75 4.5h5.75v5.75"],
  right: ["M1 8h19", "M15.5 3.5 20 8 15.5 12.5"],
};

/** Viewport per direction — see `paths` for why `right` is not square. */
const viewBoxes: Record<ArrowDirection, string> = {
  diagonal: "0 0 16 16",
  right: "0 0 21 16",
};

/**
 * Default size per direction, kept in the icon so callers do not each have to
 * re-derive the non-square aspect ratio of `right` (21:16) by hand.
 */
const defaultSizes: Record<ArrowDirection, string> = {
  diagonal: "h-3 w-3",
  right: "h-3 w-[1rem]",
};

/**
 * Arrow glyph used in CTA buttons and as a list marker.
 *
 * Inline SVG rather than an image or a text glyph: it inherits `currentColor`, costs
 * no extra request, stays crisp at any size, and — unlike the "↗" / "→" characters —
 * renders identically regardless of which font is available.
 */
export function ArrowIcon({
  direction = "diagonal",
  className,
  ...props
}: ArrowIconProps) {
  return (
    <svg
      viewBox={viewBoxes[direction]}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={cn(defaultSizes[direction], className)}
      {...props}
    >
      {paths[direction].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
