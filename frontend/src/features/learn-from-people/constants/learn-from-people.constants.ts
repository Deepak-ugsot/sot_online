import type {
  LearnFromPeopleHeadingCopy,
  LearnFromPeopleMentor,
} from "../types/learn-from-people.types";

/**
 * Copy and artwork for the Learn From People section. Kept out of JSX so marketing
 * changes never touch a component — see `features/hero/constants` for the pattern.
 */

/** "Learn From **People** Who Have Done It." */
export const learnFromPeopleHeading: LearnFromPeopleHeadingCopy = {
  lead: "Learn From",
  accent: "People",
  trail: "Who Have Done It.",
} as const;

/**
 * The four mentor profiles.
 *
 * Roles, not names: these describe the kind of engineer a student is taught by, and
 * naming individuals would tie the page to a roster that changes without the section
 * changing. The order pairs them — the two competitive/community routes first, the two
 * industry ones second — which is also how they read down the grid on a phone.
 *
 * Every `alt` is empty and every render is marked `aria-hidden` at the call site: each
 * illustration is a picture of the thing its own card already names in words (a medal,
 * a server rack, the GitHub mark, an AI workflow), so describing it would make a screen
 * reader say the same thing twice. The intrinsic sizes are the files' own, passed
 * through so Next reserves the right box before the PNG arrives.
 */
export const learnFromPeopleMentors: readonly LearnFromPeopleMentor[] = [
  {
    id: "icpc",
    title: "ICPC Regionalist",
    role: "Competitive Programming Mentor",
    background:
      "Prior: national-ranked competitive programmer, product engineering background.",
    tone: "crimson",
    image: {
      src: "/assets/learn_from_people/ICPC_Regionalist.png",
      alt: "",
      width: 358,
      height: 402,
    },
  },
  {
    id: "backend",
    title: "Senior Backend Engineer",
    role: "Systems & Architecture Mentor",
    background:
      "Prior: large-scale distributed systems at a high-growth product company.",
    tone: "azure",
    image: {
      src: "/assets/learn_from_people/Senior_BackendEngineer.png",
      alt: "",
      width: 437,
      height: 364,
    },
  },
  {
    id: "open-source",
    title: "Open Source Maintainer",
    role: "GSoC / Open Source Mentor",
    background: "Prior: maintains active open source projects, past GSoC contributor.",
    tone: "emerald",
    image: {
      src: "/assets/learn_from_people/Open_SourceMaintainer.png",
      alt: "",
      width: 437,
      height: 292,
    },
  },
  {
    id: "ai",
    title: "AI Engineer",
    role: "AI Engineering Mentor",
    background: "Prior: builds production GenAI systems and agentic applications.",
    tone: "violet",
    image: {
      src: "/assets/learn_from_people/AI_Engineer.png",
      alt: "",
      width: 472,
      height: 393,
    },
  },
] as const;

/** The line that closes the section, naming the network the four are drawn from. */
export const learnFromPeopleClosing =
  "Mentors and the wider hiring network are drawn from upGrad's industry ecosystem, spanning technology, product and engineering teams across the country.";

/**
 * Hooks reach for these `data-*` attributes rather than class names, so restyling a
 * component can never silently break the reveal. Mirrors `CURRICULUM_SELECTORS`.
 */
export const LEARN_FROM_PEOPLE_SELECTORS = {
  heading: '[data-learn-from-people="heading"]',
  card: '[data-learn-from-people="card"]',
  closing: '[data-learn-from-people="closing"]',
} as const;
