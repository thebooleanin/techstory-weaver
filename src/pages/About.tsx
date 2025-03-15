
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, MapPin, PhoneCall, Code, Database, Layout, Users, Trophy, Star, Globe, Headphones, PlayCircle, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import TestimonialSlider from '@/components/TestimonialSlider';

const About = () => {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set visibility after a short delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Load site config from localStorage
    const config = localStorage.getItem('siteConfig');
    if (config) {
      setSiteConfig(JSON.parse(config));
    }
    
    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      bio: 'Sarah has over 15 years of experience in software development and tech leadership. She founded TheBoolean with a vision to bridge the gap between technology and storytelling.'
    },
    {
      id: 2,
      name: 'David Kim',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      bio: 'David leads our technical team with expertise in full-stack development, cloud architecture, and AI. He ensures our services are innovative and future-proof.'
    },
    {
      id: 3,
      name: 'Maya Patel',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      bio: 'Maya specializes in front-end and mobile development. She is passionate about creating intuitive user experiences and accessibility in technology.'
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Content Director',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      bio: 'James oversees our content strategy, including articles, storytelling, and multimedia productions. He has a background in tech journalism and digital content.'
    },
    {
      id: 5,
      name: 'Sophia Lee',
      role: 'UX/UI Designer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      bio: 'Sophia brings designs to life with her keen eye for aesthetics and user-centered approach. She creates the visual identity of our projects and ensures they are beautiful and functional.'
    },
    {
      id: 6,
      name: 'Alex Johnson',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      bio: 'Alex heads our marketing efforts, focusing on digital strategies and brand growth. He specializes in tech market trends and audience engagement.'
    }
  ];

  // Testimonials data from site config or fallback
  const testimonials = siteConfig?.testimonials || [
    {
      id: '1',
      name: 'David Johnson',
      role: 'CTO, InnovateTech',
      content: 'Working with this team transformed our digital presence. Their expertise in software development and commitment to quality delivered results beyond our expectations.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      rating: 5
    },
    {
      id: '2',
      name: 'Emily Rodriguez',
      role: 'Marketing Director, Growth Solutions',
      content: 'The storytelling approach they brought to our content strategy has significantly increased user engagement. Our audience connects with our brand on a deeper level now.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      rating: 5
    },
    {
      id: '3',
      name: 'Michael Chang',
      role: 'Founder, BikeTerrains',
      content: 'Their technical knowledge combined with a passion for storytelling made them the perfect partner for our cycling tech platform. User retention has increased by 40% since launch.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      rating: 4
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Services' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'content', label: 'Content Creation' }
  ];

  // Filter services based on active tab
  const filteredServices = () => {
    if (activeTab === 'all') return [
      { title: "Web Development", description: "Custom websites and web applications built with the latest technologies for optimal performance and user experience.", icon: <Globe className="h-6 w-6" />, href: "/services", delay: 0, category: 'web' },
      { title: "Mobile Applications", description: "Native and cross-platform mobile apps that deliver seamless experiences across iOS and Android devices.", icon: <Smartphone className="h-6 w-6" />, href: "/services", delay: 1, category: 'mobile' },
      { title: "Software Development", description: "End-to-end software development services, from requirements gathering to deployment and maintenance.", icon: <Code className="h-6 w-6" />, href: "/services", delay: 2, category: 'web' },
      { title: "Database Solutions", description: "Efficient database design, optimization, and management to ensure your data is secure and accessible.", icon: <Database className="h-6 w-6" />, href: "/services", delay: 3, category: 'web' },
      { title: "Video Content", description: "Professional video production for product demonstrations, tutorials, and marketing campaigns.", icon: <PlayCircle className="h-6 w-6" />, href: "/services", delay: 4, category: 'content' },
      { title: "Audio Production", description: "High-quality audio content for podcasts, storytelling, and other multimedia projects.", icon: <Headphones className="h-6 w-6" />, href: "/services", delay: 5, category: 'content' }
    ];
    
    return [
      { title: "Web Development", description: "Custom websites and web applications built with the latest technologies for optimal performance and user experience.", icon: <Globe className="h-6 w-6" />, href: "/services", delay: 0, category: 'web' },
      { title: "Mobile Applications", description: "Native and cross-platform mobile apps that deliver seamless experiences across iOS and Android devices.", icon: <Smartphone className="h-6 w-6" />, href: "/services", delay: 1, category: 'mobile' },
      { title: "Software Development", description: "End-to-end software development services, from requirements gathering to deployment and maintenance.", icon: <Code className="h-6 w-6" />, href: "/services", delay: 2, category: 'web' },
      { title: "Database Solutions", description: "Efficient database design, optimization, and management to ensure your data is secure and accessible.", icon: <Database className="h-6 w-6" />, href: "/services", delay: 3, category: 'web' },
      { title: "Video Content", description: "Professional video production for product demonstrations, tutorials, and marketing campaigns.", icon: <PlayCircle className="h-6 w-6" />, href: "/services", delay: 4, category: 'content' },
      { title: "Audio Production", description: "High-quality audio content for podcasts, storytelling, and other multimedia projects.", icon: <Headphones className="h-6 w-6" />, href: "/services", delay: 5, category: 'content' }
    ].filter(service => service.category === activeTab);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-10" />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Team working together"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container relative z-10 pt-20">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Story Behind TheBoolean
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              A team of tech enthusiasts, developers, and storytellers on a mission to bridge 
              the gap between technology and engaging content.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Our Story
              </span>
              <h2 className="text-3xl font-bold mb-6">
                From a Small Startup to India's Leading Tech Agency
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TheBoolean was founded in 2018 in Bangalore by Sarah Chen, a software developer with a passion for storytelling. 
                  What began as a small blog sharing tech insights quickly evolved into a comprehensive agency offering 
                  software development services and multimedia content.
                </p>
                <p>
                  Our journey started with a simple belief: technology stories are best told by the people who build 
                  and use it. This philosophy guides everything we do, from our development projects to our 5-minute 
                  storytelling format.
                </p>
                <p>
                  Today, we're a team of 20+ professionals spanning development, design, content creation, and marketing across India. 
                  We've worked with startups, established tech companies, and individual creators across the country to bring their visions to life.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Team meeting"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#FF9933] text-white rounded-lg p-4 shadow-lg">
                <p className="font-bold text-xl">5+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Section (Moved from Index) */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FF9933]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#138808]/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              Our Services
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Expert Software Development & Technology Solutions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground"
            >
              We deliver cutting-edge software solutions tailored to your business needs, 
              combining technical expertise with industry knowledge.
            </motion.p>
          </div>
          
          {/* Service tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <div className="inline-flex p-1 bg-muted/80 backdrop-blur-sm rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredServices().map((service, index) => (
              <ServiceCard
                key={`${service.title}-${index}`}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              Mission & Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-muted-foreground">
              Our core principles that guide our work and relationships with clients and communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-black/10 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6">
                To create exceptional software solutions while telling the human stories behind technology. 
                We aim to make tech more accessible, understandable, and relatable through our services and content.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF9933]/10 rounded-full flex items-center justify-center text-[#FF9933] mr-4">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Technical Excellence</h4>
                    <p className="text-sm text-muted-foreground">Building robust, scalable solutions with cutting-edge technologies</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#138808]/10 rounded-full flex items-center justify-center text-[#138808] mr-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Human-Centered</h4>
                    <p className="text-sm text-muted-foreground">Focusing on the people behind and affected by technology</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-black/10 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF9933]/10 rounded-full flex items-center justify-center text-[#FF9933] mr-4">
                    <Layout className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Innovation</h4>
                    <p className="text-sm text-muted-foreground">Constantly exploring new ideas and approaches to solve problems</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#138808]/10 rounded-full flex items-center justify-center text-[#138808] mr-4">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Quality</h4>
                    <p className="text-sm text-muted-foreground">Delivering excellence in every line of code and piece of content</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF9933]/10 rounded-full flex items-center justify-center text-[#FF9933] mr-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Collaboration</h4>
                    <p className="text-sm text-muted-foreground">Working together with clients and within our team to achieve shared goals</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#138808]/10 rounded-full flex items-center justify-center text-[#138808] mr-4">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Integrity</h4>
                    <p className="text-sm text-muted-foreground">Maintaining ethical standards and honesty in all our work</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Members Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Minds Behind TheBoolean
            </h2>
            <p className="text-muted-foreground">
              A diverse team of experts bringing together technical skills and creative talents.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-black/10 rounded-lg shadow-sm overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-[#FF9933] text-sm mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section (Moved from Index) */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              Client Testimonials
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground"
            >
              Don't just take our word for it. Here's what clients have to say about their experiences working with us.
            </motion.p>
          </div>
          
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>
      
      {/* Office Location */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Our Office
              </span>
              <h2 className="text-3xl font-bold mb-6">
                Where Innovation Happens
              </h2>
              <p className="text-muted-foreground mb-8">
                Our headquarters is located in the heart of Bangalore's tech district, designed to foster 
                creativity, collaboration, and productivity. We've built a space that reflects our 
                values and supports our team in doing their best work.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF9933]/10 rounded-full flex items-center justify-center text-[#FF9933] mr-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-sm text-muted-foreground">123 Tech Boulevard, Bangalore, Karnataka 560001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#138808]/10 rounded-full flex items-center justify-center text-[#138808] mr-4">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-sm text-muted-foreground">+91 (80) 4567-8910</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF9933]/10 rounded-full flex items-center justify-center text-[#FF9933] mr-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-sm text-muted-foreground">info@theboolean.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/contact">
                  <Button className="flex items-center gap-2 bg-[#FF9933] hover:bg-[#FF9933]/90">
                    Get in Touch
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                alt="Office space"
                className="rounded-lg h-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                alt="Meeting room"
                className="rounded-lg h-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                alt="Collaborative space"
                className="rounded-lg h-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                alt="Creative corner"
                className="rounded-lg h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-[#FF9933]/5">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you need software development services or want to collaborate on content, 
              we're here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button variant="default" className="flex items-center gap-2 px-6 bg-[#FF9933] hover:bg-[#FF9933]/90">
                  Explore Services
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="flex items-center gap-2 px-6 border-[#138808] text-[#138808] hover:bg-[#138808]/10">
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
