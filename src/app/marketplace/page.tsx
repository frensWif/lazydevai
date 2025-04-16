
import { Metadata } from "next";
import MarketplaceGrid from "@/components/marketplace/MarketplaceGrid";

export const metadata: Metadata = {
  title: "Marketplace - LazyDev AI",
  description: "Discover and share AI-powered development templates and projects",
};

export default function MarketplacePage() {
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground">
          Discover and share AI-powered development templates and projects
        </p>
      </div>

      <MarketplaceGrid />
    </div>
  );
}
