
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [siteConfig, setSiteConfig] = useState<any>(null);
  
  useEffect(() => {
    // Load site config from localStorage
    const config = localStorage.getItem('siteConfig');
    if (config) {
      setSiteConfig(JSON.parse(config));
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the element
      const xPos = (clientX - rect.left) / rect.width - 0.5;
      const yPos = (clientY - rect.top) / rect.height - 0.5;
      
      // Apply subtle parallax effect
      const elements = heroRef.current.querySelectorAll('.parallax');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '0.05');
        const xShift = xPos * speed * 40;
        const yShift = yPos * speed * 40;
        (el as HTMLElement).style.transform = `translate(${xShift}px, ${yShift}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Use metrics from site config or fallback to defaults
  const metrics = {
    articlesCount: siteConfig?.metrics?.articlesCount || 100,
    clientProjects: siteConfig?.metrics?.clientProjects || 50,
    storiesShared: siteConfig?.metrics?.storiesShared || 200,
    monthlyReaders: siteConfig?.metrics?.monthlyReaders || 10000,
  };

  return (
    <div ref={heroRef} className="relative overflow-hidden pt-20 pb-16 sm:pb-32 min-h-[90vh] flex items-center">
      {/* Background elements with Indian-inspired colors and patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-[#FF9933]/10 blur-3xl parallax" data-speed="0.03"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#138808]/15 blur-3xl parallax" data-speed="0.05"></div>
        <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full bg-[#000080]/15 blur-3xl parallax" data-speed="0.08"></div>
        
        {/* Indian pattern overlay */}
        <div className="absolute inset-0 bg-[url('/patterns/indian-pattern.svg')] opacity-5"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-[#FF9933]/20 via-white/10 to-[#138808]/20 text-primary text-xs font-medium rounded-full animate-fade-in border border-[#FF9933]/20">
            India's Premier Tech Agency
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight sm:leading-tight md:leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Technology Stories that <span className="text-[#FF9933]">Inspire</span> and <span className="text-[#138808]">Innovate</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Discover the latest in tech, digital transformation, and innovation through engaging articles, videos, and exclusive 5-minute storytelling sessions from across India.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 text-base font-medium bg-[#FF9933] text-white rounded-lg shadow-md hover:bg-[#FF9933]/90 transition-all duration-300 hover:shadow-lg"
            >
              Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/articles"
              className="inline-flex items-center px-6 py-3 text-base font-medium bg-[#f8f8f8] text-[#333] border border-[#138808]/20 rounded-lg hover:bg-[#f0f0f0] transition-all duration-300"
            >
              Read Articles
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold text-[#FF9933]">{metrics.articlesCount}+</span>
              <span className="text-sm text-muted-foreground mt-1">Tech Articles</span>
            </div>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold text-[#FF9933]">{metrics.clientProjects}+</span>
              <span className="text-sm text-muted-foreground mt-1">Client Projects</span>
            </div>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold text-[#FF9933]">{metrics.storiesShared}+</span>
              <span className="text-sm text-muted-foreground mt-1">Stories Shared</span>
            </div>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold text-[#FF9933]">{metrics.monthlyReaders.toLocaleString()}+</span>
              <span className="text-sm text-muted-foreground mt-1">Monthly Readers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
