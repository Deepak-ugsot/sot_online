import type { ReadinessMetric } from "../types/readiness.types";

/**
 * Copy for the Career Readiness Score section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

/**
 * Split so the last word can carry the serif accent, the same shape as the Career OS
 * and Mentors headings. Rejoining them is a one-line change here.
 */
export const readinessHeading = {
  lead: "Career Readiness",
  accent: "Score",
} as const;

export const readinessSubtitle =
  "Know exactly where you stand in your software engineering journey";

export const readinessCta = {
  label: "Start Your Journey",
  href: "#apply",
} as const;

/**
 * Programme photography, in `public/assets/Career/`.
 *
 * **The filename's capitalisation is load-bearing.** It is passed through verbatim
 * because macOS resolves `career/coding.jpg` just fine while the Linux deploy target
 * does not — a wrong case here would pass every local check and 404 in production.
 *
 * The square art is 1080², against cards of 327×391, so it clears DPR 2 with room to
 * spare. `Resume.jpg` is the exception at 1080×540 — it was cut for a double-width
 * card that the row layout no longer has, so it is cropped hard to portrait and only
 * just clears DPR 2 vertically. Re-cut it square when there is a chance.
 */
const careerImage = (file: string) => `/assets/Career/${file}`;

/**
 * Eight metrics, in the order they are scrolled through. Order is also what sets the
 * row's rhythm: every second card is dropped by 70px, so reordering changes which
 * cards sit high and which sit low.
 */
export const readinessMetrics: readonly ReadinessMetric[] = [
  {
    id: "coding",
    label: "Coding",
    description:
      "Track your coding consistency, solved problems, and daily learning progress.",
    image: careerImage("Coding.jpg"),
    gradient: "linear-gradient(160deg, #cfd6d8 0%, #8fa3ab 45%, #3d4b52 100%)",
  },
  {
    id: "dsa",
    label: "DSA",
    description:
      "Measure your problem-solving skills across topics, difficulty levels, and contests.",
    image: careerImage("DSA.jpg"),
    gradient: "linear-gradient(160deg, #e0c9b0 0%, #b5793f 45%, #4a2e18 100%)",
  },
  {
    id: "projects",
    label: "Projects",
    description:
      "Monitor project completion, milestones, portfolio growth, and real-world experience.",
    image: careerImage("Projects.jpg"),
    gradient: "linear-gradient(160deg, #c7d9db 0%, #4f8a90 45%, #1b3437 100%)",
  },
  {
    id: "communication",
    label: "Communication",
    description:
      "Improve your communication skills through presentations, discussions, and feedback.",
    image: careerImage("Communication.jpg"),
    gradient: "linear-gradient(160deg, #d3dcc9 0%, #7a9463 45%, #33422a 100%)",
  },
  {
    id: "resume",
    label: "Resume",
    description:
      "Optimize your resume with AI-powered analysis and industry-ready recommendations.",
    image: careerImage("Resume.jpg"),
    gradient: "linear-gradient(160deg, #cdd3e0 0%, #5f6f8f 45%, #232c3d 100%)",
  },
  {
    id: "mock-interviews",
    label: "Mock Interviews",
    description:
      "Practice technical and HR interviews with AI feedback and detailed performance insights.",
    image: careerImage("Interviews.jpg"),
    gradient: "linear-gradient(160deg, #e0c3c5 0%, #a3444b 45%, #2f1113 100%)",
  },
  {
    id: "hackathons",
    label: "Hackathons",
    description:
      "Participate in hackathons, track achievements, and compete with top learners.",
    image: careerImage("Hackathons.jpg"),
    gradient: "linear-gradient(160deg, #dccbe0 0%, #8a638f 45%, #3a2640 100%)",
  },
  {
    id: "attendance",
    label: "Attendance",
    description:
      "Stay on track with attendance, live class participation, and learning consistency.",
    image: careerImage("Attendance.jpg"),
    gradient: "linear-gradient(160deg, #e8dcb0 0%, #b98f3f 45%, #4a3a18 100%)",
  },
] as const;

/**
 * Animation hooks, by `data-readiness` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const READINESS_SELECTORS = {
  topItem: '[data-readiness="top-item"]',
  viewport: '[data-readiness="viewport"]',
  track: '[data-readiness="track"]',
} as const;

/**
 * The width below which the row is swiped by hand instead of driven by the pin.
 *
 * Declared here because it has to agree in two places that cannot see each other: the
 * `min-[901px]:` utilities on the markup, and the media query the hook registers.
 */
export const READINESS_PIN_MIN_WIDTH = 901;
