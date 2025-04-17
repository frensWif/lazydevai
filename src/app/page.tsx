import { Link } from "react-router-dom";
import { Code, Cpu, GitBranch, Github, Users, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const HeroCTA = (
    <Button asChild size="lg" className="w-full neon-button group">
      <Link to={isAuthenticated ? "/dashboard" : "/auth"}>
        {isAuthenticated ? "Go to Dashboard" : "Get Started"}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </Button>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="container max-w-5xl text-center space-y-8 flex flex-col items-center">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Code className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            The <span className="text-primary">Lazy</span> Developer Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Lazydevai is the all-in-one platform for developers to build, collaborate,
            and ship code faster with an intelligent development engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            {HeroCTA}
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link to="/marketplace">Explore Projects</Link>
            </Button>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-background p-6 rounded-lg border neon-card-hover">
                <div className="p-2 rounded-full bg-primary/10 text-primary w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-5xl">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12 text-center neon-card-hover">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to supercharge your development?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Join thousands of developers already using LazyDevAI to build faster and more efficiently.
            </p>
            <Button asChild size="lg" className="neon-button group">
              <Link to={isAuthenticated ? "/dashboard" : "/auth"}>
                {isAuthenticated ? "Go to Dashboard" : "Sign Up for Free"}
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

// Feature Cards Data
const features = [
  {
    title: "Familiar Interface",
    description: "Familiar version control features with repositories, branches, and commits.",
    icon: <Github className="h-6 w-6" />,
  },
  {
    title: "AI Assistance",
    description: "Smart code completions and suggestions powered by advanced AI models.",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    title: "Real-time Collaboration",
    description: "Work together with your team in real-time, just like Google Docs for code.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Advanced Versioning",
    description: "Track changes and maintain different versions of your projects with ease.",
    icon: <GitBranch className="h-6 w-6" />,
  },
];
