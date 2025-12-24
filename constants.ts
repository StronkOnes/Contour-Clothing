import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'bw-001',
    name: 'Void Hoodie',
    price: 850,
    description: 'Heavyweight black french terry hoodie with minimalist structure.',
    image: '/WebImages/Collection1.png', // Keep for backward compatibility if needed elsewhere
    imageBack: '/WebImages/Collection1.1.png', // Keep for backward compatibility if needed elsewhere
    galleryImages: ['/WebImages/Collection1.png', '/WebImages/Collection1.1.png'],
    category: 'Minimal Essence',
    sku: 'CON-BW-001-M',
    inventoryCount: 20,
    leadTimeDays: 2
  },
  {
    id: 'bw-002',
    name: 'Skeleton Tee',
    price: 450,
    description: 'Oversized white tee with distressed detailing.',
    image: '/WebImages/Collection2.png',
    imageBack: '/WebImages/Collection2.1.png',
    galleryImages: ['/WebImages/Collection2.png', '/WebImages/Collection2.1.png'],
    category: 'Minimal Essence',
    sku: 'CON-BW-002-L',
    inventoryCount: 35,
    leadTimeDays: 1
  },
  {
    id: 'bw-003',
    name: 'Abyss Hoodie',
    price: 895,
    description: 'Jet black pigment dyed hoodie. Boxy fit.',
    image: '/WebImages/Collextion3.jpg',
    imageBack: '/WebImages/Collection3.1.jpg',
    galleryImages: ['/WebImages/Collextion3.jpg', '/WebImages/Collection3.1.jpg'],
    category: 'Minimal Essence',
    sku: 'CON-BW-003-XL',
    inventoryCount: 15,
    leadTimeDays: 3
  },
  {
    id: 'bw-004',
    name: 'Phantom Tee',
    price: 450,
    description: 'Premium white cotton. High density neck ribbing.',
    image: '/WebImages/Collection4.jpeg',
    imageBack: '/WebImages/Collection4.1.jpeg',
    galleryImages: ['/WebImages/Collection4.jpeg', '/WebImages/Collection4.1.jpeg', '/WebImages/Collection4.2.jpeg'], // Added Collection4.2
    category: 'Minimal Essence',
    sku: 'CON-BW-004-M',
    inventoryCount: 42,
    leadTimeDays: 1
  },
  {
    id: 'bw-005',
    name: 'Eclipse Hoodie',
    price: 950,
    description: 'The ultimate black hoodie. Double layered hood.',
    image: '/WebImages/Collection5.png',
    imageBack: '/WebImages/Collection5.1.png',
    galleryImages: ['/WebImages/Collection5.png', '/WebImages/Collection5.1.png', '/WebImages/Collection5.2.png'],    category: 'Minimal Essence',
    sku: 'CON-BW-005-L',
    inventoryCount: 10,
    leadTimeDays: 2
  },
  {
    id: 'bw-006',
    name: 'Mono Sweat',
    price: 650,
    description: 'A classic crewneck sweatshirt for everyday wear.',
    image: '/WebImages/Collection6.jpeg',
    imageBack: '/WebImages/Collection6.jpeg',
    galleryImages: ['/WebImages/Collection6.jpeg'],
    category: 'Minimal Essence',
    sku: 'CON-BW-006-M',
    inventoryCount: 25,
    leadTimeDays: 1
  },
  {
    id: 'bw-007',
    name: 'Urban Tee',
    price: 475,
    description: 'A stylish tee with a unique graphic print.',
    image: '/WebImages/Collection7.png',
    imageBack: '/WebImages/Collection7.1.png',
    galleryImages: ['/WebImages/Collection7.png', '/WebImages/Collection7.1.png'],
    category: 'Graphic Series',
    sku: 'CON-BW-007-L',
    inventoryCount: 30,
    leadTimeDays: 1
  },
  {
    id: 'bw-008',
    name: 'Stealth Hoodie',
    price: 920,
    description: 'A sleek hoodie with subtle design elements.',
    image: '/WebImages/Collection8.png',
    imageBack: '/WebImages/Collection8.2.png',
    galleryImages: ['/WebImages/Collection8.png', '/WebImages/Collection8.2.png'],
    category: 'Minimal Essence',
    sku: 'CON-BW-008-XL',
    inventoryCount: 18,
    leadTimeDays: 2
  }
];

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com'
};