import React, { useEffect, useState, useRef } from 'react';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [textOpacity, setTextOpacity] = useState(1); // New state for text opacity
  const heroImages = [
    '/WebImages/Hero.jpeg', 
    '/WebImages/Hero1.jpeg', 
    '/WebImages/Hero2.jpeg',
    '/WebImages/Hero3.jpeg',
    '/WebImages/Hero4.jpeg'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      // Calculate opacity and ensure it's only done on the client-side
      setTextOpacity(Math.max(0, 1 - currentScrollY / (window.innerHeight * 0.5)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageOpacity(0);
      setTimeout(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
        setImageOpacity(1);
      }, 500); // Half a second for the fade-out
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center">
      {/* Background Text - Now in Foreground (z-30) */}
      <div 
        className="fixed pointer-events-none z-30"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: textOpacity,
        }}
      >
        <h1 className="text-[18vw] font-display font-bold text-gray-400 tracking-tighter leading-none select-none mix-blend-normal">
          <span style={{ display: 'block', textAlign: 'center' }}>Contour</span>
          <span style={{ display: 'block', textAlign: 'center' }}>Worldwide</span>
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
              src={heroImages[currentImageIndex]} 
              alt="Edgy Modern Hero" 
              className="w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: imageOpacity }}
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