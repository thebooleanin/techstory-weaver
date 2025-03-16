
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight, 
  Star, 
  Info, 
  Check, 
  X, 
  Share2, 
  Heart, 
  ShoppingCart,
  Clock,
  Car,
  Bike,
  Smartphone,
  Tag,
  Award,
  CircleCheck
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProductById } from '@/services/productService';
import { Product, ProductSpec, Variant, ProductType } from '@/types/product';

const ProductDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [specifications, setSpecifications] = useState<{ [key: string]: ProductSpec[] }>({});

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProduct = async () => {
      try {
        if (!id) return;
        
        setLoading(true);
        const data = await fetchProductById(id, type as ProductType);
        
        if (data) {
          setProduct(data);
          
          // Set the primary image
          const primaryImage = data.images.find(img => img.isPrimary)?.url || data.images[0]?.url;
          setSelectedImage(primaryImage);
          
          // Set the default variant
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
          }
          
          // Group specifications by category
          const groupedSpecs = data.specifications.reduce((acc, spec) => {
            if (!acc[spec.category]) {
              acc[spec.category] = [];
            }
            acc[spec.category].push(spec);
            return acc;
          }, {} as { [key: string]: ProductSpec[] });
          
          setSpecifications(groupedSpecs);
        } else {
          toast.error('Product not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, type, navigate]);

  // Handle variant selection
  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  // Handle "Add to Wishlist" click
  const handleAddToWishlist = () => {
    toast.success(`${product?.name} added to your wishlist`);
  };

  // Handle "Add to Cart" click
  const handleAddToCart = () => {
    toast.success(`${product?.name} (${selectedVariant?.name}) added to your cart`);
  };

  // Get the product type icon
  const getProductTypeIcon = (productType: ProductType = 'bike') => {
    switch (productType) {
      case 'car':
        return <Car className="h-5 w-5" />;
      case 'bike':
        return <Bike className="h-5 w-5" />;
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-60 h-8 bg-muted rounded mb-10"></div>
            <div className="w-full max-w-3xl h-96 bg-muted rounded mb-8"></div>
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-40 bg-muted rounded"></div>
              <div className="h-40 bg-muted rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you are looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${product.brand} ${product.name} | Details and Specifications`}</title>
        <meta name="description" content={product.shortDescription || product.description.substring(0, 160)} />
      </Helmet>
      
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container py-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary">Home</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href={`/${product.type}s`} className="hover:text-primary capitalize">{`${product.type}s`}</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href={`/${product.type}s/${product.brand.toLowerCase()}`} className="hover:text-primary">{product.brand}</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="truncate">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product Header */}
      <section className="bg-background pt-6 pb-4">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{product.brand} {product.name}</h1>
              
              <div className="flex items-center mt-2 gap-6">
                <div className="flex items-center">
                  <div className="flex items-center text-amber-500 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'fill-none'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating} / 5</span>
                  {product.reviewCount && (
                    <span className="text-sm text-muted-foreground ml-1">
                      ({product.reviewCount} reviews)
                    </span>
                  )}
                </div>
                
                {product.launchDate && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Launched: {new Date(product.launchDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {product.isPopular && (
                <Badge variant="secondary" className="gap-1">
                  <Award className="h-3.5 w-3.5" /> Popular
                </Badge>
              )}
              {product.isFeatured && (
                <Badge className="gap-1">
                  <Star className="h-3.5 w-3.5" /> Featured
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Product Images */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] bg-muted/30 rounded-lg overflow-hidden">
                {selectedImage && (
                  <img 
                    src={selectedImage} 
                    alt={`${product.brand} ${product.name}`}
                    className="w-full h-full object-cover"
                  />
                )}
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1 bg-black/70 text-white border-none">
                    {getProductTypeIcon(product.type)}
                    <span className="capitalize">{product.type}</span>
                  </Badge>
                </div>
                
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute top-4 right-4 rounded-full opacity-80 hover:opacity-100"
                  onClick={() => toast.success('Image shared to clipboard')}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === image.url ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info & Actions */}
            <div className="lg:col-span-5 space-y-6">
              {/* Price and Short Description */}
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold">
                        ₹{(selectedVariant?.price || product.price.base).toLocaleString()}
                      </span>
                      {product.price.max && product.price.max > (selectedVariant?.price || product.price.base) && (
                        <span className="text-muted-foreground">
                          onwards
                        </span>
                      )}
                    </div>
                    
                    {product.shortDescription && (
                      <p className="text-muted-foreground">{product.shortDescription}</p>
                    )}
                  </div>
                  
                  {/* Variants */}
                  {product.variants.length > 1 && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Select Variant
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.variants.map((variant) => (
                          <button
                            key={variant.id}
                            onClick={() => handleVariantSelect(variant)}
                            className={`flex items-center justify-between p-3 rounded-md border transition-all ${
                              selectedVariant?.id === variant.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                            disabled={!variant.isAvailable}
                          >
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{variant.name}</span>
                              <span className="text-sm text-muted-foreground">
                                ₹{variant.price.toLocaleString()}
                              </span>
                            </div>
                            {selectedVariant?.id === variant.id && (
                              <CircleCheck className="h-5 w-5 text-primary" />
                            )}
                            {!variant.isAvailable && (
                              <Badge variant="outline" className="bg-muted">Out of Stock</Badge>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <Button 
                      className="flex-1" 
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleAddToWishlist}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-3">Key Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-1" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              
              {/* Pros & Cons */}
              {(product.pros || product.cons) && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-4">Pros & Cons</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.pros && product.pros.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-green-600 mb-2">Pros</h4>
                          <ul className="space-y-2">
                            {product.pros.map((pro, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                <span className="text-sm">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {product.cons && product.cons.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-red-600 mb-2">Cons</h4>
                          <ul className="space-y-2">
                            {product.cons.map((con, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <X className="h-4 w-4 text-red-600 mt-0.5" />
                                <span className="text-sm">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Section */}
      <section className="py-8 bg-muted/20">
        <div className="container">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              {product.popularComparison && (
                <TabsTrigger value="comparison">Compare</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{product.brand} {product.name} Overview</h2>
                  <p className="mb-6 whitespace-pre-line">{product.description}</p>
                  
                  {product.features && product.features.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">{product.brand} {product.name} Specifications</h2>
                  
                  {Object.entries(specifications).map(([category, specs]) => (
                    <div key={category} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">{category}</h3>
                      <div className="border rounded-lg overflow-hidden">
                        {specs.map((spec, index) => (
                          <div 
                            key={spec.id} 
                            className={`flex items-start p-4 ${
                              index !== specs.length - 1 ? 'border-b' : ''
                            }`}
                          >
                            <div className="w-1/3 font-medium">{spec.name}</div>
                            <div className="w-2/3">{spec.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            {product.popularComparison && (
              <TabsContent value="comparison" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Compare {product.brand} {product.name}</h2>
                    
                    <p className="mb-6">How does the {product.brand} {product.name} stack up against the competition? Here are some popular comparisons:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {product.popularComparison.map((competitor, index) => (
                        <Card key={index}>
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <h3 className="font-semibold mb-2">{competitor} vs {product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">Compare prices, specifications, features, and more</p>
                            <Button variant="outline" size="sm" className="w-full">
                              View Comparison
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
      
      {/* Similar Products */}
      {product.isPopular && (
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <p className="text-center mb-8">
              This feature will be available soon. Check back later!
            </p>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
