
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Palette, Save, RotateCcw, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Predefined color themes that follow market standards
const predefinedThemes = [
  {
    name: 'Modern Purple',
    colors: {
      primary: '265 84% 63%', // Vivid purple 
      secondary: '320 91% 61%', // Magenta pink
      accent: '24 100% 50%', // Bright orange
      background: '0 0% 100%',
      foreground: '240 10% 3.9%',
    }
  },
  {
    name: 'Tech Blue',
    colors: {
      primary: '221 83% 53%', // Strong blue
      secondary: '199 89% 48%', // Bright cyan
      accent: '174 86% 44%', // Teal
      background: '0 0% 100%',
      foreground: '222 47% 11%',
    }
  },
  {
    name: 'Corporate Green',
    colors: {
      primary: '142 71% 45%', // Emerald green
      secondary: '168 74% 68%', // Aquamarine
      accent: '43 96% 58%', // Gold
      background: '0 0% 100%',
      foreground: '215 28% 17%',
    }
  },
  {
    name: 'Minimal Gray',
    colors: {
      primary: '220 14% 36%', // Slate gray
      secondary: '218 11% 65%', // Light slate
      accent: '43 96% 58%', // Gold
      background: '0 0% 100%',
      foreground: '220 14% 10%',
    }
  },
  {
    name: 'Bold Red',
    colors: {
      primary: '0 91% 42%', // Deep red
      secondary: '344 79% 60%', // Raspberry
      accent: '32 95% 44%', // Amber
      background: '0 0% 100%',
      foreground: '240 10% 3.9%',
    }
  },
  {
    name: 'Dark Mode',
    colors: {
      primary: '262 83% 58%', // Vibrant purple in dark
      secondary: '316 70% 50%', // Bright pink in dark
      accent: '29 100% 50%', // Vivid orange in dark
      background: '240 10% 3.9%', // Very dark gray, almost black
      foreground: '0 0% 98%', // Off-white
    },
    isDark: true
  }
];

// Helper function to convert HSL to hex color (for color picker input)
const hslToHex = (hsl: string): string => {
  try {
    // Parse the HSL value
    const [h, s, l] = hsl.split(' ').map(val => parseFloat(val));
    
    // Handle parsing errors
    if (isNaN(h) || isNaN(s) || isNaN(l)) {
      return '#7c3aed'; // Default purple color if parsing fails
    }
    
    // Convert HSL to RGB
    const hDecimal = h / 360;
    const sDecimal = s / 100;
    const lDecimal = l / 100;
    
    let r, g, b;
    
    if (sDecimal === 0) {
      r = g = b = lDecimal;
    } else {
      const q = lDecimal < 0.5 
        ? lDecimal * (1 + sDecimal) 
        : lDecimal + sDecimal - lDecimal * sDecimal;
      const p = 2 * lDecimal - q;
      
      r = hueToRgb(p, q, hDecimal + 1/3);
      g = hueToRgb(p, q, hDecimal);
      b = hueToRgb(p, q, hDecimal - 1/3);
    }
    
    // Convert RGB to hex
    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch (error) {
    console.error('Error converting HSL to hex:', error);
    return '#7c3aed'; // Default purple color if conversion fails
  }
};

// Helper function for HSL to RGB conversion
const hueToRgb = (p: number, q: number, t: number): number => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
};

// Helper function to convert hex to HSL color (for updating CSS variables)
const hexToHsl = (hex: string): string => {
  try {
    // Parse the hex value
    let r = 0, g = 0, b = 0;
    
    // Remove the # from the beginning
    hex = hex.replace('#', '');
    
    // Parse the hex value depending on length
    if (hex.length === 3) {
      r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
      g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
      b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16) / 255;
      g = parseInt(hex.substring(2, 4), 16) / 255;
      b = parseInt(hex.substring(4, 6), 16) / 255;
    } else {
      throw new Error('Invalid hex color format');
    }
    
    // Find greatest and smallest RGB components
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else if (max === b) {
        h = (r - g) / d + 4;
      }
      
      h = h / 6;
    }
    
    // Convert to HSL format
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `${h} ${s}% ${l}%`;
  } catch (error) {
    console.error('Error converting hex to HSL:', error);
    return '265 84% 63%'; // Default purple HSL if conversion fails
  }
};

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

const ThemeManager = () => {
  // Get current theme from localStorage or use default
  const getInitialTheme = (): ThemeConfig => {
    const savedTheme = localStorage.getItem('themeConfig');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch (e) {
        console.error('Error parsing saved theme:', e);
      }
    }
    
    // Default theme if nothing is saved
    return {
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
  };

  const [theme, setTheme] = useState<ThemeConfig>(getInitialTheme());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [livePreview, setLivePreview] = useState(true);
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("predefined");

  // Apply theme colors when they change and live preview is enabled
  useEffect(() => {
    if (livePreview) {
      applyThemeToDocument(theme);
    }
  }, [theme, livePreview]);

  // Function to apply the theme to the document
  const applyThemeToDocument = (themeConfig: ThemeConfig) => {
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Apply dark mode if needed
    if (themeConfig.darkMode.default) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Handle color change in custom mode
  const handleColorChange = (colorType: keyof ThemeColors, value: string) => {
    // Convert hex input to HSL for CSS variables
    const hslValue = hexToHsl(value);
    
    setTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: hslValue
      }
    }));
  };

  // Handle dark mode settings change
  const handleDarkModeChange = (setting: keyof typeof theme.darkMode, value: boolean) => {
    setTheme(prev => ({
      ...prev,
      darkMode: {
        ...prev.darkMode,
        [setting]: value
      }
    }));
  };

  // Apply a predefined theme
  const applyPredefinedTheme = (index: number) => {
    const selectedTheme = predefinedThemes[index];
    
    setTheme({
      colors: { ...selectedTheme.colors },
      darkMode: {
        ...theme.darkMode,
        default: !!selectedTheme.isDark
      },
      name: selectedTheme.name
    });
    
    toast({
      title: `Theme applied: ${selectedTheme.name}`,
      description: "Changes will be saved when you click Save Changes."
    });
  };

  // Save theme to localStorage
  const saveTheme = () => {
    setIsSubmitting(true);
    
    try {
      // Apply the theme immediately
      applyThemeToDocument(theme);
      
      // Save to localStorage
      localStorage.setItem('themeConfig', JSON.stringify(theme));
      
      toast({
        title: "Theme saved",
        description: "Your theme settings have been applied to the entire website."
      });
    } catch (error) {
      console.error('Error saving theme:', error);
      toast({
        title: "Error saving theme",
        description: "There was an error saving your theme settings.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset to default theme
  const resetTheme = () => {
    // Use the first predefined theme as default
    const defaultTheme = predefinedThemes[0];
    
    setTheme({
      colors: { ...defaultTheme.colors },
      darkMode: {
        enabled: true,
        default: false,
        auto: true
      },
      name: defaultTheme.name
    });
    
    toast({
      title: "Theme reset",
      description: "Theme has been reset to default settings."
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Theme Manager</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={resetTheme}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset to Default
          </Button>
          <Button 
            onClick={saveTheme} 
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-0.5">
          <Label htmlFor="live-preview">Live Preview</Label>
          <p className="text-sm text-muted-foreground">
            See theme changes in real-time
          </p>
        </div>
        <Switch 
          id="live-preview"
          checked={livePreview}
          onCheckedChange={setLivePreview}
        />
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="predefined" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Predefined Themes
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Custom Theme
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="predefined" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Standard Themes</CardTitle>
              <CardDescription>
                Choose from professionally designed themes to instantly update your site's appearance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {predefinedThemes.map((presetTheme, index) => (
                  <div 
                    key={index}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${
                      theme.name === presetTheme.name ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => applyPredefinedTheme(index)}
                  >
                    <div 
                      className={`h-24 relative ${presetTheme.isDark ? 'bg-slate-900' : 'bg-white'}`}
                    >
                      {/* Theme color preview */}
                      <div className="absolute inset-0 flex p-3">
                        <div 
                          className="w-1/3 h-full rounded-l-lg" 
                          style={{ backgroundColor: `hsl(${presetTheme.colors.primary})` }}
                        />
                        <div 
                          className="w-1/3 h-full" 
                          style={{ backgroundColor: `hsl(${presetTheme.colors.secondary})` }}
                        />
                        <div 
                          className="w-1/3 h-full rounded-r-lg" 
                          style={{ backgroundColor: `hsl(${presetTheme.colors.accent})` }}
                        />
                      </div>
                      
                      {/* Selection indicator */}
                      {theme.name === presetTheme.name && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    
                    <div className={`p-3 text-center ${presetTheme.isDark ? 'bg-slate-800 text-white' : 'bg-gray-50'}`}>
                      <h3 className="font-medium">{presetTheme.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
              <CardDescription>
                Fine-tune each color to create your unique theme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="primary-color" 
                      value={hslToHex(theme.colors.primary)}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      type="color"
                      className="w-16 h-10 p-1"
                    />
                    <Input 
                      value={hslToHex(theme.colors.primary)}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Main brand color used for buttons, links, and primary actions
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="secondary-color" 
                      value={hslToHex(theme.colors.secondary)}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      type="color"
                      className="w-16 h-10 p-1"
                    />
                    <Input 
                      value={hslToHex(theme.colors.secondary)}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Used for secondary buttons and accents
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="accent-color" 
                      value={hslToHex(theme.colors.accent)}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      type="color"
                      className="w-16 h-10 p-1"
                    />
                    <Input 
                      value={hslToHex(theme.colors.accent)}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Used for highlighting important elements
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="background-color">Background Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="background-color" 
                      value={hslToHex(theme.colors.background)}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      type="color"
                      className="w-16 h-10 p-1"
                    />
                    <Input 
                      value={hslToHex(theme.colors.background)}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Main background color for the site
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="foreground-color">Text Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="foreground-color" 
                      value={hslToHex(theme.colors.foreground)}
                      onChange={(e) => handleColorChange('foreground', e.target.value)}
                      type="color"
                      className="w-16 h-10 p-1"
                    />
                    <Input 
                      value={hslToHex(theme.colors.foreground)}
                      onChange={(e) => handleColorChange('foreground', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Main text color throughout the site
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dark Mode</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode-enabled">Enable Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to switch between light and dark modes
                    </p>
                  </div>
                  <Switch 
                    id="dark-mode-enabled"
                    checked={theme.darkMode.enabled}
                    onCheckedChange={(checked) => handleDarkModeChange('enabled', checked)}
                  />
                </div>
                
                {theme.darkMode.enabled && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode-default">Dark Mode by Default</Label>
                        <p className="text-sm text-muted-foreground">
                          Set dark mode as the default theme
                        </p>
                      </div>
                      <Switch 
                        id="dark-mode-default"
                        checked={theme.darkMode.default}
                        onCheckedChange={(checked) => handleDarkModeChange('default', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode-auto">Respect System Preference</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically switch based on user's system preference
                        </p>
                      </div>
                      <Switch 
                        id="dark-mode-auto"
                        checked={theme.darkMode.auto}
                        onCheckedChange={(checked) => handleDarkModeChange('auto', checked)}
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Theme Preview</CardTitle>
              <CardDescription>
                See how your custom theme looks in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-lg border" style={{ backgroundColor: `hsl(${theme.colors.background})`, color: `hsl(${theme.colors.foreground})` }}>
                    <h3 className="text-lg font-semibold mb-2">Light Mode</h3>
                    <p className="mb-4">This is how your content will look in light mode.</p>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: `hsl(${theme.colors.primary})` }}>
                        Primary Button
                      </button>
                      <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}>
                        Secondary
                      </button>
                      <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: `hsl(${theme.colors.accent})` }}>
                        Accent
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-lg border bg-gray-900 text-white">
                    <h3 className="text-lg font-semibold mb-2">Dark Mode</h3>
                    <p className="mb-4">This is how your content will look in dark mode.</p>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: `hsl(${theme.colors.primary})` }}>
                        Primary Button
                      </button>
                      <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}>
                        Secondary
                      </button>
                      <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: `hsl(${theme.colors.accent})` }}>
                        Accent
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThemeManager;
