
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  delay?: number;
}

const ServiceCard = ({ title, description, icon, href, delay = 0 }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR / initial render fallback
    return <div className="h-64"></div>;
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + delay * 0.1 }}
      className="group relative rounded-xl bg-card p-6 shadow-soft border border-border/50 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />
      
      {/* Icon */}
      <div className="relative inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <Link 
        to={href} 
        className="inline-flex items-center text-sm text-primary font-medium group"
      >
        Learn more
        <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
