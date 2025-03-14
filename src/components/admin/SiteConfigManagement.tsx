
import { useState } from 'react';
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
import { Palette, Image, Globe, Sun, Moon, Upload, Save, RotateCcw } from 'lucide-react';

// Mock initial site configuration
const initialConfig = {
  siteName: 'TheBoolean',
  siteDescription: 'Technology and innovation blog',
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
  }
};

const SiteConfigManagement = () => {
  const [config, setConfig] = useState(initialConfig);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleSaveChanges = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
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
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="navigation" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Logo & Navigation
          </TabsTrigger>
        </TabsList>
        
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="primary-color" 
                        value={config.colorScheme.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                      />
                      <div 
                        className="w-10 h-10 rounded border" 
                        style={{backgroundColor: config.colorScheme.primary}}
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
                      />
                      <div 
                        className="w-10 h-10 rounded border" 
                        style={{backgroundColor: config.colorScheme.secondary}}
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
                      />
                      <div 
                        className="w-10 h-10 rounded border" 
                        style={{backgroundColor: config.colorScheme.accent}}
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
                      />
                      <div 
                        className="w-10 h-10 rounded border" 
                        style={{backgroundColor: config.colorScheme.background}}
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
                      />
                      <div 
                        className="w-10 h-10 rounded border" 
                        style={{backgroundColor: config.colorScheme.text}}
                      />
                    </div>
                  </div>
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
