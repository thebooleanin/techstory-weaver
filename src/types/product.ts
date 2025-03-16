
export type ProductType = 'car' | 'bike' | 'mobile';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductSpec {
  id: string;
  name: string;
  value: string;
  category: string;
}

export interface Variant {
  id: string;
  name: string;
  price: number;
  colors?: string[];
  features?: string[];
  isAvailable: boolean;
}

export interface Product {
  _id: string;
  type: ProductType;
  name: string;
  brand: string;
  description: string;
  shortDescription?: string;
  images: ProductImage[];
  price: {
    base: number;
    max?: number;
  };
  specifications: ProductSpec[];
  variants: Variant[];
  features?: string[];
  pros?: string[];
  cons?: string[];
  rating?: number;
  reviewCount?: number;
  launchDate?: string;
  popularComparison?: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  type: ProductType;
  name: string;
  brand: string;
  description: string;
  shortDescription?: string;
  images: File[];
  price: {
    base: number;
    max?: number;
  };
  specifications: Omit<ProductSpec, 'id'>[];
  variants: Omit<Variant, 'id'>[];
  features?: string[];
  pros?: string[];
  cons?: string[];
  launchDate?: string;
  isPopular?: boolean;
  isFeatured?: boolean;
}
