
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import ArticleCard from '@/components/ArticleCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Code, Database, Globe, Smartphone, PlayCircle, Headphones, ChevronRight, Star, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TestimonialSlider from '@/components/TestimonialSlider';

// Mock data for articles
const featuredArticles = [
  {
    id: '1',
    title: 'The Future of Electric Vehicles: Beyond Tesla',
    excerpt: 'Exploring the next generation of EVs and the companies leading the charge in sustainable transportation.',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a56bbc8fbf7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Cars',
    readTime: '6 min',
    date: 'May 15, 2023'
  },
  {
    id: '2',
    title: 'Mountain Biking Revolution: Smart Bikes That Track Your Ride',
    excerpt: 'How modern technology is transforming the mountain biking experience with real-time metrics and trail navigation.',
    imageUrl: 'https://images.unsplash.com/photo-1606886993363-0d9f25400641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Bikes',
    readTime: '4 min',
    date: 'June 2, 2023'
  },
  {
    id: '3',
    title: 'AI in Your Pocket: The New Generation of Smartphone Assistants',
    excerpt: 'How the latest AI advancements are creating more helpful and intuitive smartphone assistants.',
    imageUrl: 'https://images.unsplash.com/photo-1585236904508-d9f6292e583c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Gadgets',
    readTime: '5 min',
    date: 'June 10, 2023'
  }
];

const storyPreview = {
  id: '1',
  title: 'Building Resilience: My Journey from Startup Failure to Success',
  excerpt: 'Tech entrepreneur Sarah Chen shares her five-minute story of perseverance through the challenges of her first failed startup and how it led to her current success.',
  imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
  duration: '5 min',
  author: 'Sarah Chen',
  category: 'Entrepreneurship'
};

// Mock testimonials
const testimonials = [
  {
    id: '1',
    name: 'David Johnson',
    role: 'CTO, InnovateTech',
    content: 'Working with this team transformed our digital presence. Their expertise in software development and commitment to quality delivered results beyond our expectations.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    rating: 5
  },
  {
    id: '2',
    name: 'Emily Rodriguez',
    role: 'Marketing Director, Growth Solutions',
    content: 'The storytelling approach they brought to our content strategy has significantly increased user engagement. Our audience connects with our brand on a deeper level now.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    rating: 5
  },
  {
    id: '3',
    name: 'Michael Chang',
    role: 'Founder, BikeTerrains',
    content: 'Their technical knowledge combined with a passion for storytelling made them the perfect partner for our cycling tech platform. User retention has increased by 40% since launch.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    rating: 4
  }
];

const statsContent = [
  { icon: <Trophy className="h-10 w-10 text-primary" />, value: '20+', label: 'Industry Awards' },
  { icon: <Users className="h-10 w-10 text-primary" />, value: '500+', label: 'Happy Clients' },
  { icon: <Star className="h-10 w-10 text-primary" />, value: '99%', label: 'Satisfaction Rate' },
  { icon: <Globe className="h-10 w-10 text-primary" />, value: '15+', label: 'Countries Served' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set visibility after a short delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'all', label: 'All Services' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'content', label: 'Content Creation' }
  ];

  // Filter services based on active tab
  const filteredServices = () => {
    if (activeTab === 'all') return [
      { title: "Web Development", description: "Custom websites and web applications built with the latest technologies for optimal performance and user experience.", icon: <Globe className="h-6 w-6" />, href: "/services", delay: 0, category: 'web' },
      { title: "Mobile Applications", description: "Native and cross-platform mobile apps that deliver seamless experiences across iOS and Android devices.", icon: <Smartphone className="h-6 w-6" />, href: "/services", delay: 1, category: 'mobile' },
      { title: "Software Development", description: "End-to-end software development services, from requirements gathering to deployment and maintenance.", icon: <Code className="h-6 w-6" />, href: "/services", delay: 2, category: 'web' },
      { title: "Database Solutions", description: "Efficient database design, optimization, and management to ensure your data is secure and accessible.", icon: <Database className="h-6 w-6" />, href: "/services", delay: 3, category: 'web' },
      { title: "Video Content", description: "Professional video production for product demonstrations, tutorials, and marketing campaigns.", icon: <PlayCircle className="h-6 w-6" />, href: "/services", delay: 4, category: 'content' },
      { title: "Audio Production", description: "High-quality audio content for podcasts, storytelling, and other multimedia projects.", icon: <Headphones className="h-6 w-6" />, href: "/services", delay: 5, category: 'content' }
    ];
    
    return [
      { title: "Web Development", description: "Custom websites and web applications built with the latest technologies for optimal performance and user experience.", icon: <Globe className="h-6 w-6" />, href: "/services", delay: 0, category: 'web' },
      { title: "Mobile Applications", description: "Native and cross-platform mobile apps that deliver seamless experiences across iOS and Android devices.", icon: <Smartphone className="h-6 w-6" />, href: "/services", delay: 1, category: 'mobile' },
      { title: "Software Development", description: "End-to-end software development services, from requirements gathering to deployment and maintenance.", icon: <Code className="h-6 w-6" />, href: "/services", delay: 2, category: 'web' },
      { title: "Database Solutions", description: "Efficient database design, optimization, and management to ensure your data is secure and accessible.", icon: <Database className="h-6 w-6" />, href: "/services", delay: 3, category: 'web' },
      { title: "Video Content", description: "Professional video production for product demonstrations, tutorials, and marketing campaigns.", icon: <PlayCircle className="h-6 w-6" />, href: "/services", delay: 4, category: 'content' },
      { title: "Audio Production", description: "High-quality audio content for podcasts, storytelling, and other multimedia projects.", icon: <Headphones className="h-6 w-6" />, href: "/services", delay: 5, category: 'content' }
    ].filter(service => service.category === activeTab);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {statsContent.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              Our Services
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Expert Software Development & Technology Solutions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground"
            >
              We deliver cutting-edge software solutions tailored to your business needs, 
              combining technical expertise with industry knowledge.
            </motion.p>
          </div>
          
          {/* Service tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <div className="inline-flex p-1 bg-muted/80 backdrop-blur-sm rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredServices().map((service, index) => (
                <ServiceCard
                  key={`${service.title}-${index}`}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  href={service.href}
                  delay={index * 0.1}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              Client Testimonials
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground"
            >
              Don't just take our word for it. Here's what clients have to say about their experiences working with us.
            </motion.p>
          </div>
          
          <TestimonialSlider testimonials={testimonials} />
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
                className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
              >
                Featured Articles
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold"
              >
                Latest Tech Insights
              </motion.h2>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center text-primary font-medium hover:underline group"
            >
              View all articles
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      
      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Start Your Digital Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white/90 mb-8 max-w-xl mx-auto"
            >
              Join hundreds of satisfied clients who have transformed their digital presence with our expert services.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button asChild size="lg" variant="default" className="bg-white text-primary hover:bg-white/90">
                <Link to="/contact">Contact Us Today</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/services">Explore Services</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Storytelling Preview Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-black/20 rounded-xl z-10 group-hover:from-black/60 transition-all"></div>
              <img
                src={storyPreview.imageUrl}
                alt="Storytelling"
                className="rounded-xl h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ maxHeight: '500px' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                <div className="flex items-center mb-3">
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                    {storyPreview.category}
                  </span>
                  <span className="ml-3 text-white/90 text-sm flex items-center">
                    <Headphones className="w-4 h-4 mr-1" />
                    {storyPreview.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:underline">
                  {storyPreview.title}
                </h3>
                <p className="text-white/80 mb-4 line-clamp-2">
                  {storyPreview.excerpt}
                </p>
                <span className="text-white/90 text-sm">By {storyPreview.author}</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                5-Minute Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Listen to Inspiring Tech Stories
              </h2>
              <p className="text-muted-foreground mb-8">
                Discover five-minute stories from entrepreneurs, innovators, and creators in the tech world. 
                These bite-sized audio experiences offer valuable insights into the journey of turning ideas into reality.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Real Voices, Real Experiences</h3>
                    <p className="text-muted-foreground text-sm">
                      Authentic stories from people who have navigated the challenges of innovation and technology.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Easy to Consume</h3>
                    <p className="text-muted-foreground text-sm">
                      Each story is just five minutes long, perfect for busy professionals looking for quick inspiration.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild size="lg" className="group">
                  <Link to="/storytelling">
                    Explore Stories
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
