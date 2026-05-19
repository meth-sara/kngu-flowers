import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { formatPrice, formatPriceCompact } from "../../lib/currency";

const data = [
  { name: 'Mon', revenue: 400000 },
  { name: 'Tue', revenue: 300000 },
  { name: 'Wed', revenue: 500000 },
  { name: 'Thu', revenue: 278000 },
  { name: 'Fri', revenue: 189000 },
  { name: 'Sat', revenue: 639000 },
  { name: 'Sun', revenue: 349000 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-stone-500 text-sm">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value={formatPriceCompact(38529000)} 
          change="+12.5%" 
          trend="up" 
          icon={DollarSign} 
        />
        <StatCard 
          label="Total Orders" 
          value="1,240" 
          change="+8.2%" 
          trend="up" 
          icon={ShoppingBag} 
        />
        <StatCard 
          label="Customers" 
          value="850" 
          change="-2.4%" 
          trend="down" 
          icon={Users} 
        />
        <StatCard 
          label="Stock Items" 
          value="48" 
          change="+3" 
          trend="up" 
          icon={Package} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Column */}
        <div className="lg:col-span-2 bg-[#1E1E1E] p-8 rounded-3xl border border-white/5 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">Revenue Statistics</h3>
            <select className="bg-[#2B2B2B] border-none text-white text-[10px] font-bold uppercase tracking-widest p-2 px-3 rounded-lg focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E85D75" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#E85D75" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#666', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#666', fontWeight: 600 }}
                  tickFormatter={(value) => `Rs.${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#E85D75', fontWeight: 600 }}
                  formatter={(value: any) => formatPrice(value)}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#E85D75" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Column */}
        <div className="bg-[#1E1E1E] p-8 rounded-3xl border border-white/5 shadow-2xl space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">Recent Orders</h3>
              <button className="text-primary text-[10px] font-bold uppercase hover:underline tracking-widest">View All</button>
           </div>
           
           <div className="space-y-6">
              {[
                { name: "John Doe", items: "2 Items", total: 13500, status: "Pending" },
                { name: "Sarah Smith", items: "1 Items", total: 5700, status: "Shipped" },
                { name: "Mike Ross", items: "3 Items", total: 36000, status: "Delivered" },
                { name: "Harvey Specter", items: "4 Items", total: 75000, status: "Cancelled" },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#2B2B2B] flex items-center justify-center text-stone-500 font-bold text-xs uppercase">
                      {order.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{order.name}</p>
                      <p className="text-[10px] text-stone-500">{order.items}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{formatPrice(order.total)}</p>
                    <p className={`text-[10px] font-bold uppercase ${
                      order.status === 'Pending' ? 'text-orange-500' :
                      order.status === 'Shipped' ? 'text-blue-500' :
                      order.status === 'Delivered' ? 'text-green-500' :
                      'text-red-500'
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, trend, icon: Icon }: any) {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-3xl border border-white/5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 rounded-2xl bg-[#2B2B2B] flex items-center justify-center text-primary border border-white/5">
          <Icon size={24} />
        </div>
        <div className={`flex items-center space-x-1 text-[10px] font-bold px-2 py-1 rounded-lg ${
          trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{change}</span>
        </div>
      </div>
      <div>
        <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">{label}</p>
        <h2 className="text-2xl font-bold text-white">{value}</h2>
      </div>
    </div>
  );
}
