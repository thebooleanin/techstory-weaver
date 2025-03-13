
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Headphones, 
  PlayCircle, 
  PauseCircle, 
  ArrowRight, 
  Clock, 
  Tag,
  Mic,
  Search, 
  Filter, 
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

// Mock data for stories
const stories = [
  {
    id: '1',
    title: 'Building Resilience: My Journey from Startup Failure to Success',
    excerpt: 'Tech entrepreneur Sarah Chen shares her five-minute story of perseverance through the challenges of her first failed startup and how it led to her current success.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    audioUrl: '#',
    duration: '5 min',
    author: 'Sarah Chen',
    category: 'Entrepreneurship',
    date: 'June 15, 2023',
    featured: true
  },
  {
    id: '2',
    title: 'How AI Transformed My Small Business',
    excerpt: 'Small business owner James Wilson explains how integrating AI tools helped him compete with larger companies and grow his customer base.',
    imageUrl: 'https://images.unsplash.com/photo-1664575599736-c5197c684128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    audioUrl: '#',
    duration: '4 min',
    author: 'James Wilson',
    category: 'Tech Tales',
    date: 'July 2, 2023',
    featured: true
  },
  {
    id: '3',
    title: 'Coding Through a Pandemic: Remote Work Evolution',
    excerpt: 'Software developer Maya Patel shares her experience transitioning to remote work during the pandemic and how it changed her approach to coding and collaboration.',
    imageUrl: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    audioUrl: '#',
    duration: '5 min',
    author: 'Maya Patel',
    category: 'User Experiences',
    date: 'August 10, 2023',
    featured: false
  },
  {
    id: '4',
    title: 'From Corporate to Freelance: My Tech Journey',
    excerpt: 'Former corporate employee Alex Johnson describes his transition to freelance web development and the challenges and rewards of being his own boss.',
    imageUrl: 'https://images.unsplash.com/photo-1562098824-58910964a854?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    audioUrl: '#',
    duration: '4 min',
    author: 'Alex Johnson',
    category: 'User Experiences',
    date: 'August 25, 2023',
    featured: false
  },
  {
    id: '5',
    title: 'The Day My App Went Viral',
    excerpt: 'Developer Sophia Lee recounts the unexpected day her side project went viral and how she handled the sudden success and scaling challenges.',
    imageUrl: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    audioUrl: '#',
    duration: '5 min',
    author: 'Sophia Lee',
    category: 'Inspirational',
    date: 'September 5, 2023',
    featured: true
  },
  {
    id: '6',
    title: 'Bootstrapping vs Funding: Lessons Learned',
    excerpt: 'Entrepreneur David Kim compares his experiences bootstrapping his first startup and raising venture capital for his second, sharing insights on which approach might be best for different scenarios.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    audioUrl: '#',
    duration: '5 min',
    author: 'David Kim',
    category: 'Entrepreneurship',
    date: 'September 20, 2023',
    featured: false
  }
];

// Featured story
const featuredStory = stories.find(story => story.id === '1');

// Audio player component
const AudioPlayer = ({ story }: { story: typeof stories[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-black/5 rounded-lg">
      <button 
        onClick={togglePlay}
        className="p-1 rounded-full hover:bg-white/20 transition-colors"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <PauseCircle className="w-10 h-10 text-primary" />
        ) : (
          <PlayCircle className="w-10 h-10 text-primary" />
        )}
      </button>
      <div className="flex-1">
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: isPlaying ? '45%' : '0%', transition: 'width 1s linear' }} />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>{isPlaying ? '2:15' : '0:00'}</span>
          <span>{story.duration}</span>
        </div>
      </div>
    </div>
  );
};

// Story card component
const StoryCard = ({ story }: { story: typeof stories[0] }) => {
  return (
    <div className="group bg-white dark:bg-black/10 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <div className="flex items-center text-white space-x-2">
            <Headphones className="w-4 h-4" />
            <span className="text-xs">{story.duration}</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {story.category}
          </span>
          <span className="text-xs text-muted-foreground">{story.date}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {story.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {story.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs">By {story.author}</span>
          <AudioPlayer story={story} />
        </div>
      </div>
    </div>
  );
};

// Guest request form 
const GuestRequestForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storyTitle: '',
    storyOutline: '',
    audioFile: null as File | null
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    storyTitle: '',
    storyOutline: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        audioFile: e.target.files[0]
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      storyTitle: '',
      storyOutline: ''
    };
    
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.storyTitle.trim()) {
      newErrors.storyTitle = 'Story title is required';
      isValid = false;
    }
    
    if (!formData.storyOutline.trim()) {
      newErrors.storyOutline = 'Story outline is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here would be the API call to submit the form
      console.log('Form submitted:', formData);
      
      toast({
        title: "Request Submitted!",
        description: "Your storyteller request has been received. We'll review it and get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        storyTitle: '',
        storyOutline: '',
        audioFile: null
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          aria-describedby="name-error"
        />
        {errors.name && <p id="name-error" className="text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          aria-describedby="email-error"
        />
        {errors.email && <p id="email-error" className="text-sm text-red-500">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="storyTitle">Story Title <span className="text-red-500">*</span></Label>
        <Input
          id="storyTitle"
          name="storyTitle"
          value={formData.storyTitle}
          onChange={handleInputChange}
          aria-describedby="storyTitle-error"
        />
        {errors.storyTitle && <p id="storyTitle-error" className="text-sm text-red-500">{errors.storyTitle}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="storyOutline">Story Outline <span className="text-red-500">*</span></Label>
        <Textarea
          id="storyOutline"
          name="storyOutline"
          value={formData.storyOutline}
          onChange={handleInputChange}
          rows={4}
          aria-describedby="storyOutline-error"
        />
        {errors.storyOutline && <p id="storyOutline-error" className="text-sm text-red-500">{errors.storyOutline}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="audioFile">Audio File (optional)</Label>
        <Input
          id="audioFile"
          name="audioFile"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">Upload an audio sample or demo (MP3, WAV, max 10MB)</p>
      </div>
      
      <Button type="submit" className="w-full">Submit Request</Button>
      
      <p className="text-xs text-muted-foreground text-center">
        All submissions are reviewed by our team. If approved, we'll contact you to schedule a recording session.
      </p>
    </form>
  );
};

const Storytelling = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filteredStories, setFilteredStories] = useState(stories);
  
  // Filter stories based on search and category
  useEffect(() => {
    let result = stories;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(story => 
        story.title.toLowerCase().includes(query) ||
        story.excerpt.toLowerCase().includes(query) ||
        story.author.toLowerCase().includes(query)
      );
    }
    
    if (categoryFilter !== 'all') {
      result = result.filter(story => story.category === categoryFilter);
    }
    
    setFilteredStories(result);
  }, [searchQuery, categoryFilter]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20 z-10" />
          {featuredStory && (
            <img
              src={featuredStory.imageUrl}
              alt="Background"
              className="w-full h-full object-cover opacity-20"
            />
          )}
        </div>
        
        <div className="container relative z-10 pt-20">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              5-Minute Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tech Stories That Inspire & Inform
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Listen to 5-minute stories from entrepreneurs, developers, and innovators 
              sharing their real experiences in the world of technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" className="flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    Become a Guest Storyteller
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Become a Guest Storyteller</DialogTitle>
                    <DialogDescription>
                      Share your tech journey in a 5-minute story. Fill out the form below to apply.
                    </DialogDescription>
                  </DialogHeader>
                  <GuestRequestForm />
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Story Section */}
      {featuredStory && (
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Featured Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                This Week's Highlight
              </h2>
              <p className="text-muted-foreground">
                Our editorial team's selection for the most inspiring tech story this week.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-black/20 rounded-xl z-10" />
                <img
                  src={featuredStory.imageUrl}
                  alt={featuredStory.title}
                  className="rounded-xl w-full h-full object-cover"
                  style={{ maxHeight: '500px' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center mb-3">
                    <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                      {featuredStory.category}
                    </span>
                    <span className="ml-3 text-white/90 text-sm flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredStory.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {featuredStory.title}
                  </h3>
                  <p className="text-white/80 mb-6 line-clamp-2">
                    {featuredStory.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 text-sm">By {featuredStory.author}</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col space-y-8"
              >
                <h3 className="text-2xl font-bold">
                  "{featuredStory.title}"
                </h3>
                <p className="text-muted-foreground">
                  {featuredStory.excerpt}
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0">
                    <img
                      src={`https://ui-avatars.com/api/?name=${featuredStory.author}&background=random`}
                      alt={featuredStory.author}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{featuredStory.author}</p>
                    <p className="text-sm text-muted-foreground">{featuredStory.category}</p>
                  </div>
                </div>
                
                <AudioPlayer story={featuredStory} />
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Key Takeaways</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1">•</div>
                      <p className="text-sm">Perseverance through challenges is essential for entrepreneurial success</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1">•</div>
                      <p className="text-sm">Failure provides valuable lessons that contribute to future achievements</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1">•</div>
                      <p className="text-sm">Building a strong support network is crucial for overcoming setbacks</p>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
      
      {/* Browse Stories Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Browse Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                All Stories
              </h2>
            </div>
            
            {/* Search and filter on desktop */}
            <div className="hidden md:flex items-center space-x-4 mt-6 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search stories..."
                  className="pl-10 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                  <SelectItem value="Tech Tales">Tech Tales</SelectItem>
                  <SelectItem value="User Experiences">User Experiences</SelectItem>
                  <SelectItem value="Inspirational">Inspirational</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Mobile filter button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden mt-6 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Filter and search for stories
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile-search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="mobile-search"
                        placeholder="Search stories..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile-category">Category</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger id="mobile-category">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                        <SelectItem value="Tech Tales">Tech Tales</SelectItem>
                        <SelectItem value="User Experiences">User Experiences</SelectItem>
                        <SelectItem value="Inspirational">Inspirational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium mb-2">No Stories Found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
          
          {/* Categories Accordion */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-6">Story Categories</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="entrepreneurship">
                <AccordionTrigger className="text-lg">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-5 w-5" />
                    Entrepreneurship
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Stories about starting businesses, overcoming challenges in the startup world, 
                  and the journey of building something from scratch. Learn from both successes and failures.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="tech-tales">
                <AccordionTrigger className="text-lg">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-5 w-5" />
                    Tech Tales
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Fascinating stories about technology breakthroughs, innovations, and how 
                  technology has transformed businesses and industries in unexpected ways.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="user-experiences">
                <AccordionTrigger className="text-lg">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-5 w-5" />
                    User Experiences
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Real stories from users and developers about their experiences with products, 
                  services, or technologies. First-hand accounts that provide valuable insights.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="inspirational">
                <AccordionTrigger className="text-lg">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-5 w-5" />
                    Inspirational
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Motivational stories that inspire action and change. These stories focus on 
                  overcoming significant obstacles, achieving the impossible, and breaking barriers in tech.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 bg-muted rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Have a Story to Share?</h3>
                <p className="mb-4 text-muted-foreground">
                  Your tech journey could inspire others. We're looking for authentic 5-minute stories 
                  about entrepreneurship, development, innovation, and tech experiences.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      Apply to Be a Storyteller
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Become a Guest Storyteller</DialogTitle>
                      <DialogDescription>
                        Share your tech journey in a 5-minute story. Fill out the form below to apply.
                      </DialogDescription>
                    </DialogHeader>
                    <GuestRequestForm />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative h-[200px] md:h-[250px] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1610390371998-319b9d4d8a3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                  alt="Podcast recording"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Storytelling;
