
import { ProjectCard } from "@/components/ProjectCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useState, useEffect } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProjects, setPaginatedProjects] = useState<typeof projects>([]);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  useEffect(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    setPaginatedProjects(projects.slice(startIndex, endIndex));
  }, [currentPage, projects]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the list when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProjects.map((project) => (
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
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                  className="cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
