import type {
  ConversationsClip,
  ConversationsFeaturedVideo,
  ConversationsHeadingCopy,
  ConversationsPortrait,
  ConversationsQuote,
} from "../types/conversations.types";

/**
 * Copy, portraits and clip data for the Conversations section. Kept out of JSX so
 * marketing changes never touch a component — see `features/hero/constants` for the
 * pattern.
 */

/** "Conversations / that shape a / brighter / **tomorrow**" */
export const conversationsHeading: ConversationsHeadingCopy = {
  leadLines: ["Conversations", "that shape a", "brighter"],
  accent: "tomorrow",
} as const;

/** `alt` is empty: the name sits in the same corner as the photo, in the quote below it. */
export const conversationsPortrait: ConversationsPortrait = {
  src: "/assets/conversations/vishwa-mohan.png",
  alt: "",
  width: 419,
  height: 513,
} as const;

export const conversationsQuote: ConversationsQuote = {
  name: "Vishwa Mohan",
  role: "Founder & CEO, upGrad School of Technology",
} as const;

/**
 * The flagship episode, played above the row rather than inside it.
 *
 * The poster is a bespoke graphic — the guests' names and credits are burned into the
 * file itself — not YouTube's own auto-generated thumbnail, so it is shipped as a local
 * asset rather than fetched from `i.ytimg.com` like the row's clips below.
 */
export const conversationsFeaturedVideo: ConversationsFeaturedVideo = {
  videoId: "Zmz5gE9nJqY",
  title: "Inside The IIT Race: JEE, Placements & Future Of Engineering | Vishwa Mohan",
  poster: {
    src: "/assets/conversations/raj-shamani-vishwa-mohan.png",
    width: 534,
    height: 300,
  },
} as const;

/**
 * The ten-clip row, in the design's left-to-right order — the marquee must be at rest on
 * "IIT नहीं हुआ तो क्या ??" (`clips[0]`) the moment a reader scrolls to it, rather than
 * wherever a continuously running loop happens to have drifted to by then. See
 * `ConversationClipRail` for how that is guaranteed.
 *
 * Posters are read live from `i.ytimg.com` by video id (see `next.config.ts`), the same
 * source `YouTubeEmbed` uses, rather than shipped as local exports: unlike the featured
 * video above, each of these thumbnails already *is* the real YouTube thumbnail.
 *
 * **The first two ids are swapped from the order they were handed over in.** The source
 * list's "1st" and "2nd" links were transposed — verified against each video's own
 * `i.ytimg.com` thumbnail and YouTube oEmbed title, not assumed from list position:
 * `Zmz5gE9nJqY` is the "IIT IS A SCAM" thumbnail (and doubles as `conversationsFeaturedVideo`
 * above, under its formal title), `SHc4jChkKxM` ("IIT Nhi Hua Toh Kya?") is this card.
 */
export const conversationsClips: readonly ConversationsClip[] = [
  { id: "iit-nahi-hua", videoId: "SHc4jChkKxM", headline: "IIT नहीं हुआ तो क्या ??", guest: "Anand Sir" },
  { id: "iit-is-a-scam", videoId: "Zmz5gE9nJqY", headline: "IIT is a scam", guest: "Raj Shamani" },
  {
    id: "education-gap-exposed",
    videoId: "62DTA1vKiQc",
    headline: "The education gap, exposed",
    guest: "Dr. GP Parmeshwara",
  },
  {
    id: "worth-the-hype",
    videoId: "VW6o8kBMMec",
    headline: "upGrad School of Technology — is it worth the hype?",
    guest: "MS Chouhan",
  },
  {
    id: "unpaid-internship-slavery",
    videoId: "88BOBhbr6Kk",
    headline: "Unpaid internship slavery!",
    guest: "Sarvesh",
  },
  {
    id: "ivy-league-vs-indian-education",
    videoId: "yvkFaqdWhsU",
    headline: "Why the Ivy League beats Indian education",
    guest: "Dr Vivek Veeriah",
  },
  {
    id: "upgrad-sot-exposed",
    videoId: "JMiHXRkSS60",
    headline: "upGrad School Of Tech, exposed",
    guest: "GB Sir",
  },
  {
    id: "bihar-students-tech-future",
    videoId: "f6D1HfiAJSc",
    headline: "Why Bihar students will lead tech's future??",
    guest: "Anand Sir",
  },
  { id: "is-iit-a-scam-no", videoId: "mfreytCBQK4", headline: "Is IIT a scam? No.", guest: "Ashu Sir" },
  {
    id: "interviews-in-the-ai-era",
    videoId: "aJ16Pt0rGjA",
    headline: "Interviews in the AI era",
    guest: "Rahul Arora",
  },
] as const;

/** The label repeated under every clip — one constant rather than ten copies of it. */
export const conversationsClipLabel = "Podcast";

/**
 * How long one full pass of the clip row takes — ~35px a second at desktop width (the
 * ten cards plus their trailing gaps run to roughly 1,640px there), the same pace the
 * faculty marquee is tuned to. See `FACULTY_MARQUEE_SECONDS`.
 */
export const CONVERSATIONS_CLIP_MARQUEE_SECONDS = 47;

/**
 * Animation hooks, by `data-conversations` attribute rather than class name, so
 * restyling a component can never silently break the reveal. Mirrors `HACKATHONS_SELECTORS`.
 */
export const CONVERSATIONS_SELECTORS = {
  copy: '[data-conversations="copy"]',
  beat: '[data-conversations="beat"]',
  media: '[data-conversations="media"]',
} as const;
