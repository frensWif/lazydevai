
"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function DashboardWelcome() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="mb-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-neon-green/5 p-6 shadow-sm">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Welcome back{user.user_metadata?.name ? `, ${user.user_metadata.name}` : ''}</h1>
          <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
        </div>
        
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/marketplace">
              Explore Marketplace
            </Link>
          </Button>
          <Button asChild>
            <Link href="https://docs.lovable.dev" target="_blank" rel="noopener noreferrer">
              Documentation <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
