import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Newspaper, Clock, Calendar, ChevronRight, Share2, 
  Bookmark, ArrowRight, ArrowLeft, Facebook, Twitter
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

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

// Dummy articles data
const dummyArticles: Article[] = [
  {
    _id: "1",
    title: "Tech Giants Announce Revolutionary AI Partnership",
    excerpt: "Major technology companies join forces to establish new standards for artificial intelligence development.",
    content: "<p>In a surprising move that has sent ripples through Silicon Valley, five of the world's largest technology companies announced yesterday that they would be forming an unprecedented alliance focused on artificial intelligence research and development.</p><p>The coalition, which includes industry leaders from both the United States and Asia, aims to establish new ethical standards for AI while accelerating breakthroughs in machine learning, natural language processing, and computer vision.</p><p>\"This is about ensuring that artificial intelligence develops in a way that benefits humanity as a whole,\" said the CEO of one participating company during the joint press conference. \"By pooling our resources and expertise, we can make greater strides while implementing safeguards that might be overlooked in a more competitive environment.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3",
    category: "Technology",
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
    category: "Environment",
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
    title: "Market Analysis: Economic Indicators Point to Surprising Q4 Growth",
    excerpt: "Despite earlier predictions of a slowdown, key economic metrics suggest robust expansion ahead.",
    content: "<p>Contrary to widespread expectations of an economic cooldown, the latest batch of economic indicators released this week point to accelerating growth for the final quarter of the year.</p><p>The Composite Leading Indicator (CLI), which aggregates data from multiple economic sectors, rose by 0.8% in September, marking its strongest monthly gain since early 2021. Meanwhile, retail sales increased by 1.2% month-over-month, significantly outpacing the projected 0.4% rise.</p><p>\"The data suggests remarkable resilience in consumer spending despite persistent inflation,\" noted Dr. Eleanor Simmons, chief economist at Capital Research. \"This, combined with improvements in manufacturing output and a tight labor market, indicates that the economy is on much firmer footing than many analysts believed.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3",
    category: "Business",
    readTime: "6 min read",
    date: "2023-10-16T11:30:00Z",
    author: {
      name: "Robert Williamson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Financial Analyst"
    },
    tags: ["Economy", "Markets", "Finance"]
  },
  {
    _id: "4",
    title: "Revolutionary Cancer Treatment Shows Promising Results in Clinical Trials",
    excerpt: "New immunotherapy approach demonstrates unprecedented efficacy against advanced-stage pancreatic cancer.",
    content: "<p>A groundbreaking cancer therapy developed by researchers at the National Medical Research Center has shown remarkable results in treating one of the most aggressive forms of cancer.</p><p>The phase II clinical trial, involving 120 patients with stage IV pancreatic cancer, reported a 47% objective response rate—more than triple the effectiveness of current standard treatments. Even more encouragingly, 23% of participants experienced complete remission, an outcome previously almost unheard of for advanced pancreatic cancer.</p><p>\"These results represent a potential paradigm shift in how we approach pancreatic cancer treatment,\" said Dr. James Harrington, the study's principal investigator. \"The dual-targeting immunotherapy essentially reconfigures the patient's immune system to recognize and attack cancer cells that have previously been adept at evading immune detection.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3",
    category: "Health",
    readTime: "7 min read",
    date: "2023-10-15T16:45:00Z",
    author: {
      name: "Dr. Lisa Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      role: "Medical Science Correspondent"
    },
    tags: ["Medicine", "Cancer Research", "Healthcare"]
  },
  {
    _id: "5",
    title: "Landmark Supreme Court Ruling Redefines Digital Privacy Standards",
    excerpt: "In a 7-2 decision, the Court established new guidelines for government access to personal data.",
    content: "<p>In what legal experts are calling the most significant privacy ruling of the digital age, the Supreme Court yesterday established sweeping new protections for personal data stored by third-party services.</p><p>The case, United States v. Carpenter, centered on whether law enforcement agencies need a warrant to access location data, browsing histories, and other digital footprints held by technology companies. Writing for the majority, the Chief Justice declared that the \"third-party doctrine\" established in the analog era does not automatically extend to the vast quantities of sensitive information generated by modern digital services.</p><p>\"This ruling recognizes that smartphones and cloud services have fundamentally changed what privacy means in the 21st century,\" said constitutional scholar Professor Caroline Wu. \"It effectively establishes a new framework where the mere act of using essential digital services doesn't forfeit one's reasonable expectation of privacy.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3",
    category: "Law",
    readTime: "8 min read",
    date: "2023-10-15T13:20:00Z",
    author: {
      name: "Thomas Blackwell",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      role: "Legal Affairs Editor"
    },
    tags: ["Supreme Court", "Privacy", "Digital Rights"]
  },
  {
    _id: "6",
    title: "Archaeologists Uncover 'Lost City' in Remote Amazon Region",
    excerpt: "Sophisticated urban center challenges previous understanding of pre-Columbian civilizations.",
    content: "<p>An international team of archaeologists has announced the discovery of an extensive urban complex in a previously unexplored region of the Amazon rainforest, fundamentally altering our understanding of pre-Columbian civilization in South America.</p><p>The settlement, estimated to have been home to at least 40,000 people at its peak around 800 CE, features sophisticated hydraulic systems, large ceremonial structures, and geometric earthworks spanning over 30 square kilometers.</p><p>\"What's remarkable about this discovery is not just its scale, but its urban planning,\" said Dr. Maria Gonzalez, the expedition's lead archaeologist. \"The hydraulic engineering alone—with canals, reservoirs, and flood control systems—demonstrates a level of technological sophistication that rivals ancient Mesopotamian cities.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?ixlib=rb-4.0.3",
    category: "Archaeology",
    readTime: "5 min read",
    date: "2023-10-14T10:05:00Z",
    author: {
      name: "Dr. Francisco Silva",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      role: "Science Correspondent"
    },
    tags: ["Archaeology", "History", "Amazon"]
  },
  {
    _id: "7",
    title: "Major Breakthrough in Quantum Computing Announced",
    excerpt: "Scientists achieve quantum supremacy with new 1,000-qubit processor.",
    content: "<p>Researchers at the Quantum Computing Institute have achieved what many considered impossible this decade: a stable quantum computer with 1,000 qubits that maintained coherence long enough to solve complex problems beyond the capabilities of classical supercomputers.</p><p>The new system, named Quantum Matrix 1000, successfully factored a 2048-bit RSA key in just under 17 minutes—a task that would take the world's most powerful classical supercomputer approximately 300 trillion years to complete.</p><p>\"This definitively establishes quantum supremacy in a practical, rather than theoretical, application,\" said Dr. Robert Yang, director of the institute. \"We've crossed a threshold where quantum computers can now solve real-world problems that are effectively impossible for classical systems.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3",
    category: "Technology",
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
    _id: "8",
    title: "Global Education Report Highlights Widening Digital Divide",
    excerpt: "UNESCO study reveals concerning disparities in educational technology access post-pandemic.",
    content: "<p>A comprehensive UNESCO report released today has documented alarming inequalities in educational technology access, with potentially far-reaching consequences for global development goals.</p><p>The study, which analyzed data from 196 countries, found that while high-income nations saw educational technology integration accelerate during the pandemic, nearly 470 million students in low-income countries remain without basic internet access for learning—a 6% increase from pre-pandemic levels.</p><p>\"The digital revolution in education is creating a two-track system of educational opportunity,\" warned UNESCO Director-General Audrey Azoulay. \"Without decisive intervention, we risk a generation of students being left permanently behind.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3",
    category: "Education",
    readTime: "4 min read",
    date: "2023-10-13T15:15:00Z",
    author: {
      name: "Emma Okonjo",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg",
      role: "Education Policy Analyst"
    },
    tags: ["Education", "Digital Divide", "UNESCO"]
  },
  {
    _id: "9",
    title: "Space Tourism Company Announces First Lunar Orbit Package",
    excerpt: "Private space venture unveils plans for civilian lunar trips beginning 2026.",
    content: "<p>In a development that would have seemed like science fiction just a decade ago, Celestial Journeys has unveiled plans to take private citizens on trips around the Moon starting in 2026.</p><p>The company's \"Lunar Voyager\" program will utilize its next-generation spacecraft to carry up to six passengers on a six-day journey, including a close lunar orbit with spectacular views of both the Moon's surface and Earth from space.</p><p>\"This represents the dawn of a new era in human space exploration,\" said Celestial Journeys founder and CEO Alexandra Martinez. \"For the first time in history, experiencing cislunar space will not be limited to government astronauts but open to anyone with the desire and means to go.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3",
    category: "Space",
    readTime: "5 min read",
    date: "2023-10-13T09:40:00Z",
    author: {
      name: "Jonathan Kim",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      role: "Aerospace Correspondent"
    },
    tags: ["Space", "Tourism", "Technology"]
  },
  {
    _id: "10",
    title: "Renowned Artist's Lost Masterpiece Discovered in Attic",
    excerpt: "Painting valued at over $25 million was hidden in plain sight for decades.",
    content: "<p>An art authentication committee has confirmed that a painting discovered in the attic of a French countryside home is indeed the long-lost masterpiece \"Woman by the Window\" by impressionist painter Claude Monet, missing since 1939.</p><p>The artwork, last documented in a private collection in Paris before World War II, apparently changed hands several times during the war before ending up with a family who had no idea of its significance or value.</p><p>\"The family simply thought it was a pleasant landscape by an unknown artist,\" explained Michel Dubois of the Louvre Authentication Department. \"It had been hanging in their attic stairwell for at least 50 years. The current owner inherited the house from his grandmother and decided to have some old paintings appraised during a renovation.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-4.0.3",
    category: "Art",
    readTime: "4 min read",
    date: "2023-10-12T14:55:00Z",
    author: {
      name: "Isabella Rossi",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      role: "Arts & Culture Editor"
    },
    tags: ["Art", "History", "Discovery"]
  },
  {
    _id: "11",
    title: "Study Finds Surprising Link Between Gut Bacteria and Brain Function",
    excerpt: "Research reveals intestinal microbiome may influence cognitive abilities and mental health.",
    content: "<p>A groundbreaking study published in the journal Nature Neuroscience has established compelling evidence of a direct connection between specific gut bacteria and brain function, potentially revolutionizing our approach to cognitive and mental health disorders.</p><p>The research, conducted across seven international universities, found that certain bacterial strains produce compounds that can cross the blood-brain barrier and influence neural activity in regions associated with memory, focus, and emotional regulation.</p><p>\"We've suspected a gut-brain connection for years, but this study provides the most concrete evidence yet of specific metabolic pathways,\" explained Dr. Hiroshi Tanaka, the study's lead author. \"What's particularly exciting is that these bacterial populations can be modified through dietary interventions, suggesting new therapeutic approaches for conditions ranging from ADHD to depression.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1559757175-7cb056fba93d?ixlib=rb-4.0.3",
    category: "Health",
    readTime: "7 min read",
    date: "2023-10-12T11:25:00Z",
    author: {
      name: "Dr. Marcus Reid",
      avatar: "https://randomuser.me/api/portraits/men/81.jpg",
      role: "Health Science Reporter"
    },
    tags: ["Medical Research", "Neuroscience", "Health"]
  },
  {
    _id: "12",
    title: "Global Shipping Disrupted by Major Cyber Attack",
    excerpt: "Ransomware incident has paralyzed operations at world's largest shipping container company.",
    content: "<p>A sophisticated ransomware attack has crippled the operations of Maritime Global Logistics, the world's largest shipping container company, bringing international trade to a partial standstill and threatening global supply chains.</p><p>The attack, which began late Tuesday night, has disabled the company's central booking system, container tracking capabilities, and automated port management systems. As of this morning, 73 major ports across 36 countries have reported significant operational disruptions.</p><p>\"This is potentially the most disruptive cyber attack on global trade we've ever seen,\" said Cybersecurity expert Rebecca Torres. \"With nearly 20% of the world's shipping containers handled by MGL, the ripple effects will impact everything from consumer electronics to food supplies if the situation isn't resolved quickly.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3",
    category: "Cybersecurity",
    readTime: "5 min read",
    date: "2023-10-11T16:10:00Z",
    author: {
      name: "Alan Mehta",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
      role: "Technology & Security Correspondent"
    },
    tags: ["Cybersecurity", "Global Trade", "Technology"]
  }
];

const NewspaperView = () => {
  const { toast } = useToast();
  const [apiConfig, setApiConfig] = useState<{
    baseUrl: string;
    endpoints: {
      articles: string;
    };
  }>({
    baseUrl: "http://13.232.139.240:5000",
    endpoints: {
      articles: "/api/articles",
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [articleInFocus, setArticleInFocus] = useState<Article | null>(null);
  const maxPages = 3;
  const scrollRef = useRef<HTMLDivElement>(null);
  
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
  
  const itemsPerPage = 4;
  const displayedArticles = articles.slice(
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

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Helmet>
        <title>Newspaper | TheBoolean Times</title>
        <meta name="description" content="Latest news in traditional newspaper format" />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-20 pb-10 bg-gray-200">
        <ScrollArea className="h-[calc(100vh-8rem)]" ref={scrollRef}>
          <div className="container max-w-6xl mx-auto bg-white border border-gray-300 shadow-md py-8 px-4 md:px-10">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {displayedArticles.map((article, index) => (
                    <motion.div 
                      key={article._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative border border-gray-200 p-4 newspaper-article"
                    >
                      <div className="mb-3 flex justify-between items-start">
                        <h3 className="font-serif text-xl font-bold leading-tight">
                          {article.title}
                        </h3>
                        
                        <div className="flex gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => shareArticle(article, "whatsapp")}>
                                Share on WhatsApp
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => shareArticle(article, "facebook")}>
                                <Facebook className="h-4 w-4 mr-2" /> Facebook
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => shareArticle(article, "twitter")}>
                                <Twitter className="h-4 w-4 mr-2" /> Twitter
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => shareArticle(article, "copy")}>
                                Copy Link
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 rounded-full p-0"
                                onClick={() => setArticleInFocus(article)}
                              >
                                <Bookmark className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl h-[80vh] overflow-auto">
                              <div className="font-serif p-4">
                                <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
                                <div className="flex items-center justify-between mb-4 text-sm">
                                  <div>By {article.author.name}</div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {article.readTime}
                                  </div>
                                </div>
                                
                                {article.imageUrl && (
                                  <div className="mb-4">
                                    <img
                                      src={article.imageUrl}
                                      alt={article.title}
                                      className="w-full h-auto grayscale"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                                      }}
                                    />
                                  </div>
                                )}
                                
                                <div 
                                  className="prose prose-stone max-w-none"
                                  dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                                
                                <div className="mt-4 flex justify-between items-center">
                                  <div className="flex gap-2">
                                    {article.tags.map(tag => (
                                      <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => shareArticle(article, "copy")}
                                    >
                                      <Share2 className="h-4 w-4 mr-2" /> Share
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <span className="bg-black text-white text-xs px-2 py-1 uppercase font-medium">
                          {article.category}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {index === 0 && article.imageUrl && (
                          <div className="md:col-span-1">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-full h-auto grayscale"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                          </div>
                        )}
                        
                        <div className={`${index === 0 && article.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}`}>
                          <p className="font-serif text-base leading-snug text-justify">
                            {getExcerpt(article.content || article.excerpt, index === 0 ? 400 : 250)}
                          </p>
                          
                          <div className="flex justify-between items-center mt-3 text-xs">
                            <span className="italic">Continued on page {currentPage + 1}...</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {article.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="border-t-2 border-black pt-4 mt-8">
                  <div className="text-center mb-4">
                    <h4 className="font-serif text-lg font-bold uppercase mb-2">CLASSIFIEDS</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs border-b border-gray-300 pb-4 mb-4">
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
                    <div className="border p-2">
                      <p className="font-bold">SERVICES</p>
                      <p>Professional photography for all occasions. Reasonable rates. Portfolio available.</p>
                    </div>
                  </div>
                  
                  <div className="font-serif text-xs text-center">
                    <p>© {new Date().getFullYear()} The Boolean Times • All Rights Reserved</p>
                    <p>For subscriptions, call (555) 867-5309 • For advertising inquiries: ads@booleantimes.com</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
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