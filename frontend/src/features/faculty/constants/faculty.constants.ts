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
 * would otherwise announce a run of company names with nothing to say what they are.
 */
export const facultyCompaniesLabel = "Has worked at";

/**
 * Brand marks, from three places — each the sharpest copy of that mark in the repo.
 *
 * - `public/companyLogo/` holds the 177px masters. They are the same marks the design
 *   shipped as 23px exports, which are exactly 1× at the size the card sets them and soft
 *   on every high-density screen. **Every file in that folder is 177px tall.**
 * - The upGrad School of Technology lockup is next-opportunity's 49px export, twice the
 *   resolution of the one the design shipped with this section.
 * - PhysicsWallah, Barclays and iNeuron exist only as the design's own files, in
 *   `public/assets/faculty/logos/`.
 *
 * Every mark's ink fills 82–100% of its file's height, so the card sets one height and
 * each width follows — the one nudge is the upGrad lockup's `scale`, see below.
 *
 * The filenames' capitalisation is load-bearing: they are passed through verbatim, and
 * macOS resolves `paypal.png` where the Linux deploy target does not.
 */
const companyLogo = (file: string) => `/companyLogo/${file}`;
const facultyLogo = (file: string) => `/assets/faculty/logos/${file}`;

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
  salesforce: {
    id: "salesforce",
    name: "Salesforce",
    logo: { src: companyLogo("Salesforce.png"), width: 259, height: 177 },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft",
    logo: { src: companyLogo("Microsoft.png"), width: 734, height: 177 },
  },
  cisco: {
    id: "cisco",
    name: "Cisco",
    logo: { src: companyLogo("Cisco.png"), width: 310, height: 177 },
  },
  upgrad: {
    id: "upgrad",
    name: "upGrad School of Technology",
    logo: {
      src: "/assets/next_opportunity/upgrad_school_of_technology.png",
      width: 151,
      height: 49,
      // The lockup's subline takes a third of its height, so at the shared height its
      // wordmark reads a size under LinkedIn's. 1.25 is the most it can take and still
      // leave Vishwa Mohan's first row three marks wide, as the design sets it.
      scale: 1.25,
    },
  },
  physicswallah: {
    id: "physicswallah",
    name: "PhysicsWallah",
    logo: { src: facultyLogo("physicswallah.png"), width: 100, height: 100 },
  },
  barclays: {
    id: "barclays",
    name: "Barclays",
    logo: { src: facultyLogo("barclays.png"), width: 513, height: 100 },
  },
  ineuron: {
    id: "ineuron",
    name: "iNeuron",
    logo: { src: facultyLogo("ineuron.png"), width: 431, height: 118 },
  },
} as const satisfies Record<string, FacultyCompany>;

/** Portraits live in `public/assets/faculty/`, one per person, named for them. */
const facultyPhoto = (file: string, size: number) => ({
  src: `/assets/faculty/${file}`,
  // Empty on purpose: the name is the next thing on the card.
  alt: "",
  width: size,
  height: size,
});

/**
 * The eight faculty, in the design's order.
 *
 * Every portrait is a square cut-out with its red backdrop drawn in and a transparent
 * ground, framed the same way, which is why the card never gives it a plate of its own.
 * Four are 1092/1072px exports; the other four (Gaurav, Rahul, Piyush, Rishab) are
 * 273px, which is under 1× at the card's 284px on a high-density screen — send larger
 * exports of those and only the file and its `size` here change.
 *
 * The companies are each person's own, in the design's order. One slip in the design is
 * corrected rather than carried: Rishab's "lead Instructor" gets the capital the other
 * two lead instructors' titles have.
 */
export const facultyMembers: readonly FacultyMember[] = [
  {
    id: "vishwa-mohan",
    name: "Vishwa Mohan",
    role: "CEO of upGrad SOT",
    photo: facultyPhoto("vishwa-mohan.webp", 1092),
    companies: [
      companies.linkedin,
      companies.walmart,
      companies.upgrad,
      companies.paypal,
      companies.oracle,
      companies.physicswallah,
    ],
  },
  {
    id: "gaurav-kaushik",
    name: "Gaurav Kaushik",
    role: "Senior Staff Software Engineer & Problem Solving Track Lead",
    photo: facultyPhoto("gaurav-kaushik.png", 273),
    companies: [companies.salesforce, companies.microsoft, companies.paypal],
  },
  {
    id: "gladden-rumao",
    name: "Gladden Rumao",
    role: "Staff Software AI Engineer",
    photo: facultyPhoto("gladden-rumao.webp", 1072),
    companies: [companies.upgrad, companies.barclays],
  },
  {
    id: "mithun-s",
    name: "Mithun S",
    role: "SDE II at Cisco",
    photo: facultyPhoto("mithun-s.webp", 1092),
    companies: [companies.cisco, companies.physicswallah, companies.ineuron],
  },
  {
    id: "jyoti-nigam",
    name: "Jyoti Nigam",
    role: "Data Scientist at upGrad SOT",
    photo: facultyPhoto("jyoti-nigam.webp", 1092),
    companies: [companies.upgrad],
  },
  {
    id: "rahul-yadav",
    name: "Rahul Yadav",
    role: "SDE 2 + Lead Instructor",
    photo: facultyPhoto("rahul-yadav.png", 273),
    companies: [companies.upgrad],
  },
  {
    id: "piyush-jain",
    name: "Piyush Jain",
    role: "Senior Mathematician and Lead Instructor",
    photo: facultyPhoto("piyush-jain.png", 273),
    companies: [companies.upgrad],
  },
  {
    id: "rishab-bafna",
    name: "Rishab Bafna",
    role: "Senior AI Engineer & Lead Instructor",
    photo: facultyPhoto("rishab-bafna.png", 273),
    companies: [companies.upgrad],
  },
] as const;

/**
 * How long one full pass of the row takes — about 35px a second at desktop width, the
 * pace the row was set at when it held four cards. Eight cards are a track twice as long,
 * so the pass takes twice as long to keep the same speed.
 *
 * Slow on purpose. These are faces with names under them, and a reader has to be able
 * to take a card in before it leaves; anything brisk turns the row into a ticker.
 */
export const FACULTY_MARQUEE_SECONDS = 80;

/**
 * Animation hooks, by `data-faculty` attribute rather than class name, so restyling a
 * component can never silently break the reveal. Mirrors `LEADERS_SELECTORS`.
 */
export const FACULTY_SELECTORS = {
  intro: '[data-faculty="intro"]',
  rail: '[data-faculty="rail"]',
  track: '[data-faculty="track"]',
} as const;
