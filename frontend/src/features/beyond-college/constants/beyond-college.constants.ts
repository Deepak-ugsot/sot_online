import type {
  BeyondCollegeHeadingCopy,
  BeyondCollegePanel,
} from "../types/beyond-college.types";

/**
 * Copy for the Beyond College section. Kept out of JSX so marketing changes never
 * touch a component — see `features/hero/constants` for the pattern.
 */

export const beyondCollegeHeading: BeyondCollegeHeadingCopy = {
  lead: "Already chosen your college?",
  accent: "Perfect.",
};

export const beyondCollegeSubtitle =
  "Your college handles your degree, professors, exams, campus, and university experience. uGSOT Beyond adds the technology accelerator you need to build your career alongside it.";

/**
 * The line under the panels. It is the section's actual argument — the two panels are
 * the evidence — so it is set at heading weight rather than as a caption.
 */
export const beyondCollegeClosing: BeyondCollegeHeadingCopy = {
  lead: "Don't replace your college.",
  accent: "Go beyond it.",
};

/**
 * The two panels, left then right.
 *
 * Deliberately the same length. The section's claim is that the accelerator sits
 * *alongside* the degree rather than above it, and five against three would argue the
 * opposite before a word is read.
 */
export const beyondCollegePanels: readonly [
  BeyondCollegePanel,
  BeyondCollegePanel,
] = [
  {
    tone: "college",
    title: "YOUR COLLEGE",
    subtitle: "Gives you the foundation",
    items: [
      {
        id: "degree",
        icon: "file",
        title: "Your degree",
        description: "A recognized qualification",
      },
      {
        id: "professors",
        icon: "users",
        title: "Your professors",
        description: "Learn from experienced faculty",
      },
      {
        id: "exams",
        icon: "fileCheck",
        title: "Your exams",
        description: "Structured academic journey",
      },
      {
        id: "campus",
        icon: "campus",
        title: "Your campus",
        description: "A vibrant learning environment",
      },
      {
        id: "experience",
        icon: "book",
        title: "Your university experience",
        description: "Exposure, networks and holistic growth",
      },
    ],
  },
  {
    tone: "accelerator",
    title: "uGSOT BEYOND",
    subtitle: "Helps you go beyond",
    items: [
      {
        id: "accelerator",
        icon: "rocket",
        title: "Your technology accelerator",
        description: "Future-ready, industry-aligned learning",
      },
      {
        id: "coding",
        icon: "code",
        title: "Coding & competitive programming",
        description: "Build real-world tech skills",
      },
      {
        id: "ai",
        icon: "bulb",
        title: "Building & AI",
        description: "Work on modern tech like GenAI",
      },
      {
        id: "open-source",
        icon: "users",
        title: "Open Source & Mentorship",
        description: "Learn, build and grow with experts",
      },
      {
        id: "internships",
        icon: "chart",
        title: "Internships & Career Prep",
        description: "Get hands-on experience and career support",
      },
    ],
  },
] as const;

/**
 * Animation hooks, by `data-beyond-college` attribute rather than class name, so
 * restyling a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const BEYOND_COLLEGE_SELECTORS = {
  header: '[data-beyond-college="header"]',
  panel: '[data-beyond-college="panel"]',
  badge: '[data-beyond-college="badge"]',
  closing: '[data-beyond-college="closing"]',
} as const;
