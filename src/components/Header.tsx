import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "./Logo";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export default function Header({ cartCount, onOpenCart, onOpenAuth }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
      isScrolled 
        ? "bg-floral-light/80 backdrop-blur-xl shadow-lg shadow-black/5 py-1" 
        : "bg-floral-light py-0"
    }`}>
      {/* Top Banner */}
      <div className={`bg-dark-matte py-2 text-center text-[10px] sm:text-xs font-bold text-white uppercase tracking-[0.3em] transition-all duration-500 overflow-hidden ${
        isScrolled ? "h-0 py-0 opacity-0" : "h-auto opacity-100"
      }`}>
        All featured product 50% off Shop Now
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo size={isScrolled ? 34 : 40} className="transition-all duration-500" />

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:space-x-8 uppercase font-bold tracking-[0.2em] text-dark-matte/60">
          <a href="#home" className="text-primary hover:text-primary transition-colors text-[14px] border-[#f60808]">Home</a>
          <a href="#shop" className="hover:text-primary transition-colors text-[13px]">Shop</a>
          <a href="#blog" className="hover:text-primary transition-colors text-[13px]">Blog</a>
          <a href="#contact" className="hover:text-primary transition-colors text-[13px]">Contact</a>
        </div>

        {/* Utilities */}
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex relative">
            <input 
              type="text" 
              placeholder="Search flowers..." 
              className="bg-secondary/40 px-4 py-2 pr-10 text-xs rounded-full focus:outline-none focus:ring-1 focus:ring-primary w-40 xl:w-64 transition-all placeholder:text-dark-matte/30"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-matte/30" size={16} />
          </div>
          
          <div className="flex items-center space-x-3 lg:space-x-4">
            <button className="text-dark-matte/80 hover:text-primary transition-colors lg:hidden">
              <Search size={22} />
            </button>
            
            <div className="hidden lg:flex items-center space-x-1">
              <button 
                onClick={onOpenAuth}
                className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#e85d75] hover:text-primary px-3 py-2 transition-colors border-[#ff9a9a] font-sans leading-[17px]"
              >
                Login
              </button>
              <div className="h-4 w-px bg-dark-matte/10" />
              <button 
                onClick={onOpenAuth}
                className="text-[12px] font-bold uppercase tracking-[0.2em] text-dark-matte/80 hover:text-primary px-3 py-2 transition-colors border-[#f50404]"
              >
                Register
              </button>
            </div>

            <button 
              onClick={onOpenAuth}
              className="lg:hidden text-dark-matte/80 hover:text-primary transition-colors"
            >
              <User size={22} />
            </button>
            <button 
              onClick={onOpenCart}
              className="relative text-dark-matte/80 hover:text-primary transition-colors"
            >
              <ShoppingBag size={22} />
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white leading-none shadow-lg shadow-primary/30">
                {cartCount}
              </span>
            </button>
            <button 
              className="lg:hidden text-dark-matte/80"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-floral-light border-t border-dark-matte/5 p-8 animate-in slide-in-from-top duration-500 shadow-2xl">
          <div className="flex flex-col space-y-6 uppercase text-xs font-bold tracking-[0.2em] text-dark-matte/60">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-primary font-bold">Home</a>
            <a href="#shop" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Shop</a>
            <a href="#blog" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Blog</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Contact</a>
            <div className="pt-6 border-t border-dark-matte/5 flex flex-col space-y-6">
              <button 
                onClick={() => { onOpenAuth(); setIsMenuOpen(false); }}
                className="text-left hover:text-primary transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => { onOpenAuth(); setIsMenuOpen(false); }}
                className="text-left hover:text-primary transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
