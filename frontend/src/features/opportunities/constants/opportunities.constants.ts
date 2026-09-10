import type { Opportunity } from "../types/opportunities.types";

/**
 * Copy for the Opportunities section. Kept out of JSX so marketing changes never touch
 * a component — see `features/hero/constants` for the same pattern.
 */

export const opportunitiesHeading = {
  lead: "Exclusive",
  accent: "Opportunities",
} as const;

export const opportunitiesSubtitle = "Only for Future Software Engineers";

/**
 * Card photography lives in `public/assets/oppertunity/`, one file per card. File
 * names track the card's subject rather than its exact title, which is editable copy —
 * "Hackathons" is still `National_Hackathons.jpg`. Sources are 1000×800; the media
 * panel tops out at 293×262, so that covers DPR 2 with room, and Next's optimizer
 * serves the panel-sized variant.
 */
const opportunityImage = (file: string) => `/assets/oppertunity/${file}`;

/**
 * Seven cards. Order is the order they pass the viewer as the arc rotates, so this
 * list is also the narrative sequence: compete, then build, then get placed, then the
 * deeper industry tracks, closing on showing the work off.
 *
 * Nothing downstream is hard-coded to the count — the carousel derives its last index
 * from the rendered cards — so adding or removing one is a change to this list alone.
 */
export const opportunities: readonly Opportunity[] = [
  {
    id: "coding-challenges",
    title: "National Coding Challenges",
    description:
      "Compete nationwide and put your problem-solving skills to the test against thousands of engineers.",
    image: opportunityImage("National_Coding_Challenges.jpg"),
    gradient: "linear-gradient(160deg, #bcd4ee 0%, #2b5ea8 45%, #0b1a2e 100%)",
  },
  {
    id: "hackathons",
    title: "Hackathons",
    description:
      "Build and ship under pressure alongside teams from colleges across the country.",
    image: opportunityImage("National_Hackathons.jpg"),
    gradient: "linear-gradient(160deg, #e0c3c5 0%, #a3444b 45%, #2f1113 100%)",
  },
  {
    id: "internships",
    title: "Internship Opportunities",
    description:
      "Get matched with internships at top companies, exclusively for upGrad SOT students.",
    image: opportunityImage("Internship.jpg"),
    gradient: "linear-gradient(160deg, #dccbe0 0%, #6b4f8f 45%, #2a1c40 100%)",
  },
  {
    id: "open-source",
    title: "Open Source Programs",
    description:
      "Contribute to real open-source codebases with mentorship from maintainers.",
    image: opportunityImage("Open_Source_Programs.jpg"),
    gradient: "linear-gradient(160deg, #d5d7da 0%, #6b6e73 45%, #2a2c2f 100%)",
  },
  {
    id: "immersion",
    title: "Industry Immersion",
    description:
      "Spend time embedded with real product teams, shipping alongside working engineers.",
    image: opportunityImage("Industry_Immersion_Program.jpg"),
    gradient: "linear-gradient(160deg, #c7d9db 0%, #2f7f83 45%, #0e2f31 100%)",
  },
  {
    id: "startup-challenges",
    title: "Startup Challenges",
    description:
      "Pitch, build, and ship inside real startup challenges backed by founders and VCs.",
    image: opportunityImage("Startup_Challenges.jpg"),
    gradient: "linear-gradient(160deg, #e8d0b0 0%, #b3652f 45%, #4a2a12 100%)",
  },
  {
    id: "showcases",
    title: "Product Showcases",
    description:
      "Demo what you've built to recruiters, mentors, and the wider tech community.",
    image: opportunityImage("Product_Showcases.jpg"),
    gradient: "linear-gradient(160deg, #cdd3e0 0%, #4f5f8f 45%, #1d2438 100%)",
  },
] as const;

/**
 * Animation hooks, by `data-opportunities` attribute rather than class name, so
 * restyling a component can never silently break the carousel. Mirrors `HERO_SELECTORS`.
 */
export const OPPORTUNITIES_SELECTORS = {
  stage: '[data-opportunities="stage"]',
  card: '[data-opportunities="card"]',
} as const;
