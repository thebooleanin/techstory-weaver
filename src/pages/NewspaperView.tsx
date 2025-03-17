
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Newspaper, Clock, Calendar, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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

  // Load API configuration from site config
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

  // Fetch articles with React Query
  const {
    data: articlesData,
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
          description: "Failed to fetch articles. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: !!apiConfig.baseUrl,
  });

  const articles = articlesData || [];
  
  // Split articles for different sections
  const featuredArticle = articles[0] || null;
  const secondaryArticles = articles.slice(1, 3) || [];
  const columnArticles = articles.slice(3, 8) || [];
  const bottomArticles = articles.slice(8, 12) || [];

  // Format date string
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

  // Extract first paragraph for excerpt
  const getExcerpt = (content: string, maxLength = 150) => {
    // Remove HTML tags
    const textOnly = content.replace(/<\/?[^>]+(>|$)/g, "");
    
    // Limit length and add ellipsis if needed
    if (textOnly.length <= maxLength) return textOnly;
    return textOnly.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Helmet>
        <title>Newspaper | TheBoolean</title>
        <meta name="description" content="Latest news in newspaper format" />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto pt-28 pb-16 px-4 md:px-6">
        {/* Newspaper Header */}
        <div className="border-b-4 border-black mb-8">
          <div className="text-center mb-4">
            <h1 className="font-serif text-5xl md:text-7xl font-bold uppercase tracking-tight">
              THE BOOLEAN TIMES
            </h1>
            <div className="flex justify-center items-center gap-4 text-sm mt-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(new Date().toISOString())}
              </div>
              <div>|</div>
              <div>DAILY EDITION</div>
              <div>|</div>
              <div className="flex items-center">
                <Newspaper className="h-4 w-4 mr-1" />
                Vol. 1, No. 1
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
            <div className="text-2xl font-serif">Failed to load articles</div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
              {/* Featured Article */}
              {featuredArticle ? (
                <div className="md:col-span-8 border-r border-gray-300 pr-8">
                  <Link to={`/articles/${featuredArticle._id}`}>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 hover:text-gray-700">
                        {featuredArticle.title}
                      </h2>
                      
                      <div className="mb-4">
                        <img 
                          src={featuredArticle.imageUrl || "/placeholder.svg"} 
                          alt={featuredArticle.title}
                          className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      
                      <div className="text-sm mb-3 flex items-center justify-between">
                        <span className="font-medium">By {featuredArticle.author?.name || "Staff Reporter"}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featuredArticle.readTime}
                        </span>
                      </div>
                      
                      <p className="font-serif text-base leading-relaxed">
                        {getExcerpt(featuredArticle.content || featuredArticle.excerpt, 400)}
                      </p>
                      
                      <div className="mt-4 font-serif text-sm font-medium italic flex items-center">
                        Continue reading 
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ) : null}
              
              {/* Secondary Articles */}
              <div className="md:col-span-4">
                {secondaryArticles.map((article, index) => (
                  <motion.div 
                    key={article._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`mb-6 ${index !== secondaryArticles.length - 1 ? "pb-6 border-b border-gray-200" : ""}`}
                  >
                    <Link to={`/articles/${article._id}`}>
                      <h3 className="font-serif text-xl font-bold mb-2 hover:text-gray-700">
                        {article.title}
                      </h3>
                      
                      <p className="font-serif text-sm mb-2">
                        {getExcerpt(article.content || article.excerpt, 120)}
                      </p>
                      
                      <div className="text-xs text-gray-600 flex items-center justify-between">
                        <span>By {article.author?.name || "Staff Reporter"}</span>
                        <span>{formatDate(article.date)}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <Separator className="my-8 border-black" />
            
            {/* Columns Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {columnArticles.map((article, index) => (
                <motion.div 
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-r last:border-r-0 border-gray-300 pr-4"
                >
                  <Link to={`/articles/${article._id}`}>
                    <div className="font-serif">
                      <div className="mb-3">
                        <span className="bg-black text-white px-3 py-1 text-xs uppercase">
                          {article.category || "News"}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-bold mb-3 hover:text-gray-700">
                        {article.title}
                      </h4>
                      
                      <p className="text-sm leading-relaxed mb-3">
                        {getExcerpt(article.content || article.excerpt, 120)}
                      </p>
                      
                      <div className="text-xs text-gray-600">
                        By {article.author?.name || "Staff Reporter"}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <Separator className="my-8 border-black" />
            
            {/* Bottom Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bottomArticles.map((article, index) => (
                <motion.div 
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={`/articles/${article._id}`}>
                    <div className="font-serif">
                      <div className="mb-3 aspect-[4/3] overflow-hidden">
                        <img 
                          src={article.imageUrl || "/placeholder.svg"} 
                          alt={article.title}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      
                      <h5 className="text-base font-bold mb-2 hover:text-gray-700 line-clamp-2">
                        {article.title}
                      </h5>
                      
                      <p className="text-xs leading-relaxed line-clamp-3">
                        {getExcerpt(article.content || article.excerpt, 80)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* View More Articles Button */}
            <div className="mt-10 text-center">
              <Link to="/articles">
                <Button variant="outline" className="border-black hover:bg-black hover:text-white transition-colors">
                  View All Articles
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default NewspaperView;
