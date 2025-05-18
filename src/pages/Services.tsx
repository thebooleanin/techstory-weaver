
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileTabNav from '@/components/MobileTabNav';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Code, Database, Globe, Headphones, Laptop, Loader2, PlayCircle, Send, Smartphone } from 'lucide-react';

const serviceInquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  serviceInterest: z.string().min(1, { message: 'Please select a service' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type ServiceInquiryValues = z.infer<typeof serviceInquirySchema>;

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: 'David Miller',
    position: 'CTO at TechVista',
    content: 'TheBoolean transformed our outdated platform into a modern, user-friendly system. Their team demonstrated exceptional technical expertise and consistently delivered beyond our expectations.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'Founder of EcoRide',
    content: 'Working with TheBoolean on our e-bike tracking app was a seamless experience. Their attention to detail and commitment to quality resulted in an application that our users absolutely love.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'Michael Chen',
    position: 'Product Manager at InnoGadget',
    content: 'The video content TheBoolean created for our product launch was exceptional. They understood our vision perfectly and delivered content that significantly boosted our engagement metrics.',
    image: 'https://randomuser.me/api/portraits/men/67.jpg'
  }
];

const Services = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ServiceInquiryValues>({
    resolver: zodResolver(serviceInquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceInterest: '',
      message: ''
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data: ServiceInquiryValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      
      toast({
        title: 'Inquiry submitted successfully',
        description: 'We will get back to you as soon as possible.',
        duration: 5000,
      });
      
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast({
        title: 'Something went wrong',
        description: 'Failed to send your inquiry. Please try again.',
        variant: 'destructive',
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
              Our Services
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight sm:leading-tight md:leading-tight mb-6"
            >
              Expert Technology Solutions for Modern Businesses
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              From custom software development to multimedia content creation, we deliver
              comprehensive technology solutions tailored to your unique business needs.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Services Showcase */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-muted-foreground">
              We offer a full spectrum of technology services to help your business thrive in the digital age.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Web Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Web Development</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We create responsive, high-performance websites and web applications that deliver exceptional user experiences. Our web development services include:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom website design and development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Progressive web applications (PWAs)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>E-commerce solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Content management systems</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Mobile Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Mobile Applications</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We develop native and cross-platform mobile applications that engage users and drive business results. Our mobile app services include:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>iOS and Android development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Cross-platform development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>App UI/UX design</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>App testing and quality assurance</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Software Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Software Development</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We build custom software solutions that automate processes, optimize operations, and solve complex business challenges. Our software development services include:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom business applications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>API development and integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Legacy system modernization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Cloud-based solutions</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Database Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Database Solutions</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We design and implement efficient database systems that ensure data security, integrity, and accessibility. Our database services include:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Database design and implementation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Data migration and integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Performance optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Database maintenance and support</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Video Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Video Content</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We create engaging video content that communicates your message effectively and captivates your audience. Our video services include:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Product demonstrations and tutorials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Corporate and promotional videos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Animated explainer videos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Social media video content</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Audio Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Audio Production</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We produce high-quality audio content for various purposes, from podcasts to storytelling sessions. Our audio services include:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Podcast production and editing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Voice-over recording</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Audio storytelling</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sound design for multimedia</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              Client Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground">
              Hear from businesses and organizations that have partnered with us
              to achieve their technology goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl border border-border/50 shadow-soft"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Interested in Our Services?
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form to inquire about our services. We'll get back to you
                as soon as possible to discuss how we can help with your project.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Tailored Approach</h3>
                    <p className="text-muted-foreground text-sm">
                      We develop custom strategies based on your specific business needs and goals.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Code className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Technical Excellence</h3>
                    <p className="text-muted-foreground text-sm">
                      Our team of experts stays at the forefront of technology to deliver cutting-edge solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-xl border border-border/50 shadow-soft">
              <h3 className="text-xl font-semibold mb-6">Service Inquiry Form</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                      errors.name ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Your full name"
                    {...register('name')}
                    disabled={isSubmitting}
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
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                      errors.email ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Your email address"
                    {...register('email')}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                {/* Phone Field */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                      errors.phone ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Your phone number"
                    {...register('phone')}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
                
                {/* Service Interest Field */}
                <div className="space-y-2">
                  <label htmlFor="serviceInterest" className="text-sm font-medium">
                    Service Interest <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="serviceInterest"
                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                      errors.serviceInterest ? 'border-destructive' : 'border-input'
                    }`}
                    {...register('serviceInterest')}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Applications">Mobile Applications</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Database Solutions">Database Solutions</option>
                    <option value="Video Content">Video Content</option>
                    <option value="Audio Production">Audio Production</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.serviceInterest && (
                    <p className="text-destructive text-xs mt-1">{errors.serviceInterest.message}</p>
                  )}
                </div>
                
                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none ${
                      errors.message ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Tell us about your project or requirements"
                    {...register('message')}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-destructive text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <MobileTabNav />
    </div>
  );
};

export default Services;
