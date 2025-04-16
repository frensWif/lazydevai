import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                <span className="bg-gradient-to-r from-purple-500 to-neon-green bg-clip-text text-transparent">
                  LazyDev AI
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Your intelligent co-pilot for development. Build web applications, smart contracts, and more with AI assistance.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/marketplace">
                  Explore Templates
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Features
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Everything you need to build great applications faster.
              </p>
            </div>
            
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm neon-card-hover">
                <div className="rounded-full border border-neon-green/50 p-2">
                  <Code className="h-6 w-6 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold">AI Code Assistance</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get instant help with coding problems and suggestions for improvements.
                </p>
              </div>
              
              {/* More feature cards would go here */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
