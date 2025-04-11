
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Newspaper, Clock, Calendar, ChevronRight, Share2, 
  Bookmark, ArrowRight, ArrowLeft, Facebook, Twitter,
  Film, Flag, Code, Car, Cloud, CloudRain, Sun
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
}

// Reduced dummy articles data
const dummyArticles: Article[] = [
  {
    _id: "1",
    title: "Tech Giants Announce Revolutionary AI Partnership",
    excerpt: "Major technology companies join forces to establish new standards for artificial intelligence development.",
    content: "<p>In a surprising move that has sent ripples through Silicon Valley, five of the world's largest technology companies announced yesterday that they would be forming an unprecedented alliance focused on artificial intelligence research and development.</p><p>The coalition, which includes industry leaders from both the United States and Asia, aims to establish new ethical standards for AI while accelerating breakthroughs in machine learning, natural language processing, and computer vision.</p><p>\"This is about ensuring that artificial intelligence develops in a way that benefits humanity as a whole,\" said the CEO of one participating company during the joint press conference. \"By pooling our resources and expertise, we can make greater strides while implementing safeguards that might be overlooked in a more competitive environment.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3",
    category: "Tech",
    readTime: "4 min read",
    date: "2023-10-17T14:23:00Z",
    author: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Technology Correspondent"
    },
    tags: ["AI", "Technology", "Silicon Valley"]
  },
  {
    _id: "2",
    title: "Global Climate Summit Reaches Historic Agreement",
    excerpt: "After tense negotiations, world leaders have committed to ambitious new carbon reduction targets.",
    content: "<p>Following two weeks of intense negotiations, the Global Climate Summit concluded yesterday with 196 countries signing what experts are calling the most significant environmental accord since the Paris Agreement.</p><p>The new treaty, named the Stockholm Protocol, commits signatories to reducing carbon emissions by 60% before 2040 and establishes a $100 billion annual fund to assist developing nations in transitioning to renewable energy sources.</p><p>\"This is a watershed moment in our fight against climate change,\" said the UN Secretary-General. \"For the first time, we have concrete commitments with robust verification mechanisms and meaningful consequences for non-compliance.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3",
    category: "Politics",
    readTime: "5 min read",
    date: "2023-10-16T09:15:00Z",
    author: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      role: "Environmental Reporter"
    },
    tags: ["Climate Change", "Global Politics", "Environment"]
  },
  {
    _id: "3",
    title: "Bollywood Megastar Announces Retirement After 40-Year Career",
    excerpt: "Iconic actor reveals plans to step away from the silver screen following upcoming film release.",
    content: "<p>One of Bollywood's most enduring and beloved stars shocked fans and industry insiders alike yesterday by announcing his retirement from acting after an illustrious four-decade career that transformed Indian cinema.</p><p>The 67-year-old actor, who has appeared in over 100 films and won numerous national awards, revealed his decision at a press conference following the completion of filming on what will now be his final project, \"The Last Scene.\"</p><p>\"After 40 years of living other people's lives on screen, I feel it's time to fully live my own,\" the emotional star told reporters. \"Cinema has given me everything—fame, fortune, and most importantly, the love of millions. But there comes a moment when one must step away, and for me, that time has arrived.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3",
    category: "Bollywood",
    readTime: "5 min read",
    date: "2023-10-11T08:15:00Z",
    author: {
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      role: "Entertainment Editor"
    },
    tags: ["Bollywood", "Cinema", "Entertainment"]
  },
  {
    _id: "4",
    title: "Hollywood Studio Unveils Revolutionary Virtual Production Technology",
    excerpt: "New filmmaking approach combines real-time rendering with traditional production methods.",
    content: "<p>A major Hollywood studio has revealed a groundbreaking virtual production system that industry experts say could fundamentally transform how films are made in the coming decade.</p><p>The technology, developed over five years at a reported cost of $200 million, allows filmmakers to shoot actors against reactive digital backgrounds that render in real-time, eliminating the need for traditional green screens and post-production compositing for many sequences.</p><p>\"This represents perhaps the most significant shift in production methodology since the transition from film to digital,\" said the studio's head of technology innovation. \"Directors can now see their complete scenes, including complex visual effects elements, directly through the camera viewfinder while shooting.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3",
    category: "Hollywood",
    readTime: "6 min read",
    date: "2023-10-10T16:40:00Z",
    author: {
      name: "David Anderson",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      role: "Technology in Film Correspondent"
    },
    tags: ["Hollywood", "Technology", "Filmmaking"]
  },
  {
    _id: "5",
    title: "Revolutionary New Electric Car Achieves 1,000-Mile Range on Single Charge",
    excerpt: "Startup's prototype vehicle shatters previous records with breakthrough battery technology.",
    content: "<p>A California-based automotive startup unveiled a prototype electric vehicle yesterday that achieved over 1,000 miles of driving range on a single charge during certified testing, more than doubling the capacity of the current market leaders.</p><p>The vehicle, named \"Horizon,\" utilizes a proprietary solid-state battery technology that represents what many industry analysts are calling the holy grail of electric vehicle development. Unlike conventional lithium-ion batteries, the new cells offer significantly higher energy density while reducing charging time to just 15 minutes for an 80% charge.</p><p>\"This isn't an incremental improvement—it's a generational leap forward,\" said the company's founder and CEO during the demonstration event. \"Range anxiety has consistently been cited as the primary barrier to widespread EV adoption. With this technology, that concern becomes obsolete.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba13938c3?ixlib=rb-4.0.3",
    category: "Car and Bike",
    readTime: "6 min read",
    date: "2023-10-09T15:10:00Z",
    author: {
      name: "Michael Zhang",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
      role: "Automotive Technology Reporter"
    },
    tags: ["Electric Vehicles", "Technology", "Automotive"]
  },
  {
    _id: "6",
    title: "Major Breakthrough in Quantum Computing Announced",
    excerpt: "Scientists achieve quantum supremacy with new 1,000-qubit processor.",
    content: "<p>Researchers at the Quantum Computing Institute have achieved what many considered impossible this decade: a stable quantum computer with 1,000 qubits that maintained coherence long enough to solve complex problems beyond the capabilities of classical supercomputers.</p><p>The new system, named Quantum Matrix 1000, successfully factored a 2048-bit RSA key in just under 17 minutes—a task that would take the world's most powerful classical supercomputer approximately 300 trillion years to complete.</p><p>\"This definitively establishes quantum supremacy in a practical, rather than theoretical, application,\" said Dr. Robert Yang, director of the institute. \"We've crossed a threshold where quantum computers can now solve real-world problems that are effectively impossible for classical systems.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3",
    category: "Tech",
    readTime: "6 min read",
    date: "2023-10-14T08:30:00Z",
    author: {
      name: "Dr. Sophia Werner",
      avatar: "https://randomuser.me/api/portraits/women/54.jpg",
      role: "Quantum Physics Specialist"
    },
    tags: ["Quantum Computing", "Technology", "Physics"]
  },
  {
    _id: "7",
    title: "Bollywood Film Sets New Box Office Record in International Markets",
    excerpt: "Epic historical drama becomes highest-grossing Indian film of all time in overseas territories.",
    content: "<p>The historical epic \"Dynasty,\" directed by one of India's most acclaimed filmmakers, has shattered box office records for Indian cinema in international markets, grossing over $75 million outside of South Asia in just two weeks of release.</p><p>The film, a sweeping historical drama set in medieval India, has found particular success in markets not traditionally strong for Indian cinema, including North America, where it debuted at number three on the weekend box office charts, and China, where it has already become the highest-grossing Indian film ever released.</p><p>\"What we're seeing is the globalization of Indian storytelling,\" said film industry analyst Rajiv Menon. \"The combination of universal themes, spectacular visuals rendered with world-class technical expertise, and strategic international marketing has created a watershed moment for Bollywood's global commercial potential.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3",
    category: "Bollywood",
    readTime: "5 min read",
    date: "2023-10-08T17:50:00Z",
    author: {
      name: "Arjun Patel",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      role: "Global Cinema Correspondent"
    },
    tags: ["Bollywood", "Box Office", "International Cinema"]
  },
  {
    _id: "8",
    title: "Hollywood Studio Secures Record-Breaking Streaming Deal",
    excerpt: "Multi-billion dollar agreement marks major shift in content distribution strategy.",
    content: "<p>In what industry analysts are calling a seismic shift in Hollywood's business model, one of the \"Big Five\" studios has signed an unprecedented streaming agreement worth $8.5 billion over five years with a major digital platform.</p><p>The deal—the largest of its kind—gives the streaming service exclusive rights to the studio's entire theatrical slate after movies complete their theatrical runs, replacing the traditional cable and network television windows that have been standard for decades.</p><p>\"This effectively signals the end of the old distribution paradigm,\" noted media analyst Richard Simmons. \"The traditional progression from theaters to home video to premium cable to broadcast is being compressed into essentially two windows: theatrical and streaming.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3",
    category: "Hollywood",
    readTime: "5 min read",
    date: "2023-10-07T16:40:00Z",
    author: {
      name: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Entertainment Business Analyst"
    },
    tags: ["Hollywood", "Streaming", "Entertainment Business"]
  }
];

const NewspaperView = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [apiConfig, setApiConfig] = useState<{
    baseUrl: string;
    endpoints: {
      articles: string;
    };
  }>({
    baseUrl: "http://13.200.161.40:5000",
    endpoints: {
      articles: "/api/articles",
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [articleInFocus, setArticleInFocus] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const maxPages = 3;
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Weather data
  const weatherData = [
    { city: "New York", condition: "Sunny", high: "78°F", low: "65°F", icon: <Sun className="h-5 w-5 text-yellow-500" /> },
    { city: "London", condition: "Cloudy", high: "68°F", low: "54°F", icon: <Cloud className="h-5 w-5 text-gray-500" /> },
    { city: "Tokyo", condition: "Rainy", high: "72°F", low: "63°F", icon: <CloudRain className="h-5 w-5 text-blue-500" /> },
  ];
  
  // Stock data
  const stockData = [
    { symbol: "TECH", price: "$345.67", change: "+2.5%" },
    { symbol: "AUTO", price: "$78.92", change: "-0.8%" },
    { symbol: "MEDIA", price: "$124.30", change: "+1.2%" },
    { symbol: "BANK", price: "$56.44", change: "+0.5%" },
  ];
  
  useEffect(() => {
    const siteConfig = localStorage.getItem("siteConfig");
    if (siteConfig) {
      const config = JSON.parse(siteConfig);
      if (config.api) {
        setApiConfig({
          baseUrl: config.api.baseUrl || apiConfig.baseUrl,
          endpoints: {
            articles: config.api.endpoints?.articles || apiConfig.endpoints.articles,
          },
        });
      }
    }
  }, []);

  const {
    data: fetchedArticles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newspaper-articles"],
    queryFn: async () => {
      try {
        const url = `${apiConfig.baseUrl}${apiConfig.endpoints.articles}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data || [];
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast({
          title: "Error",
          description: "Failed to fetch articles. Showing sample articles instead.",
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: !!apiConfig.baseUrl,
  });

  const articles = fetchedArticles?.length > 0 ? fetchedArticles : dummyArticles;
  
  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(article => article.category.toLowerCase() === activeCategory.toLowerCase());
  
  const itemsPerPage = 4;
  const displayedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );
  
  const handleNextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(prev => prev + 1);
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const getExcerpt = (content: string, maxLength = 150) => {
    const textOnly = content.replace(/<\/?[^>]+(>|$)/g, "");
    
    if (textOnly.length <= maxLength) return textOnly;
    return textOnly.substring(0, maxLength) + "...";
  };

  const shareArticle = (article: Article, platform: string) => {
    const title = encodeURIComponent(article.title);
    const url = encodeURIComponent(`${window.location.origin}/articles/${article._id}`);
    
    let shareUrl = "";
    
    switch(platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case "copy":
        navigator.clipboard.writeText(`${article.title} - ${window.location.origin}/articles/${article._id}`);
        toast({
          title: "Link copied",
          description: "Article link has been copied to clipboard",
        });
        return;
      default:
        shareUrl = `mailto:?subject=${title}&body=${url}`;
    }
    
    window.open(shareUrl, "_blank");
  };

  const pageVariants = {
    initial: (direction: number) => {
      return {
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
        scale: 0.8
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction: number) => {
      return {
        x: direction > 0 ? "-100%" : "100%",
        opacity: 0,
        scale: 0.8,
        transition: {
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.4 }
        }
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Helmet>
        <title>Newspaper | TheBoolean Times</title>
        <meta name="description" content="Latest news in traditional newspaper format" />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-20 pb-10 bg-gray-200">
        <div className="container max-w-7xl mx-auto">
          <Tabs defaultValue="all" className="w-full mb-6" onValueChange={category => {
            setActiveCategory(category);
            setCurrentPage(1);
          }}>
            <TabsList className="w-full justify-between bg-white border-b border-black mb-4 overflow-x-auto flex-nowrap md:flex">
              <TabsTrigger value="all" className="text-lg font-serif uppercase">All News</TabsTrigger>
              <TabsTrigger value="bollywood" className="text-lg font-serif uppercase">Bollywood</TabsTrigger>
              <TabsTrigger value="hollywood" className="text-lg font-serif uppercase">Hollywood</TabsTrigger>
              <TabsTrigger value="politics" className="text-lg font-serif uppercase">Politics</TabsTrigger>
              <TabsTrigger value="tech" className="text-lg font-serif uppercase">Tech</TabsTrigger>
              <TabsTrigger value="car and bike" className="text-lg font-serif uppercase">Car & Bike</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <ScrollArea className="h-[calc(100vh-12rem)]" ref={scrollRef}>
            <AnimatePresence custom={currentPage > (currentPage - 1) ? 1 : -1} mode="wait">
              <motion.div 
                key={currentPage}
                custom={currentPage > (currentPage - 1) ? 1 : -1}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="container max-w-7xl mx-auto bg-white border border-gray-300 shadow-lg py-8 px-4 md:px-10 paper-texture"
              >
                <div className="border-b-4 border-black mb-8">
                  <div className="text-center mb-4">
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight mb-2 text-black">
                      THE BOOLEAN TIMES
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm mt-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(new Date().toISOString())}
                      </div>
                      <div className="hidden sm:block">|</div>
                      <div>DAILY EDITION</div>
                      <div className="hidden sm:block">|</div>
                      <div className="flex items-center">
                        <Newspaper className="h-4 w-4 mr-1" />
                        Vol. 1, No. {currentPage}
                      </div>
                    </div>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="h-96 flex justify-center items-center">
                    <div className="text-2xl font-serif">Loading today's headlines...</div>
                  </div>
                ) : isError ? (
                  <div className="h-96 flex justify-center items-center flex-col gap-4">
                    <div className="text-xl font-serif">Using sample articles</div>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6 font-serif italic">
                      <div>Page {currentPage} of {maxPages}</div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          className="text-black border-black hover:bg-gray-100" 
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                        >
                          <ArrowLeft className="h-4 w-4" /> Previous
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="text-black border-black hover:bg-gray-100" 
                          onClick={handleNextPage}
                          disabled={currentPage === maxPages}
                        >
                          Next <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
                      {/* Main Content - Left 8 columns */}
                      <div className="lg:col-span-8">
                        {displayedArticles.length > 0 ? (
                          <>
                            {/* Featured Article */}
                            <div className="mb-8 border-b-2 border-black pb-6">
                              <h2 className="font-serif text-4xl font-bold mb-4 leading-tight">
                                {displayedArticles[0].title}
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                <div className="md:col-span-3">
                                  <img
                                    src={displayedArticles[0].imageUrl}
                                    alt={displayedArticles[0].title}
                                    className="w-full h-auto grayscale mb-4"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }}
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <div className="mb-2 flex gap-2">
                                    <span className="bg-black text-white text-xs px-2 py-1 uppercase font-medium">
                                      {displayedArticles[0].category}
                                    </span>
                                    <span className="text-xs flex items-center border border-gray-300 px-2 py-1">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {displayedArticles[0].readTime}
                                    </span>
                                  </div>
                                  <div className="font-serif text-lg mb-4">
                                    <span className="font-bold">By {displayedArticles[0].author.name}</span> | {formatDate(displayedArticles[0].date)}
                                  </div>
                                  <div className="font-serif text-base leading-relaxed">
                                    {getExcerpt(displayedArticles[0].content || displayedArticles[0].excerpt, 300)}
                                  </div>
                                  <div className="mt-4 flex justify-between items-center">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button 
                                          variant="outline"
                                          onClick={() => setArticleInFocus(displayedArticles[0])}
                                        >
                                          Read Full Story
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-3xl h-[80vh] overflow-auto">
                                        <div className="font-serif p-4">
                                          <h2 className="text-2xl font-bold mb-4">{articleInFocus?.title}</h2>
                                          <div className="flex items-center justify-between mb-4 text-sm">
                                            <div>By {articleInFocus?.author.name}</div>
                                            <div className="flex items-center">
                                              <Clock className="h-4 w-4 mr-1" />
                                              {articleInFocus?.readTime}
                                            </div>
                                          </div>
                                          
                                          {articleInFocus?.imageUrl && (
                                            <div className="mb-4">
                                              <img
                                                src={articleInFocus.imageUrl}
                                                alt={articleInFocus.title}
                                                className="w-full h-auto grayscale"
                                                onError={(e) => {
                                                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                                                }}
                                              />
                                            </div>
                                          )}
                                          
                                          <div 
                                            className="prose prose-stone max-w-none"
                                            dangerouslySetInnerHTML={{ __html: articleInFocus?.content || "" }}
                                          />
                                          
                                          <div className="mt-4 flex justify-between items-center">
                                            <div className="flex gap-2">
                                              {articleInFocus?.tags.map(tag => (
                                                <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                  {tag}
                                                </span>
                                              ))}
                                            </div>
                                            
                                            <div className="flex gap-2">
                                              <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => articleInFocus && shareArticle(articleInFocus, "copy")}
                                              >
                                                <Share2 className="h-4 w-4 mr-2" /> Share
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                    
                                    <div className="flex gap-2">
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={() => shareArticle(displayedArticles[0], "facebook")}
                                      >
                                        <Facebook className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={() => shareArticle(displayedArticles[0], "twitter")}
                                      >
                                        <Twitter className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Secondary Articles - 2 columns */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {displayedArticles.slice(1).map((article, index) => (
                                <motion.div 
                                  key={article._id}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5, delay: index * 0.1 }}
                                  className="border-t border-gray-300 pt-4 newspaper-article"
                                >
                                  <div className="mb-2 flex justify-between items-start">
                                    <span className="bg-black text-white text-xs px-2 py-1 uppercase font-medium">
                                      {article.category}
                                    </span>
                                    <span className="text-xs flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {article.readTime}
                                    </span>
                                  </div>
                                  
                                  <h3 className="font-serif text-xl font-bold leading-tight mb-3">
                                    {article.title}
                                  </h3>
                                  
                                  {article.imageUrl && (
                                    <img
                                      src={article.imageUrl}
                                      alt={article.title}
                                      className="w-full h-56 object-cover grayscale mb-3"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                                      }}
                                    />
                                  )}
                                  
                                  <p className="font-serif text-base leading-snug mb-3">
                                    {getExcerpt(article.content || article.excerpt, 150)}
                                  </p>
                                  
                                  <div className="flex justify-between items-center text-sm">
                                    <div className="italic">By {article.author.name}</div>
                                    
                                    <div className="flex gap-1">
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-8 text-xs"
                                            onClick={() => setArticleInFocus(article)}
                                          >
                                            Read More <ChevronRight className="h-3 w-3" />
                                          </Button>
                                        </DialogTrigger>
                                      </Dialog>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="h-60 flex justify-center items-center border border-dashed border-gray-300">
                            <p className="text-lg font-serif text-gray-500">No articles found in this category.</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Sidebar - Right 4 columns */}
                      <div className="lg:col-span-4 space-y-8">
                        {/* Weather Card */}
                        <Card className="overflow-hidden border border-gray-300">
                          <div className="bg-gray-100 font-serif text-lg font-bold px-4 py-2 border-b border-gray-300">
                            Today's Weather
                          </div>
                          <CardContent className="p-4">
                            {weatherData.map((city, index) => (
                              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                                <div>
                                  <div className="font-bold">{city.city}</div>
                                  <div className="text-sm">{city.condition}</div>
                                </div>
                                <div className="flex items-center">
                                  {city.icon}
                                  <div className="ml-2">
                                    <span className="font-bold">{city.high}</span>
                                    <span className="text-sm text-gray-500"> / {city.low}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                        
                        {/* Stock Market */}
                        <Card className="overflow-hidden border border-gray-300">
                          <div className="bg-gray-100 font-serif text-lg font-bold px-4 py-2 border-b border-gray-300">
                            Market Watch
                          </div>
                          <CardContent className="p-4">
                            {stockData.map((stock, index) => (
                              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                                <div className="font-bold">{stock.symbol}</div>
                                <div className="flex items-center">
                                  <div>{stock.price}</div>
                                  <div className={`ml-2 text-sm ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {stock.change}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                        
                        {/* Classifieds */}
                        <Card className="overflow-hidden border border-gray-300">
                          <div className="bg-gray-100 font-serif text-lg font-bold px-4 py-2 border-b border-gray-300">
                            Classifieds
                          </div>
                          <CardContent className="p-4 grid grid-cols-1 gap-3 text-sm">
                            <div className="border p-2">
                              <p className="font-bold">FOR SALE</p>
                              <p>Vintage typewriter, excellent condition. Call 555-1234 for details and pricing.</p>
                            </div>
                            <div className="border p-2">
                              <p className="font-bold">JOBS AVAILABLE</p>
                              <p>Newspaper seeks junior reporters. Experience with investigative journalism preferred.</p>
                            </div>
                            <div className="border p-2">
                              <p className="font-bold">ANNOUNCEMENTS</p>
                              <p>Town hall meeting this Thursday at 7pm. All residents encouraged to attend.</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="font-serif text-center mt-8 pt-6 border-t border-gray-300 text-xs">
                      <p>© {new Date().getFullYear()} The Boolean Times • All Rights Reserved</p>
                      <p>For subscriptions, call (555) 867-5309 • For advertising inquiries: ads@booleantimes.com</p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </ScrollArea>
        </div>
      </div>
      
      <Footer />
      
      <div className="md:hidden fixed bottom-20 right-4 flex flex-col gap-2">
        <Button 
          size="icon" 
          className="rounded-full bg-white text-black border border-black shadow-md"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button 
          size="icon" 
          className="rounded-full bg-white text-black border border-black shadow-md"
          onClick={handleNextPage}
          disabled={currentPage === maxPages}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NewspaperView;
