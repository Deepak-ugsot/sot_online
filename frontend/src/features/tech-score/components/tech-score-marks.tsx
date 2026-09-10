import { cn } from "@/lib/utils";
import type { TechScoreToolName } from "../types/tech-score.types";

/**
 * Third-party marks, drawn rather than imported.
 *
 * **These are reconstructions and want replacing with the official SVGs before
 * launch** — the same standing as `careerOsCommunity`'s stock portraits. They are built
 * from each mark's published geometry and read correctly at 18px, but only the vendor's
 * own file is the vendor's own logo. Swapping them is a change to this map alone;
 * nothing else in the feature names a tool.
 *
 * `plate` and `ink` come in pairs because two of the four are single-colour silhouettes
 * that need a coloured ground to be recognisable (GitLab's orange, Vercel's black),
 * while the other two are dark-on-light.
 */
export const TOOL_MARKS: Record<
  TechScoreToolName,
  { label: string; plate: string; ink: string; path: string }
> = {
  github: {
    label: "GitHub",
    plate: "bg-[#F1F2F4]",
    ink: "text-[#1B1F23]",
    path:
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 " +
      "0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 " +
      "17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 " +
      "1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 " +
      "1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 " +
      "3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 " +
      "3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 " +
      "1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z",
  },
  vscode: {
    label: "VS Code",
    plate: "bg-[#E7F0FB]",
    ink: "text-[#0065A9]",
    path:
      "M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 " +
      "0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 " +
      "1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 " +
      "1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352ZM18.004 " +
      "17.448 10.826 12l7.178-5.448v10.896Z",
  },
  gitlab: {
    label: "GitLab",
    plate: "bg-[#FC6D26]",
    ink: "text-white",
    path:
      "m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 " +
      "0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 " +
      "0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8618.8618 0 0 0-.3361.4049L.4332 " +
      "9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 " +
      "3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 " +
      "2.462-1.8633 5.0062-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0086-7.003Z",
  },
  vercel: {
    label: "Vercel",
    plate: "bg-[#0A0A0B]",
    ink: "text-white",
    path: "M12 2 24 22H0Z",
  },
};

/**
 * One tool's mark, at whatever size the caller sets.
 *
 * Size is the caller's, not a default: `cn` is a plain join rather than a Tailwind-aware
 * merge, so a base `h-4` here could not be reliably overridden from a call site — the
 * winner would be decided by stylesheet order.
 */
export function ToolMark({
  tool,
  className,
}: {
  tool: TechScoreToolName;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("shrink-0", className)}>
      <path d={TOOL_MARKS[tool].path} />
    </svg>
  );
}
