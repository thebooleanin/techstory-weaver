import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Clock, FileUp, Filter, Loader2, Search, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema for article submission form
const articleSubmissionSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters' }),
});

type ArticleSubmissionValues = z.infer<typeof articleSubmissionSchema>;

const Articles = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 6;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ArticleSubmissionValues>({
    resolver: zodResolver(articleSubmissionSchema),
    defaultValues: {
      name: '',
      email: '',
      title: '',
      content: ''
    }
  });

  // Fetch articles from the API
  const fetchArticles = async (page = 1, limit = itemsPerPage) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/articles?page=${page}&limit=${limit}`);
      const data = await response.json();
      setArticles(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch articles. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: ArticleSubmissionValues) => {
    setIsSubmitting(true);

    try {
      // Prepare the payload for the API
      const payload = {
        title: data.title,
        content: `<p>${data.content}</p>`, // Wrap content in <p> tags
        imageUrl: "", // You can add logic to handle image uploads
        author: {
          name: data.name,
          avatar: "", // You can add logic to handle author avatars
          role: "Guest Author", // Default role for submissions
        },
        category: "Tech", // Default category, or allow users to select one
        readTime: "5 min", // Calculate or use a default value
        date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
        tags: [], // You can allow users to add tags
      };

      // Call the API
      const response = await fetch("http://localhost:5000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit article");
      }

      const result = await response.json();

      // Show success toast
      toast({
        title: "Article submitted successfully",
        description: "Your article has been sent for review. We will get back to you soon.",
        duration: 5000,
      });

      // Reset the form
      reset();
    } catch (error) {
      console.error("Error submitting article:", error);

      // Show error toast
      toast({
        title: "Something went wrong",
        description: "Failed to submit your article. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Our Articles
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight sm:leading-tight md:leading-tight mb-6"
            >
              Insights on Technology, Bikes, and Cars
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Explore our collection of articles covering the latest trends and innovations
              in technology, automobiles, and more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="font-medium">
                    Submit Your Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Submit an Article</DialogTitle>
                    <DialogDescription>
                      Share your expertise with our community. All submissions will be reviewed before publishing.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        {...register('name')}
                        disabled={isSubmitting}
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && (
                        <p className="text-destructive text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        {...register('email')}
                        disabled={isSubmitting}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Article Title Field */}
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Article Title <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="title"
                        placeholder="Enter a descriptive title"
                        {...register('title')}
                        disabled={isSubmitting}
                        className={errors.title ? 'border-destructive' : ''}
                      />
                      {errors.title && (
                        <p className="text-destructive text-xs mt-1">{errors.title.message}</p>
                      )}
                    </div>

                    {/* Article Content Field */}
                    <div className="space-y-2">
                      <label htmlFor="content" className="text-sm font-medium">
                        Article Content <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="content"
                        rows={8}
                        placeholder="Write your article content here"
                        {...register('content')}
                        disabled={isSubmitting}
                        className={`resize-none ${errors.content ? 'border-destructive' : ''}`}
                      />
                      {errors.content && (
                        <p className="text-destructive text-xs mt-1">{errors.content.message}</p>
                      )}
                    </div>

                    {/* Media Upload Field (Optional) */}
                    <div className="space-y-2">
                      <label htmlFor="media" className="text-sm font-medium">
                        Media Upload <span className="text-muted-foreground">(Optional)</span>
                      </label>
                      <div className="border border-input rounded-md p-4">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FileUp className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-center text-muted-foreground">
                            Drag & drop files here, or click to browse
                          </p>
                          <p className="text-xs text-center text-muted-foreground">
                            Supports images and videos up to 10MB
                          </p>
                          <Input
                            id="media"
                            type="file"
                            className="hidden"
                            disabled={isSubmitting}
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={() => document.getElementById('media')?.click()}
                            disabled={isSubmitting}
                          >
                            Browse Files
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Article
                        </>
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Articles Section */}
      <section className="py-16">
        <div className="container">
          {/* Search and Filter Controls */}
          <div className="mb-10 space-y-6">
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              
              <div className="flex gap-2 items-center text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Showing {articles.length} articles</span>
              </div>
            </div>
            
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2"
              >
                <div>
                  <label htmlFor="category" className="text-sm font-medium block mb-2">
                    Filter by Category
                  </label>
                  <Select 
                    value={category} 
                    onValueChange={setCategory}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="Cars">Cars</SelectItem>
                      <SelectItem value="Bikes">Bikes</SelectItem>
                      <SelectItem value="Gadgets">Gadgets</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="sortBy" className="text-sm font-medium block mb-2">
                    Sort By
                  </label>
                  <Select 
                    value={sortBy} 
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger id="sortBy">
                      <SelectValue placeholder="Sort Order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Default</SelectItem>
                      <SelectItem value="latest">Latest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="readTime">Reading Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setCategory('');
                      setSortBy('');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Articles Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    {...article}
                    delay={index * 0.1}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? "bg-primary text-primary-foreground" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setCategory('');
                  setSortBy('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Articles;