
import { useState, useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { MarketplaceSearch } from "@/components/marketplace/MarketplaceSearch";
import { ProjectsList } from "@/components/marketplace/ProjectsList";
import { mockProjects } from "@/data/mockProjects";

export default function Marketplace() {
  const [projects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [sortOrder, setSortOrder] = useState<"popular" | "recent">("popular");
  const [category, setCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (category !== "all") {
      filtered = filtered.filter((project) =>
        project.languages.some((lang) => lang.toLowerCase() === category.toLowerCase())
      );
    }
    
    if (sortOrder === "popular") {
      filtered = [...filtered].sort((a, b) => b.stars - a.stars);
    } else {
      filtered = [...filtered].sort((a, b) => {
        if (a.lastUpdated < b.lastUpdated) return 1;
        if (a.lastUpdated > b.lastUpdated) return -1;
        return 0;
      });
    }
    
    setFilteredProjects(filtered);
  }, [searchQuery, sortOrder, category, projects]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-8 px-4">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Marketplace</h1>
            <p className="text-lg text-muted-foreground">
              Discover community projects, templates, and tools to accelerate your development
            </p>
          </div>
          
          <MarketplaceSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            category={category}
            onCategoryChange={setCategory}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
          
          <ProjectsList 
            projects={filteredProjects} 
            isLoading={isLoading} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
