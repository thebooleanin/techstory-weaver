import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Palette, Image, Globe, Sun, Moon, Upload, Save, RotateCcw, Trophy, Users, Star, Plus, Minus, Brush } from 'lucide-react';
import ThemeManager from './ThemeManager';

// Mock initial site configuration
const initialConfig = {
  siteName: 'TheBoolean',
  siteDescription: 'India\'s Premier Technology and Innovation Agency',
  logoUrl: '/logo.png',
  colorScheme: {
    primary: '#0284c7',
    secondary: '#1e293b',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#0f172a'
  },
  darkMode: {
    enabled: true,
    default: false,
    auto: true
  },
  meta: {
    ogImage: '/og-image.png',
    favicon: '/favicon.ico',
    twitterHandle: '@theboolean'
  },
  navigation: {
    showRegister: true,
    showLogin: true,
    transparentHeader: true
  },
  metrics: {
    articlesCount: 100,
    clientProjects: 50,
    storiesShared: 200,
    monthlyReaders: 10000,
    clientSatisfaction: 99,
    industryAwards: 20,
    happyClients: 500,
    countriesServed: 15
  },
  indianElements: {
    showIndianThemes: true,
    useTraditionalColors: true,
    featuredRegions: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai']
  }
};

const SiteConfigManagement = () => {
  const [config, setConfig] = useState(initialConfig);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [liveReload, setLiveReload] = useState(false);

  // Apply color scheme if live reload is enabled
  useEffect(() => {
    if (liveReload) {
      // This would typically update CSS variables in a real implementation
      document.documentElement.style.setProperty('--primary', config.colorScheme.primary);
      document.documentElement.style.setProperty('--secondary', config.colorScheme.secondary);
      document.documentElement.style.setProperty('--accent', config.colorScheme.accent);
      document.documentElement.style.setProperty('--background', config.colorScheme.background);
      document.documentElement.style.setProperty('--foreground', config.colorScheme.text);
    }
  }, [config.colorScheme, liveReload]);

  const handleColorChange = (colorType: keyof typeof config.colorScheme, value: string) => {
    setConfig(prev => ({
      ...prev,
      colorScheme: {
        ...prev.colorScheme,
        [colorType]: value
      }
    }));
  };

  const handleDarkModeChange = (setting: keyof typeof config.darkMode, value: boolean) => {
    setConfig(prev => ({
      ...prev,
      darkMode: {
        ...prev.darkMode,
        [setting]: value
      }
    }));
  };

  const handleNavigationChange = (setting: keyof typeof config.navigation, value: boolean) => {
    setConfig(prev => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        [setting]: value
      }
    }));
  };

  const handleIndianElementsChange = (setting: keyof typeof config.indianElements, value: boolean) => {
    setConfig(prev => ({
      ...prev,
      indianElements: {
        ...prev.indianElements,
        [setting]: value
      }
    }));
  };

  const handleMetricsChange = (metric: keyof typeof config.metrics, value: number) => {
    setConfig(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metric]: value
      }
    }));
  };

  const handleSaveChanges = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Store in localStorage for demo purposes (would be API in real app)
      localStorage.setItem('siteConfig', JSON.stringify(config));
      
      toast({
        title: "Configuration saved",
        description: "Your site configuration has been updated successfully."
      });
    }, 1500);
  };

  const handleResetChanges = () => {
    setConfig(initialConfig);
    toast({
      title: "Configuration reset",
      description: "All changes have been discarded."
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to a server
      // For this demo, we'll just use a fake URL
      const fakeUrl = `/uploads/${file.name}`;
      setConfig(prev => ({
        ...prev,
        logoUrl: fakeUrl
      }));
      
      toast({
        title: "Logo uploaded",
        description: `File "${file.name}" has been uploaded successfully.`
      });
    }
  };

  const addRegion = () => {
    const newRegion = prompt("Enter new region name:");
    if (newRegion) {
      setConfig(prev => ({
        ...prev,
        indianElements: {
          ...prev.indianElements,
          featuredRegions: [...prev.indianElements.featuredRegions, newRegion]
        }
      }));
    }
  };

  const removeRegion = (index: number) => {
    setConfig(prev => ({
      ...prev,
      indianElements: {
        ...prev.indianElements,
        featuredRegions: prev.indianElements.featuredRegions.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Site Configuration</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleResetChanges}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button 
            onClick={handleSaveChanges} 
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="themes" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="themes" className="flex items-center gap-2">
            <Brush className="h-4 w-4" />
            Themes
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Metrics
          </TabsTrigger>
          <TabsTrigger value="navigation" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Logo & Nav
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="themes" className="py-4">
          <ThemeManager />
        </TabsContent>
        
        <TabsContent value="general" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Basic information about your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input 
                    id="site-name" 
                    value={config.siteName}
                    onChange={(e) => setConfig({...config, siteName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Input 
                    id="site-description" 
                    value={config.siteDescription}
                    onChange={(e) => setConfig({...config, siteDescription: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter-handle">Twitter Handle</Label>
                  <Input 
                    id="twitter-handle" 
                    value={config.meta.twitterHandle}
                    onChange={(e) => setConfig({
                      ...config, 
                      meta: {...config.meta, twitterHandle: e.target.value}
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Indian Cultural Elements</CardTitle>
              <CardDescription>
                Customize regional and cultural aspects of your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="indian-themes">Show Indian Themes</Label>
                  <p className="text-sm text-muted-foreground">
                    Include Indian cultural elements and themes throughout the site
                  </p>
                </div>
                <Switch 
                  id="indian-themes"
                  checked={config.indianElements.showIndianThemes}
                  onCheckedChange={(checked) => handleIndianElementsChange('showIndianThemes', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="traditional-colors">Use Traditional Colors</Label>
                  <p className="text-sm text-muted-foreground">
                    Incorporate traditional Indian color patterns
                  </p>
                </div>
                <Switch 
                  id="traditional-colors"
                  checked={config.indianElements.useTraditionalColors}
                  onCheckedChange={(checked) => handleIndianElementsChange('useTraditionalColors', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Featured Regions</Label>
                <div className="border rounded-md p-4">
                  <div className="space-y-2">
                    {config.indianElements.featuredRegions.map((region, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{region}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeRegion(index)}
                        >
                          <Minus className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full mt-2" 
                      onClick={addRegion}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Region
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>
                Customize the color scheme of your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <Label htmlFor="live-reload">Live Preview</Label>
                  <p className="text-sm text-muted-foreground">
                    See color changes in real-time
                  </p>
                </div>
                <Switch 
                  id="live-reload"
                  checked={liveReload}
                  onCheckedChange={setLiveReload}
                />
              </div>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="primary-color" 
                        value={config.colorScheme.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        type="color"
                        className="w-16 h-10 p-1"
                      />
                      <Input 
                        value={config.colorScheme.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="secondary-color" 
                        value={config.colorScheme.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        type="color"
                        className="w-16 h-10 p-1"
                      />
                      <Input 
                        value={config.colorScheme.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="accent-color" 
                        value={config.colorScheme.accent}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        type="color"
                        className="w-16 h-10 p-1"
                      />
                      <Input 
                        value={config.colorScheme.accent}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="background-color">Background Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="background-color" 
                        value={config.colorScheme.background}
                        onChange={(e) => handleColorChange('background', e.target.value)}
                        type="color"
                        className="w-16 h-10 p-1"
                      />
                      <Input 
                        value={config.colorScheme.background}
                        onChange={(e) => handleColorChange('background', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="text-color" 
                        value={config.colorScheme.text}
                        onChange={(e) => handleColorChange('text', e.target.value)}
                        type="color"
                        className="w-16 h-10 p-1"
                      />
                      <Input 
                        value={config.colorScheme.text}
                        onChange={(e) => handleColorChange('text', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleColorChange('primary', '#E6834D');  // Orange (close to Indian saffron)
                      handleColorChange('secondary', '#046A38'); // Green
                      handleColorChange('accent', '#1111AA');   // Navy blue
                    }}
                    className="mt-2"
                  >
                    <img src="/india-flag.png" alt="Indian Flag Colors" className="w-4 h-4 mr-2" />
                    Use Indian Flag Colors
                  </Button>
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
                    checked={config.darkMode.enabled}
                    onCheckedChange={(checked) => handleDarkModeChange('enabled', checked)}
                  />
                </div>
                
                {config.darkMode.enabled && (
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
                        checked={config.darkMode.default}
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
                        checked={config.darkMode.auto}
                        onCheckedChange={(checked) => handleDarkModeChange('auto', checked)}
                      />
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Color Scheme Preview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg" style={{backgroundColor: config.colorScheme.background}}>
                    <div className="mb-3" style={{color: config.colorScheme.text}}>Light Mode Preview</div>
                    <div className="flex gap-2">
                      <div className="p-2 rounded" style={{backgroundColor: config.colorScheme.primary, color: 'white'}}>
                        Primary
                      </div>
                      <div className="p-2 rounded" style={{backgroundColor: config.colorScheme.secondary, color: 'white'}}>
                        Secondary
                      </div>
                      <div className="p-2 rounded" style={{backgroundColor: config.colorScheme.accent, color: 'white'}}>
                        Accent
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-black">
                    <div className="mb-3 text-white">Dark Mode Preview</div>
                    <div className="flex gap-2">
                      <div className="p-2 rounded" style={{backgroundColor: config.colorScheme.primary, color: 'white'}}>
                        Primary
                      </div>
                      <div className="p-2 rounded" style={{backgroundColor: config.colorScheme.secondary, color: 'white'}}>
                        Secondary
                      </div>
                      <div className="p-2 rounded" style={{backgroundColor: config.colorScheme.accent, color: 'white'}}>
                        Accent
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Metrics</CardTitle>
              <CardDescription>
                Configure the metrics displayed on your homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="articles-count">Articles Count</Label>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('articlesCount', Math.max(0, config.metrics.articlesCount - 10))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        id="articles-count" 
                        type="number"
                        className="mx-2 text-center"
                        value={config.metrics.articlesCount}
                        onChange={(e) => handleMetricsChange('articlesCount', Number(e.target.value))}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('articlesCount', config.metrics.articlesCount + 10)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="client-projects">Client Projects</Label>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('clientProjects', Math.max(0, config.metrics.clientProjects - 5))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        id="client-projects" 
                        type="number"
                        className="mx-2 text-center"
                        value={config.metrics.clientProjects}
                        onChange={(e) => handleMetricsChange('clientProjects', Number(e.target.value))}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('clientProjects', config.metrics.clientProjects + 5)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="stories-shared">Stories Shared</Label>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('storiesShared', Math.max(0, config.metrics.storiesShared - 10))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        id="stories-shared" 
                        type="number"
                        className="mx-2 text-center"
                        value={config.metrics.storiesShared}
                        onChange={(e) => handleMetricsChange('storiesShared', Number(e.target.value))}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('storiesShared', config.metrics.storiesShared + 10)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="monthly-readers">Monthly Readers</Label>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('monthlyReaders', Math.max(0, config.metrics.monthlyReaders - 500))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        id="monthly-readers" 
                        type="number"
                        className="mx-2 text-center"
                        value={config.metrics.monthlyReaders}
                        onChange={(e) => handleMetricsChange('monthlyReaders', Number(e.target.value))}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('monthlyReaders', config.metrics.monthlyReaders + 500)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="client-satisfaction">Client Satisfaction %</Label>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('clientSatisfaction', Math.max(0, config.metrics.clientSatisfaction - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        id="client-satisfaction" 
                        type="number"
                        className="mx-2 text-center"
                        value={config.metrics.clientSatisfaction}
                        onChange={(e) => handleMetricsChange('clientSatisfaction', Number(e.target.value))}
                        max="100"
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('clientSatisfaction', Math.min(100, config.metrics.clientSatisfaction + 1))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="industry-awards">Industry Awards</Label>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('industryAwards', Math.max(0, config.metrics.industryAwards - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        id="industry-awards" 
                        type="number"
                        className="mx-2 text-center"
                        value={config.metrics.industryAwards}
                        onChange={(e) => handleMetricsChange('industryAwards', Number(e.target.value))}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('industryAwards', config.metrics.industryAwards + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="happy-clients">Happy Clients</Label>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('happyClients', Math.max(0, config.metrics.happyClients - 10))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        id="happy-clients" 
                        type="number"
                        className="mx-2 text-center"
                        value={config.metrics.happyClients}
                        onChange={(e) => handleMetricsChange('happyClients', Number(e.target.value))}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('happyClients', config.metrics.happyClients + 10)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="countries-served">Countries Served</Label>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('countriesServed', Math.max(0, config.metrics.countriesServed - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        id="countries-served" 
                        type="number"
                        className="mx-2 text-center"
                        value={config.metrics.countriesServed}
                        onChange={(e) => handleMetricsChange('countriesServed', Number(e.target.value))}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleMetricsChange('countriesServed', config.metrics.countriesServed + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="navigation" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Logo Settings</CardTitle>
              <CardDescription>
                Upload and manage your site logo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div 
                  className="w-32 h-32 rounded border flex items-center justify-center bg-muted"
                >
                  {config.logoUrl ? (
                    <img 
                      src={config.logoUrl} 
                      alt="Site Logo" 
                      className="max-w-full max-h-full object-contain" 
                    />
                  ) : (
                    <Image className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="logo-upload" className="block">Upload New Logo</Label>
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 300x100 pixels. Max file size: 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Navigation Options</CardTitle>
              <CardDescription>
                Configure your site's navigation features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="transparent-header">Transparent Header</Label>
                  <p className="text-sm text-muted-foreground">
                    Header starts transparent and changes on scroll
                  </p>
                </div>
                <Switch 
                  id="transparent-header"
                  checked={config.navigation.transparentHeader}
                  onCheckedChange={(checked) => handleNavigationChange('transparentHeader', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-register">Show Register Button</Label>
                  <p className="text-sm text-muted-foreground">
                    Display the register button in the navigation
                  </p>
                </div>
                <Switch 
                  id="show-register"
                  checked={config.navigation.showRegister}
                  onCheckedChange={(checked) => handleNavigationChange('showRegister', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-login">Show Login Button</Label>
                  <p className="text-sm text-muted-foreground">
                    Display the login button in the navigation
                  </p>
                </div>
                <Switch 
                  id="show-login"
                  checked={config.navigation.showLogin}
                  onCheckedChange={(checked) => handleNavigationChange('showLogin', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteConfigManagement;
