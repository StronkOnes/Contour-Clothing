import React, { useState } from 'react';
import { ShieldCheck, X, Loader2 } from 'lucide-react';

interface PaystackModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  email: string;
  onSuccess: () => void;
}

const PaystackModal: React.FC<PaystackModalProps> = ({ isOpen, onClose, amount, email, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'card' | 'processing' | 'success'>('card');

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      setTimeout(() => {
        onSuccess();
        setStep('card');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-[#0ba4db] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-sm">Paystack Checkout</span>
            </div>
            <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>

        <div className="p-8">
            <div className="mb-6 text-center">
                <p className="text-gray-500 text-sm uppercase tracking-wider">Total to Pay</p>
                <h2 className="text-3xl font-bold text-[#0ba4db]">ZAR {amount.toFixed(2)}</h2>
                <p className="text-xs text-gray-400 mt-1">{email}</p>
            </div>

            {step === 'card' && (
                <form onSubmit={handlePay} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Card Number</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#0ba4db]" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Expiry</label>
                            <input type="text" placeholder="MM/YY" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#0ba4db]" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">CVV</label>
                            <input type="text" placeholder="123" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#0ba4db]" required />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-[#3bb75e] text-white font-bold py-4 rounded mt-4 hover:bg-[#2e964b] transition-colors">
                        Pay Now
                    </button>
                </form>
            )}

            {step === 'processing' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <Loader2 className="w-12 h-12 text-[#0ba4db] animate-spin" />
                    <p className="text-sm font-semibold text-gray-600">Processing Payment...</p>
                </div>
            )}

            {step === 'success' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-[#3bb75e]" />
                    </div>
                    <p className="text-lg font-bold text-gray-800">Payment Successful!</p>
                </div>
            )}
        </div>
        
        <div className="bg-gray-50 p-3 flex justify-center items-center gap-2 border-t border-gray-100">
            <ShieldCheck className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] text-gray-400 font-bold uppercase">Secured by Paystack</span>
        </div>
      </div>
    </div>
  );
};

export default PaystackModal;