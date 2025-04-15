'use client';

import Link from "next/link";
import { Code, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8 bg-background">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          <span className="font-bold">LazyDevAI</span>
          <span className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()}</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
