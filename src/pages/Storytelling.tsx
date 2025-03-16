import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Headphones, FileAudio, Upload, Radio } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/storytelling/AudioPlayer';
import { fetchStories } from '@/services/api';
import { Story } from '@/types/story';
import { useQuery } from '@tanstack/react-query';

// Form schema for the storyteller request
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  storyTitle: z.string().min(5, {
    message: "Story title must be at least 5 characters.",
  }),
  storyOutline: z.string().min(50, {
    message: "Story outline must be at least 50 characters.",
  }),
  // Audio upload is optional
});

// Live broadcast data (mock data, could be replaced with API data later)
const liveBroadcasts = [
  {
    id: 101,
    title: "Tech Innovation Weekly",
    author: "James Wilson",
    isLive: true,
    listeners: 245,
    description: "Weekly discussion of the latest tech innovations and industry trends.",
    audioSrc: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 102,
    title: "Startup Founders Chat",
    author: "Rebecca Johnson & Taylor Smith",
    isLive: true,
    listeners: 187,
    description: "Live interview with successful startup founders sharing their journeys and advice.",
    audioSrc: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
];

// Categories for filtering
const categories = [
  "All", "Technology", "Innovation", "Startups", "AI", "Blockchain", "Fiction", "Cybersecurity", "FinTech"
];

const Storytelling = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedLive, setSelectedLive] = useState<(typeof liveBroadcasts)[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("recorded");
  const [apiUrl, setApiUrl] = useState('http://13.232.139.240:5000/api');

  // Fetch stories from API
  const { data: stories = [], isLoading, error, refetch } = useQuery({
    queryKey: ['public-stories'],
    queryFn: () => fetchStories(1, 20, `${apiUrl}`),
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load site config from localStorage
    const config = localStorage.getItem('siteConfig');
    if (config) {
      try {
        const parsedConfig = JSON.parse(config);
        if (parsedConfig?.apiEndpoints?.stories) {
          // Extract base URL from the stories endpoint
          const storiesUrl = parsedConfig.apiEndpoints.stories;
          const baseUrl = storiesUrl.split('/stories')[0];
          setApiUrl(baseUrl);
        }
      } catch (e) {
        console.error('Error parsing site config:', e);
      }
    }
  }, []);

  // Initialize form for the storyteller request
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      storyTitle: "",
      storyOutline: "",
    },
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Request submitted successfully!", {
        description: "We'll review your story and get back to you soon.",
      });
      form.reset();
    }, 1500);
  };

  // Filter stories based on selected category
  const filteredStories = activeCategory === "All" 
    ? stories 
    : stories.filter(story => story.category === activeCategory);

  // Clear selected story when tab changes
  useEffect(() => {
    setSelectedStory(null);
    setSelectedLive(null);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-10" />
          <img
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
            alt="Person with headphones"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container relative z-10 pt-20">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              5-Minute Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Listen to Inspiring Tech Stories
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover five-minute stories from entrepreneurs, innovators, and creators in the tech world. 
              These bite-sized audio experiences offer valuable insights into the journey of turning ideas into reality.
            </p>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="inline-flex mb-4">
                <TabsTrigger value="recorded" className="flex items-center gap-1.5">
                  <Headphones className="h-4 w-4" />
                  Recorded Stories
                </TabsTrigger>
                <TabsTrigger value="live" className="flex items-center gap-1.5">
                  <Radio className="h-4 w-4" />
                  Live Broadcasts
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {activeTab === "recorded" && (
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      activeCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Audio Player Section (always visible when something is playing) */}
      {(selectedStory || selectedLive) && (
        <div className="sticky top-16 z-30 bg-background shadow-md border-b border-border/10">
          <div className="container py-4">
            <AudioPlayer 
              audioSrc={selectedStory?.audioUrl || selectedStory?.audioSrc || selectedLive?.audioSrc || ''}
              imageUrl={selectedStory?.image || selectedStory?.imageUrl || selectedLive?.image}
              title={selectedStory?.title || selectedLive?.title || ''}
              author={selectedStory?.author || selectedLive?.author || ''}
              isLive={!!selectedLive?.isLive}
              onEnded={() => {
                if (selectedStory) setSelectedStory(null);
                if (selectedLive) setSelectedLive(null);
              }}
            />
          </div>
        </div>
      )}
      
      {/* Stories/Live Broadcasts Section */}
      <section className="py-20">
        <div className="container">
          {activeTab === "live" ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Live Now</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  {liveBroadcasts.length} Live Broadcasts
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveBroadcasts.map((broadcast, index) => (
                  <motion.div
                    key={broadcast.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={broadcast.image} 
                          alt={broadcast.title} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
                              <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                              LIVE
                            </span>
                            <span className="text-xs text-white/90 flex items-center">
                              {broadcast.listeners} listening
                            </span>
                          </div>
                          <h3 className="text-xl text-white font-bold">{broadcast.title}</h3>
                          <p className="text-sm text-white/80">By {broadcast.author}</p>
                        </div>
                      </div>
                      
                      <CardContent className="flex-1 pt-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          {broadcast.description}
                        </p>
                        <Button 
                          variant={selectedLive?.id === broadcast.id ? "secondary" : "default"}
                          className="w-full"
                          onClick={() => setSelectedLive(broadcast)}
                        >
                          {selectedLive?.id === broadcast.id ? "Currently Playing" : "Join Broadcast"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Featured Stories</h2>
                <p className="text-muted-foreground">
                  {isLoading ? 'Loading stories...' : 
                   error ? 'Error loading stories. Please try again.' :
                   `Browse our collection of ${filteredStories.length} inspiring tech stories`}
                </p>
              </div>
              
              {/* Stories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 6 }).map((_, index) => (
                    <Card key={`skeleton-${index}`} className="overflow-hidden h-full flex flex-col animate-pulse">
                      <div className="aspect-[16/9] bg-muted"></div>
                      <CardHeader>
                        <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                      </CardHeader>
                      <CardFooter className="h-4 bg-muted rounded w-1/2"></CardFooter>
                    </Card>
                  ))
                ) : error ? (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-lg text-muted-foreground mb-4">Failed to load stories</p>
                    <Button onClick={() => refetch()}>Try Again</Button>
                  </div>
                ) : filteredStories.length === 0 ? (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-lg text-muted-foreground">No stories found in this category</p>
                  </div>
                ) : (
                  filteredStories.map((story, index) => (
                    <motion.div
                      key={story._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden h-full flex flex-col">
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <img 
                            src={story.image || story.imageUrl} 
                            alt={story.title} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                          <Button 
                            variant="default"
                            size="icon"
                            className="absolute bottom-3 right-3 rounded-full h-10 w-10 shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStory(story);
                            }}
                          >
                            <Play className="h-5 w-5 ml-0.5" />
                          </Button>
                        </div>
                        <CardHeader className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block px-3 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              {story.category}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Headphones size={12} className="mr-1" />
                              {story.duration}
                            </span>
                          </div>
                          <Link to={`/storytelling/${story._id}`}>
                            <CardTitle className="text-lg hover:text-primary transition-colors">
                              {story.title}
                            </CardTitle>
                          </Link>
                          <CardDescription className="line-clamp-2">
                            {story.description || "Listen to this captivating story that takes you through an inspiring tech journey."}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0 pb-4 text-sm text-muted-foreground">
                          By {story.author} • {new Date(story.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Request to Be a Guest Storyteller Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Share Your Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Request to Be a Guest Storyteller
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have a tech journey or innovation story worth sharing? We'd love to feature you in our 5-minute storytelling series.
                Fill out the form below to request to be a guest storyteller.
              </p>
            </div>
            
            <div className="bg-white dark:bg-black/10 rounded-lg shadow-sm p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="storyTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Story Title</FormLabel>
                        <FormControl>
                          <Input placeholder="A catchy title for your 5-minute story" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="storyOutline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Story Outline</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide a brief outline of your story. What key points will you cover? What's the main takeaway for listeners?"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <Label htmlFor="audio-upload" className="block mb-2">Audio Upload (optional)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
                      <FileAudio className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop an audio file or
                      </p>
                      <div className="flex justify-center">
                        <Button type="button" variant="outline" size="sm" className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Browse Files
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        MP3, WAV, or M4A up to 10MB (5 minutes max)
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>Submit Request<ArrowRight size={16} /></>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      All submissions are reviewed by our team. We'll contact you if your story is selected.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Storytelling;
