
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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

  return (
    <div ref={heroRef} className="relative overflow-hidden pt-20 pb-16 sm:pb-32 min-h-[90vh] flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl parallax" data-speed="0.03"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl parallax" data-speed="0.05"></div>
        <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full bg-accent/20 blur-3xl parallax" data-speed="0.08"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full animate-fade-in">
            Modern Agency
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight sm:leading-tight md:leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Technology Stories that <span className="text-primary">Inspire</span> and <span className="text-primary">Innovate</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Discover the latest in tech, bikes, cars, and gadgets through engaging articles, videos, and exclusive 5-minute storytelling sessions.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 text-base font-medium bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
            >
              Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/articles"
              className="inline-flex items-center px-6 py-3 text-base font-medium bg-muted text-foreground rounded-lg hover:bg-muted/90 transition-all duration-300"
            >
              Read Articles
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold text-primary">100+</span>
              <span className="text-sm text-muted-foreground mt-1">Tech Articles</span>
            </div>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold text-primary">50+</span>
              <span className="text-sm text-muted-foreground mt-1">Client Projects</span>
            </div>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold text-primary">200+</span>
              <span className="text-sm text-muted-foreground mt-1">Stories Shared</span>
            </div>
            <div className="flex flex-col items-center parallax" data-speed="0.04">
              <span className="text-3xl font-bold text-primary">10k+</span>
              <span className="text-sm text-muted-foreground mt-1">Monthly Readers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
