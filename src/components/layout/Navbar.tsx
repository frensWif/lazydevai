'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const { user, signOut, isLoading } = useAuth();
  const pathname = usePathname();

  const isActive = (href: string) =>
    cn(
      'text-muted-foreground hover:text-foreground transition-colors',
      pathname === href && 'text-foreground font-semibold'
    );

  return (
    <header className="w-full border-b">
      <div className="container max-w-7xl mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          LazyDevAI
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6">
          <Link href="/marketplace" className={isActive('/marketplace')}>
            Marketplace
          </Link>

          {!isLoading && user ? (
            <>
              <Link href="/dashboard" className={isActive('/dashboard')}>
                Dashboard
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className={isActive('/auth/signin')}>
                Sign In
              </Link>
              <Button
                asChild
                size="sm"
                className="neon-button"
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
