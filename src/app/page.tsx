// app/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import HomePage from "@/app/auth/homepage";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  // Optional: Auto-redirect logged-in users to dashboard or marketplace
  useEffect(() => {
    if (user) {
      router.push("/marketplace");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to LazyDevAI</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Please log in or sign up to get started with your developer journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="w-full sm:w-auto neon-button group">
            <Link href="/auth/login">Log In</Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>

        <HomePage />
      </div>
    </div>
  );
}
