import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorLabel, setErrorLabel] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setErrorLabel('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorLabel('Please enter a valid email');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      localStorage.setItem('subscribed_email', email);
      
      // Reset after 5 seconds to allow another subscription if they want
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />

      <div className="mx-auto max-w-4xl px-4 relative z-10 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex justify-center items-center space-x-2 text-primary">
            <Mail size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Our Newsletter</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-serif italic text-dark-matte">Join The Colorful Bunch!</h2>
          <p className="text-stone-500 max-w-lg mx-auto text-sm leading-relaxed">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals. We promise not to spam you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto w-full"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="bg-white/80 backdrop-blur-md rounded-[40px] p-8 sm:p-12 border border-green-100 shadow-2xl shadow-green-500/10 flex flex-col items-center space-y-4"
              >
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-serif italic">Thank you for subscribing!</h3>
                  <p className="text-stone-500 text-sm">Welcome to our community. Check your inbox for a special surprise.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative group">
                <div className="relative">
                  {/* Floating Label Effect */}
                  <label 
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      isFocused || email 
                        ? "-top-6 text-[10px] font-bold text-primary tracking-widest uppercase" 
                        : "top-4 text-stone-400 text-lg sm:text-xl font-serif italic"
                    }`}
                  >
                    Your email address
                  </label>
                  
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full border-b-2 bg-transparent py-4 pr-32 focus:outline-none transition-all text-xl font-serif italic ${
                      status === 'error' ? 'border-red-400 text-red-500' : isFocused ? 'border-primary text-dark-matte' : 'border-stone-200 text-dark-matte'
                    }`}
                  />

                  <div className="absolute right-0 bottom-4 flex items-center space-x-4">
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="group/btn relative font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs flex items-center space-x-2 transition-all"
                    >
                      <span className={`transition-all duration-300 ${
                        status === 'loading' ? 'opacity-0' : 'group-hover/btn:text-primary'
                      }`}>
                        {status === 'loading' ? '' : 'Subscribe'}
                      </span>
                      {status === 'loading' ? (
                        <Loader2 className="animate-spin text-primary" size={20} />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-dark-matte text-white flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:scale-110 group-hover/btn:shadow-lg group-hover/btn:shadow-primary/30 transition-all">
                          <Send size={14} className="group-hover/btn:-rotate-12 transition-transform" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error State */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 -bottom-8 text-[11px] font-bold text-red-500 uppercase tracking-widest"
                    >
                      {errorLabel}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Animated underline focus effect */}
                <div 
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500 ease-out fill-mode-forwards ${
                    isFocused ? 'w-full' : 'w-0'
                  }`} 
                />
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
