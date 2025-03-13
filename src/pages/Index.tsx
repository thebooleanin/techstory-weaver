
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import ArticleCard from '@/components/ArticleCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Code, Database, Globe, Smartphone, PlayCircle, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Expert Software Development & Technology Solutions
            </h2>
            <p className="text-muted-foreground">
              We deliver cutting-edge software solutions tailored to your business needs, 
              combining technical expertise with industry knowledge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <ServiceCard
              title="Web Development"
              description="Custom websites and web applications built with the latest technologies for optimal performance and user experience."
              icon={<Globe className="h-6 w-6" />}
              href="/services"
              delay={0}
            />
            <ServiceCard
              title="Mobile Applications"
              description="Native and cross-platform mobile apps that deliver seamless experiences across iOS and Android devices."
              icon={<Smartphone className="h-6 w-6" />}
              href="/services"
              delay={1}
            />
            <ServiceCard
              title="Software Development"
              description="End-to-end software development services, from requirements gathering to deployment and maintenance."
              icon={<Code className="h-6 w-6" />}
              href="/services"
              delay={2}
            />
            <ServiceCard
              title="Database Solutions"
              description="Efficient database design, optimization, and management to ensure your data is secure and accessible."
              icon={<Database className="h-6 w-6" />}
              href="/services"
              delay={3}
            />
            <ServiceCard
              title="Video Content"
              description="Professional video production for product demonstrations, tutorials, and marketing campaigns."
              icon={<PlayCircle className="h-6 w-6" />}
              href="/services"
              delay={4}
            />
            <ServiceCard
              title="Audio Production"
              description="High-quality audio content for podcasts, storytelling, and other multimedia projects."
              icon={<Headphones className="h-6 w-6" />}
              href="/services"
              delay={5}
            />
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Articles Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-16">
            <div className="mb-6 sm:mb-0">
              <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Featured Articles
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Latest Tech Insights
              </h2>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              View all articles
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                {...article}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Storytelling Preview Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-black/20 rounded-xl z-10" />
              <img
                src={storyPreview.imageUrl}
                alt="Storytelling"
                className="rounded-xl h-full w-full object-cover"
                style={{ maxHeight: '500px' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex items-center mb-3">
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                    {storyPreview.category}
                  </span>
                  <span className="ml-3 text-white/90 text-sm flex items-center">
                    <Headphones className="w-4 h-4 mr-1" />
                    {storyPreview.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
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
              animate={{ opacity: 1, x: 0 }}
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
                <Link
                  to="/storytelling"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all hover:shadow-lg"
                >
                  Explore Stories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
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
