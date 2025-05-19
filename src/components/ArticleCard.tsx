
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ArticleCardProps {
  _id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  tags?: string[];
  readTime: string;
  date: string;
  delay?: number;
}

const ArticleCard = ({ _id, title, excerpt, imageUrl, category, readTime, date, delay = 0 }: ArticleCardProps) => {
  // Clean up the excerpt if it contains HTML tags
  const cleanExcerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, "");
  
  return (
    <Link to={`/articles/${_id}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="relative aspect-video">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {category}
            </span>
            {tags?.map((tag, index) => (
              <span key={index} className="inline-block px-2 py-1 bg-muted/10 text-muted text-xs font-medium rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {cleanExcerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{readTime}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ArticleCard;
