
import { ProjectCard } from "@/components/ProjectCard";

interface ProjectsListProps {
  projects: {
    id: string;
    title: string;
    description: string;
    languages: string[];
    stars: number;
    forks: number;
    branches: number;
    lastUpdated: string;
  }[];
  isLoading: boolean;
}

export function ProjectsList({ projects, isLoading }: ProjectsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border p-6 h-[220px] animate-pulse bg-muted/50" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <h3 className="text-lg font-medium mb-2">No projects found</h3>
        <p className="text-muted-foreground">
          Try changing your search query or category filter to find more projects.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          languages={project.languages}
          stars={project.stars}
          forks={project.forks}
          branches={project.branches}
          lastUpdated={project.lastUpdated}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
}
