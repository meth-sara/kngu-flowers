import React from "react";
import { Star } from "lucide-react";
import { Product } from "../types";
import { formatPrice } from "../lib/currency";

interface ProductCardProps {
  product: Product;
  key?: React.Key;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col space-y-4">
      <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-secondary/30 shadow-sm border border-floral-light group-hover:shadow-2xl transition-all duration-700">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {product.badge && (
          <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg ${
            product.badge === 'Soldout' ? 'bg-orange-500 text-white' : 'bg-primary text-white'
          }`}>
            {product.badge}
          </div>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto bg-dark-matte/20 backdrop-blur-[2px]">
          <button 
            onClick={() => onAddToCart && onAddToCart(product)}
            className="w-full bg-white py-4 px-6 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-dark-matte shadow-2xl hover:bg-primary hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500"
          >
            Add To Cart
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-2 text-center transform transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={`${i < product.rating ? 'fill-accent text-accent' : 'text-stone-300'}`}
            />
          ))}
        </div>
        <h3 className="text-[15px] font-bold font-serif hover:text-primary cursor-pointer transition-colors text-dark-matte/80">
          {product.name}
        </h3>
        <div className="flex items-center space-x-3">
          <span className="text-[14px] font-bold text-accent">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[12px] text-stone-400 line-through font-medium">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
