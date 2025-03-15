
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

  // Get colors from site config or use defaults (Indian flag colors)
  const primaryColor = siteConfig?.colors?.primary || '#FF9933'; // Saffron
  const secondaryColor = siteConfig?.colors?.secondary || '#138808'; // Green
  const accentColor = siteConfig?.colors?.accent || '#000080'; // Navy Blue (Ashoka Chakra color)

  return (
    <div ref={heroRef} className="relative overflow-hidden pt-20 pb-16 sm:pb-32 min-h-[90vh] flex items-center">
      {/* Background elements with Indian-inspired colors and patterns */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full blur-3xl parallax"
          style={{ backgroundColor: `${primaryColor}10` }}
          data-speed="0.03"
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl parallax"
          style={{ backgroundColor: `${secondaryColor}15` }}
          data-speed="0.05"
        ></div>
        <div 
          className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full blur-3xl parallax"
          style={{ backgroundColor: `${accentColor}15` }}
          data-speed="0.08"
        ></div>
        
        {/* Indian pattern overlay */}
        <div className="absolute inset-0 bg-[url('/patterns/indian-pattern.svg')] opacity-5"></div>

        {/* Rangoli-inspired decorative element */}
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] opacity-10 parallax" data-speed="0.02">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={primaryColor} d="M47.5,-61.2C62.9,-53.4,77.5,-41.5,83.2,-26.1C89,-10.7,85.9,8.2,78.6,24.9C71.3,41.6,59.8,56.1,45,65C30.2,73.9,12.1,77.3,-4.4,82.7C-21,88.1,-35.9,95.7,-48.9,92C-61.9,88.4,-72.9,73.7,-80.5,57.1C-88.1,40.4,-92.3,21.7,-91.1,3.8C-90,-14.1,-83.4,-31.3,-72.8,-44.6C-62.2,-57.9,-47.5,-67.2,-33,-70.4C-18.4,-73.5,-3.9,-70.4,9.5,-67.1C22.9,-63.7,32.1,-69,47.5,-61.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        {/* Chakra-inspired element */}
        <div className="absolute bottom-10 right-10 w-[250px] h-[250px] opacity-10 parallax" data-speed="0.04">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={secondaryColor} d="M46.5,-53.2C58.3,-43.9,64.6,-27.2,68.1,-9.6C71.6,8,72.2,26.5,64.1,40.1C55.9,53.8,38.9,62.8,21.7,67.2C4.5,71.6,-12.9,71.6,-28.4,65.3C-43.9,59.1,-57.5,46.7,-65.2,31.1C-72.9,15.5,-74.6,-3.3,-69.3,-19.6C-63.9,-35.9,-51.5,-49.7,-37.1,-58.2C-22.7,-66.7,-6.3,-69.8,8.6,-68.1C23.6,-66.3,34.7,-62.6,46.5,-53.2Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className="inline-block mb-3 px-3 py-1 text-primary text-xs font-medium rounded-full animate-fade-in border"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${primaryColor}20, #ffffff10, ${secondaryColor}20)`,
              borderColor: `${primaryColor}20` 
            }}
          >
            India's Premier Tech Agency
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight sm:leading-tight md:leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Technology Stories that <span style={{ color: primaryColor }}>Inspire</span> and <span style={{ color: secondaryColor }}>Innovate</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Discover the latest in tech, digital transformation, and innovation through engaging articles, videos, and exclusive 5-minute storytelling sessions from across India.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/articles"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white rounded-lg shadow-md hover:opacity-90 transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
            >
              Explore Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/storytelling"
              className="inline-flex items-center px-6 py-3 text-base font-medium bg-[#f8f8f8] text-[#333] border rounded-lg hover:bg-[#f0f0f0] transition-all duration-300"
              style={{ borderColor: `${secondaryColor}20` }}
            >
              Listen to Stories
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold" style={{ color: primaryColor }}>{metrics.articlesCount}+</span>
              <span className="text-sm text-muted-foreground mt-1">Tech Articles</span>
            </div>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold" style={{ color: primaryColor }}>{metrics.clientProjects}+</span>
              <span className="text-sm text-muted-foreground mt-1">Client Projects</span>
            </div>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold" style={{ color: primaryColor }}>{metrics.storiesShared}+</span>
              <span className="text-sm text-muted-foreground mt-1">Stories Shared</span>
            </div>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold" style={{ color: primaryColor }}>{metrics.monthlyReaders.toLocaleString()}+</span>
              <span className="text-sm text-muted-foreground mt-1">Monthly Readers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
