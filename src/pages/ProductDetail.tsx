
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Calendar, 
  Award,
  Info,
  ClipboardCheck, 
  ArrowLeft, 
  ArrowRight
} from 'lucide-react';
import { Tab } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Temporary mock data - will be replaced with API call
const mockProduct = {
  _id: "bike1",
  type: "bike",
  name: "XPulse 210",
  brand: "Hero",
  description: "The Hero XPulse 210 is an adventure motorcycle designed for both on-road and off-road experiences. With its powerful engine, sturdy build, and advanced features, it's perfect for adventure enthusiasts seeking reliability and performance.",
  shortDescription: "A versatile adventure motorcycle with exceptional performance",
  images: [
    { id: "1", url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80", alt: "Hero XPulse 210 Front View", isPrimary: true },
    { id: "2", url: "https://images.unsplash.com/photo-1558980394-dbb977039a2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80", alt: "Hero XPulse 210 Side View" },
    { id: "3", url: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80", alt: "Hero XPulse 210 Rear View" },
    { id: "4", url: "https://images.unsplash.com/photo-1558980664-2506fca59581?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80", alt: "Hero XPulse 210 Dashboard" }
  ],
  price: {
    base: 142000,
    max: 159000
  },
  specifications: [
    { id: "s1", name: "Engine", value: "210cc, Oil cooled, 4 Stroke", category: "Engine" },
    { id: "s2", name: "Power", value: "19.5 bhp @ 8,500 rpm", category: "Engine" },
    { id: "s3", name: "Torque", value: "17.35 Nm @ 6,500 rpm", category: "Engine" },
    { id: "s4", name: "Mileage", value: "45 kmpl", category: "Performance" },
    { id: "s5", name: "Top Speed", value: "130 kmph", category: "Performance" },
    { id: "s6", name: "Transmission", value: "5 Speed Manual", category: "Performance" },
    { id: "s7", name: "Fuel Tank", value: "13 L", category: "Performance" },
    { id: "s8", name: "Seat Height", value: "825 mm", category: "Dimensions" },
    { id: "s9", name: "Weight", value: "157 kg", category: "Dimensions" },
    { id: "s10", name: "Ground Clearance", value: "220 mm", category: "Dimensions" }
  ],
  variants: [
    { id: "v1", name: "Standard", price: 142000, isAvailable: true },
    { id: "v2", name: "Rally Kit", price: 159000, features: ["Upgraded suspension", "Rally tires", "Protective guards"], isAvailable: true }
  ],
  features: [
    "Full LED headlamp with DRL",
    "Turn-by-turn navigation",
    "Bluetooth connectivity",
    "USB charging port",
    "Long-travel suspension",
    "21-inch front wheel",
    "Dual-purpose tires",
    "Digital instrument cluster"
  ],
  pros: [
    "Excellent off-road capability",
    "Comfortable for long rides",
    "High ground clearance",
    "Fuel efficient",
    "Advanced connectivity features"
  ],
  cons: [
    "Limited top-end power",
    "Tall seat height for shorter riders",
    "Basic wind protection"
  ],
  rating: 4.3,
  reviewCount: 187,
  launchDate: "2023-06-15",
  popularComparison: ["Royal Enfield Himalayan", "KTM 250 Adventure", "BMW G 310 GS"],
  isPopular: true,
  isFeatured: true
};

const ProductDetail = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [product, setProduct] = useState(mockProduct);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [specs, setSpecs] = useState<{ [key: string]: { name: string; value: string }[] }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real implementation, fetch product data from API
    // const fetchProduct = async () => {
    //   try {
    //     const response = await fetch(`/api/products/${type}/${id}`);
    //     const data = await response.json();
    //     setProduct(data);
    //   } catch (error) {
    //     console.error('Error fetching product:', error);
    //   }
    // };
    
    // fetchProduct();
    
    // Organize specs by category
    const groupedSpecs: { [key: string]: { name: string; value: string }[] } = {};
    product.specifications.forEach(spec => {
      if (!groupedSpecs[spec.category]) {
        groupedSpecs[spec.category] = [];
      }
      groupedSpecs[spec.category].push({ name: spec.name, value: spec.value });
    });
    setSpecs(groupedSpecs);
  }, [id, type]);

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  // Capitalize product type for display
  const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Product';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-6 mt-16">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <Link to={`/${product.type}s`} className="text-muted-foreground hover:text-foreground">{displayType}s</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <Link to={`/${product.type}s/${product.brand.toLowerCase()}`} className="text-muted-foreground hover:text-foreground">{product.brand}</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">{product.name}</span>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-[4/3] bg-black/5 rounded-lg overflow-hidden mb-4">
              <motion.img
                key={activeImageIndex}
                src={product.images[activeImageIndex].url}
                alt={product.images[activeImageIndex].alt}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={handlePrevImage}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={handleNextImage}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={image.id}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                    index === activeImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{product.brand} {product.name}</h1>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium ml-1">{product.rating}</span>
                  <span className="text-muted-foreground ml-1">({product.reviewCount} reviews)</span>
                </div>
                
                {product.launchDate && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Launched: {new Date(product.launchDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                )}
                
                {product.isPopular && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Popular
                  </Badge>
                )}
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">₹{product.price.base.toLocaleString()}</span>
                {product.price.max && product.price.max > product.price.base && (
                  <span className="text-lg text-muted-foreground">- ₹{product.price.max.toLocaleString()}</span>
                )}
                <span className="text-sm text-muted-foreground">Ex-showroom price</span>
              </div>
              
              <p className="text-muted-foreground">{product.shortDescription}</p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button className="flex items-center gap-2">
                  Get On Road Price
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
              
              {/* Variants */}
              <div className="pt-4">
                <h3 className="font-semibold mb-3">Available Variants</h3>
                <div className="space-y-3">
                  {product.variants.map(variant => (
                    <Card key={variant.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{variant.name}</h4>
                            {variant.features && variant.features.length > 0 && (
                              <ul className="text-sm text-muted-foreground mt-1">
                                {variant.features.map((feature, i) => (
                                  <li key={i} className="flex items-center">
                                    <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₹{variant.price.toLocaleString()}</div>
                            <Button size="sm" className="mt-2">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Pros & Cons */}
              {(product.pros?.length > 0 || product.cons?.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {product.pros && product.pros.length > 0 && (
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center text-green-700 dark:text-green-400">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Pros
                      </h3>
                      <ul className="space-y-1">
                        {product.pros.map((pro, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-green-500 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {product.cons && product.cons.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center text-red-700 dark:text-red-400">
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Cons
                      </h3>
                      <ul className="space-y-1">
                        {product.cons.map((con, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-red-500 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="mt-12">
          <Tab.Group>
            <Tab.List className="flex space-x-1 border-b">
              <Tab className={({ selected }) => 
                `py-3 px-4 text-sm font-medium border-b-2 ${
                  selected 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`
              }>
                Overview
              </Tab>
              <Tab className={({ selected }) => 
                `py-3 px-4 text-sm font-medium border-b-2 ${
                  selected 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`
              }>
                Specifications
              </Tab>
              <Tab className={({ selected }) => 
                `py-3 px-4 text-sm font-medium border-b-2 ${
                  selected 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`
              }>
                Features
              </Tab>
              <Tab className={({ selected }) => 
                `py-3 px-4 text-sm font-medium border-b-2 ${
                  selected 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`
              }>
                Compare
              </Tab>
            </Tab.List>
            
            <Tab.Panels className="mt-6">
              {/* Overview Panel */}
              <Tab.Panel>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <h2>About {product.brand} {product.name}</h2>
                  <p>{product.description}</p>
                  
                  <p>With a powerful {mockProduct.specifications.find(s => s.name === "Engine")?.value} engine delivering {mockProduct.specifications.find(s => s.name === "Power")?.value} of power and {mockProduct.specifications.find(s => s.name === "Torque")?.value} of torque, the {product.name} ensures a thrilling ride whether you're on city streets or rough terrain.</p>
                  
                  <p>The {product.name} boasts a ground clearance of {mockProduct.specifications.find(s => s.name === "Ground Clearance")?.value}, making it perfect for tackling uneven surfaces. Its fuel efficiency of {mockProduct.specifications.find(s => s.name === "Mileage")?.value} ensures you spend more time riding and less time refueling.</p>
                </div>
              </Tab.Panel>
              
              {/* Specifications Panel */}
              <Tab.Panel>
                <div className="space-y-8">
                  {Object.entries(specs).map(([category, specList]) => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <ClipboardCheck className="h-5 w-5 mr-2 text-primary" />
                        {category} Specifications
                      </h3>
                      <div className="bg-muted/40 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <tbody>
                            {specList.map((spec, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-transparent' : 'bg-muted/70'}>
                                <td className="py-3 px-4 font-medium">{spec.name}</td>
                                <td className="py-3 px-4">{spec.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
              
              {/* Features Panel */}
              <Tab.Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-primary" />
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {product.features?.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                            <Check className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Info className="h-5 w-5 mr-2 text-primary" />
                      Did You Know?
                    </h3>
                    <p className="text-sm">The {product.name} was designed to excel in various terrains, from city streets to mountainous trails. Its robust suspension system and carefully crafted frame provide stability and comfort during long rides.</p>
                    <p className="text-sm mt-3">With advanced features like turn-by-turn navigation and Bluetooth connectivity, the {product.name} combines traditional biking excellence with modern technology.</p>
                  </div>
                </div>
              </Tab.Panel>
              
              {/* Compare Panel */}
              <Tab.Panel>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Popular Comparisons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {product.popularComparison?.map((competitor, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">VS {competitor}</h4>
                              <p className="text-sm text-muted-foreground mt-1">See how they compare</p>
                            </div>
                            <Button size="sm" variant="outline">
                              Compare
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

function Check(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default ProductDetail;
