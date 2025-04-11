
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Star, GitFork } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  languages?: string[];
  stars?: number;
  forks?: number;
  branches?: number;
  lastUpdated?: string;
  className?: string;
}

export function ProjectCard({ 
  title, 
  description, 
  languages = [], 
  stars = 0, 
  forks = 0, 
  branches = 1,
  lastUpdated = "Updated recently",
  className 
}: ProjectCardProps) {
  return (
    <Card className={cn("transition-all duration-300 hover:shadow-md", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
        <CardDescription className="line-clamp-2 h-10">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <Badge key={lang} variant="secondary" className="px-2 py-0.5 text-xs">
              {lang}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t text-xs text-muted-foreground">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <GitBranch className="w-3.5 h-3.5" /> {branches}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" /> {stars}
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" /> {forks}
            </div>
          </div>
          <div>{lastUpdated}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
