'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

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
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const appliedTheme =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;

    root.classList.add(appliedTheme);
  }, [theme]);

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
