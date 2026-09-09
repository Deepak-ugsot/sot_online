import type {
  CareerOsColumn,
  CareerOsCommunityMember,
} from "../types/career-os.types";

/**
 * Copy and layout for the Career OS section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

export const careerOsHeading = {
  lead: "Everything In",
  accent: "One Place.",
} as const;

export const careerOsSubtitle = "Powered by the uGSOT Career OS";

/**
 * The grid, written as the three columns it renders at desktop width.
 *
 * Column groups rather than a flat list because this is a **composition, not a feed**:
 * the two tall tiles belong together in the middle, flanked by three short ones on
 * either side. A flat list plus CSS masonry would reflow that at every content edit.
 *
 * Below `1024px` the column wrappers become `display: contents` and every tile flows
 * into one two-up grid, so this order is also the reading order: left column, then
 * middle, then right.
 *
 * `media` heights are chosen so the three columns end level — see the type docs. The
 * outer columns carry the same three heights in mirrored order, which is what lets
 * them balance against each other without any measuring.
 */
export const careerOsColumns: readonly CareerOsColumn[] = [
  [
    {
      id: "build",
      illustration: "build",
      media: "short",
      title: "Build Real Products",
      description:
        "Real projects, a portfolio, capstones, and open-source contributions.",
    },
    {
      id: "compete",
      illustration: "compete",
      media: "short",
      title: "Compete & Win",
      description:
        "Hackathons, coding competitions, team contests, and innovation challenges.",
    },
    {
      id: "contribute",
      illustration: "contribute",
      media: "medium",
      title: "Contribute",
      description:
        "Work on open source, contribute to real-world projects, and grow your developer profile.",
    },
  ],
  [
    {
      id: "learn",
      illustration: "learn",
      media: "tall",
      title: "Learn Smarter",
      description:
        "Structured paths, live classes, recorded lectures, AI tutoring, and complete class notes.",
    },
    {
      id: "practice",
      illustration: "practice",
      media: "tall",
      title: "Practice Every Day",
      description:
        "Daily coding, assignments, weekly tests, and AI-powered code reviews.",
    },
  ],
  [
    {
      id: "connect",
      illustration: "connect",
      media: "medium",
      title: "Connect & Grow",
      description:
        "Learn from industry mentors, join a thriving community, and attend live AMA sessions.",
    },
    {
      id: "track",
      illustration: "track",
      media: "short",
      title: "Track",
      description:
        "Monitor your progress, set goals, and get personalized insights to stay on track.",
    },
    {
      id: "prepare",
      illustration: "prepare",
      media: "short",
      title: "Prepare",
      description:
        "Get career-ready with interview prep, aptitude tests, resume building, and placement support.",
    },
  ],
] as const;

/**
 * Portraits for the Connect & Grow strip, and the count standing in for everyone else.
 *
 * **Placeholders.** Stock portraits from Unsplash, downloaded into
 * `public/assets/community/` rather than hot-linked so the tile has no runtime
 * dependency on an outside host — the same move the opportunities and journey sections
 * made when their temporary art was replaced. They are still photographs of real
 * strangers, so they want swapping for real students before launch: drop the files in
 * beside these and only the paths change.
 *
 * Cropped through Unsplash's `fit=facearea` so each one is centred on its face rather
 * than the middle of the frame — at 48px in a circle, anything else clips foreheads.
 *
 * Every file is a 256×256 square, which is why one intrinsic size covers both the 48px
 * strip and the 32px session row, with room for DPR 2 at the larger of the two.
 */
export const careerOsCommunity: readonly CareerOsCommunityMember[] = [
  { id: "member-1", src: "/assets/community/member-1.jpg" },
  { id: "member-2", src: "/assets/community/member-2.jpg" },
  { id: "member-3", src: "/assets/community/member-3.jpg" },
  { id: "member-4", src: "/assets/community/member-4.jpg" },
  { id: "member-5", src: "/assets/community/member-5.jpg" },
] as const;

/** Intrinsic size of every community portrait, in pixels. */
export const CAREER_OS_AVATAR_SIZE = 256;

/** The cohort beyond the four faces the strip has room for. */
export const careerOsCommunityOverflow = "+20";

/**
 * Animation hooks, by `data-career-os` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const CAREER_OS_SELECTORS = {
  grid: '[data-career-os="grid"]',
  item: '[data-career-os="item"]',
} as const;
