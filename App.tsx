import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import PaystackModal from './components/PaystackModal';
import { PRODUCTS, SOCIAL_LINKS } from './constants';
import { Product, CartItem, PageView } from './types';
import { ArrowRight, Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cart Management
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Simplified: All products in one view
  const allProducts = PRODUCTS;

  // Page Content Components
  const Collection = () => (
    <div id="collection" className="bg-white relative z-20">
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black pb-4">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase mb-2">The Drop</h2>
            <p className="text-gray-500 max-w-md">Limited edition black and white essentials.</p>
          </div>
          <div className="hidden md:block">
            <span className="text-xs font-bold uppercase tracking-widest">001 / 005</span>
          </div>
        </div>
        
        {/* Simplified grid for 5 items: 3 top, 2 bottom centered? Or just a grid. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {allProducts.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );

  const About = () => (
    <div className="pt-32 pb-24 container mx-auto px-6 bg-white relative z-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display font-bold uppercase mb-12 leading-none">Monochrome<br/>Manifesto.</h1>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80" alt="About" className="w-full rounded shadow-xl grayscale" />
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Contour isn't about fitting in. It's about standing out by stripping back. We focus purely on form, fit, and the stark contrast between black and white.
            </p>
            <p>
              Five designs. No filler. Just the essentials executed with precision for the modern minimalist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const Contact = () => (
    <div className="pt-32 pb-24 container mx-auto px-6 bg-white min-h-screen relative z-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
           <h1 className="text-5xl md:text-7xl font-display font-bold uppercase mb-8">Contact.</h1>
           <p className="text-xl text-gray-600 mb-12">Issues with your order? Reach out.</p>
           
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                    <Mail className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-xs uppercase font-bold text-gray-400">Email</p>
                    <p className="font-semibold">support@contour.co.za</p>
                 </div>
              </div>
           </div>

           <div className="flex gap-4 mt-12">
             <a href={SOCIAL_LINKS.instagram} className="p-3 bg-black text-white rounded-full hover:bg-gray-800"><Instagram className="w-5 h-5"/></a>
           </div>
        </div>

        <form className="bg-gray-50 p-8 rounded-lg space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Name</label>
            <input type="text" className="w-full p-4 border-b-2 border-gray-200 bg-transparent focus:border-black focus:outline-none transition-colors" placeholder="Name" />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Email</label>
            <input type="email" className="w-full p-4 border-b-2 border-gray-200 bg-transparent focus:border-black focus:outline-none transition-colors" placeholder="Email" />
          </div>
          <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            Send <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-brand-black bg-white">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={(page) => setCurrentPage(page)}
      />

      <main>
        {currentPage === 'home' && (
          <>
            <Hero />
            <Collection />
          </>
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </main>

      <footer className="bg-black text-white py-16 px-6 relative z-20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl font-display font-bold">CONTOUR</h2>
          </div>
          <div className="text-gray-500 text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Contour Clothing.
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <PaystackModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        amount={cartTotal}
        email="customer@example.com"
        onSuccess={clearCart}
      />
    </div>
  );
};

export default App;