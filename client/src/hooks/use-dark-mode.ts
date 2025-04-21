import { useEffect } from 'react';
import { useTheme } from '@/lib/context';

export function useDarkMode() {
  const { theme, toggleTheme } = useTheme();
  
  // Set up system theme listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      const storedTheme = localStorage.getItem('theme');
      
      // Only automatically change if the user hasn't explicitly set a preference
      if (!storedTheme) {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(systemTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return { isDarkMode: theme === 'dark', toggleDarkMode: toggleTheme };
}
