// Page copy and sample data. Everything marked PLACEHOLDER must be confirmed
// with the Tessera team before launch.

export type Logo = { name: string; src: string };

export const logos: Logo[] = [
  { name: "Slack", src: "/logos/slack.svg" },
  { name: "OpenAI", src: "/logos/openai.svg" },
  { name: "Stripe", src: "/logos/stripe.svg" },
  { name: "Google Drive", src: "/logos/google-drive.svg" },
  { name: "HubSpot", src: "/logos/hubspot.svg" },
  { name: "Figma", src: "/logos/figma.svg" },
  { name: "Linear", src: "/logos/linear.svg" },
  { name: "Vercel", src: "/logos/vercel.svg" },
  { name: "Airtable", src: "/logos/airtable.svg" },
  { name: "Dropbox", src: "/logos/dropbox.svg" },
];

export const productMenu = [
  { label: "Apps", desc: "Turn data into tools in hours", icon: "apps" },
  { label: "Agents", desc: "Automate the work that repeats", icon: "agents" },
  { label: "Data sources", desc: "Connect every tool you use", icon: "data" },
  { label: "Governance", desc: "Approvals, roles and audit logs", icon: "governance" },
  { label: "Analytics", desc: "See impact across every team", icon: "analytics" },
] as const;

// PLACEHOLDER: these starting values were copied from Whop's site and must be
// replaced with Tessera's own numbers.
export const liveCounters = [
  { key: "sellers", label: "Active sellers", start: 21379, min: 1, max: 3, prefix: "" },
  { key: "processed", label: "Total processed", start: 429539701, min: 180, max: 1080, prefix: "$" },
  { key: "members", label: "Memberships sold", start: 7972240, min: 1, max: 5, prefix: "" },
] as const;

export const teamTabs = ["Ops", "Sales", "Product", "Strategy", "Engineering"] as const;
export type TeamTab = (typeof teamTabs)[number];

export const dashboardSubtitles: Record<TeamTab, string> = {
  Ops: "Here's what your apps and agents did today.",
  Sales: "Your pipeline, deals and revenue at a glance.",
  Product: "How people are using what you ship.",
  Strategy: "Progress against this quarter's company goals.",
  Engineering: "Deploys, reliability and review throughput.",
};

export const dashboardTitles: Record<TeamTab, string> = {
  Ops: "Ops stats",
  Sales: "Sales overview",
  Product: "Product usage",
  Strategy: "Company goals",
  Engineering: "Delivery health",
};

export const opsCards: [string, string][] = [
  ["Workflows run", "12,480"],
  ["Hours saved", "1,920"],
  ["Active agents", "36"],
  ["Alerts resolved", "412"],
  ["Tasks automated", "8,204"],
  ["Failed runs", "7"],
];

export const kpiSets: Record<"Sales" | "Strategy", [string, string, string, boolean][]> = {
  Sales: [
    ["Pipeline value", "$1.2M", "+12.4%", true],
    ["Deals won", "84", "+9.1%", true],
    ["Win rate", "31%", "−1.2%", false],
  ],
  Strategy: [
    ["Revenue", "$842K", "+21.0%", true],
    ["Gross margin", "71%", "+2.3%", true],
    ["Burn multiple", "1.4x", "+0.2", false],
  ],
};

export const pipelineStages: [string, number, string][] = [
  ["Prospecting", 92, "$420K"],
  ["Qualified", 68, "$310K"],
  ["Proposal", 46, "$228K"],
  ["Negotiation", 28, "$142K"],
  ["Closed won", 18, "$96K"],
];

export const featureAdoption: [string, number][] = [
  ["AI agents", 82],
  ["Dashboards", 74],
  ["Alerts", 61],
  ["Data sources", 48],
  ["Governance", 35],
];

export const weeklyActive = [40, 52, 48, 61, 58, 70, 66, 79, 84, 81, 92, 101, 98, 112, 120];

export const goals: [string, number, string, "good" | "warn" | "bad"][] = [
  ["Reach $1M quarterly revenue", 84, "On track", "good"],
  ["Roll out agents to 5 teams", 60, "On track", "good"],
  ["Cut support response to 2h", 38, "At risk", "warn"],
  ["Close SOC 2 audit", 22, "Behind", "bad"],
];

export const deploys: [string, string, string, boolean][] = [
  ["api-gateway v2.14", "12m ago", "Live", true],
  ["billing-agent v0.9", "1h ago", "Live", true],
  ["web-app v5.3.1", "3h ago", "Rolled back", false],
  ["data-sync v1.8", "5h ago", "Live", true],
  ["alerts-svc v3.2", "1d ago", "Live", true],
  ["auth v4.0.2", "1d ago", "Live", true],
];

export const howSteps = [
  { id: "step-1", tab: "Data & integrations" },
  { id: "step-2", tab: "Apps" },
  { id: "step-3", tab: "Agents" },
  { id: "step-4", tab: "Governance" },
  { id: "step-5", tab: "Analytics" },
] as const;

// PLACEHOLDER pricing
export const plans = [
  {
    name: "Starter",
    tagline: "Best for trying Tessera on one workflow",
    monthly: "$0",
    yearly: "$0",
    unit: "/forever",
    inherits: null,
    features: ["3 apps", "1 agent", "2 data sources", "Community support"],
    cta: "Get started",
    primary: false,
  },
  {
    name: "Team",
    tagline: "Best for teams building their first systems",
    monthly: "$24",
    yearly: "$19",
    unit: "/user/month",
    inherits: "Everything in Starter",
    features: ["Unlimited apps", "10 agents", "Unlimited data sources", "Roles and approvals"],
    cta: "Start free trial",
    primary: true,
  },
  {
    name: "Business",
    tagline: "Best for companies running AI at scale",
    monthly: "$64",
    yearly: "$51",
    unit: "/user/month",
    inherits: "Everything in Team",
    features: ["Unlimited agents", "SSO and audit logs", "Dedicated onboarding"],
    cta: "Talk to sales",
    primary: true,
  },
] as const;

// PLACEHOLDER testimonials and stats
export const testimonials = [
  {
    company: "Northwind Labs",
    quote:
      "“We replaced six disconnected tools with one Tessera workspace. Our ops team finally spends its week on decisions, not on copying numbers between spreadsheets.”",
    name: "Rahman",
    role: "VP Operations, Northwind Labs",
    avatar: "teal",
  },
  {
    company: "Brightline Health",
    quote:
      "“Our finance team built three dashboards in a week, and the agents now catch billing issues before a single customer notices.”",
    name: "Daniel",
    role: "Head of Finance, Brightline Health",
    avatar: "peach",
  },
  {
    company: "Atlas Freight",
    quote:
      "“Every shipment, every approval, one place. Sign-offs that used to take days now take minutes, and nothing slips through.”",
    name: "Omar",
    role: "COO, Atlas Freight",
    avatar: "mint",
  },
] as const;

export const impactStats = [
  { value: 1900, suffix: "+", label: "Hours saved every quarter by agents" },
  { value: 82, suffix: "%", label: "Of teams using a Tessera app within 60 days" },
  { value: 4, suffix: "x", label: "Faster monthly reporting across finance and ops" },
];

export const footerColumns = [
  { title: "Product", links: ["Platform", "Apps", "Agents", "Pricing", "Sign in"] },
  { title: "Resources", links: ["Why Tessera", "Getting started", "Blog", "Changelog", "Trust"] },
  { title: "Support", links: ["Talk to our team", "Help center", "System status"] },
  { title: "Contact", links: ["Email", "X (Twitter)", "LinkedIn"] },
];

export const legalLinks = ["Privacy policy", "Terms of service", "Cookie policy", "Security"];
