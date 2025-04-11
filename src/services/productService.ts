
import { Product, ProductFormData } from '@/types/product';

// Base URL for the API
const API_BASE_URL = 'http://13.200.161.40:5000/api';

// Fetch all products with optional filtering
export const fetchProducts = async (type?: string): Promise<Product[]> => {
  try {
    const url = type 
      ? `${API_BASE_URL}/products?type=${type}` 
      : `${API_BASE_URL}/products`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle the API response format
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    } else if (Array.isArray(data.products)) {
      return data.products;
    } else if (Array.isArray(data)) {
      return data;
    }
    
    // If no products found, return mock data for development
    console.warn('Using mock product data - replace with real API in production');
    return getMockProducts(type);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return mock data for development
    console.warn('Using mock product data - replace with real API in production');
    return getMockProducts(type);
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id: string, type?: string): Promise<Product | null> => {
  try {
    const url = `${API_BASE_URL}/products/${id}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle different API response formats
    if (data.success && data.data) {
      return data.data;
    } else if (data.product) {
      return data.product;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    // Return mock data for development
    console.warn('Using mock product data - replace with real API in production');
    const mockProducts = getMockProducts(type);
    return mockProducts.find(p => p._id === id) || null;
  }
};

// Create a mock product data function for development
const getMockProducts = (type?: string): Product[] => {
  const mockProducts: Product[] = [
    {
      _id: "bike1",
      type: "bike",
      name: "XPulse 210",
      brand: "Hero",
      description: "The Hero XPulse 210 is an adventure motorcycle designed for both on-road and off-road experiences. With its rugged build, long-travel suspension, and powerful engine, it's perfect for those who want to explore beyond the tarmac. The motorcycle comes with features like full-LED headlamp, digital speedometer, and Bluetooth connectivity.",
      shortDescription: "A versatile adventure motorcycle for both on and off-road riding.",
      price: { base: 142000, max: 159000 },
      images: [
        { id: "1", url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39", alt: "Hero XPulse 210", isPrimary: true },
        { id: "2", url: "https://images.unsplash.com/photo-1558980664-3a031cf67ea8", alt: "Hero XPulse 210 Side View" },
        { id: "3", url: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96", alt: "Hero XPulse 210 Front View" }
      ],
      specifications: [
        { id: "s1", name: "Engine", value: "210cc, Oil-cooled", category: "Engine" },
        { id: "s2", name: "Power", value: "18.5 PS @ 8000 rpm", category: "Performance" },
        { id: "s3", name: "Torque", value: "17.1 Nm @ 6500 rpm", category: "Performance" },
        { id: "s4", name: "Mileage", value: "45 kmpl", category: "Performance" },
        { id: "s5", name: "Transmission", value: "5-Speed", category: "Transmission" },
        { id: "s6", name: "Front Suspension", value: "Telescopic", category: "Chassis & Suspension" },
        { id: "s7", name: "Rear Suspension", value: "Monoshock", category: "Chassis & Suspension" },
        { id: "s8", name: "Brakes Front", value: "Disc", category: "Brakes" },
        { id: "s9", name: "Brakes Rear", value: "Disc", category: "Brakes" },
        { id: "s10", name: "ABS", value: "Single-Channel", category: "Brakes" },
        { id: "s11", name: "Fuel Capacity", value: "13 L", category: "Dimensions" },
        { id: "s12", name: "Ground Clearance", value: "220 mm", category: "Dimensions" }
      ],
      variants: [
        { id: "v1", name: "Standard", price: 142000, isAvailable: true },
        { id: "v2", name: "Rally Kit", price: 159000, isAvailable: true }
      ],
      features: [
        "210cc Oil-cooled Engine",
        "Full-LED Headlamp with DRL",
        "Turn-by-Turn Navigation",
        "Bluetooth Connectivity",
        "Digital Speedometer",
        "USB Charging Port",
        "Luggage Rack",
        "Single-Channel ABS"
      ],
      pros: [
        "Excellent off-road capability",
        "Comfortable riding position",
        "Good fuel efficiency",
        "High ground clearance",
        "Attractive design"
      ],
      cons: [
        "Average highway performance",
        "Limited service network",
        "Basic windscreen protection"
      ],
      rating: 4.3,
      reviewCount: 128,
      launchDate: "2023-05-15",
      popularComparison: ["Royal Enfield Himalayan", "KTM 250 Adventure", "BMW G 310 GS"],
      isPopular: true,
      isFeatured: true,
      createdAt: "2023-10-15T10:30:00.000Z"
    },
    {
      _id: "car1",
      type: "car",
      name: "Thar",
      brand: "Mahindra",
      description: "The Mahindra Thar is an off-road SUV with rugged styling and powerful performance. It comes with a choice of petrol and diesel engines, manual and automatic transmissions, and a host of modern features despite its old-school appeal. The car has been designed to tackle the toughest terrains while providing comfort for everyday use.",
      shortDescription: "A legendary off-roader with modern amenities and classic styling.",
      price: { base: 1370000, max: 1670000 },
      images: [
        { id: "1", url: "https://images.unsplash.com/photo-1532975311187-3ff29a3f6ccd", alt: "Mahindra Thar", isPrimary: true },
        { id: "2", url: "https://images.unsplash.com/photo-1545623703-583dd2364bbd", alt: "Mahindra Thar Side View" },
        { id: "3", url: "https://images.unsplash.com/photo-1583356322882-85697c67803a", alt: "Mahindra Thar Interior" }
      ],
      specifications: [
        { id: "s1", name: "Engine", value: "2.2L Diesel / 2.0L Petrol", category: "Engine" },
        { id: "s2", name: "Power", value: "130 bhp @ 3750 rpm (Diesel)", category: "Performance" },
        { id: "s3", name: "Torque", value: "300 Nm @ 1600-2800 rpm (Diesel)", category: "Performance" },
        { id: "s4", name: "Mileage", value: "15 kmpl (Diesel)", category: "Performance" },
        { id: "s5", name: "Transmission", value: "6-Speed MT/AT", category: "Transmission" },
        { id: "s6", name: "Drive Type", value: "4WD", category: "Performance" },
        { id: "s7", name: "Seating Capacity", value: "4", category: "Dimensions" },
        { id: "s8", name: "Ground Clearance", value: "226 mm", category: "Dimensions" },
        { id: "s9", name: "Fuel Tank", value: "57 L", category: "Dimensions" },
        { id: "s10", name: "Safety", value: "Dual Airbags, ABS with EBD", category: "Safety" }
      ],
      variants: [
        { id: "v1", name: "AX", price: 1370000, isAvailable: true },
        { id: "v2", name: "LX", price: 1670000, isAvailable: true }
      ],
      features: [
        "7-inch Touchscreen Infotainment",
        "Android Auto & Apple CarPlay",
        "Cruise Control",
        "Roof-Mounted Speakers",
        "Washable Interior",
        "All-Terrain Tires",
        "Mechanical Locking Differential",
        "Adventure Statistics Display"
      ],
      pros: [
        "Outstanding off-road capability",
        "Powerful engine options",
        "Iconic design",
        "Good build quality",
        "Feature-loaded cabin"
      ],
      cons: [
        "Limited rear space",
        "Average fuel efficiency",
        "Stiff ride quality on highways",
        "Higher price point"
      ],
      rating: 4.5,
      reviewCount: 245,
      launchDate: "2020-11-02",
      popularComparison: ["Force Gurkha", "Maruti Suzuki Jimny", "Jeep Compass"],
      isPopular: true,
      isFeatured: true,
      createdAt: "2023-09-20T14:45:00.000Z"
    },
    {
      _id: "mobile1",
      type: "mobile",
      name: "Pixel 8",
      brand: "Google",
      description: "The Google Pixel 8 features an advanced camera system and the latest Android experience. Powered by the Tensor G3 processor, it offers exceptional AI capabilities, stunning photography, and seamless performance. The device comes with a vibrant OLED display, all-day battery life, and exclusive Google features.",
      shortDescription: "Google's flagship phone with exceptional camera and AI capabilities.",
      price: { base: 59999, max: 79999 },
      images: [
        { id: "1", url: "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f", alt: "Google Pixel 8", isPrimary: true },
        { id: "2", url: "https://images.unsplash.com/photo-1598327105854-c8674faddf79", alt: "Google Pixel 8 Back" },
        { id: "3", url: "https://images.unsplash.com/photo-1595941069915-4ebc5197c14a", alt: "Google Pixel 8 Camera" }
      ],
      specifications: [
        { id: "s1", name: "Processor", value: "Google Tensor G3", category: "Performance" },
        { id: "s2", name: "RAM", value: "8GB/12GB", category: "Performance" },
        { id: "s3", name: "Storage", value: "128GB/256GB", category: "Storage" },
        { id: "s4", name: "Display", value: "6.2-inch OLED, 120Hz", category: "Display" },
        { id: "s5", name: "Resolution", value: "1080 x 2400 pixels", category: "Display" },
        { id: "s6", name: "Main Camera", value: "50MP, f/1.7", category: "Camera" },
        { id: "s7", name: "Ultra-Wide", value: "12MP, f/2.2", category: "Camera" },
        { id: "s8", name: "Front Camera", value: "11MP, f/2.2", category: "Camera" },
        { id: "s9", name: "Battery", value: "4500 mAh", category: "Battery" },
        { id: "s10", name: "Charging", value: "30W Wired, 15W Wireless", category: "Battery" },
        { id: "s11", name: "OS", value: "Android 14", category: "Software" },
        { id: "s12", name: "Water Resistance", value: "IP68", category: "Build" }
      ],
      variants: [
        { id: "v1", name: "8GB/128GB", price: 59999, isAvailable: true },
        { id: "v2", name: "12GB/256GB", price: 79999, isAvailable: true }
      ],
      features: [
        "Google Tensor G3 Processor",
        "Advanced Camera System",
        "7 Years of OS Updates",
        "Magic Eraser Photo Editing",
        "Audio Magic Eraser",
        "Call Screening",
        "Live Translate",
        "Adaptive Battery"
      ],
      pros: [
        "Exceptional camera quality",
        "Clean, bloatware-free Android experience",
        "Long software support",
        "Great AI features",
        "Good battery life"
      ],
      cons: [
        "Relatively expensive",
        "Limited storage options",
        "Average charging speeds",
        "No expandable storage"
      ],
      rating: 4.7,
      reviewCount: 312,
      launchDate: "2023-10-12",
      popularComparison: ["iPhone 15", "Samsung Galaxy S23", "Nothing Phone 2"],
      isPopular: true,
      isFeatured: true,
      createdAt: "2023-11-10T09:15:00.000Z"
    }
  ];

  if (type) {
    return mockProducts.filter(product => product.type === type);
  }
  
  return mockProducts;
};

export default {
  fetchProducts,
  fetchProductById
};
