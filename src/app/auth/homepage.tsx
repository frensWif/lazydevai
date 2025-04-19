'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="container max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              The <span className="text-primary">Lazy</span> Developer Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Lazydevai is the all-in-one platform for developers to build, collaborate,
              and ship code faster with intelligent development engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button asChild size="lg" className="w-full neon-button group">
                <Link href={user ? "/dashboard" : "/auth/login"}>
                  {user ? "Go to Dashboard" : "Get Started"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link href="/marketplace">Explore Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Modern Development</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, collaborate, and deploy your projects, all in one platform.
            </p>
          </div>
          {/* Add your feature cards here */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-5xl">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12 text-center neon-card-hover">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to supercharge your development?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Join thousands of developers already using LazyDevAI to build faster and more efficiently.
            </p>
            <Button asChild size="lg" className="neon-button group">
              <Link href={user ? "/dashboard" : "/auth/login"}>
                {user ? "Go to Dashboard" : "Sign Up for Free"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
