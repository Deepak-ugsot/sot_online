import type {
  CareerOsColumn,
  CareerOsCommunityMember,
} from "../types/career-os.types";

/**
 * Copy and layout for the Career OS section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

export const careerOsHeading = {
  lead: "Introducing",
  accent: "Career OS",
} as const;

export const careerOsSubtitle = "Your complete Software Engineering Journey.";

/**
 * The grid, written as the three columns it renders at desktop width.
 *
 * Column groups rather than a flat list because this is a **composition, not a feed**:
 * the red spotlight has to land in the third column beside the two tall tiles, and the
 * short tiles have to stack three-up in the middle. A flat list plus CSS masonry would
 * reflow that arrangement at every content edit.
 *
 * Below `1024px` the column wrappers become `display: contents` and every tile flows
 * into one two-up grid, so this order is also the reading order: left column, then
 * middle, then right.
 *
 * `media` heights are chosen so the three columns end level — see the type docs.
 */
export const careerOsColumns: readonly CareerOsColumn[] = [
  [
    {
      kind: "feature",
      id: "learn",
      illustration: "learn",
      media: "tall",
      title: "Learn Smarter",
      description:
        "Structured paths, live classes, recorded lectures, AI tutoring, and complete class notes.",
    },
    {
      kind: "feature",
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
      kind: "feature",
      id: "connect",
      illustration: "connect",
      media: "medium",
      title: "Connect & Grow",
      description:
        "Learn from industry mentors, join a thriving community, and attend live AMA sessions.",
    },
    {
      kind: "feature",
      id: "build",
      illustration: "build",
      media: "short",
      title: "Build Real Products",
      description:
        "Real projects, a portfolio, capstones, and open-source contributions.",
    },
    {
      kind: "feature",
      id: "compete",
      illustration: "compete",
      media: "short",
      title: "Compete & Win",
      description:
        "Hackathons, coding competitions, team contests, and innovation challenges.",
    },
  ],
  [
    {
      kind: "spotlight",
      id: "spotlight",
      title: "Start Your Journey",
      description:
        "Turn what you learn into real-world projects, build with purpose, and grow your skills through hands-on engineering.",
      href: "#apply",
    },
    {
      kind: "feature",
      id: "career",
      illustration: "career",
      media: "tall",
      title: "Get Career Ready",
      description:
        "Internships, AI mock interviews, resume building, and placement support.",
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
