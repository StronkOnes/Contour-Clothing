import React, { useState } from 'react';
import { ShieldCheck, X, ExternalLink } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface PaystackModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
}

const PaystackModal: React.FC<PaystackModalProps> = ({ isOpen, onClose, amount, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consentToEmailMarketing, setConsentToEmailMarketing] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Insert order details into Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([{ name: name, email: email, amount: amount, consent_to_email_marketing: consentToEmailMarketing }]);

    if (error) {
      console.error('Error inserting order:', error);
      alert('There was an error processing your order. Please try again.');
    } else {
      console.log('Order inserted:', data);
      // Redirect to Yoco payment portal
      window.open('https://pay.yoco.com/contour-worldwide', '_blank');
      onSuccess(); // Clear cart after successful insertion
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-[#0ba4db] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-sm">Secure Payment</span>
            </div>
            <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>

        <div className="p-8">
            <div className="mb-6 text-center">
                <p className="text-gray-500 text-sm uppercase tracking-wider">Total to Pay</p>
                <h2 className="text-3xl font-bold text-[#0ba4db]">ZAR {amount.toFixed(2)}</h2>
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3bb75e] text-white font-bold py-4 rounded mt-4 hover:bg-[#2e964b] transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Proceed to Payment</span>
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
            </form>

            <div className="mt-6 text-xs text-gray-500 text-center">
              <p>You will be redirected to Yoco secure payment portal</p>
            </div>
        </div>

        <div className="bg-gray-50 p-3 flex flex-col items-center gap-2 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] text-gray-400 font-bold uppercase">Secured by Yoco</span>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
                <img
                    src="/WebImages/secure_pay.jpg"
                    alt="Secure Payment"
                    className="h-6 object-contain"
                />
                <img
                    src="/WebImages/YOCO.png"
                    alt="Yoco Payment"
                    className="h-6 object-contain"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaystackModal;