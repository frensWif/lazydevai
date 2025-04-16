
import { Metadata } from "next";
import ProjectWorkspace from "@/components/project/ProjectWorkspace";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  // In a real app, you'd fetch the project details here
  return {
    title: `Project ${params.id} - LazyDev AI`,
    description: "Your LazyDev AI project workspace",
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <div className="container-fluid p-0">
      <ProjectWorkspace projectId={params.id} />
    </div>
  );
}
