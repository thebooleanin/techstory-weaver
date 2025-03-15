
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ArticleCardProps {
  _id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  readTime: string;
  date: string;
  delay?: number;
}

const ArticleCard = ({ _id, title, excerpt, imageUrl, category, readTime, date, delay = 0 }: ArticleCardProps) => {
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
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <span className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {category}
          </span>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {excerpt}
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
