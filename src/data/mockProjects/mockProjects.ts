// app/data/mockproject/mockproject.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  languages: string[];
  stars: number;
  forks: number;
  branches: number;
  lastUpdated: string;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "React Design System",
    description: "A comprehensive React component library built with TypeScript and Tailwind CSS.",
    languages: ["TypeScript", "React", "Tailwind CSS"],
    stars: 452,
    forks: 87,
    branches: 5,
    lastUpdated: "Updated 3 days ago",
  },
  {
    id: "2",
    title: "Next.js E-commerce Template",
    description: "A production-ready e-commerce template built with Next.js and Stripe integration.",
    languages: ["TypeScript", "Next.js", "Stripe"],
    stars: 328,
    forks: 64,
    branches: 3,
    lastUpdated: "Updated 1 week ago",
  },
  {
    id: "3",
    title: "AI Image Generator",
    description: "An AI-powered image generation tool using stable diffusion models.",
    languages: ["Python", "PyTorch", "React"],
    stars: 721,
    forks: 142,
    branches: 8,
    lastUpdated: "Updated 2 days ago",
  },
  {
    id: "4",
    title: "Personal Finance Dashboard",
    description: "A dashboard for tracking personal finances with charts and budget planning.",
    languages: ["JavaScript", "Chart.js", "Express"],
    stars: 196,
    forks: 43,
    branches: 2,
    lastUpdated: "Updated 2 weeks ago",
  },
  {
    id: "5",
    title: "Flutter Social Media App",
    description: "A cross-platform social media application built with Flutter and Firebase.",
    languages: ["Dart", "Flutter", "Firebase"],
    stars: 387,
    forks: 79,
    branches: 4,
    lastUpdated: "Updated 5 days ago",
  },
  {
    id: "6",
    title: "Vue.js Dashboard Template",
    description: "A responsive admin dashboard template built with Vue.js and Tailwind CSS.",
    languages: ["Vue.js", "Tailwind CSS", "Vite"],
    stars: 254,
    forks: 52,
    branches: 3,
    lastUpdated: "Updated 1 month ago",
  },
];
