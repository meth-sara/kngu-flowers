import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Clock, CreditCard, ShieldCheck } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onOpenAuth?: () => void;
  onOpenModal?: (type: string) => void;
}

export default function Footer({ onOpenAuth, onOpenModal }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent, type: string) => {
    if (type.startsWith('#')) return; // Allow smooth scroll to handle these
    e.preventDefault();
    if (onOpenModal) onOpenModal(type);
  };

  return (
    <footer id="contact" className="bg-[#1c1917] pt-24 pb-12 text-white overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand & Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Logo size={40} textColor="light" className="items-start" />
              <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
                A perfect blend of creativity, energy, communication, happiness and love. Award-winning artisanal floristry since 2012.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-stone-400 group">
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors text-white">
                  <MapPin size={14} />
                </div>
                <span className="text-xs">123 Floral Lane, Blossom District, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3 text-stone-400 group">
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors text-white">
                  <Phone size={14} />
                </div>
                <span className="text-xs">+1 (555) 000-1234</span>
              </div>
              <div className="flex items-center space-x-3 text-stone-400 group">
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors text-white">
                  <Mail size={14} />
                </div>
                <span className="text-xs">hello@kngu.shop</span>
              </div>
              <div className="flex items-center space-x-3 text-stone-400 group">
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors text-white">
                  <Clock size={14} />
                </div>
                <span className="text-xs">Mon - Sun: 9:00 AM - 8:00 PM</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-8">Information</h4>
            <ul className="space-y-4 text-[13px] font-medium text-stone-500">
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'search')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Search Terms</span></a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'advanced-search')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Advanced Search</span></a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'faq')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Helps & FAQs</span></a></li>
              <li><a href="#store-location" className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Store Location</span></a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'returns')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Orders & Returns</span></a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-8">My Account</h4>
            <ul className="space-y-4 text-[13px] font-medium text-stone-500">
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'delivery')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Delivery Information</span></a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'legal')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Legal Notice</span></a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'payment')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Secure Payment</span></a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'sitemap')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Sitemap</span></a></li>
              <li><a href="#home" className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>About Us</span></a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-8">Customer Service</h4>
            <ul className="space-y-4 text-[13px] font-medium text-stone-500">
              <li><button onClick={onOpenAuth} className="hover:text-white transition-colors flex items-center space-x-2 group text-left w-full"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Member Login</span></button></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Terms of Use</span></a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'gift-card')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Gift Cards</span></a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Contact Support</span></a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'track-order')} className="hover:text-white transition-colors flex items-center space-x-2 group"><span className="h-px w-0 group-hover:w-4 bg-primary transition-all" /><span>Track My Order</span></a></li>
            </ul>
          </div>
        </div>

        {/* Store Location Map Placeholder */}
        <div id="store-location" className="mt-20 rounded-[40px] overflow-hidden bg-white/5 border border-white/10 p-2 sm:p-4">
          <div className="aspect-[21/9] bg-stone-800 relative rounded-[32px] overflow-hidden">
             <iframe 
               width="100%" 
               height="100%" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight={0} 
               marginWidth={0} 
               src="https://maps.google.com/maps?q=Central%20Park,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
               className="grayscale invert opacity-60 contrast-125"
             />
             <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-900/40 to-transparent" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[11px] font-bold uppercase tracking-widest text-stone-500">
            <p>Copyright © 2026. Kngu. Floral Boutique.</p>
            <div className="flex items-center space-x-2 text-stone-400">
              <ShieldCheck size={14} className="text-primary" />
              <span>Certified SSL Secure Checkout</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em]">
             <a href="#" onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-primary transition-colors">Privacy Policy</a>
             <a href="#" onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

