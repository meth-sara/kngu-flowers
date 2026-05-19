import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../components/Logo";

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/management-portal' },
  { id: 'products', label: 'Products', icon: Package, path: '/management-portal/products' },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/management-portal/orders' },
  { id: 'customers', label: 'Customers', icon: Users, path: '/management-portal/customers' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/management-portal/analytics' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/management-portal/settings' },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1E1E1E] flex-shrink-0 flex flex-col h-screen fixed left-0 top-0 text-stone-400">
      <div className="p-8 pb-4 flex flex-col items-start text-white">
        <Logo size={32} textColor="light" className="items-start" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mt-4">Management Portal</span>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "hover:bg-[#2B2B2B] hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={() => {
            localStorage.removeItem("admin_auth");
            window.location.href = "/";
          }}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-stone-500 hover:bg-[#2B2B2B] hover:text-white transition-all w-full"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
