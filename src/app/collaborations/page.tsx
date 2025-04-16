
import { Metadata } from "next";
import CollaborationsList from "@/components/collaborations/CollaborationsList";

export const metadata: Metadata = {
  title: "Collaborations - LazyDev AI",
  description: "Your collaborative projects in LazyDev AI",
};

export default function CollaborationsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Collaborations</h1>
        <p className="text-muted-foreground">
          Work together on projects with your team
        </p>
      </div>

      <CollaborationsList />
    </div>
  );
}
