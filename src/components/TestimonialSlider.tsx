
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider = ({ testimonials }: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);
  
  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="relative">
      <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-20 h-20 bg-primary/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative h-[320px] sm:h-[280px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 relative mb-6">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </div>
                
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[currentIndex].rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <blockquote className="text-lg mb-6 relative">
                  <span className="text-primary text-4xl font-serif absolute -top-5 -left-2">"</span>
                  {testimonials[currentIndex].content}
                  <span className="text-primary text-4xl font-serif absolute -bottom-10 -right-2">"</span>
                </blockquote>
                
                <div>
                  <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentIndex === index ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handlePrevious}
          className="rounded-full h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleNext}
          className="rounded-full h-10 w-10"
        >
          <ArrowRight className="h-5 w-5" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
