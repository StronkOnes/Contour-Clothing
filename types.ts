export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
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
}

export interface UserContact {
  name: string;
  email: string;
  message: string;
}

export type PageView = 'home' | 'about' | 'contact';