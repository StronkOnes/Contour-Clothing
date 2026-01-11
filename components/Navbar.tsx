import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sun, Moon } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (page: PageView) => void;
  // Add a darkMode prop and a toggle function
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigate, isDarkMode, onToggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? (isDarkMode ? 'bg-black/80' : 'bg-white/90 backdrop-blur-md shadow-sm') 
      : 'bg-transparent'
  } ${isDarkMode ? 'text-white' : 'text-black'}`;

  const linkClasses = `text-sm font-semibold tracking-widest hover:text-gray-400 transition-colors uppercase cursor-pointer`;

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 flex justify-between items-center py-4">
        {/* Logo */}
        <div 
          onClick={() => handleNav('home')}
          className="text-2xl font-display font-bold tracking-tighter cursor-pointer z-50"
        >
          CONTOUR
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleNav('home')} className={linkClasses}>Home</button>
          <button onClick={() => {
             handleNav('home');
             setTimeout(() => {
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
             }, 100);
          }} className={linkClasses}>Collection</button>
          <button onClick={() => handleNav('about')} className={linkClasses}>About</button>
          <button onClick={() => handleNav('contact')} className={linkClasses}>Contact</button>
          <button onClick={() => handleNav('admin')} className={linkClasses}>Admin</button>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 z-50">
          <button onClick={onToggleDarkMode} className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={onOpenCart}
            className="relative p-2 hover:bg-gray-700 rounded-full transition-colors group"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full transform scale-100 transition-transform group-hover:scale-110">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in md:hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <button onClick={() => handleNav('home')} className="text-2xl font-display uppercase">Home</button>
            <button onClick={() => handleNav('home')} className="text-2xl font-display uppercase">Collection</button>
            <button onClick={() => handleNav('about')} className="text-2xl font-display uppercase">About</button>
            <button onClick={() => handleNav('contact')} className="text-2xl font-display uppercase">Contact</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;