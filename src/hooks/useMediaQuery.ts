
'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initial check
    const media = window.matchMedia(query);
    setMatches(media.matches);

    // Add listener for changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Modern browsers
    media.addEventListener('change', listener);
    
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  // Return false during SSR to prevent hydration mismatch
  return mounted ? matches : false;
}
