/**
 * The icon set for the product mock.
 *
 * One component over a path map rather than twenty-odd exported components: these are
 * all the same 24-box stroked glyph with the same defaults, so separate components would
 * be twenty copies of the same wrapper. Callers pass a name, and an unknown name is a
 * type error rather than a silently missing icon.
 *
 * Everything is stroked on `currentColor` at a fixed 1.6 weight, which is what keeps the
 * set looking like one family — the canvas scales as a whole, so the weight does not
 * need to respond to size.
 */

const PATHS = {
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  bell: "M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7M10.5 20a2 2 0 0 0 3 0",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  book: "M3 5.5A1.5 1.5 0 0 1 4.5 4H9a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H3zM21 5.5A1.5 1.5 0 0 0 19.5 4H15a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H21z",
  cap: "M12 4 2 9l10 5 10-5zM5 11.5V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-5.5",
  play: "M8 5.5v13l11-6.5z",
  star: "M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.9-5.2 2.9 1-5.9L3.5 9.7l5.9-.8z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3.2 2",
  video: "M3 7.5h11v9H3zM14 11l6-3v8l-6-3z",
  users: "M9 11.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5ZM3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 5.4a3.4 3.4 0 0 1 0 6.5M18 20c0-2.6-.9-4.3-2.4-5.2",
  bookmark: "M6.5 4h11v16l-5.5-3.5L6.5 20z",
  share: "M15.5 6H21v5.5M21 6l-8 8M18 14v5.5A1.5 1.5 0 0 1 16.5 21h-11A1.5 1.5 0 0 1 4 19.5v-11A1.5 1.5 0 0 1 5.5 7H11",
  lock: "M5.5 10.5h13v10h-13zM8 10.5V7a4 4 0 0 1 8 0v3.5",
  check: "M4.5 12.5l4.5 4.5 10-10",
  chevron: "M9 5.5l6.5 6.5L9 18.5",
  arrow: "M4.5 12h14M13 6.5l6 5.5-6 5.5",
  arrowUpRight: "M7.5 16.5l9-9M8.5 7.5H17v8.5",
  file: "M6.5 3h7l5 5v13h-12zM13 3v5h5",
  code: "M9 8.5 5.5 12 9 15.5M15 8.5 18.5 12 15 15.5",
  database:
    "M12 7.5c4.4 0 8-1 8-2.25S16.4 3 12 3 4 4 4 5.25 7.6 7.5 12 7.5ZM4 5.25v13.5C4 20 7.6 21 12 21s8-1 8-2.25V5.25",
  shield: "M12 3l8 3v6c0 4.5-3.3 7.9-8 9-4.7-1.1-8-4.5-8-9V6z",
  trend: "M3 17l5.5-6 4 3.5L21 6M21 6h-5M21 6v5",
  zap: "M13.5 2 5 13.5h5L9.5 22 18 10h-5z",
  layers: "M12 3l9 5.5-9 4.5-9-4.5zM3 15.5 12 20l9-4.5",
  sparkle:
    "M12 2.5l1.7 4.6 4.6 1.7-4.6 1.7L12 15.1l-1.7-4.6-4.6-1.7 4.6-1.7zM18.5 14.5l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z",
  flame: "M13 3c.5 3-1.5 4-3 6s-2 3.5-2 5a6 6 0 0 0 12 0c0-3-2-5-4-7-1.5-1.5-3-2.5-3-4Z",
  chat: "M21 12a8 8 0 0 1-8 8H7l-4 3v-9a8 8 0 0 1 8-8h2a8 8 0 0 1 8 6z",
  branch:
    "M7 8.2v7.6M17 15.8V10a3 3 0 0 0-3-3h-3.5M7 6.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM7 14a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 7 14ZM17 16a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z",
  commit: "M3 12h5.6M15.4 12H21M12 15.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z",
  pr: "M7 8.2v7.6M7 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM7 16a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 7 16ZM17 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM17 8v6.5a2 2 0 0 1-2 2h-2",
  github:
    "M12 2.5a9.5 9.5 0 0 0-3 18.5c-.1-.7-.1-1.6 0-2.3-2.7.6-3.3-1.2-3.3-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7 0-.7 0-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.2-.3-4.4-1.1-4.4-4.8 0-1.1.4-2 1-2.6-.1-.3-.4-1.4.1-2.8 0 0 1-.3 3.3 1a8.4 8.4 0 0 1 4.4 0c2.3-1.3 3.3-1 3.3-1 .5 1.4.2 2.5.1 2.8.6.6 1 1.5 1 2.6 0 3.7-2.2 4.5-4.4 4.8.4.4.8 1.1.8 2.2v3A9.5 9.5 0 0 0 12 2.5Z",
  rocket:
    "M13.5 3.5C17 5 19 8 19 12l-3 3-4-4 1.5-7.5ZM12 11l-4-4L3.5 8.5 7 12M12 11l1 4 4 1M7 17l-2.5 2.5",
  box: "M21 8.5v7L12 21l-9-5.5v-7L12 3zM3 8.5 12 13l9-4.5M12 13v8",
  spark: "M12 4v4M12 16v4M4 12h4M16 12h4M6.8 6.8l2.8 2.8M14.4 14.4l2.8 2.8M17.2 6.8l-2.8 2.8M9.6 14.4l-2.8 2.8",
} as const;

export type DemoIconName = keyof typeof PATHS;

type DemoIconProps = {
  name: DemoIconName;
  /** Rendered box, in canvas pixels. */
  size?: number;
  className?: string;
  /** Overrides `currentColor` for the stroke. */
  color?: string;
  /** Filled glyphs (the star, the flame) need this rather than a stroke. */
  filled?: boolean;
};

export function DemoIcon({
  name,
  size = 16,
  className,
  color,
  filled = false,
}: DemoIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      style={{ flex: "none" }}
    >
      <path
        d={PATHS[name]}
        fill={filled ? (color ?? "currentColor") : "none"}
        stroke={filled ? "none" : (color ?? "currentColor")}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
