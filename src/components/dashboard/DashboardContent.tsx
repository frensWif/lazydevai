
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Github } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Project = {
  id: string;
  name: string;
  description: string;
  updated_at: string;
};

export default function DashboardContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch the user's projects from Supabase
    // For now, we'll use mock data
    setTimeout(() => {
      setProjects([
        {
          id: "1",
          name: "E-commerce Site",
          description: "A Next.js e-commerce site with Stripe integration",
          updated_at: "2023-04-16T12:00:00Z",
        },
        {
          id: "2",
          name: "Blog Platform",
          description: "A blog platform with Markdown support",
          updated_at: "2023-04-15T10:30:00Z",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const createNewProject = () => {
    router.push("/project/new");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Projects</h2>
        <Button onClick={createNewProject}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter className="flex justify-between p-6">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden neon-card-hover">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>
                  Last updated: {new Date(project.updated_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push(`/project/${project.id}`)}
                >
                  Open
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">No projects yet</h3>
          <p className="text-sm text-muted-foreground">
            Create your first project to get started.
          </p>
          <Button onClick={createNewProject}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      )}
    </div>
  );
}
