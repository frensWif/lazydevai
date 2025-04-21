'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

// 🔁 Reusable CTA Button Component
const CTAButton = ({
  href,
  label,
  outline = false,
}: {
  href: string;
  label: string;
  outline?: boolean;
}) => {
  return (
    <Button
      asChild
      size="lg"
      variant={outline ? "outline" : "default"}
      className={`w-full ${!outline ? "neon-button group" : ""}`}
    >
      <Link href={href}>
        {label}
        {!outline && (
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </Link>
    </Button>
  );
};

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  // 🚀 Auto-redirect signed-in users
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  // ❌ Hide homepage content if user is already logged in
  if (user) return null;

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
              <CTAButton
                href="/auth/signin"
                label="Get Started"
              />
              <CTAButton
                href="/marketplace"
                label="Explore Projects"
                outline
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Modern Development
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, collaborate, and deploy your projects, all in one platform.
            </p>
            {/* You can drop in feature cards here later */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-5xl">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12 text-center neon-card-hover">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to supercharge your development?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Join thousands of developers already using LazyDevAI to build faster and more efficiently.
            </p>
            <CTAButton
              href="/auth/signup/signup"
              label="Sign Up for Free"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
