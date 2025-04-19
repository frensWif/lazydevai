export interface Project {
  id: string;
  title: string;
  description: string;
  languages: string[];
  stars: number;
  forks: number;
  branches: number;
  lastUpdated: string; // ISO format preferred
}
