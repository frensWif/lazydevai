// app/data/mockproject/layout.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Make sure you have a utility like `clsx` or `cn`
import { Separator } from "@/components/ui/separator";

export default function MockProjectLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-muted/30 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary">Mock Projects Marketplace</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Browse example templates, clones, and full-stack starter kits built by LazyDevAI.
          </p>
          <Separator className="mt-4" />
        </header>

        <section className="space-y-8">{children}</section>
      </div>
    </main>
  );
}
