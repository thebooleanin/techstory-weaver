
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialMediaGrid from '@/components/SocialMediaGrid';

const SocialMedia = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 -right-64 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              Our Social Media
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight sm:leading-tight md:leading-tight mb-6"
            >
              Connect With Us
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Stay updated with our latest content across different social media platforms. Follow us for exclusive updates, behind-the-scenes content, and community interactions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center"
            >
              <Button size="lg" className="font-medium gap-2">
                <Share2 className="h-4 w-4" />
                Follow Our Channels
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Social Media Content Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4">Latest Social Media Posts</h2>
            <p className="text-muted-foreground">
              Browse through our latest posts, photos, and videos from various social media platforms.
            </p>
          </div>
          
          <SocialMediaGrid />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SocialMedia;
