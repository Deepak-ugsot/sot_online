import type { MentorsMarqueeRow } from "../types/mentors.types";

/**
 * Copy and logo data for the Mentors section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

export const mentorsHeading = {
  lead: "Learn From The",
  accent: "Best",
} as const;

export const mentorsParagraph =
  "Industry experts from leading technology companies guide your journey through live classes, mentorship, and career coaching.";

/**
 * Logos live in `public/companyLogo/`. Every file is 177px tall, so a single
 * `h-10 w-auto` renders them all on a consistent optical baseline; the intrinsic
 * width is carried per-logo so `next/image` reserves the correct box and nothing
 * shifts as they load.
 *
 * Rows alternate direction and run at different speeds, which is what stops the three
 * strips reading as one solid moving block.
 */
export const mentorsMarqueeRows: readonly MentorsMarqueeRow[] = [
  {
    id: "marquee-a",
    direction: "left",
    durationSeconds: 42,
    logos: [
      { name: "Flipkart", src: "/companyLogo/Flipkart.png", width: 583, height: 177 },
      { name: "Google", src: "/companyLogo/Google.png", width: 486, height: 177 },
      { name: "Groww", src: "/companyLogo/Groww.png", width: 547, height: 177 },
      { name: "Haptik", src: "/companyLogo/Haptik.png", width: 402, height: 177 },
      { name: "Accenture", src: "/companyLogo/Accenture.png", width: 623, height: 177 },
      { name: "Adobe", src: "/companyLogo/Adobe.png", width: 590, height: 177 },
      { name: "Amazon", src: "/companyLogo/amazon.png", width: 552, height: 177 },
      { name: "Apple", src: "/companyLogo/Apple.png", width: 486, height: 177 },
      { name: "Goldman Sachs", src: "/companyLogo/GoldmanSachs.png", width: 382, height: 177 },
      { name: "Netflix", src: "/companyLogo/Netflix.png", width: 592, height: 177 },
    ],
  },
  {
    id: "marquee-b",
    direction: "right",
    durationSeconds: 36,
    logos: [
      { name: "IBM", src: "/companyLogo/IBM.png", width: 409, height: 177 },
      { name: "Infosys", src: "/companyLogo/Infosys.png", width: 442, height: 177 },
      { name: "Intel", src: "/companyLogo/Intel.png", width: 264, height: 177 },
      { name: "JPMorgan Chase", src: "/companyLogo/JPMorgan.png", width: 1040, height: 177 },
      { name: "LinkedIn", src: "/companyLogo/Linkedin.png", width: 614, height: 177 },
      { name: "Meta", src: "/companyLogo/Meta.png", width: 754, height: 177 },
      { name: "Microsoft", src: "/companyLogo/Microsoft.png", width: 734, height: 177 },
      { name: "Oracle", src: "/companyLogo/Oracle.png", width: 1033, height: 177 },
      { name: "Cisco", src: "/companyLogo/Cisco.png", width: 310, height: 177 },
      { name: "Dell", src: "/companyLogo/Dell.png", width: 444, height: 177 },
    ],
  },
  {
    id: "marquee-c",
    direction: "left",
    durationSeconds: 48,
    logos: [
      { name: "Swiggy", src: "/companyLogo/Swiggy.png", width: 593, height: 177 },
      { name: "Uber", src: "/companyLogo/Uber.png", width: 469, height: 177 },
      { name: "Walmart", src: "/companyLogo/Walmart.png", width: 681, height: 177 },
      { name: "Wipro", src: "/companyLogo/Wipro.png", width: 395, height: 177 },
      { name: "Zomato", src: "/companyLogo/Zomato.png", width: 718, height: 177 },
      { name: "PayPal", src: "/companyLogo/Paypal.png", width: 638, height: 177 },
      { name: "Salesforce", src: "/companyLogo/Salesforce.png", width: 259, height: 177 },
      { name: "Stripe", src: "/companyLogo/Stripe.png", width: 414, height: 177 },
      { name: "HP", src: "/companyLogo/hp.png", width: 177, height: 177 },
    ],
  },
] as const;

/**
 * Every company name, in row order.
 *
 * The marquee itself is `aria-hidden` — it is a decorative loop, and its duplicated
 * tracks would otherwise read every company twice. This list is what assistive tech
 * actually announces, derived from the same data so the two can never drift apart.
 */
export const mentorsCompanyNames: readonly string[] = mentorsMarqueeRows.flatMap(
  (row) => row.logos.map((logo) => logo.name),
);

/**
 * Animation hooks, by `data-mentors` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const MENTORS_SELECTORS = {
  heading: '[data-mentors="heading"]',
  marquee: '[data-mentors="marquee"]',
} as const;
