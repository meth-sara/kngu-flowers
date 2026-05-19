import { ChevronLeft, ChevronRight, Truck, Clock, RefreshCw, Sparkles, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import ExpertCard from "./components/ExpertCard";
import BlogCard from "./components/BlogCard";
import AuthModal from "./components/AuthModal";
import CartDrawer from "./components/CartDrawer";
import InfoModal from "./components/InfoModal";
import ServiceModal from "./components/ServiceModal";
import Newsletter from "./components/Newsletter";
import CheckoutFlow from "./components/CheckoutFlow";
import PromotionModal from "./components/PromotionModal";
import { PRODUCTS, BLOGS, EXPERTS } from "./data";
import { CartItem, Product } from "./types";
import { formatPrice } from "./lib/currency";

// Admin Imports
import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AdminProducts from "./admin/pages/Products";
import AdminPlaceholder from "./admin/pages/Placeholder";
import AdminLogin from "./admin/pages/Login";
import ProtectedAdminRoute from "./admin/components/ProtectedAdminRoute";

function ShopContent({ 
  onAddToCart,
  onOpenPromo
}: { 
  onAddToCart: (p: Product) => void;
  onOpenPromo: () => void;
}) {
  const [activeTab, setActiveTab] = useState("NEW");

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative h-[500px] sm:h-[700px] overflow-hidden bg-secondary/20">
        <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-12 z-20">
          <button className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md transition-all hover:bg-white hover:shadow-xl group">
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md transition-all hover:bg-white hover:shadow-xl group">
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="h-[2px] w-12 bg-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Luxury Floral Studio</span>
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9]">
                  Handcrafted <br />
                  <span className="font-serif italic font-medium text-dark-matte/80">Elegance</span>
                </h1>
              </div>
              <p className="text-lg text-dark-matte/60 font-serif italic max-w-md leading-relaxed">
                Experience the art of artisanal floristry with our curated seasonal collections.
              </p>
              <div className="flex items-center space-x-6">
                <button className="bg-primary px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-dark-matte hover:shadow-2xl hover:shadow-primary/20 rounded-full">
                  Shop Collection
                </button>
                <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-dark-matte hover:text-primary transition-colors border-b-2 border-dark-matte/10 hover:border-primary pb-1">
                  Our Story
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="hidden lg:block relative"
            >
               <div className="relative z-10">
                 <img 
                   src="/src/assets/images/regenerated_image_1779162774035.png" 
                   alt="Floral Arrangement" 
                   className="rounded-[40px] border-[8px] border-solid border-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-1000 hover:rotate-0 hover:scale-[1.02]"
                 />
                 <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[30px] shadow-2xl border border-floral-light flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-dark-matte/40">Daily Fresh</p>
                      <p className="font-serif italic font-bold">Designer choice</p>
                    </div>
                 </div>
               </div>
               
               {/* Decorative blobs */}
               <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
               <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent/20 rounded-full blur-[80px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-b border-stone-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Delivery", desc: `Free shipping around the world for all orders over ${formatPrice(36000)}` },
              { icon: Clock, title: "Online Order", desc: "Don't worry you can order Online by our Site" },
              { icon: RefreshCw, title: "Freshness", desc: "You have freshness flowers every single order" },
              { icon: Sparkles, title: "Made By Artists", desc: "World for all made by artists orders over now" },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full bg-stone-100 text-primary">
                  <feature.icon size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase tracking-wide">{feature.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Products Section */}
      <section id="shop" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">New Products</h2>
            <p className="text-sm text-stone-500 max-w-2xl mx-auto italic">
              A perfect blend of creativity, energy, communication, happiness and love. Let us arrange a smile for you.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Valentine Special Banner */}
      <section className="bg-stone-50 py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800" 
                alt="Special Offer" 
                className="rounded-[30px] shadow-xl grayscale-20 group-hover:grayscale-0 transition-all duration-700"
              />
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenPromo()}
                className="absolute -bottom-6 -right-6 h-32 w-32 bg-[#e85d75] p-4 shadow-[0_20px_50px_rgba(232,93,117,0.4)] rounded-full flex flex-col items-center justify-center border-0 cursor-pointer z-10 hover:shadow-[0_20px_60px_rgba(232,93,117,0.6)] transition-all group/circle"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[18px] font-bold uppercase text-[#f7f0f1] group-hover/circle:tracking-widest transition-all duration-300">Special</span>
                  <span className="text-[29px] font-bold text-[#f7f5f5]">Gift</span>
                </motion.div>
                <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-90 group-hover/circle:scale-105 transition-transform duration-500" />
              </motion.button>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
                  Surprise Your Valentine! Let us arrange a smile For Her.
                </h2>
                <p className="text-stone-500 leading-relaxed">
                  Where flowers are our inspiration to create lasting memories. Whatever the occasion inspiration to create lasting memories....
                </p>
              </div>
              
              <ul className="space-y-3">
                 {["Hand picked just for you.", "Hand picked just for you.", "Hand picked just for you."].map((item, i) => (
                   <li key={i} className="flex items-center space-x-3 text-sm font-medium">
                     <span className="h-2 w-2 rounded-full bg-primary" />
                     <span>{item}</span>
                   </li>
                 ))}
              </ul>
              
              <button 
                onClick={() => onOpenPromo()}
                className="bg-primary px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-stone-900 hover:shadow-2xl hover:shadow-primary/20 rounded-full group flex items-center space-x-3"
              >
                <span>More Details</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Items</h2>
            <p className="text-sm text-stone-500 max-w-2xl mx-auto italic">
              A perfect blend of creativity, energy, communication, happiness and love. Let us arrange a smile for you.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center space-x-8 mb-16 uppercase text-[10px] font-bold tracking-[0.2em]">
            {["NEW", "FEATURED", "BEST SELLERS"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 border-b-2 transition-all ${
                  activeTab === tab ? "border-primary text-primary" : "border-transparent text-stone-400 hover:text-stone-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-8">
           <div className="flex justify-center flex-col items-center space-y-4">
              <ChevronLeft size={32} className="text-stone-300 absolute left-4 lg:left-24 cursor-pointer hover:text-primary transition-colors" />
              <ChevronRight size={32} className="text-stone-300 absolute right-4 lg:right-24 cursor-pointer hover:text-primary transition-colors" />
              
              <p className="text-xl sm:text-2xl font-serif italic text-stone-700 leading-relaxed">
                "Felis eu pede mollis pretium. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus lingua. felis eu pede mollis pretium."
              </p>
              
              <div className="space-y-4">
                <div className="h-20 w-20 mx-auto rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img src={EXPERTS[2].image} alt="Testimonial Author" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm">TORVI / COO</h4>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Flower Experts</h2>
            <p className="text-sm text-stone-500 max-w-2xl mx-auto italic">
              A perfect blend of creativity, energy, communication, happiness and love. Let us arrange a smile for you.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
            {EXPERTS.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">From Our Blog</h2>
            <p className="text-sm text-stone-500 max-w-2xl mx-auto italic">
              A perfect blend of creativity, energy, communication, happiness and love. Let us arrange a smile for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {BLOGS.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* Development Approach Section */}
      <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="space-y-4">
                <span className="text-primary font-bold uppercase tracking-widest text-xs">Craftsmanship</span>
                <h2 className="text-4xl sm:text-5xl font-bold font-serif italic">Individually Designed & Developed</h2>
                <p className="text-stone-400 leading-relaxed max-w-xl">
                  This project was fully designed and developed manually as a custom front-end implementation. 
                  Every layout structure, animation, and component was optimized for a unique e-commerce experience.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="text-stone-100 font-bold uppercase tracking-widest text-xs">Custom Architecture</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">Modular section-based organization with optimized UI/UX spacing.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-stone-100 font-bold uppercase tracking-widest text-xs">Dynamic Logic</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">State-driven cart functionality and interactive navigation flow.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-stone-100 font-bold uppercase tracking-widest text-xs">Responsive Precision</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">Individually tuned behavior for all screen sizes (Mobile-First).</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-stone-100 font-bold uppercase tracking-widest text-xs">Smooth Motion</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">Custom transitions and hover effects for a premium feel.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-stone-800 rounded-3xl border border-stone-700 p-8 shadow-2xl flex flex-col justify-center items-center space-y-6">
                <div className="flex space-x-4">
                  {["React", "Vite", "Tailwind", "Motion"].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-stone-900 border border-stone-700 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold font-serif italic text-primary">Zero Template. 100% Custom.</p>
                  <p className="text-stone-500 text-sm">Performance-focused frontend optimization.</p>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<string | null>(null);
  const [serviceModalType, setServiceModalType] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const openModal = (type: string) => {
    if (['track-order', 'returns'].includes(type)) {
        setServiceModalType(type);
    } else {
        setInfoModalType(type);
    }
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen">
            <Header 
              cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
              onOpenCart={() => setIsCartOpen(true)}
              onOpenAuth={() => setIsAuthOpen(true)}
            />

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <InfoModal 
              isOpen={!!infoModalType} 
              onClose={() => setInfoModalType(null)} 
              type={infoModalType || ''} 
            />
            <ServiceModal 
              isOpen={!!serviceModalType} 
              onClose={() => setServiceModalType(null)} 
              type={serviceModalType || ''} 
            />
            <CartDrawer 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)} 
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onCheckout={() => setIsCheckoutOpen(true)}
            />

            <CheckoutFlow 
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
              cart={cart}
              onComplete={() => setCart([])}
            />

            <PromotionModal 
              isOpen={isPromoOpen}
              onClose={() => setIsPromoOpen(false)}
              onAddToCart={addToCart}
              featuredProducts={PRODUCTS.slice(4, 8)}
            />

            <main>
              <ShopContent 
                onAddToCart={addToCart}
                onOpenPromo={() => setIsPromoOpen(true)}
              />
            </main>

            <Footer onOpenAuth={() => setIsAuthOpen(true)} onOpenModal={openModal} />
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/management-portal/login" element={<AdminLogin />} />
        <Route path="/management-portal" element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminPlaceholder title="Orders Management" />} />
            <Route path="customers" element={<AdminPlaceholder title="Customer Database" />} />
            <Route path="analytics" element={<AdminPlaceholder title="Deep Analytics" />} />
            <Route path="settings" element={<AdminPlaceholder title="Site Settings" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
