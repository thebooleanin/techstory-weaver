
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import ArticleCard from '@/components/ArticleCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BookOpen, Headphones, Calendar, TrendingUp, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

// Create a reusable API service for stories
import { fetchStories } from '@/services/api';
import { Story } from '@/types/story';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [featuredArticles, setFeaturedArticles] = useState([
    {
      _id: '1',
      title: 'The Future of AI in Indian Healthcare Systems',
      excerpt: 'How artificial intelligence is revolutionizing healthcare delivery across urban and rural India.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      category: 'Healthcare',
      readTime: '6 min',
      date: 'May 15, 2023'
    },
    {
      _id: '2',
      title: 'Building Sustainable Smart Cities: The Bangalore Model',
      excerpt: 'How India\'s tech capital is implementing green technology for urban development and sustainability.',
      imageUrl: 'https://images.unsplash.com/photo-1599930113854-d6d7fd522214?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      category: 'Smart Cities',
      readTime: '4 min',
      date: 'June 2, 2023'
    },
    {
      _id: '3',
      title: 'The Rise of FinTech Startups in Tier-2 Indian Cities',
      excerpt: 'How financial technology is creating economic opportunities beyond metropolitan areas.',
      imageUrl: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      category: 'FinTech',
      readTime: '5 min',
      date: 'June 10, 2023'
    }
  ]);
  
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set visibility after a short delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Load site config from localStorage
    const config = localStorage.getItem('siteConfig');
    if (config) {
      setSiteConfig(JSON.parse(config));
    }
    
    // Fetch stories from API
    const loadStories = async () => {
      try {
        setIsLoading(true);
        const apiUrl = siteConfig?.apiEndpoints?.stories || 'http://13.200.161.40:5000/api/stories';
        const stories = await fetchStories(apiUrl);
        
        // Filter featured stories (up to 3)
        const featured = stories
          .filter(story => story.featured)
          .slice(0, 3);
          
        setFeaturedStories(featured.length > 0 ? featured : stories.slice(0, 3));
      } catch (error) {
        console.error('Failed to load stories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStories();
    
    return () => clearTimeout(timer);
  }, [siteConfig]);

  // Modern color scheme - get from site config or use defaults
  const primaryColor = siteConfig?.colors?.primary || '#6366F1'; // Indigo
  const secondaryColor = siteConfig?.colors?.secondary || '#EC4899'; // Pink

  // SEO metadata 
  const siteTitle = siteConfig?.seo?.title || 'TheBoolean - India\'s Premier Tech Agency';
  const siteDescription = siteConfig?.seo?.description || 'Discover the latest in tech, digital transformation, and innovation through engaging articles and exclusive 5-minute storytelling sessions from across India.';
  const siteKeywords = siteConfig?.seo?.keywords || 'tech, india, storytelling, innovation, digital transformation';

  // Upcoming events
  const upcomingEvents = [
    {
      id: '1',
      title: 'Decoding the Future: AI in Indian Agriculture',
      date: 'July 15, 2023',
      time: '6:00 PM IST',
      location: 'Online Webinar',
      type: 'Webinar',
    },
    {
      id: '2',
      title: 'Women in Tech: Breaking Barriers in Indian Startups',
      date: 'July 22, 2023',
      time: '5:30 PM IST',
      location: 'TheBoolean HQ, Bangalore',
      type: 'Panel Discussion',
    },
    {
      id: '3',
      title: 'Hack for India: National Coding Challenge',
      date: 'August 5-7, 2023',
      time: 'All day',
      location: 'Multiple locations across India',
      type: 'Hackathon',
    },
  ];

  // Key highlights
  const keyHighlights = [
    { icon: <Award className="h-10 w-10" style={{ color: primaryColor }} />, value: 'Most Innovative Content', label: 'TechMedia Awards 2023' },
    { icon: <TrendingUp className="h-10 w-10" style={{ color: primaryColor }} />, value: '97%', label: 'YoY Growth Rate' },
    { icon: <Star className="h-10 w-10" style={{ color: primaryColor }} />, value: '4.9/5', label: 'Client Satisfaction' },
    { icon: <Users className="h-10 w-10" style={{ color: primaryColor }} />, value: '10+', label: 'States Served in India' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theboolean.in" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <link rel="canonical" href="https://theboolean.in" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Key Highlights Section */}
      <section className="py-12 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {keyHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">{highlight.icon}</div>
                <div className="text-xl font-bold mb-1" style={{ color: primaryColor }}>{highlight.value}</div>
                <div className="text-sm text-muted-foreground">{highlight.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-16">
            <div className="mb-6 sm:mb-0">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full"
                style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
              >
                Featured Articles
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold"
              >
                Latest Tech Insights from India
              </motion.h2>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center font-medium hover:underline group"
              style={{ color: primaryColor }}
            >
              View all articles
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <ArticleCard
                key={article._id}
                _id={article._id}
                title={article.title}
                excerpt={article.excerpt}
                imageUrl={article.imageUrl}
                category={article.category}
                readTime={article.readTime}
                date={article.date}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Storytelling Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full"
              style={{ backgroundColor: `${secondaryColor}20`, color: secondaryColor }}
            >
              Featured Stories
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              5-Minute Tech Stories from Across India
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground"
            >
              Listen to inspiring tech stories from entrepreneurs, innovators, and creators from all corners of India.
            </motion.p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/80 rounded-lg overflow-hidden shadow-sm h-[400px] animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredStories.map((story, index) => (
                <motion.div
                  key={story._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={story.imageUrl || '/placeholder.svg'} 
                      alt={story.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-2 py-1 text-white text-xs rounded-full" style={{ backgroundColor: primaryColor }}>
                        {story.category}
                      </span>
                      <div className="flex items-center mt-2 text-white/90 text-sm">
                        <Headphones className="w-4 h-4 mr-1" />
                        {story.duration}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {story.description || "A compelling tech story from across India."}
                    </p>
                    <p className="text-sm text-muted-foreground">By {story.author}</p>
                  </div>
                  <div className="px-6 pb-6">
                    <Link 
                      to={`/storytelling/${story._id}`} 
                      className="inline-flex items-center text-sm font-medium"
                      style={{ color: primaryColor }}
                    >
                      Listen to story
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white/50 rounded-lg shadow-sm">
              <p className="text-muted-foreground">No stories found. Check back soon for exciting tech stories!</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/storytelling">
                Explore All Stories
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full"
              style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
            >
              Upcoming Events
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Join Our Tech Community
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground"
            >
              Attend our webinars, workshops, and meetups to connect with like-minded tech enthusiasts.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border hover:border-indigo-200 transition-all hover:shadow-md"
                style={{ borderColor: `${primaryColor}10` }}
              >
                <div className="inline-block mb-4 px-2 py-1 text-xs rounded-full"
                  style={{ backgroundColor: `${secondaryColor}10`, color: secondaryColor }}
                >
                  {event.type}
                </div>
                <h3 className="text-xl font-bold mb-4 hover:text-indigo-600 transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" style={{ color: primaryColor }} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-4 h-4 mr-2" style={{ color: primaryColor }} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-4 h-4 mr-2" style={{ color: primaryColor }} />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="hover:bg-indigo-50"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Register Now
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 text-white" style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}>
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Transform Your Tech Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white/90 mb-8 max-w-xl mx-auto"
            >
              Subscribe to our newsletter to receive the latest tech stories, articles, and event invitations.
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg flex-1 text-foreground outline-none focus:ring-2 focus:ring-white/20"
                aria-label="Email address"
              />
              <Button type="submit" className="bg-white hover:bg-white/90 text-indigo-600">
                Subscribe
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
      
      {/* Quick Links Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center">
                <BookOpen className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Latest Articles
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/articles" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    Tech Innovations in Rural India
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    The Rise of Indian SaaS Companies
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    Women Leaders in Indian Tech
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    Sustainable Technology Solutions for Urban India
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center">
                <Headphones className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Popular Stories
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/storytelling" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    Building Accessible Apps for Rural Communities
                  </Link>
                </li>
                <li>
                  <Link to="/storytelling" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    From College Dropout to Tech Founder
                  </Link>
                </li>
                <li>
                  <Link to="/storytelling" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    Creating AI Solutions for Indian Languages
                  </Link>
                </li>
                <li>
                  <Link to="/storytelling" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    Breaking the Glass Ceiling in Tech
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center">
                <Calendar className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Upcoming Events
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    Tech for Good: India Edition
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    Web Development Masterclass
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    AI in Indian Healthcare Symposium
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    Startup Funding Workshop
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
