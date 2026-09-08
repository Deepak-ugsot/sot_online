import {
  BookOpen,
  ChartColumn,
  CodeXml,
  FileText,
  GraduationCap,
  Landmark,
  Lightbulb,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The icon set for the two comparison panels, mapped onto Lucide.
 *
 * **Lucide rather than hand-drawn paths.** This feature used to carry its own path
 * map, the way `features/buildspace`'s `DemoIcon` does — but these ten glyphs are
 * generic UI icons with no house style to them, and hand-drawing a mortarboard or a
 * bar chart from scratch produced shapes that broke down at 26px. Lucide draws them
 * properly, on one grid, at one optical weight.
 *
 * The indirection is still worth keeping: call sites name the *role* (`cap`,
 * `campus`) rather than the vendor's component, so swapping a glyph — or the library
 * — is a change to this file alone, and an unknown name stays a type error rather
 * than a silently missing icon.
 *
 * `strokeWidth` is 1.75 rather than Lucide's default 2: these sit at 26px inside a
 * 52px plate and are the only graphic element in either panel, so the default reads
 * a touch heavy against the panels' text.
 */
const ICONS = {
  /** A degree, as the mortarboard rather than a certificate. */
  cap: GraduationCap,
  /** Faculty on the left, mentors on the right. */
  users: Users,
  /** A marked exam paper. */
  document: FileText,
  /** The campus, as the classical facade every university crest uses. */
  campus: Landmark,
  /** An open book — the wider university experience. */
  book: BookOpen,
  /** The accelerator itself. */
  rocket: Rocket,
  /** `</>` — coding and contests. */
  code: CodeXml,
  /** Building and AI. */
  bulb: Lightbulb,
  /** Career progress, as a bar chart. */
  chart: ChartColumn,
} as const satisfies Record<string, LucideIcon>;

export type BeyondCollegeIconName = keyof typeof ICONS;

type BeyondCollegeIconProps = {
  name: BeyondCollegeIconName;
  className?: string;
};

export function BeyondCollegeIcon({ name, className }: BeyondCollegeIconProps) {
  const Icon = ICONS[name];

  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      strokeWidth={1.75}
      className={cn("h-6 w-6", className)}
    />
  );
}
