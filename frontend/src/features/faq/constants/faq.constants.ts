import type { FaqEntry } from "../types/faq.types";

/**
 * Copy for the FAQ section. Kept out of JSX so marketing changes never touch a
 * component — see `features/hero/constants` for the same pattern.
 */

export const faqHeading = {
  lead: "Got Questions?",
  accent: "We've Got Answers",
} as const;

export const faqParagraph =
  "Everything you need to know about the program, admissions, Career OS, projects, placements, and student life.";

export const faqPromo = {
  title: "Start Your Journey",
  description:
    "A structured path designed to transform ambitious students into industry-ready software engineers.",
  cta: { label: "Start Your Journey", href: "#apply" },
} as const;

export const faqEntries: readonly FaqEntry[] = [
  {
    id: "who-can-join",
    question: "Who can join?",
    answer:
      "Any student pursuing engineering or a related technology degree — from 1st year to final year — can join Career OS.",
  },
  {
    id: "coding-experience",
    question: "Is coding experience required?",
    answer:
      "No prior coding experience is required — Career OS starts from the fundamentals and builds up from there.",
  },
  {
    id: "live-classes",
    question: "How many live classes are conducted?",
    answer:
      "Live classes run multiple times a week, alongside recorded lectures and self-paced modules you can revisit anytime.",
  },
  {
    id: "what-makes-different",
    question: "What makes Career OS different?",
    answer:
      "Career OS personalizes your entire journey — learning, projects, mentorship, and placement support — around your year and branch, not a one-size-fits-all curriculum.",
  },
  {
    id: "internships",
    question: "Will I get internships?",
    answer:
      "Yes — Career OS connects you with internship and hackathon opportunities as part of your career readiness track.",
  },
  {
    id: "placement-support",
    question: "Is placement support included?",
    answer:
      "Yes — placement support including mock interviews, resume building, and career coaching is included for every student.",
  },
  {
    id: "access-duration",
    question: "How long do I have access?",
    answer:
      "You have access to Career OS for the full duration of your 2-year program, including all future content updates.",
  },
  {
    id: "certificates",
    question: "Will I receive certificates?",
    answer:
      "Yes — you'll receive a certificate upon completing each phase of your Career OS journey.",
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
