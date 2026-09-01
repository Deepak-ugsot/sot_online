import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

type ArrowDirection = "diagonal" | "right";

type ArrowIconProps = SVGProps<SVGSVGElement> & {
  /** `diagonal` (↗) for CTAs, `right` (→) for list markers. */
  direction?: ArrowDirection;
};

/** Path data per direction, drawn on the same 16×16 grid so weights stay consistent. */
const paths: Record<ArrowDirection, string[]> = {
  diagonal: ["M4.5 11.5 11.5 4.5", "M5.75 4.5h5.75v5.75"],
  right: ["M2.5 8h11", "M9 3.5 13.5 8 9 12.5"],
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
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={cn("h-3 w-3", className)}
      {...props}
    >
      {paths[direction].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
