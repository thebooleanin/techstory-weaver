
import { useState, useEffect } from 'react';
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
import { ArrowRight, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Headphones, FileAudio, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

// Mock data for stories
const stories = [
  {
    id: 1,
    title: "Building Resilience: My Journey from Startup Failure to Success",
    author: "Sarah Chen",
    duration: "5:12",
    category: "Entrepreneurship",
    date: "June 15, 2023",
    description: "Sarah shares her story of perseverance through the challenges of her first failed startup and how it led to her current success.",
    audioSrc: "#",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
  },
  {
    id: 2,
    title: "From Garage to Google: How I Landed My Dream Job",
    author: "David Park",
    duration: "4:45",
    category: "Career Growth",
    date: "May 20, 2023",
    description: "David's journey from coding in his garage to securing a position at one of the world's leading tech companies.",
    audioSrc: "#",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    title: "The Ethical Dilemma of AI Development",
    author: "Maya Rodriguez",
    duration: "5:30",
    category: "Tech Ethics",
    date: "June 5, 2023",
    description: "Maya discusses the moral challenges she faced while working on an AI project and how she navigated these complex waters.",
    audioSrc: "#",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
  },
  {
    id: 4,
    title: "Breaking the Glass Ceiling in Tech",
    author: "Lisa Johnson",
    duration: "4:55",
    category: "Diversity in Tech",
    date: "July 1, 2023",
    description: "Lisa shares her experience as a woman in tech leadership and the challenges she overcame to reach her position.",
    audioSrc: "#",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 5,
    title: "Open Source: Building a Community Around Your Project",
    author: "Raj Patel",
    duration: "5:15",
    category: "Open Source",
    date: "June 28, 2023",
    description: "Raj explains how he grew his open-source project from a personal tool to a community-supported platform with thousands of users.",
    audioSrc: "#",
    image: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 6,
    title: "Finding Work-Life Balance in a Startup Environment",
    author: "Emma Chen",
    duration: "5:05",
    category: "Wellbeing",
    date: "July 10, 2023",
    description: "Emma discusses the importance of setting boundaries and maintaining wellness while working in the fast-paced startup world.",
    audioSrc: "#",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
];

// Categories for filtering
const categories = [
  "All", "Entrepreneurship", "Career Growth", "Tech Ethics", "Diversity in Tech", "Open Source", "Wellbeing"
];

const Storytelling = () => {
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
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

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle story selection
  const handleStorySelect = (story: typeof stories[0]) => {
    setSelectedStory(story);
    setIsPlaying(true);
    setCurrentTime(0);
  };

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
          </div>
        </div>
      </section>
      
      {/* Stories Section */}
      <section className="py-20">
        <div className="container">
          {/* Audio Player (shows when a story is selected) */}
          {selectedStory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-black/10 rounded-lg shadow-sm p-6 mb-12"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/4">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={selectedStory.image} 
                      alt={selectedStory.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="text-xs text-primary font-semibold uppercase">{selectedStory.category}</span>
                    <h3 className="text-xl font-bold mt-1">{selectedStory.title}</h3>
                    <p className="text-sm text-muted-foreground">By {selectedStory.author} • {selectedStory.date}</p>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {selectedStory.description}
                  </p>
                  
                  <div className="space-y-3">
                    {/* Progress bar */}
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-primary" 
                        style={{ width: `${(currentTime / 312) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                      <span>{selectedStory.duration}</span>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <button className="text-muted-foreground hover:text-foreground">
                        <SkipBack size={18} />
                      </button>
                      
                      <button 
                        className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                      </button>
                      
                      <button className="text-muted-foreground hover:text-foreground">
                        <SkipForward size={18} />
                      </button>
                    </div>
                    
                    {/* Volume control */}
                    <div className="flex items-center gap-2">
                      <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground">
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                      
                      <div className="relative h-1 flex-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="absolute left-0 top-0 h-full bg-primary" 
                          style={{ width: `${isMuted ? 0 : volume}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden h-full flex flex-col"
                      onClick={() => handleStorySelect(story)}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
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
                    <CardTitle className="text-lg">{story.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {story.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0 pb-4 text-sm text-muted-foreground">
                    By {story.author} • {story.date}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
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
