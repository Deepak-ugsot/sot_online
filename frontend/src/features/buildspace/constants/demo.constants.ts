/**
 * Everything the fake BuildSpace product UI displays.
 *
 * All of it is invented product data for a marketing demo — no request is made and
 * nothing here is real. It lives in one file so the screen components stay pure layout.
 *
 * **The project is the e-commerce build, and that choice is deliberate.** Every
 * workspace screen below is about a cart and products API (`cartflow-api`, "Milestone 3:
 * Cart & Products API", the guest-cart schema question), so the project being opened has
 * to be the one that work belongs to or the tour contradicts itself between the first
 * chapter and the rest.
 */

/** Project thumbnails, from `public/assets/project/`. */
const projectImage = (file: string) => `/assets/project/${file}`;

/** The project the tour opens. */
export const demoProject = {
  title: "E-Commerce Platform with Next.js, Stripe & PostgreSQL",
  short: "E-Commerce Platform",
  summary:
    "Build a full storefront with a product catalog, cart, checkout and payments — then deploy it and wire up real Stripe webhooks.",
  track: "Full Stack",
  level: "Intermediate",
  rating: "4.9",
  ratingCount: "2,841",
  students: "12,840",
  duration: "42h 30m",
  videos: "86 videos",
  updated: "Updated Dec 2024",
  image: projectImage("Ecommerce_Platform.jpg"),
  tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Redis"],
};

/** The other two cards in the trending row, there to make it read as a real library. */
export const demoTrending = [
  {
    id: "chat",
    title: "Real-Time Chat App with Socket.io, Redis & React",
    level: "Advanced",
    meta: "74 videos · 38h 15m",
    image: projectImage("Chat_Application.jpg"),
  },
  {
    id: "resume",
    title: "AI-Powered Resume Builder with OpenAI & FastAPI",
    level: "Intermediate",
    meta: "56 videos · 28h 45m",
    image: projectImage("Resume.jpg"),
  },
];

/**
 * The "Continue learning" row — the two builds already underway.
 *
 * It earns its place by filling the dashboard rather than decorating it: with only the
 * stat tiles and the trending row, the screen left roughly 240px of empty ground at the
 * bottom of the canvas, which read as a half-loaded page rather than a busy dashboard.
 */
export const demoContinue = [
  {
    id: "ecommerce",
    title: "E-Commerce Platform with Next.js, Stripe & PostgreSQL",
    percent: 34,
    meta: "6 weeks estimated",
    tags: ["Next.js", "TypeScript"],
    image: projectImage("Ecommerce_Platform.jpg"),
  },
  {
    id: "chat",
    title: "Real-Time Chat App with Socket.io, Redis & React",
    percent: 12,
    meta: "5 weeks estimated",
    tags: ["React", "Socket.io"],
    image: projectImage("Chat_Application.jpg"),
  },
];

/** Dashboard headline tiles. */
export const demoStats = [
  { label: "Projects Completed", value: "8" },
  { label: "In Progress", value: "2" },
  { label: "Learning Hours", value: "126h" },
  { label: "Current Streak", value: "12 days" },
];

/**
 * The workspace rail. Steps behind the current one show as complete and steps ahead of it
 * as locked, which is what the rail's ticks and padlocks are derived from.
 *
 * **This order has to match `buildspaceChapters`.** The rail is the tour's spine — the
 * viewer reads progress from how far down it the highlight has moved — so a step that
 * comes later here than its chapter does in the tour would send the highlight backwards
 * mid-tour and re-lock a step the viewer just watched being completed. Build sits before
 * GitHub for that reason: the tour builds the milestone first, then shows the commits it
 * produced.
 */
export const demoSteps = [
  { id: "overview", label: "Overview" },
  { id: "plan", label: "Engineering Plan" },
  { id: "review", label: "AI Review" },
  { id: "build", label: "Build" },
  { id: "github", label: "GitHub Engineering" },
  { id: "ship", label: "Submit Attempt" },
] as const;

export type DemoStepId = (typeof demoSteps)[number]["id"];

/** The planning question, and the answer that types itself out. */
export const demoPlan = {
  eyebrow: "Engineering Plan",
  blurb: "Think before you build. Explain your technical approach for each milestone.",
  meta: "20 min · Intermediate",
  question: "How will you structure your database for the cart?",
  hint: "Explain schema design, relationships, and how you handle guest vs authenticated sessions.",
  answer:
    "I'll use a PostgreSQL carts table with a session_id column for guests. Cart items go in a separate cart_items table linked by foreign keys, and Redis caches the active cart for faster reads.",
};

/**
 * The AI review. Scores fill in order, so the array order is the reveal order.
 *
 * `tone` picks the bar colour: the demo runs green above 80 and amber below it, which is
 * the whole reason a 74 reads as "needs work" at a glance.
 */
export const demoReview = {
  overall: 78,
  scores: [
    { label: "Architecture", value: 82, tone: "green" },
    { label: "Security", value: 74, tone: "amber" },
    { label: "Scalability", value: 79, tone: "amber" },
    { label: "Performance", value: 76, tone: "amber" },
    { label: "Maintainability", value: 81, tone: "green" },
  ],
  strengths: [
    "Correct separation of cart and cart_items tables",
    "Good use of Redis for read performance",
  ],
  needsWork: [
    "Add a version column on products for optimistic locking",
    "Consider cart expiry — when does a guest cart get cleaned up?",
  ],
} as const;

/** The build milestone. Tasks tick over in order as the chapter runs. */
export const demoBuild = {
  sprint: "Sprint 2 · Active milestone",
  milestone: "Milestone 3: Cart & Products API",
  progress: 40,
  tasks: [
    "Add cart session model to Prisma schema",
    "Implement POST /cart/:id/items endpoint",
    "Add Redis session TTL and auto-extend logic",
    "Write integration tests for cart endpoints",
    "Implement DELETE /cart/:id/items/:itemId",
  ],
  repo: {
    name: "github.com/you/cartflow-api",
    branch: "feat/cart-api",
    lastCommit: "2 hours ago",
    sha: "a3f92b1",
    prs: "1 open",
  },
};

/** The GitHub panel. */
export const demoGithub = {
  blurb: "Track your coding consistency and engineering progress",
  repo: "cartflow-api",
  owner: "you/cartflow-api",
  branch: "main",
  lastCommit: "Fix: user auth edge case",
  lastCommitAt: "2 minutes ago",
  workingTree: "No uncommitted changes",
  stats: [
    { label: "Total Commits", value: "652", delta: "+18%" },
    { label: "Active Branches", value: "18", delta: "+12%" },
    { label: "Pull Requests", value: "24", delta: "+20%" },
    { label: "Files Changed", value: "512", delta: "+15%" },
  ],
  /**
   * The commit sparkline, as commits per point. Rendered as a polyline scaled to the
   * chart box, so these are relative heights rather than pixel positions — the shape is
   * what matters, and it climbs to a peak two-thirds along the way the reference does.
   */
  series: [4, 14, 28, 31, 17, 18, 29, 15, 27, 22, 33, 51, 34, 28, 32, 44, 30, 20, 26],
  peak: { index: 11, label: "Jun 3, 2025", value: "22 commits" },
  months: ["May 10", "May 16", "May 22", "May 28", "Jun 3", "Jun 10"],
};

/** The submit form, and what comes back after it is sent. */
export const demoShip = {
  deploymentLabel: "Deployment URL",
  deploymentHint:
    "Your project must be live and accessible. Railway, Render, or Fly.io recommended.",
  deploymentValue: "https://cartflow-api.railway.app",
  repoLabel: "GitHub Repository URL",
  repoHint: "Share the repository where your complete source code is stored.",
  repoValue: "https://github.com/you/cartflow-api",
  submit: "Submit Project for Review",
  submitted: "Phase 1 submitted — Phase 2 unlocked",
  results: [
    { label: "Deployment", value: "Live · verified" },
    { label: "Repository", value: "652 commits linked" },
    { label: "Review", value: "Queued · 24h" },
  ],
};

/** Top bar chrome. */
export const demoChrome = {
  brand: "BuildSpace",
  nav: ["Dashboard", "Library", "My Learning"],
  search: "Search projects, technologies, instructors...",
  streak: "500",
  avatar: "SD",
  greeting: "Good morning, Sai.",
  greetingDate: "Wednesday, January 15",
  greetingSub: "You're 34% through the e-commerce build. Keep the momentum going.",
};
