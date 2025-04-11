
import { useState, useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Search, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for marketplace projects
const mockProjects = [
  {
    id: "1",
    title: "React Design System",
    description: "A comprehensive React component library built with TypeScript and Tailwind CSS.",
    languages: ["TypeScript", "React", "Tailwind CSS"],
    stars: 452,
    forks: 87,
    branches: 5,
    lastUpdated: "Updated 3 days ago"
  },
  {
    id: "2",
    title: "Next.js E-commerce Template",
    description: "A production-ready e-commerce template built with Next.js and Stripe integration.",
    languages: ["TypeScript", "Next.js", "Stripe"],
    stars: 328,
    forks: 64,
    branches: 3,
    lastUpdated: "Updated 1 week ago"
  },
  {
    id: "3",
    title: "AI Image Generator",
    description: "An AI-powered image generation tool using stable diffusion models.",
    languages: ["Python", "PyTorch", "React"],
    stars: 721,
    forks: 142,
    branches: 8,
    lastUpdated: "Updated 2 days ago"
  },
  {
    id: "4",
    title: "Personal Finance Dashboard",
    description: "A dashboard for tracking personal finances with charts and budget planning.",
    languages: ["JavaScript", "Chart.js", "Express"],
    stars: 196,
    forks: 43,
    branches: 2,
    lastUpdated: "Updated 2 weeks ago"
  },
  {
    id: "5",
    title: "Flutter Social Media App",
    description: "A cross-platform social media application built with Flutter and Firebase.",
    languages: ["Dart", "Flutter", "Firebase"],
    stars: 387,
    forks: 79,
    branches: 4,
    lastUpdated: "Updated 5 days ago"
  },
  {
    id: "6",
    title: "Vue.js Dashboard Template",
    description: "A responsive admin dashboard template built with Vue.js and Tailwind CSS.",
    languages: ["Vue.js", "Tailwind CSS", "Vite"],
    stars: 254,
    forks: 52,
    branches: 3,
    lastUpdated: "Updated 1 month ago"
  }
];

export default function Marketplace() {
  const [projects, setProjects] = useState(mockProjects);
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
          
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-9 focus-visible:ring-neon-green/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="min-w-[160px] focus:ring-neon-green/50">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="vue.js">Vue.js</SelectItem>
                    <SelectItem value="flutter">Flutter</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "popular" | "recent")}>
                  <SelectTrigger className="min-w-[120px] focus:ring-neon-green/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="recent">Recent</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="hover:bg-neon-green/10 hover:border-neon-green">
                  <Sliders className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg border p-6 h-[220px] animate-pulse bg-muted/50" />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
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
          ) : (
            <div className="text-center py-12 max-w-md mx-auto">
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try changing your search query or category filter to find more projects.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
