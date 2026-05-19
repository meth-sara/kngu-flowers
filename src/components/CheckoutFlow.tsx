import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CreditCard, Truck, MapPin, Package, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { formatPrice } from '../lib/currency';

interface CheckoutFlowProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onComplete: () => void;
}

type Step = 'CART' | 'SHIPPING' | 'DELIVERY' | 'PAYMENT' | 'CONFIRMATION';

export default function CheckoutFlow({ isOpen, onClose, cart, onComplete }: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('CART');
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'PAYPAL' | 'APPLE'>('CARD');
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 36000 ? 0 : 4500; // Updated thresholds for LKR
  const total = subtotal + shipping;

  const steps: { key: Step; label: string }[] = [
    { key: 'CART', label: 'Review' },
    { key: 'SHIPPING', label: 'Shipping' },
    { key: 'DELIVERY', label: 'Delivery' },
    { key: 'PAYMENT', label: 'Payment' },
    { key: 'CONFIRMATION', label: 'Success' },
  ];

  const handleNext = () => {
    switch (currentStep) {
      case 'CART': setCurrentStep('SHIPPING'); break;
      case 'SHIPPING': setCurrentStep('DELIVERY'); break;
      case 'DELIVERY': setCurrentStep('PAYMENT'); break;
      case 'PAYMENT': setCurrentStep('CONFIRMATION'); break;
      case 'CONFIRMATION': onComplete(); onClose(); break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'SHIPPING': setCurrentStep('CART'); break;
      case 'DELIVERY': setCurrentStep('SHIPPING'); break;
      case 'PAYMENT': setCurrentStep('DELIVERY'); break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-white overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-floral-light/80 backdrop-blur-md border-b border-stone-100 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <button onClick={onClose} className="flex items-center space-x-2 text-stone-500 hover:text-dark-matte transition-colors group">
            <X size={20} className="group-hover:rotate-90 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Close Checkout</span>
          </button>
          
          <div className="flex items-center space-x-4 sm:space-x-8">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center space-x-2">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  steps.findIndex(step => step.key === currentStep) >= i 
                    ? 'bg-primary text-white' 
                    : 'bg-stone-100 text-stone-400'
                }`}>
                  {i + 1}
                </div>
                <span className={`hidden sm:block text-[10px] font-bold uppercase tracking-widest ${
                  currentStep === s.key ? 'text-dark-matte' : 'text-stone-400'
                }`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && <div className="hidden sm:block h-px w-4 bg-stone-200" />}
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 text-green-600">
             <ShieldCheck size={16} />
             <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="wait">
              {currentStep === 'CART' && (
                <motion.div 
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold font-serif italic">Review your order</h2>
                    <p className="text-stone-500">Please review the items in your cart before proceeding to shipping.</p>
                  </div>
                  
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-6 p-4 bg-stone-50 rounded-[24px]">
                        <div className="h-24 w-20 bg-white rounded-xl overflow-hidden shadow-sm">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-dark-matte">{item.name}</h3>
                          <p className="text-xs text-stone-500 font-serif italic">Luxury Collection</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-dark-matte">{formatPrice(item.price * item.quantity)}</p>
                          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 'SHIPPING' && (
                <motion.div 
                   key="shipping"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="space-y-8"
                >
                   <div className="space-y-4">
                     <h2 className="text-3xl font-bold font-serif italic">Shipping Information</h2>
                     <p className="text-stone-500 text-sm">Where should we deliver your handcrafted flowers?</p>
                   </div>
                   
                   <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">First Name</label>
                         <input type="text" className="w-full bg-stone-50 border-stone-200 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Last Name</label>
                         <input type="text" className="w-full bg-stone-50 border-stone-200 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" placeholder="Doe" />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Street Address</label>
                         <input type="text" className="w-full bg-stone-50 border-stone-200 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" placeholder="123 Blossom Street" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">City</label>
                         <input type="text" className="w-full bg-stone-50 border-stone-200 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" placeholder="New York" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Postal Code</label>
                         <input type="text" className="w-full bg-stone-50 border-stone-200 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" placeholder="10001" />
                      </div>
                   </form>
                </motion.div>
              )}

              {currentStep === 'DELIVERY' && (
                <motion.div 
                   key="delivery"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="space-y-8"
                >
                   <div className="space-y-4">
                     <h2 className="text-3xl font-bold font-serif italic">Delivery Method</h2>
                     <p className="text-stone-500 text-sm">Choose how fast you want your flowers to arrive.</p>
                   </div>
                   
                   <div className="space-y-4">
                      {[
                        { id: 'standard', title: 'Standard Delivery', time: '3-5 Business Days', price: 0 },
                        { id: 'express', title: 'Express Delivery', time: '1-2 Business Days', price: 15 },
                        { id: 'same-day', title: 'Same-Day Delivery', time: 'Today', price: 25 },
                      ].map((method) => (
                        <label key={method.id} className="flex items-center justify-between p-6 bg-stone-50 rounded-[30px] border-2 border-transparent hover:border-primary active:bg-white cursor-pointer transition-all group">
                           <div className="flex items-center space-x-4">
                              <input type="radio" name="delivery" className="h-5 w-5 text-primary focus:ring-primary border-stone-300" defaultChecked={method.id === 'standard'} />
                              <div>
                                 <h4 className="font-bold text-dark-matte">{method.title}</h4>
                                 <p className="text-xs text-stone-500">{method.time}</p>
                              </div>
                           </div>
                           <span className="font-bold text-dark-matte">{method.price === 0 ? 'FREE' : formatPrice(method.price * 300)}</span>
                        </label>
                      ))}
                   </div>
                </motion.div>
              )}

              {currentStep === 'PAYMENT' && (
                <motion.div 
                   key="payment"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="space-y-12"
                >
                   <div className="space-y-4">
                     <h2 className="text-3xl font-bold font-serif italic">Payment Method</h2>
                     <p className="text-stone-500 text-sm">Review your secure payment options.</p>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: 'CARD', label: 'Credit Card', icon: CreditCard },
                        { id: 'PAYPAL', label: 'PayPal', img: 'https://cdn-icons-png.flaticon.com/128/196/196566.png' },
                        { id: 'APPLE', label: 'Apple Pay', img: 'https://cdn-icons-png.flaticon.com/128/2175/2175311.png' },
                      ].map((method) => (
                        <button 
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id as any)}
                          className={`flex flex-col items-center justify-center p-6 rounded-[30px] border-2 transition-all space-y-3 ${
                            paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-stone-100 bg-white hover:border-stone-200'
                          }`}
                        >
                           {method.icon ? <method.icon size={24} className={paymentMethod === method.id ? 'text-primary' : 'text-stone-400'} /> : <img src={method.img} className="h-6 object-contain" />}
                           <span className={`text-[10px] font-bold uppercase tracking-widest ${paymentMethod === method.id ? 'text-primary' : 'text-stone-500'}`}>
                              {method.label}
                           </span>
                        </button>
                      ))}
                   </div>

                   <AnimatePresence mode="wait">
                      {paymentMethod === 'CARD' && (
                        <motion.form 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-6 bg-stone-50 p-8 rounded-[40px] border border-stone-100"
                        >
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Cardholder Name</label>
                             <input type="text" className="w-full bg-white border-stone-200 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" placeholder="JOHN DOE" />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Card Number</label>
                             <div className="relative">
                                <input type="text" className="w-full bg-white border-stone-200 rounded-xl p-4 pr-12 focus:ring-1 focus:ring-primary focus:outline-none font-mono" placeholder="0000 0000 0000 0000" />
                                <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300" />
                             </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Expiry Date</label>
                                <input type="text" className="w-full bg-white border-stone-200 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">CVV</label>
                                <input type="text" className="w-full bg-white border-stone-200 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" placeholder="123" />
                              </div>
                           </div>
                        </motion.form>
                      )}
                   </AnimatePresence>
                </motion.div>
              )}

              {currentStep === 'CONFIRMATION' && (
                <motion.div 
                   key="confirmation"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center py-12 space-y-8"
                >
                   <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={48} />
                   </div>
                   <div className="space-y-4">
                     <h2 className="text-4xl font-bold font-serif italic">Your Order is Confirmed!</h2>
                     <p className="text-stone-500 max-w-md mx-auto">
                        Thank you for your purchase. We've sent a confirmation email to your address with all order details.
                     </p>
                   </div>
                   <div className="bg-stone-50 p-6 rounded-[30px] border border-stone-100 max-w-sm mx-auto flex items-center justify-between">
                      <div className="text-left">
                         <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Order Number</p>
                         <p className="font-bold text-dark-matte">#KNGU-12345678</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Est. Delivery</p>
                         <p className="font-bold text-primary">May 21, 2026</p>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep !== 'CONFIRMATION' && (
              <div className="pt-12 flex items-center justify-between">
                <button 
                  onClick={handleBack}
                  disabled={currentStep === 'CART'}
                  className={`flex items-center space-x-2 font-bold uppercase tracking-widest text-[10px] transition-all ${
                    currentStep === 'CART' ? 'opacity-0 pointer-events-none' : 'text-stone-400 hover:text-dark-matte'
                  }`}
                >
                   <ChevronLeft size={16} />
                   <span>Back</span>
                </button>
                
                <button 
                  onClick={handleNext}
                  className="bg-dark-matte text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-xl shadow-black/10 flex items-center space-x-3 group"
                >
                   <span>{currentStep === 'PAYMENT' ? 'Complete Order' : 'Continue'}</span>
                   <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
            
            {currentStep === 'CONFIRMATION' && (
              <div className="pt-12 flex justify-center">
                 <button 
                   onClick={() => { onComplete(); onClose(); }}
                   className="bg-primary text-white px-16 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-dark-matte transition-all shadow-xl shadow-primary/20"
                 >
                    Back to Store
                 </button>
              </div>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 border border-stone-100 bg-floral-light/30 rounded-[40px] p-8 space-y-8">
              <h3 className="text-xl font-bold font-serif italic text-dark-matte">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                   <span className="text-stone-500 font-medium">Subtotal</span>
                   <span className="font-bold text-dark-matte">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-stone-500 font-medium">Shipping</span>
                   <span className="font-bold text-dark-matte tracking-widest">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm pb-8 border-b border-stone-100">
                   <span className="text-stone-500 font-medium">Est. Tax</span>
                   <span className="font-bold text-dark-matte">{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                   <span className="text-lg font-bold font-serif italic">Total</span>
                   <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              
              <div className="p-4 bg-white/50 rounded-2xl border border-white/20 space-y-3">
                 <div className="flex items-center space-x-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-green-500" />
                    <span>Secure Payment Guarantee</span>
                 </div>
                 <p className="text-[10px] text-stone-500">Your information is protected by industry-standard SSL encryption.</p>
              </div>
              
              {/* Product mini list in sidebar for visual confirmation */}
              {currentStep !== 'CART' && (
                <div className="pt-8 border-t border-stone-100 space-y-4">
                   <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Items ({cart.length})</p>
                   <div className="flex -space-x-4 overflow-hidden">
                      {cart.map((item, i) => (
                        <div key={i} className="h-12 w-12 rounded-xl border-2 border-white overflow-hidden shadow-sm flex-shrink-0 bg-white">
                           <img src={item.image} alt="" className="h-full w-full object-cover" />
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-stone-50 py-8 border-t border-stone-100">
         <div className="mx-auto max-w-7xl px-4 text-center space-y-4">
            <div className="flex justify-center items-center space-x-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
               {['Visa', 'Mastercard', 'PayPal', 'ApplePay'].map(p => (
                 <img 
                   key={p}
                   src={`https://cdn-icons-png.flaticon.com/128/349/349${p === 'Visa' ? '221' : p === 'Mastercard' ? '228' : p === 'PayPal' ? '468' : '230'}.png`} 
                   alt={p}
                   className="h-6 object-contain"
                 />
               ))}
            </div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
               Handcrafted with Love. Kngu Floral Boutique © 2026
            </p>
         </div>
      </footer>
    </div>
  );
}
