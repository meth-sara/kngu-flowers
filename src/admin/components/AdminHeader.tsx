import { Bell, Search, User } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-20 bg-[#1E1E1E]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10 text-white">
      <div className="flex items-center space-x-4 bg-[#2B2B2B] px-4 py-2 rounded-xl w-96 border border-white/5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
        <Search size={18} className="text-stone-500" />
        <input 
          type="text" 
          placeholder="Search for orders, products..." 
          className="bg-transparent border-none focus:outline-none text-sm w-full text-white placeholder:text-stone-600"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-stone-400 hover:bg-[#2B2B2B] rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-[#1E1E1E]" />
        </button>

        <div className="h-8 w-px bg-white/5" />

        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">Kngu. Admin</p>
            <p className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">Super Admin</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-[#2B2B2B] flex items-center justify-center text-primary border border-white/5">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
