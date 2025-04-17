'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  ShoppingBag,
  LayoutDashboard,
  Settings,
  Code,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function LeftSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } flex flex-col border-r bg-muted transition-all duration-200`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-4">
          <Code className="h-6 w-6 text-neon-green" />
          {!collapsed && <span className="font-bold text-lg">LazyDevAI</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors ${
                  isActive ? 'bg-accent text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="flex items-center justify-between px-2 py-3">
          {!collapsed && <ThemeToggle />}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((prev) => !prev)}
            className="h-8 w-8 rounded-full"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
            <span className="sr-only">
              {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </span>
          </Button>
        </div>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
