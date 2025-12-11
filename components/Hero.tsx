import React, { useEffect, useState, useRef } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High quality static image
  const heroImage = "https://images.unsplash.com/photo-1509557965875-b88c8a351b96?auto=format&fit=crop&w=800&q=80";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center">
      {/* Background Text - Now in Foreground (z-30) */}
      <div 
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-30"
        style={{ 
            transform: `translateY(${scrollY * 0.2}px)`
        }}
      >
        <h1 className="text-[25vw] font-display font-bold text-gray-400 tracking-tighter leading-none select-none mix-blend-normal">
          CONTOUR
        </h1>
      </div>

      {/* Image Container - Behind Text (z-10) */}
      <div 
        className="relative z-10 w-full max-w-md md:max-w-xl px-4 transition-transform will-change-transform"
        style={{ 
            transform: `translateY(-${scrollY * 0.1}px)` 
        }}
      >
        <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl relative bg-gray-100 group">
            <img 
              src={heroImage} 
              alt="Edgy Modern Hero" 
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            />
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 text-center mix-blend-difference z-20">
            <button 
                onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 border border-transparent hover:border-white"
            >
                Enter
            </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;