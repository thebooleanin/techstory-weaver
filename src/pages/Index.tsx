
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import ArticleCard from '@/components/ArticleCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BookOpen, Headphones, Calendar, TrendingUp, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock data for featured articles
const featuredArticles = [
  {
    id: '1',
    title: 'The Future of AI in Indian Healthcare Systems',
    excerpt: 'How artificial intelligence is revolutionizing healthcare delivery across urban and rural India.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Healthcare',
    readTime: '6 min',
    date: 'May 15, 2023'
  },
  {
    id: '2',
    title: 'Building Sustainable Smart Cities: The Bangalore Model',
    excerpt: 'How India\'s tech capital is implementing green technology for urban development and sustainability.',
    imageUrl: 'https://images.unsplash.com/photo-1599930113854-d6d7fd522214?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Smart Cities',
    readTime: '4 min',
    date: 'June 2, 2023'
  },
  {
    id: '3',
    title: 'The Rise of FinTech Startups in Tier-2 Indian Cities',
    excerpt: 'How financial technology is creating economic opportunities beyond metropolitan areas.',
    imageUrl: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'FinTech',
    readTime: '5 min',
    date: 'June 10, 2023'
  }
];

// Featured stories
const featuredStories = [
  {
    id: '1',
    title: 'From Village to Tech Leader: My Journey in Programming',
    excerpt: 'Rajesh Kumar shares his inspiring story of learning to code in rural Maharashtra and eventually leading a tech team in Mumbai.',
    imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    duration: '5 min',
    author: 'Rajesh Kumar',
    category: 'Personal Journey'
  },
  {
    id: '2',
    title: 'How We Built a Solar-Powered Education Platform for Rural Schools',
    excerpt: 'Priya Sharma explains how her team created technology solutions for schools without reliable electricity.',
    imageUrl: 'https://images.unsplash.com/photo-1532104940730-eec9c1ea2298?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    duration: '5 min',
    author: 'Priya Sharma',
    category: 'Education Tech'
  },
  {
    id: '3',
    title: 'Creating an Accessible Healthcare App for Multilingual India',
    excerpt: 'Arjun Mehta discusses the challenges of designing for language diversity and low digital literacy.',
    imageUrl: 'https://images.unsplash.com/photo-1576671414121-aa2d80c2d090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    duration: '5 min',
    author: 'Arjun Mehta',
    category: 'Healthcare'
  },
];

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
  { icon: <Award className="h-10 w-10 text-[#FF9933]" />, value: 'Most Innovative Content', label: 'TechMedia Awards 2023' },
  { icon: <TrendingUp className="h-10 w-10 text-[#FF9933]" />, value: '97%', label: 'YoY Growth Rate' },
  { icon: <Star className="h-10 w-10 text-[#FF9933]" />, value: '4.9/5', label: 'Client Satisfaction' },
  { icon: <Users className="h-10 w-10 text-[#FF9933]" />, value: '10+', label: 'States Served in India' },
];

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [siteConfig, setSiteConfig] = useState<any>(null);

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

  // Get colors from site config or use defaults (Indian flag colors)
  const primaryColor = siteConfig?.colors?.primary || '#FF9933'; // Saffron
  const secondaryColor = siteConfig?.colors?.secondary || '#138808'; // Green

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Key Highlights Section */}
      <section className="py-12 bg-gradient-to-r from-[#FF9933]/5 to-[#138808]/5">
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
                <div className="text-xl font-bold text-[#FF9933] mb-1">{highlight.value}</div>
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
                className="inline-block mb-3 px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] text-xs font-medium rounded-full"
                style={{ backgroundColor: `${primaryColor}/10`, color: primaryColor }}
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
              className="inline-flex items-center text-[#FF9933] font-medium hover:underline group"
              style={{ color: primaryColor }}
            >
              View all articles
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                {...article}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Storytelling Section */}
      <section className="py-20 bg-[#138808]/5">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-3 py-1 bg-[#138808]/10 text-[#138808] text-xs font-medium rounded-full"
              style={{ backgroundColor: `${secondaryColor}/10`, color: secondaryColor }}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-black/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={story.imageUrl} 
                    alt={story.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-2 py-1 bg-[#FF9933] text-white text-xs rounded-full">
                      {story.category}
                    </span>
                    <div className="flex items-center mt-2 text-white/90 text-sm">
                      <Headphones className="w-4 h-4 mr-1" />
                      {story.duration}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF9933] transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {story.excerpt}
                  </p>
                  <p className="text-sm text-muted-foreground">By {story.author}</p>
                </div>
                <div className="px-6 pb-6">
                  <Link 
                    to={`/storytelling`} 
                    className="inline-flex items-center text-sm text-[#FF9933] font-medium"
                  >
                    Listen to story
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
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
              className="inline-block mb-3 px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] text-xs font-medium rounded-full"
              style={{ backgroundColor: `${primaryColor}/10`, color: primaryColor }}
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
                className="bg-white dark:bg-black/10 rounded-lg p-6 border border-[#FF9933]/10 hover:border-[#FF9933]/30 transition-all hover:shadow-md"
              >
                <div className="inline-block mb-4 px-2 py-1 bg-[#138808]/10 text-[#138808] text-xs rounded-full">
                  {event.type}
                </div>
                <h3 className="text-xl font-bold mb-4 hover:text-[#FF9933] transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-[#FF9933]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-4 h-4 mr-2 text-[#FF9933]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-4 h-4 mr-2 text-[#FF9933]" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-[#FF9933] text-[#FF9933] hover:bg-[#FF9933]/10">
                  Register Now
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#FF9933] to-[#FF9933]/80 text-white">
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
              />
              <Button type="submit" className="bg-white text-[#FF9933] hover:bg-white/90">
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
                <BookOpen className="w-5 h-5 mr-2 text-[#FF9933]" />
                Latest Articles
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/articles" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    Tech Innovations in Rural India
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    The Rise of Indian SaaS Companies
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    Women Leaders in Indian Tech
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    Sustainable Technology Solutions for Urban India
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center">
                <Headphones className="w-5 h-5 mr-2 text-[#FF9933]" />
                Popular Stories
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/storytelling" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    Building Accessible Apps for Rural Communities
                  </Link>
                </li>
                <li>
                  <Link to="/storytelling" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    From College Dropout to Tech Founder
                  </Link>
                </li>
                <li>
                  <Link to="/storytelling" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    Creating AI Solutions for Indian Languages
                  </Link>
                </li>
                <li>
                  <Link to="/storytelling" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    Breaking the Glass Ceiling in Tech
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#FF9933]" />
                Upcoming Events
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    Tech for Good: India Edition
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    Web Development Masterclass
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
                    AI in Indian Healthcare Symposium
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-[#FF9933] transition-colors">
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
