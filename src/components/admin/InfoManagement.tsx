
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Car, 
  Bike, 
  Smartphone, 
  PlusCircle, 
  Trash2, 
  Upload, 
  Edit, 
  X, 
  Plus, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Product, ProductType } from '@/types/product';

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    _id: "bike1",
    type: "bike",
    name: "XPulse 210",
    brand: "Hero",
    description: "The Hero XPulse 210 is an adventure motorcycle designed for both on-road and off-road experiences.",
    price: { base: 142000, max: 159000 },
    images: [{ id: "1", url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39", alt: "Hero XPulse 210" }],
    specifications: [
      { id: "s1", name: "Engine", value: "210cc", category: "Engine" },
      { id: "s2", name: "Mileage", value: "45 kmpl", category: "Performance" }
    ],
    variants: [
      { id: "v1", name: "Standard", price: 142000, isAvailable: true },
      { id: "v2", name: "Rally Kit", price: 159000, isAvailable: true }
    ],
    rating: 4.3,
    createdAt: "2023-10-15T10:30:00.000Z"
  },
  {
    _id: "car1",
    type: "car",
    name: "Thar",
    brand: "Mahindra",
    description: "The Mahindra Thar is an off-road SUV with rugged styling and powerful performance.",
    price: { base: 1370000, max: 1670000 },
    images: [{ id: "1", url: "https://images.unsplash.com/photo-1532975311187-3ff29a3f6ccd", alt: "Mahindra Thar" }],
    specifications: [
      { id: "s1", name: "Engine", value: "2.2L Diesel", category: "Engine" },
      { id: "s2", name: "Mileage", value: "15 kmpl", category: "Performance" }
    ],
    variants: [
      { id: "v1", name: "AX", price: 1370000, isAvailable: true },
      { id: "v2", name: "LX", price: 1670000, isAvailable: true }
    ],
    rating: 4.5,
    createdAt: "2023-09-20T14:45:00.000Z"
  },
  {
    _id: "mobile1",
    type: "mobile",
    name: "Pixel 8",
    brand: "Google",
    description: "The Google Pixel 8 features an advanced camera system and the latest Android experience.",
    price: { base: 59999, max: 79999 },
    images: [{ id: "1", url: "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f", alt: "Google Pixel 8" }],
    specifications: [
      { id: "s1", name: "Processor", value: "Tensor G3", category: "Performance" },
      { id: "s2", name: "Battery", value: "4500 mAh", category: "Battery" }
    ],
    variants: [
      { id: "v1", name: "8GB/128GB", price: 59999, isAvailable: true },
      { id: "v2", name: "12GB/256GB", price: 79999, isAvailable: true }
    ],
    rating: 4.7,
    createdAt: "2023-11-10T09:15:00.000Z"
  }
];

// Validation schema for product form
const productFormSchema = z.object({
  type: z.enum(['car', 'bike', 'mobile']),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  brand: z.string().min(2, { message: "Brand must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  shortDescription: z.string().optional(),
  price: z.object({
    base: z.coerce.number().min(1, { message: "Base price is required." }),
    max: z.coerce.number().optional()
  }),
  launchDate: z.string().optional(),
  isPopular: z.boolean().optional(),
  isFeatured: z.boolean().optional()
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const InfoManagement = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [activeTab, setActiveTab] = useState<ProductType | 'all'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [specifications, setSpecifications] = useState<{ name: string; value: string; category: string }[]>([]);
  const [variants, setVariants] = useState<{ name: string; price: number; isAvailable: boolean }[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      type: 'bike',
      name: '',
      brand: '',
      description: '',
      shortDescription: '',
      price: {
        base: 0,
        max: undefined
      },
      launchDate: '',
      isPopular: false,
      isFeatured: false
    }
  });

  // Filter products based on active tab
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.type === activeTab);

  // Reset form and related states
  const resetForm = () => {
    form.reset();
    setProductImages([]);
    setSpecifications([]);
    setVariants([{ name: 'Standard', price: 0, isAvailable: true }]);
    setFeatures([]);
    setPros([]);
    setCons([]);
  };

  // Load product data into form for editing
  const loadProductForEdit = (product: Product) => {
    setSelectedProduct(product);
    
    form.reset({
      type: product.type,
      name: product.name,
      brand: product.brand,
      description: product.description,
      shortDescription: product.shortDescription || '',
      price: {
        base: product.price.base,
        max: product.price.max
      },
      launchDate: product.launchDate || '',
      isPopular: product.isPopular || false,
      isFeatured: product.isFeatured || false
    });
    
    // Load specifications
    setSpecifications(product.specifications.map(spec => ({
      name: spec.name,
      value: spec.value,
      category: spec.category
    })));
    
    // Load variants
    setVariants(product.variants.map(variant => ({
      name: variant.name,
      price: variant.price,
      isAvailable: variant.isAvailable
    })));
    
    // Load other arrays
    setFeatures(product.features || []);
    setPros(product.pros || []);
    setCons(product.cons || []);
    
    setIsEditDialogOpen(true);
  };

  // Handle form submission for adding a new product
  const handleAddProduct = (data: ProductFormValues) => {
    if (specifications.length === 0) {
      toast.error("At least one specification is required");
      return;
    }
    
    if (variants.length === 0) {
      toast.error("At least one variant is required");
      return;
    }
    
    // Fix the type issue by ensuring base is provided
    const newProduct: Product = {
      _id: `${data.type}${Date.now()}`,
      type: data.type,
      name: data.name,
      brand: data.brand,
      description: data.description,
      shortDescription: data.shortDescription,
      // In a real app, we'd upload images to server and get URLs back
      images: productImages.map((_, i) => ({
        id: `img${i}`,
        url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
        alt: `${data.brand} ${data.name}`
      })),
      price: {
        base: data.price.base || 0, // Ensure base is always provided
        max: data.price.max
      },
      specifications: specifications.map((spec, i) => ({
        id: `spec${i}`,
        ...spec
      })),
      variants: variants.map((variant, i) => ({
        id: `variant${i}`,
        ...variant
      })),
      features: features.length > 0 ? features : undefined,
      pros: pros.length > 0 ? pros : undefined,
      cons: cons.length > 0 ? cons : undefined,
      launchDate: data.launchDate,
      isPopular: data.isPopular,
      isFeatured: data.isFeatured,
      createdAt: new Date().toISOString()
    };
    
    setProducts([newProduct, ...products]);
    resetForm();
    setIsAddDialogOpen(false);
    
    toast.success(`Added new ${data.type}: ${data.brand} ${data.name}`);
  };

  // Handle form submission for editing a product
  const handleEditProduct = (data: ProductFormValues) => {
    if (!selectedProduct) return;
    
    const updatedProducts = products.map(product => {
      if (product._id === selectedProduct._id) {
        return {
          ...product,
          type: data.type,
          name: data.name,
          brand: data.brand,
          description: data.description,
          shortDescription: data.shortDescription,
          price: {
            base: data.price.base || 0, // Ensure base is always provided
            max: data.price.max
          },
          specifications: specifications.map((spec, i) => ({
            id: `spec${i}`,
            ...spec
          })),
          variants: variants.map((variant, i) => ({
            id: `variant${i}`,
            ...variant
          })),
          features: features.length > 0 ? features : undefined,
          pros: pros.length > 0 ? pros : undefined,
          cons: cons.length > 0 ? cons : undefined,
          launchDate: data.launchDate,
          isPopular: data.isPopular,
          isFeatured: data.isFeatured,
          updatedAt: new Date().toISOString()
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    resetForm();
    setIsEditDialogOpen(false);
    
    toast.success(`Updated ${data.type}: ${data.brand} ${data.name}`);
  };

  // Handle delete product
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    
    const updatedProducts = products.filter(product => product._id !== selectedProduct._id);
    setProducts(updatedProducts);
    setIsDeleteDialogOpen(false);
    
    toast.success(`Deleted ${selectedProduct.type}: ${selectedProduct.brand} ${selectedProduct.name}`);
  };

  // Handle image selection
  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setProductImages(Array.from(files));
    }
  };

  // Add a new specification
  const addSpecification = () => {
    setSpecifications([...specifications, { name: '', value: '', category: 'General' }]);
  };

  // Update specification
  const updateSpecification = (index: number, field: string, value: string) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };
    setSpecifications(updatedSpecs);
  };

  // Remove specification
  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  // Add a new variant
  const addVariant = () => {
    setVariants([...variants, { name: '', price: 0, isAvailable: true }]);
  };

  // Update variant
  const updateVariant = (index: number, field: string, value: any) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setVariants(updatedVariants);
  };

  // Remove variant
  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // Add a new feature/pro/con
  const addItem = (type: 'feature' | 'pro' | 'con') => {
    if (type === 'feature') {
      setFeatures([...features, '']);
    } else if (type === 'pro') {
      setPros([...pros, '']);
    } else {
      setCons([...cons, '']);
    }
  };

  // Update feature/pro/con
  const updateItem = (type: 'feature' | 'pro' | 'con', index: number, value: string) => {
    if (type === 'feature') {
      const updatedFeatures = [...features];
      updatedFeatures[index] = value;
      setFeatures(updatedFeatures);
    } else if (type === 'pro') {
      const updatedPros = [...pros];
      updatedPros[index] = value;
      setPros(updatedPros);
    } else {
      const updatedCons = [...cons];
      updatedCons[index] = value;
      setCons(updatedCons);
    }
  };

  // Remove feature/pro/con
  const removeItem = (type: 'feature' | 'pro' | 'con', index: number) => {
    if (type === 'feature') {
      setFeatures(features.filter((_, i) => i !== index));
    } else if (type === 'pro') {
      setPros(pros.filter((_, i) => i !== index));
    } else {
      setCons(cons.filter((_, i) => i !== index));
    }
  };

  // Get icon based on product type
  const getProductIcon = (type: ProductType) => {
    switch (type) {
      case 'car':
        return <Car className="h-4 w-4" />;
      case 'bike':
        return <Bike className="h-4 w-4" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Information Management</h2>
        <Button onClick={() => {
          resetForm();
          setIsAddDialogOpen(true);
        }}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as ProductType | 'all')}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="car" className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              Cars
            </TabsTrigger>
            <TabsTrigger value="bike" className="flex items-center gap-1">
              <Bike className="h-4 w-4" />
              Bikes
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-1">
              <Smartphone className="h-4 w-4" />
              Mobiles
            </TabsTrigger>
          </TabsList>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {getProductIcon(product.type)}
                          <span className="capitalize">{product.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>
                        ₹{product.price.base.toLocaleString()}
                        {product.price.max && product.price.max > product.price.base && (
                          <> - ₹{product.price.max.toLocaleString()}</>
                        )}
                      </TableCell>
                      <TableCell>
                        {product.isFeatured ? (
                          <Badge variant="default" className="bg-primary">Featured</Badge>
                        ) : product.isPopular ? (
                          <Badge variant="secondary">Popular</Badge>
                        ) : (
                          <Badge variant="outline">Standard</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(product.createdAt || '').toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => loadProductForEdit(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Tabs>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new product to the database.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddProduct)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="bike">Bike</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. XPulse 210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Hero" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price.base"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Price (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price.max"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Price (₹) (Optional)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="launchDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Launch Date (Optional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center space-x-4">
                    <FormField
                      control={form.control}
                      name="isPopular"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4"
                            />
                          </FormControl>
                          <FormLabel className="m-0">Popular</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4"
                            />
                          </FormControl>
                          <FormLabel className="m-0">Featured</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Description and Images */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Description and Images</h3>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide a detailed description of the product" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A brief summary for listings and previews" 
                            rows={2}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <FormLabel>Product Images</FormLabel>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      {productImages.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 flex-wrap">
                            {productImages.map((file, i) => (
                              <div key={i} className="relative">
                                <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${i}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5"
                                  onClick={() => setProductImages(productImages.filter((_, index) => index !== i))}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add More
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Drag and drop images here or click to browse</p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Choose Files
                          </Button>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageSelection}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Specifications */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Specifications</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addSpecification}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Specification
                  </Button>
                </div>
                
                {specifications.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4 border rounded-lg">
                    No specifications added yet. Click "Add Specification" to add one.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <Input
                            placeholder="Name (e.g. Engine)"
                            value={spec.name}
                            onChange={(e) => updateSpecification(index, 'name', e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder="Value (e.g. 210cc)"
                            value={spec.value}
                            onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder="Category (e.g. Engine)"
                            value={spec.category}
                            onChange={(e) => updateSpecification(index, 'category', e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSpecification(index)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Variants */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Variants</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addVariant}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Variant
                  </Button>
                </div>
                
                {variants.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4 border rounded-lg">
                    No variants added yet. Click "Add Variant" to add one.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {variants.map((variant, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <Input
                            placeholder="Name (e.g. Standard)"
                            value={variant.name}
                            onChange={(e) => updateVariant(index, 'name', e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            type="number"
                            placeholder="Price"
                            value={variant.price}
                            onChange={(e) => updateVariant(index, 'price', Number(e.target.value))}
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={variant.isAvailable}
                            onChange={(e) => updateVariant(index, 'isAvailable', e.target.checked)}
                            className="h-4 w-4 mr-2"
                          />
                          <span className="text-sm">Available</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeVariant(index)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Features, Pros, Cons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Features */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Features</h3>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => addItem('feature')}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Add a feature"
                        value={feature}
                        onChange={(e) => updateItem('feature', index, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem('feature', index)}
                        className="text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {/* Pros */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Pros</h3>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => addItem('pro')}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {pros.map((pro, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Add a pro"
                        value={pro}
                        onChange={(e) => updateItem('pro', index, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem('pro', index)}
                        className="text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {/* Cons */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Cons</h3>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => addItem('con')}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {cons.map((con, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Add a con"
                        value={con}
                        onChange={(e) => updateItem('con', index, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem('con', index)}
                        className="text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Product</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog - Similar to Add Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product information below.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditProduct)} className="space-y-6">
              {/* Same form fields as Add Dialog */}
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Product</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-2">
                {getProductIcon(selectedProduct.type)}
                <span className="font-medium">{selectedProduct.brand} {selectedProduct.name}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This will permanently remove the product from the database.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InfoManagement;
