// app/page.tsx (Handles the rendering for the index page)
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HomePage from "@/app/auth/homepage";
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Static or layout content for the home page */}
      <section className="py-20 md:py-28 px-4">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Welcome to LazyDevAI</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please log in or sign up to get started with your developer journey.
            </p>
          </div>

          {/* The auth-specific content goes here */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            {/* Log In Button */}
            <Button asChild size="lg" className="w-full neon-button group">
              <Link href="/auth/login">Log In</Link>
            </Button>

            {/* Sign Up Button */}
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* HomePage content */}
      <HomePage /> {/* The dynamic homepage component */}
    </div>
  );
}
