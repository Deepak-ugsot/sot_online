import type { FaqEntry } from "../types/faq.types";

/**
 * Copy for the FAQ section. Kept out of JSX so marketing changes never touch a
 * component — see `features/hero/constants` for the same pattern.
 */

export const faqHeading = {
  lead: "Got Questions?",
  accent: "We've Got Answers",
} as const;

export const faqPromo = {
  title: "Start Your Journey",
  description:
    "A structured path designed to transform ambitious students into industry-ready software engineers.",
  cta: { label: "Start Your Journey", href: "#apply" },
} as const;

/**
 * The accordion, in the order the design sets them.
 *
 * **Only the first answer is the client's own copy.** The rest were drafted here from
 * what the page already claims elsewhere — the hero's "you stay in your current
 * program", the compete and global-ambition sections' "aim for" framing around ICPC and
 * GSoC, the Internshala attribution on the early-start timeline, and the capability
 * rails in `features/one-program`. Four of them (`hours`, `live-or-recorded`,
 * `after-two-years`, `campus-immersion`) state facts that exist nowhere else on the
 * site and are marked at their entry; treat those as placeholders until marketing
 * confirms them.
 *
 * The guarantee answers all open with a plain "No." on purpose. Every one of them is a
 * claim a student could hold the programme to, so hedging the refusal would be worse
 * than making it — the useful part is what follows it.
 */
export const faqEntries: readonly FaqEntry[] = [
  {
    id: "online-version",
    question: "Is uGSOT Catalyst the online version of upGrad School of Technology?",
    answer:
      "No. uGSOT Catalyst is a separate 2-year technology accelerator for students who are already enrolled in a college or university. uGSOT Campus is a full time higher education experience combining the university degree, physical campus, academic environment, faculty, student life and the broader uGSOT ecosystem. Catalyst complements your existing college education it does not replace it.",
  },
  {
    id: "leave-college",
    question: "Do I leave my current college?",
    answer:
      "No. Catalyst runs alongside your existing B.Tech / B.E. / BCA / B.Sc. program. You stay enrolled where you are and keep attending your own classes and exams — Catalyst is a parallel technology ecosystem, not a transfer.",
  },
  {
    id: "is-a-degree",
    question: "Is Catalyst a degree?",
    answer:
      "No. Catalyst is a 2-year technology accelerator, not a degree programme. Your degree comes from your college; Catalyst builds the technical profile that sits alongside it.",
  },
  {
    id: "issues-degree",
    question: "Will uGSOT issue my B.Tech / BCA?",
    answer:
      "No. Your B.Tech or BCA is awarded by the college or university you are enrolled in. uGSOT does not issue the degree and does not affect how your college awards it.",
  },
  {
    // PLACEHOLDER — the weekly commitment is stated nowhere else on the site.
    id: "hours-per-week",
    question: "How many hours a week does Catalyst need?",
    answer:
      "Plan for roughly 8 to 10 hours a week. Catalyst is built to run on top of a full college timetable, so the work is spread across the week rather than concentrated into fixed daily hours.",
  },
  {
    // PLACEHOLDER — the live/recorded mix is stated nowhere else on the site.
    id: "live-or-recorded",
    question: "Is it live or recorded?",
    answer:
      "Both. Live sessions and mentor time are scheduled through the week, and the learning material and project work in BuildSpace stay available on demand so you can fit them around your college schedule.",
  },
  {
    id: "icpc-guarantee",
    question: "Is ICPC selection guaranteed?",
    answer:
      "No. ICPC selection is decided by the contest, not by us. What Catalyst provides is the preparation — structured practice, regular contests, peer leaderboards and team formation — so that you compete as a serious contender rather than an applicant.",
  },
  {
    id: "gsoc-guarantee",
    question: "Is GSoC selection guaranteed?",
    answer:
      "No. GSoC selection rests with the open-source organisations and their mentors. Catalyst builds the contribution history and developer discipline the application is judged on: reading large codebases, finding issues, landing pull requests and working with maintainers.",
  },
  {
    id: "internship-guarantee",
    question: "Is an internship guaranteed?",
    answer:
      "No. Catalyst gives you access to the internship ecosystem and the preparation to compete in it — a real portfolio, a public contribution record and interview readiness — but every internship is still earned through the company's own selection process.",
  },
  {
    id: "placement-guarantee",
    question: "Is placement guaranteed?",
    answer:
      "No. Catalyst is not a placement programme and does not promise a job. It exists to make you the kind of engineer who gets hired: real shipped projects, a credible GitHub profile, competitive programming depth and career preparation.",
  },
  {
    id: "third-fourth-year",
    question: "Can 3rd or 4th year students join?",
    answer:
      "Yes, but Catalyst is designed primarily for Year 1 and Year 2 students, because the two-year arc is what lets skills, projects and a public profile compound before you graduate. Joining later leaves less runway for that to build.",
  },
  {
    // PLACEHOLDER — what follows the programme is stated nowhere else on the site.
    id: "after-two-years",
    question: "What happens after two years?",
    answer:
      "You finish with a technology profile built in public — shipped projects, an open-source contribution record, competitive programming ratings and internship experience — and you carry all of it with you. Your college degree continues on its own timeline.",
  },
  {
    // PLACEHOLDER — how immersions are allocated is stated nowhere else on the site.
    id: "campus-immersion",
    question: "Are campus immersion experiences guaranteed?",
    answer:
      "No. Campus immersions are selective and depend on your progress through the programme. They are an opportunity Catalyst opens up, not an entitlement that comes with enrolment.",
  },
  {
    id: "whats-included",
    question: "What's included in \u20B950,000/year?",
    answer:
      "The whole programme, not a module of it: programming and maths, DSA, competitive programming and ICPC preparation, full stack development, systems and cloud, AI and GenAI, open source and GSoC guidance, real projects, free access to BuildSpace, the AI Mentor, industry mentorship, competitions, Career OS and the internship ecosystem. The total programme fee is \u20B91,00,000 across two years.",
  },
] as const;

/**
 * Animation hooks, by `data-faq` attribute rather than class name, so restyling a
 * component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const FAQ_SELECTORS = {
  intro: '[data-faq="intro"]',
  list: '[data-faq="list"]',
  item: '[data-faq="item"]',
} as const;
