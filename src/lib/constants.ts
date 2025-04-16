
export const APP_NAME = "LazyDev AI";
export const APP_DESCRIPTION = "Your AI assistant for dev workflows";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  MARKETPLACE: "/marketplace",
  COLLABORATIONS: "/collaborations",
  PROJECT: "/project",
  AUTH: "/auth",
  SIGN_IN: "/auth/signin",
  SIGN_UP: "/auth/signup",
  CALLBACK: "/auth/callback",
};

export const COLORS = {
  PRIMARY: "#9b87f5",
  SECONDARY: "#7E69AB",
  TERTIARY: "#6E59A5",
  DARK_PURPLE: "#1A1F2C",
  LIGHT_PURPLE: "#D6BCFA",
  NEON_GREEN: "#39FF14",
};

export const PROJECT_TYPES = [
  "Web Application",
  "Mobile App",
  "Smart Contract",
  "API",
  "UI Component",
  "Data Visualization",
  "Bot",
  "Other",
];

export const TECH_TAGS = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Solidity",
  "Rust",
  "Python",
  "AI/ML",
  "Supabase",
];

export const PRICING_PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    features: [
      "5 projects",
      "Basic AI assistance",
      "Community templates",
    ],
  },
  PRO: {
    name: "Pro",
    price: 19,
    features: [
      "Unlimited projects",
      "Advanced AI features",
      "Custom templates",
      "Team collaboration",
      "Priority support",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Everything in Pro",
      "Custom AI training",
      "Dedicated support",
      "Custom integrations",
      "SLA",
    ],
  },
};
