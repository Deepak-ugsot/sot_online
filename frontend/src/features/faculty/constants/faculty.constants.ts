import type {
  FacultyCompany,
  FacultyHeadingCopy,
  FacultyMember,
} from "../types/faculty.types";

/**
 * Copy, cards and timing for the Faculty section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the pattern.
 */

/** "Taught by **World's Top Tech** and / Academic Minds" */
export const facultyHeading: FacultyHeadingCopy = {
  lead: "Taught by",
  accent: "World's Top Tech",
  trail: "and",
  nextLine: "Academic Minds",
} as const;

export const facultySubtitle =
  "Industry experts and innovators who turn real-world experience into transformative learning.";

/**
 * Names each card's logo list for assistive tech. On screen the logos need no label —
 * under a name and a role they read as a track record on sight — but a screen reader
 * would otherwise announce four company names with nothing to say what they are.
 */
export const facultyCompaniesLabel = "Has worked at";

/**
 * Brand marks live in `public/companyLogo/`.
 *
 * **These are the 177px masters, not the 23px exports the design shipped.** They are the
 * same marks at the same proportions — the design's are downscales of these — but a
 * 23px file is exactly 1× at the size the card sets it, and soft on every high-density
 * screen. **Every file in that folder is 177px tall**, so the card sets one height and
 * each width follows.
 *
 * The filenames' capitalisation is load-bearing: they are passed through verbatim, and
 * macOS resolves `paypal.png` where the Linux deploy target does not.
 */
const companyLogo = (file: string) => `/companyLogo/${file}`;

const companies = {
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    logo: { src: companyLogo("Linkedin.png"), width: 614, height: 177 },
  },
  walmart: {
    id: "walmart",
    name: "Walmart",
    logo: { src: companyLogo("Walmart.png"), width: 681, height: 177 },
  },
  paypal: {
    id: "paypal",
    name: "PayPal",
    logo: { src: companyLogo("Paypal.png"), width: 638, height: 177 },
  },
  oracle: {
    id: "oracle",
    name: "Oracle",
    logo: { src: companyLogo("Oracle.png"), width: 1033, height: 177 },
  },
} as const satisfies Record<string, FacultyCompany>;

/**
 * **PLACEHOLDER.** The design repeats a single profile across the whole row, and that
 * one profile — its photo and its four logos — is all that has been supplied. The row is
 * built from it until the real faculty roster lands; replacing it means writing out one
 * entry per person in `facultyMembers` below and nothing else.
 *
 * The photo is a square cut-out with its red backdrop drawn in and a transparent ground,
 * which is why the card never gives it a plate of its own. Its `alt` is empty: the name
 * is the next thing on the card.
 */
const placeholderProfile = {
  name: "Vishwa Mohan",
  role: "CEO of upGrad SOT",
  photo: {
    src: "/assets/faculty/vishwa-mohan.webp",
    alt: "",
    width: 1092,
    height: 1092,
  },
  companies: [companies.linkedin, companies.walmart, companies.paypal, companies.oracle],
} as const;

/**
 * The cards, in marquee order.
 *
 * Four, as the design shows. The count also matters to the loop: see `TRACK_COPIES` in
 * `faculty-marquee.tsx` for how much row the marquee needs to close without a gap.
 */
export const facultyMembers: readonly FacultyMember[] = Array.from(
  { length: 4 },
  (_, index) => ({ id: `placeholder-${index + 1}`, ...placeholderProfile }),
);

/**
 * How long one full pass of the row takes — about 35px a second at desktop width.
 *
 * Slow on purpose. These are faces with names under them, and a reader has to be able
 * to take a card in before it leaves; anything brisk turns the row into a ticker.
 */
export const FACULTY_MARQUEE_SECONDS = 40;

/**
 * Animation hooks, by `data-faculty` attribute rather than class name, so restyling a
 * component can never silently break the reveal. Mirrors `LEADERS_SELECTORS`.
 */
export const FACULTY_SELECTORS = {
  intro: '[data-faculty="intro"]',
  rail: '[data-faculty="rail"]',
} as const;
