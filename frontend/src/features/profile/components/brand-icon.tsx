import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

/**
 * The two brand marks the profile links to.
 *
 * Inline, because `lucide-react` v1 dropped its brand icons — there is no `Linkedin`
 * or `Github` export any more. Drawn as single filled paths on the same 24-unit grid
 * as every Lucide glyph beside them, so they sit at the same optical weight in the
 * field labels without per-icon nudging.
 *
 * `fill="currentColor"` rather than a stroke: these are solid marks, and stroking
 * their outlines would render them as hollow shapes that read as a different family
 * from the rest of the set.
 */

type BrandIconProps = SVGProps<SVGSVGElement>;

function BrandIcon({ className, children, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

export function LinkedInIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </BrandIcon>
  );
}

export function GitHubIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58l-.01-2.04c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.41-1.31.75-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.11-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.36.81 1.1.81 2.22l-.01 3.29c0 .31.21.69.82.57A12 12 0 0 0 12 .3Z" />
    </BrandIcon>
  );
}
