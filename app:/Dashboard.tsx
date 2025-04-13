
import { useState, useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with product listings, cart, and checkout functionality.",
    languages: ["TypeScript", "React", "Node.js"],
    stars: 12,
    forks: 5,
    branches: 3,
    lastUpdated: "Updated 2 days ago"
  },
  {
    id: "2",
    title: "AI Chat Assistant",
    description: "An AI-powered chat assistant for customer support with natural language understanding.",
    languages: ["Python", "TensorFlow", "Flask"],
    stars: 28,
    forks: 7,
    branches: 2,
    lastUpdated: "Updated 1 week ago"
  },
  {
    id: "3",
    title: "Personal Portfolio",
    description: "A responsive personal portfolio website showcasing projects and skills.",
    languages: ["React", "Tailwind CSS"],
    stars: 5,
    forks: 2,
    branches: 1,
    lastUpdated: "Updated 3 weeks ago"
  }
];

export default function Dashboard() {
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);
  
  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, projects]);
  
  const handleCreateProject = () => {
    toast.success("Project creation coming soon!");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-8 px-4">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Projects</h1>
              <p className="text-muted-foreground">Manage and organize your development projects</p>
            </div>
            
            <Button onClick={handleCreateProject} className="hover:bg-neon-green/90">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center gap-2 max-w-md">
              <Search className="h-4 w-4 absolute ml-3 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                className="pl-9 focus-visible:ring-neon-green/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all" className="data-[state=active]:bg-neon-green/10 data-[state=active]:text-foreground">All Projects</TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-neon-green/10 data-[state=active]:text-foreground">Recent</TabsTrigger>
              <TabsTrigger value="starred" className="data-[state=active]:bg-neon-green/10 data-[state=active]:text-foreground">Starred</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="py-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
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
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-6">Try changing your search query or create a new project.</p>
                  <Button onClick={handleCreateProject} className="hover:bg-neon-green/90">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent" className="py-6">
              {isLoading ? (
                <div className="rounded-lg border p-6 h-[220px] animate-pulse bg-muted/50" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.slice(0, 2).map((project) => (
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
              )}
            </TabsContent>
            
            <TabsContent value="starred" className="py-6">
              {isLoading ? (
                <div className="rounded-lg border p-6 h-[220px] animate-pulse bg-muted/50" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ProjectCard
                    title="AI Chat Assistant"
                    description="An AI-powered chat assistant for customer support with natural language understanding."
                    languages={["Python", "TensorFlow", "Flask"]}
                    stars={28}
                    forks={7}
                    branches={2}
                    lastUpdated="Updated 1 week ago"
                    className="cursor-pointer"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
