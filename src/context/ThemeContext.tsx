
'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'lazydevai-theme',
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isMounted, setIsMounted] = useState(false);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  // Initialize theme from localStorage or default to system
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      setThemeState(defaultTheme);
    }
    setIsMounted(true);
  }, [defaultTheme, storageKey]);

  // Apply theme to document
  useEffect(() => {
    if (!isMounted) return;
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const appliedTheme =
      theme === 'system'
        ? prefersDark
          ? 'dark'
          : 'light'
        : theme;

    root.classList.add(appliedTheme);
  }, [theme, isMounted, prefersDark]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
