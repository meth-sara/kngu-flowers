import React, { useState } from 'react';
import { X, Package, Truck, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

export default function ServiceModal({ isOpen, onClose, type }: ServiceModalProps) {
  const [step, setStep] = useState(1);
  const [trackingId, setTrackingId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        onClose();
        setSubmitted(false);
        setStep(1);
    }, 3000);
  };

  const renderContent = () => {
    if (submitted) {
        return (
            <div className="text-center py-12 space-y-6">
                <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-serif italic">Request Received!</h3>
                    <p className="text-stone-500">Our customer support team will contact you shortly.</p>
                </div>
            </div>
        );
    }

    if (type === 'track-order') {
        return (
            <div className="space-y-8">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold font-serif italic">Track My Order</h2>
                    <p className="text-stone-500 text-sm">Enter your order ID to see the current status of your delivery.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Order ID</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. #KNGU-12345" 
                            className="w-full bg-stone-100 border-none rounded-2xl p-4 focus:ring-1 focus:ring-primary focus:outline-none"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-dark-matte text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all flex items-center justify-center space-x-2">
                        <span>Track Delivery</span>
                        <Truck size={16} />
                    </button>
                </form>

                <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100 space-y-4 opacity-50">
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 rounded-full bg-stone-200" />
                        <div className="h-2 w-24 bg-stone-200 rounded" />
                    </div>
                    <p className="text-[10px] text-stone-400">Order status will appear here after search.</p>
                </div>
            </div>
        );
    }

    if (type === 'returns') {
        return (
            <div className="space-y-8">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold font-serif italic">Return Request</h2>
                    <p className="text-stone-500 text-sm">We're sorry your order didn't meet expectations. Please fill out the form below.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Order ID</label>
                            <input required type="text" className="w-full bg-stone-100 border-none rounded-2xl p-4 focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Reason</label>
                            <select className="w-full bg-stone-100 border-none rounded-2xl p-4 focus:outline-none appearance-none">
                                <option>Damaged on arrival</option>
                                <option>Wrong item</option>
                                <option>Quality issues</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Additional Comments</label>
                        <textarea rows={3} className="w-full bg-stone-100 border-none rounded-2xl p-4 focus:outline-none" placeholder="Tell us more..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-dark-matte text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all flex items-center justify-center space-x-2">
                        <span>Submit Request</span>
                        <Send size={16} />
                    </button>
                </form>
            </div>
        );
    }

    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-matte/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-floral-light rounded-[40px] shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="p-8 sm:p-12">
              <div className="flex justify-between items-start mb-8">
                <div className="h-16 w-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary">
                  {type === 'track-order' ? <Package size={32} /> : <RefreshCw size={32} />}
                </div>
                <button
                  onClick={onClose}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors text-stone-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              {renderContent()}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
