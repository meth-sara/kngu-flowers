import { Plus, Search, Edit2, Trash2, Filter } from "lucide-react";
import { PRODUCTS } from "../../data";
import { formatPrice } from "../../lib/currency";

export default function AdminProducts() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Products</h1>
          <p className="text-stone-500 text-sm">Add, edit, or remove flowers from your store.</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-white hover:text-black transition-all">
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#1E1E1E] p-4 rounded-3xl border border-white/5 shadow-2xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-[#2B2B2B] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm w-80 text-white focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#2B2B2B] text-stone-300 rounded-xl text-sm font-medium hover:bg-white hover:text-black transition-all">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
        <div className="text-stone-500 text-xs font-medium">
          Showing <span className="text-white font-bold">{PRODUCTS.length}</span> results
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-[#1E1E1E] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#2B2B2B] text-stone-500 text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
            <tr>
              <th className="px-8 py-5 font-bold">Product</th>
              <th className="px-8 py-5 font-bold">Category</th>
              <th className="px-8 py-5 font-bold">Price</th>
              <th className="px-8 py-5 font-bold">Stock</th>
              <th className="px-8 py-5 font-bold">Status</th>
              <th className="px-8 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-[#2B2B2B]/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <div className="h-14 w-12 rounded-xl overflow-hidden bg-[#2B2B2B] shadow-sm border border-white/5">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <span className="font-bold text-white">{product.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm text-stone-500 font-medium">Floral Bouquets</td>
                <td className="px-8 py-5 text-sm font-bold text-primary">{formatPrice(product.price)}</td>
                <td className="px-8 py-5 text-sm font-medium text-stone-500">24 Items</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    product.badge === 'Soldout' 
                      ? 'bg-red-500/10 text-red-500' 
                      : 'bg-green-500/10 text-green-500'
                  }`}>
                    {product.badge === 'Soldout' ? 'Out of Stock' : 'Available'}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 text-stone-500 hover:text-white transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-stone-500 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
