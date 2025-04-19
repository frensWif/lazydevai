// app/marketplace/page.tsx
'use client';

import { useEffect, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceSearch } from "@/components/marketplace/MarketplaceSearch";
import { ProjectsList } from "@/components/marketplace/ProjectsList";
import { mockProjects } from "@/data/mockProjects/mockProjects";
import type { Project } from "@/types/project";

export default function MarketplacePage() {
  const [projects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [sortOrder, setSortOrder] = useState<"popular" | "recent">("popular");
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
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
      filtered = filtered.sort((a, b) => b.stars - a.stars);
    } else {
      filtered = filtered.sort((a, b) => {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      });
    }

    setFilteredProjects(filtered);
  }, [searchQuery, category, sortOrder, projects]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-8 px-4">
        <div className="container">
          <MarketplaceHeader />

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
