import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import PaystackModal from './components/PaystackModal';
import ProductPage from './components/ProductPage';
import { PRODUCTS, SOCIAL_LINKS } from './constants';
import AdminPage from './components/AdminPage';
import Login from './components/Login';
import { Product, CartItem, PageView } from './types';
import { ArrowRight, Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState(() => {
    return localStorage.getItem('adminPassword') || 'password';
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogin = (enteredPassword: string) => {
    if (enteredPassword === password) {
      setIsAdmin(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSetPassword = (newPassword: string) => {
    setPassword(newPassword);
    localStorage.setItem('adminPassword', newPassword);
    alert('Password updated successfully!');
  };

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

  // Product Selection
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleBackToCollection = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
  };

  // Simplified: All products in one view
  const allProducts = PRODUCTS;

  // Page Content Components
  const Collection = () => (
    <div id="collection" className="bg-white dark:bg-black relative z-20">
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black dark:border-white pb-4">
          <div className="text-center w-full">
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase mb-2">The Drop</h2>
            <p className="text-gray-500 max-w-md mx-auto">Limited edition black and white essentials.</p>
          </div>
          <div className="hidden md:block">
            <span className="text-xs font-bold uppercase tracking-widest">Total Products: {allProducts.length}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {allProducts.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={addToCart} onSelectProduct={handleSelectProduct} />
          ))}
        </div>
      </section>
    </div>
  );

  const About = () => (
    <div className="pt-32 pb-24 container mx-auto px-6 bg-white dark:bg-black relative z-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display font-bold uppercase mb-12 leading-none">Executive<br/>Summary.</h1>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <img src="/WebImages/About.jpeg" alt="About" className="w-full rounded shadow-xl" />
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Contour Worldwide is a clothing brand targeting Gen Z and individuals aged 25-40 with high-quality, comfortable, and stylish t-shirts, hoodies, and sweaters. Our mission is to provide fashion-forward apparel that resonates with our audience's values and aesthetic.
            </p>
            <p>
              We are based in Olifantsfontein Clayville west South Africa.
            </p>
            <p>
              Phone number is: 0715510509
            </p>
            <p>
              Email: ContourWorldwide.co.za siphondala8@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const Contact = () => (
    <div className="pt-32 pb-24 container mx-auto px-6 bg-white dark:bg-black min-h-screen relative z-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
           <h1 className="text-5xl md:text-7xl font-display font-bold uppercase mb-8">Contact.</h1>
           <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">Issues with your order? Reach out.</p>
           
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                    <Mail className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-xs uppercase font-bold text-gray-400">Personal Email</p>
                    <p className="font-semibold">siphondala8@gmail.com</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                    <Phone className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-xs uppercase font-bold text-gray-400">Phone</p>
                    <p className="font-semibold">0715510509</p>
                 </div>
              </div>
           </div>

           <div className="flex gap-4 mt-12">
             <a href={SOCIAL_LINKS.instagram} className="p-3 bg-black text-white rounded-full hover:bg-gray-800"><Instagram className="w-5 h-5"/></a>
           </div>
        </div>

        <form className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Name</label>
            <input type="text" className="w-full p-4 border-b-2 border-gray-200 bg-transparent focus:border-black dark:focus:border-white focus:outline-none transition-colors" placeholder="Name" />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Email</label>
            <input type="email" className="w-full p-4 border-b-2 border-gray-200 bg-transparent focus:border-black dark:focus:border-white focus:outline-none transition-colors" placeholder="Email" />
          </div>
          <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            Send <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen font-sans text-brand-black bg-white ${isDarkMode ? 'dark' : ''}`}>
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={(page) => setCurrentPage(page)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
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
        {currentPage === 'admin' && (isAdmin ? <AdminPage onSetPassword={handleSetPassword} /> : <Login onLogin={handleLogin} />)}
        {currentPage === 'product' && selectedProduct && (
          <ProductPage 
            product={selectedProduct} 
            onAddToCart={addToCart} 
            onBack={handleBackToCollection}
          />
        )}
      </main>

      <footer className="bg-black text-white py-16 px-6 relative z-20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl font-display font-bold">Contour Worldwide</h2>
          </div>
          <div className="text-gray-500 text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Contour Worldwide.
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
        onSuccess={clearCart}
      />
    </div>
  );
};

export default App;