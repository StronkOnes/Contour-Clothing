import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Lightbox from './Lightbox'; // Import the new Lightbox component

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, onAddToCart, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.galleryImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.galleryImages.length) % product.galleryImages.length);
  };

  return (
    <>
      <div className="pt-32 pb-24 container mx-auto px-6 bg-white relative z-20">
        <div className="max-w-5xl mx-auto">
          <button onClick={onBack} className="mb-8 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-gray-500 transition-colors">
            &larr; Back to Collection
          </button>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div 
                className="aspect-[3/4] overflow-hidden rounded-sm shadow-xl relative bg-gray-100 mb-4 cursor-pointer"
                onClick={() => openLightbox(currentImageIndex)}
              >
                <img 
                  src={product.galleryImages[currentImageIndex]}
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {product.galleryImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`aspect-[3/4] overflow-hidden rounded-sm shadow-lg relative bg-gray-100 cursor-pointer ${currentImageIndex === index ? 'ring-2 ring-black' : ''}`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      openLightbox(index);
                    }}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="sticky top-32">
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4">{product.name}</h1>
              <p className="text-3xl font-display text-gray-800 mb-6">R {product.price.toFixed(2)}</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{product.description}</p>
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox 
          images={product.galleryImages}
          selectedIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  );
};

export default ProductPage;
