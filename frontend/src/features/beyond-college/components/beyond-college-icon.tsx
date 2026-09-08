import { cn } from "@/lib/utils";

/**
 * The icon set for the two comparison panels.
 *
 * One component over a path map rather than ten exported components: these are all the
 * same 24-box stroked glyph with the same defaults, so separate components would be ten
 * copies of one wrapper. Callers pass a name, and an unknown name is a type error rather
 * than a silently missing icon. Same shape as `features/buildspace`'s `DemoIcon` — kept
 * local rather than shared, because that one is the product mock's set and these two
 * lists have no reason to move together.
 *
 * Everything is stroked on `currentColor` at a fixed 1.6 weight, which is what keeps the
 * set looking like one family across both panels — the dark glyphs on the left and the
 * white ones on the right are the same drawings, and only the `text-*` on the caller
 * differs.
 */
const PATHS = {
  /** A degree certificate. */
  file: "M6.5 3h7l5 5v13h-12zM13 3v5h5",
  /** Faculty, and mentors on the other side. */
  users:
    "M9 11.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5ZM3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 5.4a3.4 3.4 0 0 1 0 6.5M18 20c0-2.6-.9-4.3-2.4-5.2",
  /** A marked exam paper. */
  fileCheck: "M6.5 3h7l5 5v13h-12zM13 3v5h5M9.3 14.8l1.9 1.9 3.5-3.5",
  /** The campus, as the classical facade every university crest uses. */
  campus:
    "M12 3 3 7.5h18zM5.5 10.5v7M9.5 10.5v7M14.5 10.5v7M18.5 10.5v7M3.5 20.5h17",
  /** An open book — the wider university experience. */
  book: "M12 6.8C10.5 5.3 8.4 4.5 4 4.5v12.8c4.4 0 6.5.8 8 2.2 1.5-1.4 3.6-2.2 8-2.2V4.5c-4.4 0-6.5.8-8 2.3ZM12 6.8v12.7",
  /** The accelerator itself. */
  rocket:
    "M13.5 3.5C17 5 19 8 19 12l-3 3-4-4 1.5-7.5ZM12 11l-4-4L3.5 8.5 7 12M12 11l1 4 4 1M7 17l-2.5 2.5",
  /** `</>` — coding and contests. */
  code: "M9 8.5 5.5 12 9 15.5M15 8.5 18.5 12 15 15.5",
  /** Building and AI. */
  bulb: "M9.5 18.5h5M10.2 21.5h3.6M12 2.5a6.2 6.2 0 0 0-3.6 11.2c.6.4.9 1.1.9 1.8h5.4c0-.7.3-1.4.9-1.8A6.2 6.2 0 0 0 12 2.5Z",
  /** Career progress, as a bar chart. */
  chart: "M4.5 4v15.5h15M8.5 16.5v-4.5M12.5 16.5V8M16.5 16.5v-6.5",
} as const;

export type BeyondCollegeIconName = keyof typeof PATHS;

type BeyondCollegeIconProps = {
  name: BeyondCollegeIconName;
  className?: string;
};

export function BeyondCollegeIcon({ name, className }: BeyondCollegeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-6 w-6", className)}
    >
      <path
        d={PATHS[name]}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
