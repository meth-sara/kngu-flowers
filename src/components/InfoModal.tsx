import React from 'react';
import { X, Info, HelpCircle, Truck, RefreshCw, CreditCard, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

export default function InfoModal({ isOpen, onClose, type }: InfoModalProps) {
  const contentMap: Record<string, { title: string, icon: any, text: string }> = {
    'faq': {
      title: 'Help & FAQs',
      icon: HelpCircle,
      text: 'Find answers to common questions about our bouquets, care instructions, and delivery services.'
    },
    'returns': {
      title: 'Orders & Returns',
      icon: RefreshCw,
      text: 'We accept returns within 48 hours for non-perishable items. Fresh flowers are non-returnable but we guarantee satisfaction.'
    },
    'delivery': {
      title: 'Delivery Information',
      icon: Truck,
      text: 'We offer same-day delivery for orders placed before 1:00 PM. Rates vary by zone.'
    },
    'payment': {
      title: 'Secure Payment',
      icon: CreditCard,
      text: 'Your transactions are encrypted and safe. We accept all major credit cards and PayPal.'
    },
    'legal': {
      title: 'Legal Notice',
      icon: Info,
      text: 'Kngu Boutique is a registered trademark. All floral designs are proprietary.'
    },
    'terms': {
      title: 'Terms of Use',
      icon: FileText,
      text: 'By using our site, you agree to our terms of service regarding orders, privacy, and conduct.'
    },
    'gift-card': {
      title: 'Gift Cards',
      icon: CreditCard,
      text: 'Give the gift of choice. Our gift cards never expire and are valid for any floral arrangement.'
    },
    'track-order': {
        title: 'Track My Order',
        icon: Truck,
        text: 'Enter your order ID to see the real-time status of your floral delivery.'
    },
    'search': {
        title: 'Search Terms',
        icon: Info,
        text: 'Keywords for easier browsing: Rose, Lily, Bouquet, Wedding, Anniversary.'
    },
    'advanced-search': {
        title: 'Advanced Search',
        icon: Info,
        text: 'Filter by color, seasonality, and price range to find your perfect arrangement.'
    },
    'sitemap': {
        title: 'Sitemap',
        icon: Info,
        text: 'Quick access to Home, Shop, Blog, Contact, and Admin Portal.'
    },
    'contact': {
        title: 'Contact Support',
        icon: HelpCircle,
        text: 'Our team is available 24/7. Email: support@kngu.shop or Call: +1 (555) 000-1234.'
    }
  };

  const content = contentMap[type] || { title: 'Information', icon: Info, text: 'This content is coming soon.' };
  const Icon = content.icon;

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
                  <Icon size={32} />
                </div>
                <button
                  onClick={onClose}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors text-stone-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold font-serif italic text-dark-matte">{content.title}</h2>
                  <div className="h-1 w-12 bg-primary mt-2" />
                </div>
                
                <p className="text-stone-600 leading-relaxed text-lg font-serif italic">
                  "{content.text}"
                </p>
                
                <div className="pt-8 flex flex-col space-y-4">
                    <button onClick={onClose} className="w-full bg-dark-matte text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all">
                        Got it, Thanks
                    </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
