import type { DashboardChecklistRow } from "../types/dashboard.types";

/**
 * Copy for the Dashboard section. Kept out of JSX so marketing changes never touch a
 * component — see `features/hero/constants` for the same pattern.
 */

export const dashboardHeading = {
  lead: "Your Career",
  accent: "Dashboard",
} as const;

export const dashboardSubtitle = "One dashboard for your complete career journey.";

/**
 * Four short labels on the first row, three long ones on the second — the split keeps
 * both lines close in width so each centres evenly against the other.
 */
export const dashboardChecklistRows: readonly DashboardChecklistRow[] = [
  {
    id: "row-1",
    items: [
      "Career Readiness Score",
      "Learning Progress",
      "Coding Streak",
      "Upcoming Classes",
    ],
  },
  {
    id: "row-2",
    items: [
      "Hackathons & Internship Applications",
      "Projects & Leaderboard",
      "Resume Score",
    ],
  },
] as const;

/**
 * TEMPORARY — a stand-in for the product screenshot the design calls for (the Career
 * OS dashboard itself). It replaced a random Lorem Picsum photo, which was landing a
 * mountain range under a heading about a career dashboard.
 *
 * **Two things make it a placeholder and not a solution.** It is another product's UI,
 * and its copy is legible: the tiles and alerts name government-exam content (UPSC,
 * SSC, "Government Jobs"), which is the wrong domain for a software-engineering
 * programme. It reads as *a* student career dashboard, not as *this* one. Replace it
 * with a real screenshot before launch — only this file changes.
 *
 * 1816×982 — twice the panel's 908px width, so it stays sharp at DPR 2.
 */
export const dashboardMedia = {
  src: "/assets/dashboard/career-dashboard.jpg",
  /**
   * The reference screenshot's own ratio (2048×1107 ≈ 1.85:1), which the panel
   * reserves before the image loads. Worth matching rather than rounding to 16:10 —
   * that guess ran the section ~160px taller than the design.
   */
  aspectRatio: "2048 / 1107",
  /**
   * Empty while this is a stand-in. The image is not this product's dashboard, so any
   * alt text describing it would be describing the wrong thing — and the checklist
   * directly above already lists what the real one shows. The real screenshot needs
   * real alt text.
   */
  alt: "",
} as const;

/**
 * Animation hooks, by `data-dashboard` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const DASHBOARD_SELECTORS = {
  heading: '[data-dashboard="heading"]',
  checklist: '[data-dashboard="checklist"]',
  checklistItem: '[data-dashboard="checklist-item"]',
  media: '[data-dashboard="media"]',
} as const;
