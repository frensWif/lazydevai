"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X, Code, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Left Side */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="p-2 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6 text-neon-green" /> : <Menu className="h-6 w-6 text-neon-green" />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-neon-green" />
            <span className="font-bold text-xl">LazyDevAI</span>
          </Link>
        </div>

        {/* Desktop Left Side */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-neon-green" />
            <span className="font-bold text-xl">LazyDevAI</span>
          </Link>
          <nav className="ml-6 hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-neon-green"
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              className="text-sm font-medium transition-colors hover:text-neon-green"
            >
              Marketplace
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-neon-green"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="flex-1 md:flex-none" />

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-neon-green/30 hover:border-neon-green/60"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="default"
              className="hover:bg-neon-green/90"
            >
              <Link href="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium transition-colors hover:text-neon-green"
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium transition-colors hover:text-neon-green"
            >
              Marketplace
            </Link>
            {user && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium transition-colors hover:text-neon-green"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
