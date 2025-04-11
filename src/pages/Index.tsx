
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Code, Cpu, GitBranch, Github, Users } from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Removed duplicate Navbar since it's already in App.tsx */}
      <section className="py-20 md:py-28 px-4">
        <div className="container max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Code className="h-10 w-10" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              The <span className="text-primary">Lazy</span> Developer Platform
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl">
              Lazydevai is the all-in-one platform for developers to build, collaborate, 
              and ship code faster with intelligent development engine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button asChild size="lg" className="w-full neon-button">
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/marketplace">Explore Projects</Link>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-6 rounded-lg border neon-card-hover">
              <div className="p-2 rounded-full bg-primary/10 text-primary w-fit mb-4">
                <Github className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">familiar Interface</h3>
              <p className="text-muted-foreground">
                Familiar version control features with repositories, branches, and commits.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border neon-card-hover">
              <div className="p-2 rounded-full bg-primary/10 text-primary w-fit mb-4">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Assistance</h3>
              <p className="text-muted-foreground">
                Smart code completions and suggestions powered by advanced AI models.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border neon-card-hover">
              <div className="p-2 rounded-full bg-primary/10 text-primary w-fit mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
              <p className="text-muted-foreground">
                Work together with your team in real-time, just like Google Docs for code.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border neon-card-hover">
              <div className="p-2 rounded-full bg-primary/10 text-primary w-fit mb-4">
                <GitBranch className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Versioning</h3>
              <p className="text-muted-foreground">
                Track changes and maintain different versions of your projects with ease.
              </p>
            </div>
          </div>
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
            <Button asChild size="lg" className="neon-button">
              <Link to="/auth">Sign Up for Free</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
