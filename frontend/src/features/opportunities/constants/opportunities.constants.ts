import type { Opportunity } from "../types/opportunities.types";

/**
 * Copy for the Opportunities section. Kept out of JSX so marketing changes never touch
 * a component — see `features/hero/constants` for the same pattern.
 */

/**
 * The accent opens the sentence rather than closing it — the one heading on the page
 * built this way. "Opportunities" is the noun the whole section is about, and the rest
 * of the line is the qualifier on it, so the red lands first and the qualifier follows.
 */
export const opportunitiesHeading = {
  accent: "Opportunities",
  trail: "You Can't Get From Watching Videos",
} as const;

/**
 * The line under the arc — the section's actual argument, where the heading is only its
 * setup. Split in three because the accent sits mid-sentence: the claim, the word it
 * turns on, then the two words that land it.
 */
export const opportunitiesClosing = {
  lead: "Content is everywhere.",
  accent: "Ecosystem",
  trail: "isn't.",
} as const;

/**
 * Card artwork lives in `public/assets/oppertunity/`, one file per card. File
 * names track the card's subject rather than its exact title, which is editable copy —
 * "Hackathons" is still `National_Hackathons.jpg`. Sources are 1001×825 or 1068×880 —
 * both 1.21:1, which is the media panel's own ratio at full size (293×241), so the
 * panel's `object-cover` crops next to nothing. A thousand-odd pixels wide covers that
 * panel at DPR 2 with room, and Next's optimizer serves the panel-sized variant.
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
    gradient: "linear-gradient(160deg, #c9c9de 0%, #515091 45%, #161528 100%)",
  },
  {
    id: "hackathons",
    title: "Hackathons",
    description:
      "Build and ship under pressure alongside teams from colleges across the country.",
    image: opportunityImage("National_Hackathons.jpg"),
    gradient: "linear-gradient(160deg, #e2c5d2 0%, #9d436b 45%, #2b121d 100%)",
  },
  {
    id: "internships",
    title: "Internship Opportunities",
    description:
      "Get matched with internships at top companies, exclusively for upGrad SOT students.",
    image: opportunityImage("Internship.jpg"),
    gradient: "linear-gradient(160deg, #c1d0e6 0%, #3864a9 45%, #0e1b2f 100%)",
  },
  {
    id: "open-source",
    title: "Open Source Programs",
    description:
      "Contribute to real open-source codebases with mentorship from maintainers.",
    image: opportunityImage("Open_Source_Programs.jpg"),
    gradient: "linear-gradient(160deg, #c2c3e5 0%, #3a3fa6 45%, #0f112e 100%)",
  },
  {
    id: "immersion",
    title: "Industry Immersion",
    description:
      "Spend time embedded with real product teams, shipping alongside working engineers.",
    image: opportunityImage("Industry_Immersion_Program.jpg"),
    gradient: "linear-gradient(160deg, #e8bfc4 0%, #ae3241 45%, #300d11 100%)",
  },
  {
    id: "startup-challenges",
    title: "Startup Challenges",
    description:
      "Pitch, build, and ship inside real startup challenges backed by founders and VCs.",
    image: opportunityImage("Startup_Challenges.jpg"),
    gradient: "linear-gradient(160deg, #c5d4e3 0%, #43729e 45%, #121f2c 100%)",
  },
  {
    id: "showcases",
    title: "Product Showcases",
    description:
      "Demo what you've built to recruiters, mentors, and the wider tech community.",
    image: opportunityImage("Product_Showcases.jpg"),
    gradient: "linear-gradient(160deg, #c8dfdf 0%, #4d9194 45%, #142829 100%)",
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
