import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/storytelling/AudioPlayer';
import { fetchStoryById } from '@/services/api';
import { Story } from '@/types/story';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Share2, Play, Calendar, User, Bookmark, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [siteConfig, setSiteConfig] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load site config from localStorage
    const config = localStorage.getItem('siteConfig');
    if (config) {
      setSiteConfig(JSON.parse(config));
    }
  }, []);

  // Get API URL from config or use default
  const apiUrl = siteConfig?.apiEndpoints?.stories || `${import.meta.env.VITE_API_BASE_URL}/api`;

  const { data: story, isLoading, error } = useQuery({
    queryKey: ['story', id],
    queryFn: () => fetchStoryById(id as string, apiUrl),
    enabled: !!id && !!apiUrl,
  });

  // Modern color scheme
  const primaryColor = siteConfig?.colors?.primary || '#8B5CF6'; // Vivid Purple
  const secondaryColor = siteConfig?.colors?.secondary || '#D946EF'; // Magenta Pink

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-48 mb-8"></div>
              <div className="aspect-video rounded-xl bg-gray-200 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
            <p className="text-muted-foreground mb-8">The story you're looking for could not be found.</p>
            <Button asChild>
              <Link to="/storytelling">Back to Stories</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{story.title} | TheBoolean</title>
        <meta name="description" content={story.description || `Listen to ${story.title} by ${story.author}`} />
        <meta property="og:title" content={`${story.title} | TheBoolean`} />
        <meta property="og:description" content={story.description || `Listen to ${story.title} by ${story.author}`} />
        <meta property="og:image" content={story.imageUrl || story.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${story.title} | TheBoolean`} />
        <meta name="twitter:description" content={story.description || `Listen to ${story.title} by ${story.author}`} />
        <meta name="twitter:image" content={story.imageUrl || story.image} />
      </Helmet>

      <Navbar />

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/storytelling" 
            className="inline-flex items-center text-sm font-medium mb-8 hover:underline"
            style={{ color: primaryColor }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all stories
          </Link>

          <div className="relative rounded-xl overflow-hidden mb-8 aspect-video">
            <img 
              src={story.imageUrl || story.image} 
              alt={story.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center space-x-2 mb-4">
                <span 
                  className="px-3 py-1 text-xs font-medium rounded-full text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {story.category}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">
                  {story.duration}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{story.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6 space-x-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  <span>{story.author}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{story.date}</span>
                </div>
                {story.views && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>{story.views} listens</span>
                  </div>
                )}
              </div>

              <div className="prose max-w-none mb-8">
                <p className="text-lg leading-relaxed">
                  {story.description || "Discover this captivating story that takes you through an inspiring journey in India's tech landscape."}
                </p>
              </div>

              {story.audioUrl && (
                <div className="bg-muted/30 p-6 rounded-xl mb-8">
                  <h3 className="text-lg font-semibold mb-4">Listen to the story</h3>
                  <AudioPlayer 
                    audioSrc={story.audioUrl || story.audioSrc || ''} 
                    title={story.title} 
                    author={story.author}
                    imageUrl={story.imageUrl || story.image}
                  />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Share this story</h3>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">More from this category</h3>
                <div className="space-y-4">
                  <Link 
                    to="/storytelling" 
                    className="block group"
                  >
                    <div className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                      The Future of AI in Indian Startups
                    </div>
                    <div className="text-xs text-muted-foreground">10:25 min</div>
                  </Link>
                  <Link 
                    to="/storytelling" 
                    className="block group"
                  >
                    <div className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                      Building Tech Communities in Rural India
                    </div>
                    <div className="text-xs text-muted-foreground">12:40 min</div>
                  </Link>
                  <Link 
                    to="/storytelling" 
                    className="block group"
                  >
                    <div className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                      Women in Tech: Breaking Barriers
                    </div>
                    <div className="text-xs text-muted-foreground">8:15 min</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoryDetail;
