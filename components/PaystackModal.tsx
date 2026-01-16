import React, { useState, useMemo, useEffect } from 'react';
import { ShieldCheck, X, ExternalLink } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { CartItem } from '../types';

interface PaystackModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onSuccess: () => void;
  onNavigate: (page: PageView) => void;
}

const PaystackModal: React.FC<PaystackModalProps> = ({ isOpen, onClose, cart, onSuccess, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('The Courier Guy');
  const [consentToEmailMarketing, setConsentToEmailMarketing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('You must accept the Terms of Service and Privacy Policy to proceed.');
      return;
    }
    setLoading(true);

    const orderData = {
      name,
      email,
      amount: subtotal,
      consent_to_email_marketing: consentToEmailMarketing,
      address,
      delivery_option: deliveryOption,
      cart_items: cart,
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([orderData]);

    if (error) {
      console.error('Error inserting order:', error);
      alert('There was an error processing your order. Please try again.');
    } else {
      console.log('Order inserted:', data);
      window.open('https://pay.yoco.com/contour-worldwide', '_blank');
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="bg-[#0ba4db] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-sm">Secure Checkout</span>
            </div>
            <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>

        <div className="p-8 max-h-[80vh] overflow-y-auto">
            <div className="mb-6 text-center">
              <p className="text-gray-500 text-sm uppercase tracking-wider">Total to Pay</p>
              <h2 className="text-3xl font-bold text-[#0ba4db]">ZAR {subtotal.toFixed(2)}</h2>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#0ba4db]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#0ba4db]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Delivery Address</label>
                    <textarea
                      placeholder="Enter your full delivery address"
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#0ba4db]"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      rows={3}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Delivery Option</label>
                    <select
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#0ba4db]"
                      value={deliveryOption}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                    >
                      <option>The Courier Guy Locker</option>
                      <option>Pargo</option>
                      <option>Door to Door</option>
                    </select>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    checked={consentToEmailMarketing}
                    onChange={(e) => setConsentToEmailMarketing(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="consent-checkbox" className="text-sm text-gray-600">
                    Yes, I would like to receive promotional emails and updates from Contour Worldwide
                  </label>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="terms-checkbox" className="text-sm text-gray-600">
                    I agree to the <a href="#" onClick={() => onNavigate('terms-of-service')} className="underline">Terms of Service</a> and <a href="#" onClick={() => onNavigate('privacy-policy')} className="underline">Privacy Policy</a>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !termsAccepted}
                  className="w-full bg-[#3bb75e] text-white font-bold py-4 rounded mt-4 hover:bg-[#2e964b] transition-colors flex items-center justify-center disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                  {!loading && <ExternalLink className="ml-2 w-4 h-4" />}
                </button>
            </form>

            <div className="mt-6 text-xs text-gray-500 text-center">
              <p>You will be redirected to Yoco secure payment portal.</p>
              <p className="font-bold mt-1">All prices include free delivery.</p>
            </div>
        </div>

        <div className="bg-gray-50 p-3 flex flex-col items-center gap-2 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] text-gray-400 font-bold uppercase">Secured by Yoco</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaystackModal;