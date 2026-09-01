import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Filled circular checkmark used as a list marker.
 *
 * The disc takes `currentColor` and the tick is knocked out of it, so a single
 * `text-*` utility on the caller controls the whole glyph.
 */
export function CheckIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="m5.75 10.25 2.75 2.75 5.75-5.75"
        stroke="#fff"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
