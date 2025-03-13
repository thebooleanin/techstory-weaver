
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  readTime: string;
  date: string;
  delay?: number;
}

const ArticleCard = ({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  readTime,
  date,
  delay = 0
}: ArticleCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [imageUrl]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + delay * 0.1 }}
      className="group overflow-hidden rounded-xl bg-card border border-border/50 shadow-soft hover:shadow-md transition-all duration-300"
    >
      {/* Image Container */}
      <Link to={`/articles/${id}`} className="block image-blur-wrapper h-48 sm:h-60 overflow-hidden">
        <div
          className={`h-full w-full bg-cover bg-center transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? 'image-blur loaded' : 'image-blur loading'
          }`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </Link>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {category}
          </span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        
        <Link to={`/articles/${id}`}>
          <h3 className="text-xl font-semibold mb-2 transition-colors duration-200 group-hover:text-primary line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-muted-foreground text-xs">
            <Clock className="h-3 w-3 mr-1" />
            <span>{readTime} read</span>
          </div>
          
          <Link 
            to={`/articles/${id}`}
            className="inline-flex items-center text-sm text-primary font-medium transition-transform group"
          >
            Read more
            <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ArticleCard;
