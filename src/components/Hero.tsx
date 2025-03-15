
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

  // Modern vibrant color scheme - updated colors
  const primaryColor = siteConfig?.colors?.primary || '#8B5CF6'; // Vivid Purple
  const secondaryColor = siteConfig?.colors?.secondary || '#D946EF'; // Magenta Pink
  const accentColor = siteConfig?.colors?.accent || '#F97316'; // Bright Orange

  return (
    <div ref={heroRef} className="relative overflow-hidden pt-20 pb-16 sm:pb-32 min-h-[90vh] flex items-center">
      {/* Enhanced modern aesthetic background with gradients and patterns */}
      <div className="absolute inset-0 z-0">
        {/* Gradient background - updated with more vibrant colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"></div>
        
        {/* Abstract shapes in background */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg width="100%" height="100%" viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg">
            <path fill={primaryColor} d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        {/* Colorful gradient orbs */}
        <div 
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl opacity-30 parallax"
          style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}
          data-speed="0.03"
        ></div>
        <div 
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 parallax"
          style={{ background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)` }}
          data-speed="0.05"
        ></div>
        <div 
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 parallax"
          style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
          data-speed="0.08"
        ></div>
        
        {/* Modern mesh gradient */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2000 1500' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23${primaryColor.slice(1)}'/%3E%3Cstop offset='1' stop-color='%23${secondaryColor.slice(1)}'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23${primaryColor.slice(1)}'/%3E%3Cstop offset='1' stop-color='%23${secondaryColor.slice(1)}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='2000' height='1500' fill='url(%23a)'/%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23b)' points='1600 1500 0 1500 0 0 1600 0'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: 'cover'
          }}></div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 opacity-10 parallax" data-speed="0.06">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill={primaryColor}>
            <path d="M47.5,-61.2C62.9,-53.4,77.5,-41.5,83.2,-26.1C89,-10.7,85.9,8.2,78.6,24.9C71.3,41.6,59.8,56.1,45,65C30.2,73.9,12.1,77.3,-4.4,82.7C-21,88.1,-35.9,95.7,-48.9,92C-61.9,88.4,-72.9,73.7,-80.5,57.1C-88.1,40.4,-92.3,21.7,-91.1,3.8C-90,-14.1,-83.4,-31.3,-72.8,-44.6C-62.2,-57.9,-47.5,-67.2,-33,-70.4C-18.4,-73.5,-3.9,-70.4,9.5,-67.1C22.9,-63.7,32.1,-69,47.5,-61.2Z" />
          </svg>
        </div>
        
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 opacity-10 parallax" data-speed="0.07">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill={secondaryColor}>
            <path d="M46.5,-53.2C58.3,-43.9,64.6,-27.2,68.1,-9.6C71.6,8,72.2,26.5,64.1,40.1C55.9,53.8,38.9,62.8,21.7,67.2C4.5,71.6,-12.9,71.6,-28.4,65.3C-43.9,59.1,-57.5,46.7,-65.2,31.1C-72.9,15.5,-74.6,-3.3,-69.3,-19.6C-63.9,-35.9,-51.5,-49.7,-37.1,-58.2C-22.7,-66.7,-6.3,-69.8,8.6,-68.1C23.6,-66.3,34.7,-62.6,46.5,-53.2Z" />
          </svg>
        </div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full animate-fade-in backdrop-blur-sm"
            style={{ 
              backgroundColor: `${primaryColor}20`,
              color: primaryColor,
              borderColor: `${primaryColor}40`,
              border: '1px solid'
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
              className="inline-flex items-center px-6 py-3 text-base font-medium bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-all duration-300 shadow-sm"
              style={{ color: secondaryColor, borderColor: `${secondaryColor}40`, border: '1px solid' }}
            >
              Listen to Stories
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-col items-center parallax p-4 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm" data-speed="0.04">
              <span className="text-3xl font-bold" style={{ color: primaryColor }}>{metrics.articlesCount}+</span>
              <span className="text-sm text-muted-foreground mt-1">Tech Articles</span>
            </div>
            <div className="flex flex-col items-center parallax p-4 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm" data-speed="0.04">
              <span className="text-3xl font-bold" style={{ color: primaryColor }}>{metrics.clientProjects}+</span>
              <span className="text-sm text-muted-foreground mt-1">Client Projects</span>
            </div>
            <div className="flex flex-col items-center parallax p-4 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm" data-speed="0.04">
              <span className="text-3xl font-bold" style={{ color: primaryColor }}>{metrics.storiesShared}+</span>
              <span className="text-sm text-muted-foreground mt-1">Stories Shared</span>
            </div>
            <div className="flex flex-col items-center parallax p-4 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm" data-speed="0.04">
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
