import type {
  CurriculumHeadingCopy,
  CurriculumSemester,
} from "../types/curriculum.types";

/**
 * Copy and data for the Curriculum section. Kept out of JSX so marketing changes never
 * touch a component — see `features/hero/constants` for the same pattern.
 */

export const curriculumHeading: CurriculumHeadingCopy = {
  lead: "A",
  accent: "curriculum",
  trail: "built around how engineers actually learn.",
};

export const curriculumSubtitle =
  "Learn the fundamentals. Build real projects. Grow your career.";

/**
 * Project artwork, in `public/assets/curriculum_project/`.
 *
 * **The filenames are passed through verbatim, spaces, ampersands and all.** Two things
 * make that safe rather than sloppy: `next/image` percent-encodes the path into its own
 * `url` query parameter, so pre-encoding here would double-encode it and 404; and the
 * capitalisation is load-bearing, because macOS resolves `(LSAMS).png` and `(lsams).png`
 * alike while the Linux deploy target does not — a wrong case would pass every local
 * check and only fail in production.
 *
 * Every file is 566x358, which is why the cards can share one `aspect-[566/358]` box and
 * `object-cover` never actually has to crop. That ratio is a literal in
 * `curriculum-projects.tsx` because a Tailwind arbitrary value cannot read a constant —
 * if the artwork is ever re-exported at another size, both places move together.
 */
const projectImage = (file: string) => `/assets/curriculum_project/${file}`;

/**
 * The four semesters, in order. The first is the one that opens.
 *
 * **Semester 1 is transcribed from the approved design; 2 through 4 are written to the
 * same shape.** Two typos in that design are corrected here rather than reproduced:
 * "SubjectsProgramming Foundations (Python)" had the panel's own heading concatenated
 * onto the first subject, and "(HTML ,CSS & Tailwind CSS)" had the comma before the
 * space. Both are in the copy, so they are fixed in the copy.
 */
export const curriculumSemesters: readonly CurriculumSemester[] = [
  {
    id: "foundations",
    label: "Semester 1",
    title: "Computing & Programming Foundations",
    projects: [
      {
        id: "integration-hub",
        title: "Enterprise Integration Hub & Data Orchestration Platform",
        description:
          "Connect enterprise systems and automate data flow and synchronisation.",
        image: projectImage("EnterpriseIntegrationHub&DataOrchestrationPlatform.png"),
      },
      {
        id: "lsams",
        title: "Linux Security Audit & Monitoring Suite (LSAMS)",
        description:
          "Audit Linux systems for security risks and continuously monitor critical system activities and configurations.",
        image: projectImage("(LSAMS).png"),
      },
      {
        id: "food-delivery",
        title: "Food Delivery App",
        description:
          "Build a responsive food-delivery homepage with restaurant and food sections, navigation, cards, and Tailwind CSS styling.",
        image: projectImage("FoodDelivery_App.png"),
      },
      {
        id: "portfolio",
        title: "Personal Portfolio Page",
        description:
          "Build a responsive Web portfolio showcasing your profile, skills, projects, and contact information.",
        image: projectImage("PersonalPortfolio_Page.png"),
      },
    ],
    skills: [
      "Python Programming",
      "Mathematical Thinking",
      "Linux & Command Line",
      "Git & GitHub",
      "HTML & CSS",
      "Tailwind CSS",
      "Responsive Web Development",
      "Communication & Presentation",
    ],
    subjects: [
      "Programming Foundations (Python)",
      "Web Essentials (HTML, CSS & Tailwind CSS)",
      "Engineering Mathematics I",
      "Data Structures & Algorithms I",
      "Linux Fundamentals",
      "Communication Skills",
      "Git & GitHub",
    ],
  },
  {
    id: "full-stack",
    label: "Semester 2",
    title: "Full Stack Software Development",
    projects: [
      {
        id: "code-tutor",
        title: "CodeTutor AI — Coding Problem Assistant",
        description:
          "Build an AI coding-guidance platform where learners solve problems, get graded hints, and track their progress and streaks.",
        image: projectImage("CodeTutor_AI.png"),
      },
      {
        id: "git-lytics",
        title: "Git-Lytics — Code Review & Analytics Platform",
        description:
          "Connect to GitHub, analyse pull requests for review quality and code metrics, and surface the results as live dashboards.",
        image: projectImage("Git-Lytics.png"),
      },
      {
        id: "bidding",
        title: "Real-Time Bidding & Auction Platform",
        description:
          "Create a live auction system where users join rooms and place bids in real time over WebSockets, with instant updates.",
        image: projectImage("Real-TimeBidding_AuctionPlatform.png"),
      },
      {
        id: "learning-path",
        title: "AI-Powered Learning Path Generator",
        description:
          "Build an AI assistant that turns a learner's goals into a personalised roadmap of courses, exercises, and next steps.",
        image: projectImage("AI-PoweredLearning_PathGenerator.png"),
      },
    ],
    skills: [
      "React & Next.js",
      "TypeScript",
      "Node.js & Express",
      "REST API Design",
      "PostgreSQL & Prisma",
      "Authentication & Authorisation",
      "WebSockets & Real-Time",
      "Testing & Debugging",
    ],
    subjects: [
      "Frontend Development (React & Next.js)",
      "Backend Development (Node.js & Express)",
      "Databases & SQL",
      "Data Structures & Algorithms II",
      "API Design & Integration",
      "Engineering Mathematics II",
      "Software Testing Fundamentals",
      "Collaborative Development Workflows",
    ],
  },
  {
    id: "cloud",
    label: "Semester 3",
    title: "Software Engineering & Cloud",
    projects: [
      {
        id: "saas-gitops",
        title: "Multi-Tenant SaaS Platform & Cloud-Native GitOps System",
        description:
          "Run a multi-tenant service on a cloud-native stack, with GitOps automation driving every deployment.",
        image: projectImage(
          "Multi-TenantSaaSPlatform_Cloud-Native_GitOpsManagementSystem.png",
        ),
      },
      {
        id: "predictive-ops",
        title: "Real-Time Predictive Operations Intelligence Platform",
        description:
          "Analyse streaming time-series data to forecast incidents, detect anomalies, and alert before things break.",
        image: projectImage("Real-TimePredictive_OperationsIntelligencePlatform.png"),
      },
      {
        id: "decision-intelligence",
        title: "Enterprise Business Performance & Decision Intelligence Platform",
        description:
          "Unify business data into the real-time insights and dashboards leaders actually make decisions on.",
        image: projectImage(
          "EnterpriseBusinessPerformance_DecisionIntelligencePlatform.png",
        ),
      },
    ],
    skills: [
      "System Design",
      "Docker & Containers",
      "Kubernetes",
      "CI/CD Pipelines",
      "AWS Cloud",
      "Microservices",
      "Observability & Monitoring",
      "Infrastructure as Code",
    ],
    subjects: [
      "Software Engineering & Design Patterns",
      "Cloud Computing (AWS)",
      "DevOps & CI/CD",
      "Containers & Orchestration",
      "System Design & Scalability",
      "Operating Systems & Networking",
      "Advanced Database Systems",
      "Security Engineering",
    ],
  },
  {
    id: "ai",
    label: "Semester 4",
    title: "AI Engineering & Career Accelerator",
    projects: [
      {
        id: "research-assistant",
        title: "Autonomous AI Research Assistant",
        description:
          "An AI agent that plans, searches, synthesises, and compiles multi-source research into structured, cited reports.",
        image: projectImage("AutonomousResearch_Assistant.png"),
      },
      {
        id: "support-agents",
        title: "Multi-Agent Customer Support System",
        description:
          "A team of specialised agents that triage, resolve, and escalate customer queries with quality supervision built in.",
        image: projectImage("Multi-AgentCustomer_SupportSystem.png"),
      },
      {
        id: "pm-agent",
        title: "AI Product Manager Agent",
        description:
          "An autonomous agent that turns a raw product idea into a PRD, a roadmap, user stories, and a sprint board.",
        image: projectImage("AIProductManagerAgent.png"),
      },
      {
        id: "rag-chatbot",
        title: "Domain-Specific RAG Chatbot with Fine-Tuning",
        description:
          "A fine-tuned, retrieval-augmented assistant that gives accurate, grounded answers for one specialised domain.",
        image: projectImage("Domain-Specific RAG Chatbot with Fine-Tuning.png"),
      },
    ],
    skills: [
      "Machine Learning",
      "Deep Learning",
      "LLMs & Prompt Engineering",
      "RAG & Vector Databases",
      "AI Agents & Orchestration",
      "Model Fine-Tuning",
      "MLOps & Deployment",
      "Interview Preparation",
    ],
    subjects: [
      "Machine Learning Foundations",
      "Deep Learning & Neural Networks",
      "Large Language Models",
      "Retrieval-Augmented Generation",
      "AI Agents & Orchestration",
      "MLOps & Model Deployment",
      "Capstone Project",
      "Career Accelerator & Interview Prep",
    ],
  },
] as const;

/**
 * Animation hooks, by `data-curriculum` attribute rather than class name, so restyling a
 * component can never silently break the reveal. Mirrors `JOURNEY_SELECTORS`.
 */
export const CURRICULUM_SELECTORS = {
  heading: '[data-curriculum="heading"]',
  panel: '[data-curriculum="panel"]',
} as const;
