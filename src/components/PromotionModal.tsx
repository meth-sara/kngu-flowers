import React from 'react';
import { X, Sparkles, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../lib/currency';
import { Product } from '../types';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  featuredProducts: Product[];
}

export default function PromotionModal({ isOpen, onClose, onAddToCart, featuredProducts }: PromotionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-matte/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20 flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left side Image / Banner */}
            <div className="md:w-1/3 bg-primary/10 relative overflow-hidden hidden md:block">
                <img 
                    src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=600" 
                    className="absolute inset-0 h-full w-full object-cover grayscale-20"
                    alt="Promo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-12 left-8 right-8 text-white space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-[10px] font-bold uppercase tracking-widest">
                        <Sparkles size={14} />
                        <span>Curated for romance</span>
                    </div>
                    <h3 className="text-4xl font-bold font-serif italic">The Valentine's <br/>Collection</h3>
                    <p className="text-sm opacity-90 leading-relaxed">Discover artisanal arrangements designed to speak the language of love.</p>
                </div>
            </div>

            {/* Right side Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-8 sm:p-12 overflow-y-auto">
                    <div className="flex justify-between items-start mb-8">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-bold font-serif italic text-dark-matte">Special Gift Collection</h2>
                            <div className="h-1 w-12 bg-primary" />
                        </div>
                        <button
                            onClick={onClose}
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors text-stone-500"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {featuredProducts.slice(0, 4).map((product) => (
                            <div key={product.id} className="group relative bg-stone-50 rounded-[32px] p-4 border border-stone-100 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5">
                                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                                    <img src={product.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                                </div>
                                <div className="space-y-2 px-2">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-dark-matte group-hover:text-primary transition-colors">{product.name}</h4>
                                        <div className="flex items-center text-yellow-500 text-[10px]">
                                            <Star size={10} fill="currentColor" />
                                            <span className="ml-1 font-bold">{product.rating}.0</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-primary font-bold">{formatPrice(product.price)}</span>
                                            {product.originalPrice && (
                                                <span className="text-[10px] text-stone-400 line-through">{formatPrice(product.originalPrice)}</span>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => onAddToCart(product)}
                                            className="h-10 w-10 rounded-full bg-dark-matte text-white flex items-center justify-center hover:bg-primary transition-all hover:scale-110 shadow-lg shadow-black/10"
                                        >
                                            <ShoppingBag size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex items-center justify-between p-6 bg-primary/5 rounded-[30px] border border-primary/10">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-dark-matte">Exclusive Membership Offer</p>
                                <p className="text-xs text-stone-500">Get 15% off on your first LKR 20,000+ order.</p>
                            </div>
                        </div>
                        <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center space-x-2 group">
                            <span>Join Now</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="p-8 bg-stone-50 border-t border-stone-100 flex justify-end">
                    <button onClick={onClose} className="px-8 py-4 bg-dark-matte text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-xl shadow-black/10">
                        Close Gallery
                    </button>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
