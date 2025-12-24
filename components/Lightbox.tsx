import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, selectedIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={onClose}>
      <button 
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X size={32} />
      </button>
      
      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute left-4 md:left-8 text-white p-2 bg-black/30 rounded-full hover:bg-black/50"
          onClick={onPrev}
        >
          <ChevronLeft size={40} />
        </button>

        <img 
          src={images[selectedIndex]} 
          alt={`Gallery view ${selectedIndex + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />

        <button 
          className="absolute right-4 md:right-8 text-white p-2 bg-black/30 rounded-full hover:bg-black/50"
          onClick={onNext}
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
