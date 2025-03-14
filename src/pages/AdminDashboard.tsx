
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { LogOut, AlertCircle, Home } from 'lucide-react';
import BlogManagement from '@/components/admin/BlogManagement';
import AdManagement from '@/components/admin/AdManagement';
import StorytellingManagement from '@/components/admin/StorytellingManagement';
import FormManagement from '@/components/admin/FormManagement';
import SiteConfigManagement from '@/components/admin/SiteConfigManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [configSaved, setConfigSaved] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (using localStorage in this example)
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      setIsAuthenticated(false);
      // Redirect to login page after a short delay to show the alert
      setTimeout(() => {
        navigate('/admin-login');
      }, 2000);
    }

    // Check for recently saved config
    const lastSaved = localStorage.getItem('configLastSaved');
    if (lastSaved && (Date.now() - parseInt(lastSaved, 10)) < 5000) {
      setConfigSaved(true);
      setTimeout(() => {
        setConfigSaved(false);
      }, 5000);
    }

    // When saving config, store timestamp
    const handleStorageChange = () => {
      if (localStorage.getItem('siteConfig')) {
        localStorage.setItem('configLastSaved', Date.now().toString());
        setConfigSaved(true);
        setTimeout(() => {
          setConfigSaved(false);
        }, 5000);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const handleViewSite = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You are not authenticated. Redirecting to login page...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">TheBoolean Admin Panel</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleViewSite}>
              <Home className="h-4 w-4 mr-2" />
              View Site
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        {configSaved && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-100">
            <AlertDescription>
              Site configuration has been updated successfully! Changes are now visible on the website.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="blog">Blog Management</TabsTrigger>
            <TabsTrigger value="ads">Ad Management</TabsTrigger>
            <TabsTrigger value="storytelling">Storytelling</TabsTrigger>
            <TabsTrigger value="forms">Form Submissions</TabsTrigger>
            <TabsTrigger value="siteconfig">Site Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="blog" className="space-y-4">
            <BlogManagement />
          </TabsContent>
          
          <TabsContent value="ads" className="space-y-4">
            <AdManagement />
          </TabsContent>
          
          <TabsContent value="storytelling" className="space-y-4">
            <StorytellingManagement />
          </TabsContent>
          
          <TabsContent value="forms" className="space-y-4">
            <FormManagement />
          </TabsContent>
          
          <TabsContent value="siteconfig" className="space-y-4">
            <SiteConfigManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
