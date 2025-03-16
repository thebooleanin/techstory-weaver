
import { useEffect, createContext, useContext, useState } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
}

interface ThemeConfig {
  colors: ThemeColors;
  darkMode: {
    enabled: boolean;
    default: boolean;
    auto: boolean;
  };
  name?: string;
}

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '265 84% 63%',      // Vivid purple
    secondary: '320 91% 61%',    // Magenta pink
    accent: '24 100% 50%',       // Bright orange
    background: '0 0% 100%',     // White
    foreground: '240 10% 3.9%',  // Near black
  },
  darkMode: {
    enabled: true,
    default: false,
    auto: true
  }
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  toggleDarkMode: () => {},
  isDarkMode: false
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // State to track if dark mode is active
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Get theme from localStorage or use default
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    const savedTheme = localStorage.getItem('themeConfig');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch (e) {
        console.error('Error parsing saved theme:', e);
      }
    }
    return defaultTheme;
  });

  // Function to set theme and update localStorage
  const setTheme = (newTheme: ThemeConfig) => {
    setThemeState(newTheme);
    localStorage.setItem('themeConfig', JSON.stringify(newTheme));
    applyTheme(newTheme);
  };

  // Function to toggle between dark and light mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Update HTML class for dark mode
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save user preference if auto mode is not enabled
    if (!theme.darkMode.auto) {
      const updatedTheme = {
        ...theme,
        darkMode: {
          ...theme.darkMode,
          default: newDarkMode
        }
      };
      setThemeState(updatedTheme);
      localStorage.setItem('themeConfig', JSON.stringify(updatedTheme));
    }
  };

  // Apply the theme to the document
  const applyTheme = (themeConfig: ThemeConfig) => {
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Handle dark mode
    if (themeConfig.darkMode.default) {
      root.classList.add('dark');
      setIsDarkMode(true);
    } else if (!themeConfig.darkMode.auto) {
      root.classList.remove('dark');
      setIsDarkMode(false);
    }
  };

  // Apply theme on initial load and when theme changes
  useEffect(() => {
    applyTheme(theme);
    
    // Handle auto dark mode based on system preference
    if (theme.darkMode.enabled && theme.darkMode.auto) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        const newDarkMode = e.matches;
        setIsDarkMode(newDarkMode);
        
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
