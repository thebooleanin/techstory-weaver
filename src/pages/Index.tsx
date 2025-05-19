
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import ArticleCard from '@/components/ArticleCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileTabNav from '@/components/MobileTabNav';
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
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // Article category filter
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // Load site config from localStorage once
  useEffect(() => {
    const config = localStorage.getItem('siteConfig');
    if (config) {
      setSiteConfig(JSON.parse(config));
    }
  }, []);

  // Fetch stories when siteConfig and page change
  useEffect(() => {
    const fetchStoriesPage = async () => {
      if (!siteConfig?.apiEndpoints?.stories || isLoading || !hasMore) return;
      setIsLoading(true);
      try {
        const apiUrl = siteConfig.apiEndpoints.stories;
        const newStories = await fetchStories(page, 10, apiUrl);
        setStories(prev => page === 1 ? newStories : [...prev, ...newStories]);
        setHasMore(newStories.length === 10);
      } catch (e) {
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStoriesPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteConfig?.apiEndpoints?.stories, page]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight &&
        !isLoading && hasMore
      ) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);


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
    
    return () => clearTimeout(timer);
  }, []);

  // Modern color scheme - get from site config or use defaults
  const primaryColor = siteConfig?.colors?.primary || '#6366F1'; // Indigo
  const secondaryColor = siteConfig?.colors?.secondary || '#EC4899'; // Pink

  // SEO metadata 
  const siteTitle = siteConfig?.seo?.title || 'TheBoolean - India\'s Premier Tech Agency';
  const siteDescription = siteConfig?.seo?.description || 'Discover the latest in tech, digital transformation, and innovation through engaging articles and exclusive 5-minute storytelling sessions from across India.';
  const siteKeywords = siteConfig?.seo?.keywords || 'tech, india, storytelling, innovation, digital transformation';

  // Render stories (replace this with your card/component as needed)
  const renderStories = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {stories.map(story => (
        <ArticleCard
  key={story._id}
  _id={story._id}
  title={story.title}
  excerpt={story.description || ''}
  imageUrl={story.imageUrl || ''}
  category={story.category || ''}
  readTime={story.duration || ''}
  date={story.date || ''}
/>
      ))}
      {isLoading && <div className="col-span-full text-center py-4">Loading more...</div>}
      {!hasMore && <div className="col-span-full text-center py-4 text-gray-400">No more stories.</div>}
    </div>
  );

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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map(story => (
              <ArticleCard
                key={story._id}
                _id={story._id}
                title={story.title}
                excerpt={story.description || ''}
                imageUrl={story.imageUrl || ''}
                category={story.category || ''}
                tags={story.tags || []}
                readTime={story.duration || ''}
                date={story.date || ''}
              />
            ))}
          </div>

          {/* 5-minute Tech Stories Section */}
          <div className="mt-20">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-16">
              <div className="mb-6 sm:mb-0">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full"
                  style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                >
                  5-Minute Stories
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold"
                >
                  6-Min Tech Stories
                </motion.h2>
              </div>
              <Link
                to="/storytelling"
                className="inline-flex items-center font-medium hover:underline group"
                style={{ color: primaryColor }}
              >
                View all stories
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.filter(story => story.duration && parseInt(story.duration) <= 6).map(story => (
                <ArticleCard
                  key={story._id}
                  _id={story._id}
                  title={story.title}
                  excerpt={story.description || ''}
                  imageUrl={story.imageUrl || ''}
                  category={story.category || ''}
                  tags={story.tags || []}
                  readTime={story.duration || ''}
                  date={story.date || ''}
                />
              ))}
            </div>
          </div>
          {renderStories()}
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
          ) : stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <ArticleCard
                  key={story._id}
                  _id={story._id}
                  title={story.title}
                  excerpt={story.description || ''}
                  imageUrl={story.imageUrl || ''}
                  category={story.category || ''}
                  readTime={story.duration || ''}
                  date={story.date || ''}
                  delay={index * 0.1}
                />
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
      

      {/* Call to Action */}
      {/* Article Filter and Dynamic Articles Section */}
      <section className="py-10">
        <div className="container">
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-0">Latest Articles</h2>
            {/* Filter Bar */}
            <nav aria-label="Article categories" className="flex flex-wrap gap-2">
              {['All', 'Startup', 'SaaS', 'Technology', 'Innovation', 'Funding', 'Women in Tech', 'AI', 'Events'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat === 'All' ? '' : cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${categoryFilter === cat || (cat === 'All' && !categoryFilter) ? 'bg-primary text-white border-primary' : 'bg-white border-border text-foreground hover:bg-primary/10'}`}
                  aria-pressed={categoryFilter === cat || (cat === 'All' && !categoryFilter)}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </header>
          <div>
            {/* Render filtered articles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.filter(story => !categoryFilter || story.category === categoryFilter).length ? (
                stories.filter(story => !categoryFilter || story.category === categoryFilter).map(story => (
                  <ArticleCard
                    key={story._id}
                    _id={story._id}
                    title={story.title}
                    excerpt={story.description || ''}
                    imageUrl={story.imageUrl || ''}
                    category={story.category || ''}
                    readTime={story.duration || ''}
                    date={story.date || ''}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">No articles found for this category.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Call-to-Action */}
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
            {/* Use the shared NewsletterSignup component for consistency */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      {/* Mobile Tab Navigation */}
      <MobileTabNav />
    </div>
  );
};

export default Index;
