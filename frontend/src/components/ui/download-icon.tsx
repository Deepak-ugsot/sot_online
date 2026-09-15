import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Download glyph: an arrow dropping into an open tray.
 *
 * Inline SVG for the same reasons as `ArrowIcon` — it inherits `currentColor`, costs
 * no extra request, and renders identically regardless of which font is available.
 * Drawn on the same 16-unit grid at the same stroke weight, so it sits beside that
 * glyph without one looking heavier than the other.
 *
 * Round caps and joins rather than `ArrowIcon`'s square ones: this shape turns a
 * corner at the arrowhead and at both ends of the tray, and square joins leave those
 * corners visibly clipped at button size. `CheckIcon` rounds its tick for the same
 * reason.
 */
export function DownloadIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("h-3.5 w-3.5", className)}
      {...props}
    >
      {/* Shaft, then the head it runs into, then the tray that catches it. */}
      <path d="M8 2.5v7.5" />
      <path d="M4.75 6.75 8 10l3.25-3.25" />
      <path d="M2.75 11.75v1.75h10.5v-1.75" />
    </svg>
  );
}
