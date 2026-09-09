import { Bot, Box, CodeXml, type LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import type { NotAnotherCoursePeerIconName } from "../types/not-another-course.types";

/**
 * The GitHub mark, drawn here because Lucide does not ship it.
 *
 * Lucide dropped its brand glyphs, and the label this sits next to says "GitHub, GSoC,
 * Communities" — a generic branch or merge icon would be a worse answer than the mark
 * everyone already reads as GitHub. It is the only filled glyph in the set; the other
 * three are stroked, which is invisible at 18px inside four separate tiles and would
 * matter only if they sat in a row.
 */
function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

/**
 * The peer labels' icon set.
 *
 * **Lucide where Lucide has it, following `features/beyond-college`.** These are
 * generic UI glyphs with no house style to them, and Lucide draws them properly on one
 * grid at one optical weight. The indirection is what earns its keep: call sites name
 * the *role* (`code`, `bot`) rather than the vendor's component, so swapping a glyph —
 * or the library — is a change to this file alone, and an unknown name is a type error
 * rather than a silently missing icon.
 */
const ICONS = {
  /** `</>` — DSA and competitive programming. */
  code: CodeXml,
  /** GenAI, agents, AI engineering. */
  bot: Bot,
  /** Building products and systems. */
  box: Box,
  /** Open source, as the mark itself. */
  github: GithubMark,
} as const satisfies Record<
  NotAnotherCoursePeerIconName,
  LucideIcon | ComponentType<SVGProps<SVGSVGElement>>
>;

type NotAnotherCourseIconProps = {
  name: NotAnotherCoursePeerIconName;
  className?: string;
};

/** One label's glyph, sized and coloured by the tile it sits in. */
export function NotAnotherCourseIcon({
  name,
  className,
}: NotAnotherCourseIconProps) {
  const Glyph = ICONS[name];
  return <Glyph className={className} aria-hidden="true" />;
}
