export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string; // Made optional as galleryImages will be used
  imageBack?: string; // Made optional as galleryImages will be used
  galleryImages: string[]; // New field to hold all product images
  category: 'Urban Legends' | 'Minimal Essence' | 'Abstract Vibes';
  
  // Takealot / Retail Integration Data Structure
  sku: string;
  barcode?: string;
  inventoryCount: number;
  tsin?: string; // Takealot Standard Identification Number
  leadTimeDays: number;
}

export interface CartItem extends Product {
  quantity: number;
  delivery_fee?: number;
}

export interface Order {
  name: string;
  email: string;
  address: string;
  delivery_option: string;
  cart: CartItem[];
  delivery_fee: number;
}

export interface UserContact {
  name: string;
  email: string;
  message: string;
}

export type PageView = 'home' | 'about' | 'contact' | 'product' | 'admin' | 'terms-of-service' | 'privacy-policy';