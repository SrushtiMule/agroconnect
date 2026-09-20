import React from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import { useAuth } from '../../context/AuthContext';
import { OrderStatusBadge } from '../../components/common/Badge';
import { OrderStatus } from '../../types';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Truck,
  ExternalLink,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface FarmerDashboardProps {
  navigate: (path: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ navigate }) => {
  const { products, orders, updateOrderStatus, farmers } = useAgriData();
  const { currentUser } = useAuth();

  const farmer = farmers[0]; // Default to Rajesh Patil
  const farmerProducts = products.filter((p) => p.farmerId === farmer.id);

  // Revenue mock data
  const revenueData = [
    { month: 'Apr', revenue: 65000, orders: 18 },
    { month: 'May', revenue: 82000, orders: 24 },
    { month: 'Jun', revenue: 74000, orders: 20 },
    { month: 'Jul', revenue: 98000, orders: 28 },
    { month: 'Aug', revenue: 125450, orders: 36 },
  ];

  const cropShareData = [
    { name: 'Red Onions', value: 45, color: '#15803d' },
    { name: 'Sharbati Wheat', value: 30, color: '#d97706' },
    { name: 'Desi Tomatoes', value: 15, color: '#dc2626' },
    { name: 'Spices & Herbs', value: 10, color: '#2563eb' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-forest-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-forest-950/80 px-2.5 py-1 rounded-full border border-forest-700">
              Farmer Command Desk
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
              ✓ KYC Verified
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {farmer.name}!
          </h1>
          <p className="text-xs text-slate-300">
            {farmer.farmName} • {farmer.village}, {farmer.district} ({farmer.farmSizeAcres} Acres Holding)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/farmer/products/add')}
            className="bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>List New Crop</span>
          </button>
          <button
            onClick={() => navigate(`/farmer/${farmer.id}`)}
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl transition-colors border border-white/20"
          >
            View Public Profile
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider">Total Sales</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold">₹</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-forest-800">
            ₹1,25,450
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            +18.4% from last month
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider">Total Orders</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            128
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">
            96% on-time dispatch
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider">Active Crops</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {farmerProducts.length || 24}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold block">
            6 seasonal varieties
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider">Pending Orders</span>
            <span className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {orders.filter((o) => o.status !== 'DELIVERED').length || 12}
          </div>
          <span className="text-[11px] text-rose-700 font-semibold block">
            Awaiting harvest pack
          </span>
        </div>
      </div>

      {/* Charts Section: Revenue Trend & Crop Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Line Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-earth-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Monthly Earnings & Sales Volume</h3>
              <p className="text-xs text-slate-500">Gross revenue before escrow payout releases</p>
            </div>
            <span className="text-xs font-bold text-forest-700 bg-forest-50 px-3 py-1 rounded-full">
              2026 Kharif Season
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#15803d" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crop Sales Share Donut */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft space-y-4 flex flex-col justify-between">
          <div className="pb-3 border-b border-earth-100">
            <h3 className="font-bold text-slate-900 text-base">Crop Category Share</h3>
            <p className="text-xs text-slate-500">Contribution to total farm revenue</p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {cropShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {cropShareData.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-slate-600 truncate">{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table with Live Status Controls */}
      <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-earth-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Customer & Wholesale Orders</h3>
            <p className="text-xs text-slate-500">Update harvest dispatch status to notify buyers</p>
          </div>

          <button
            onClick={() => navigate('/farmer/orders')}
            className="text-xs font-bold text-forest-700 hover:text-forest-900 flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-earth-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pl-2">Order ID</th>
                <th className="pb-3">Produce Item</th>
                <th className="pb-3">Buyer</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Update Progression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-50">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-earth-50/60 transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-900">{ord.orderNumber}</td>
                  <td className="py-4 font-medium text-slate-800">
                    {ord.items[0]?.productName || 'Fresh Produce'}
                  </td>
                  <td className="py-4 text-slate-600">{ord.buyerName}</td>
                  <td className="py-4 font-semibold text-slate-800">
                    {ord.items[0]?.quantity} {ord.items[0]?.unit}
                  </td>
                  <td className="py-4 font-extrabold text-forest-800">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4">
                    <OrderStatusBadge status={ord.status} />
                  </td>
                  <td className="py-4 pr-2 text-right">
                    {/* Status Changer Select */}
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="bg-earth-100 border border-earth-200 rounded-xl px-2.5 py-1 text-[11px] font-bold text-slate-800 outline-none focus:border-forest-600 cursor-pointer"
                    >
                      <option value="PENDING">Order Placed</option>
                      <option value="CONFIRMED">Confirm Harvest</option>
                      <option value="PACKED">Packed in Crates</option>
                      <option value="OUT_FOR_DELIVERY">Dispatch Logistics</option>
                      <option value="DELIVERED">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
