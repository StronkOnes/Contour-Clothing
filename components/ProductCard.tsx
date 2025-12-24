import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onSelectProduct }) => {
  return (
    <div className="group relative cursor-pointer" onClick={() => onSelectProduct(product)}>
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-4">
        <img 
          src={product.galleryImages[0] || product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Action */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent the card's onClick from firing
              onAddToCart(product);
            }}
            className="bg-white text-black px-6 py-3 font-bold uppercase text-xs tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white flex items-center gap-2"
          >
            <Plus className="w-3 h-3" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-lg uppercase leading-none">{product.name}</h3>
        <p className="text-gray-500 text-sm leading-tight line-clamp-2 h-10">{product.description}</p>
        <div className="flex justify-between items-center pt-2">
          <span className="font-display font-bold text-lg">R {product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;