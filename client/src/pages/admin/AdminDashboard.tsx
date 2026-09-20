import React from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import {
  ShieldCheck,
  Users,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface AdminDashboardProps {
  navigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigate }) => {
  const { farmers, products, orders } = useAgriData();

  const pendingVerificationCount = farmers.filter((f) => f.verificationStatus === 'PENDING').length;

  const platformGmvData = [
    { month: 'Mar', gmv: 1850000, orders: 420 },
    { month: 'Apr', gmv: 2420000, orders: 580 },
    { month: 'May', gmv: 3100000, orders: 710 },
    { month: 'Jun', gmv: 2950000, orders: 690 },
    { month: 'Jul', gmv: 4200000, orders: 940 },
    { month: 'Aug', gmv: 5450000, orders: 1220 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-forest-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-purple-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-700">
            System Operations Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            AgroConnect Admin Central
          </h1>
          <p className="text-xs text-slate-300">
            National platform monitoring, farmer KYC accreditation, and escrow settlement governance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/verification')}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>KYC Verification Desk ({pendingVerificationCount})</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-3xl border border-earth-200 p-5 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total GMV</span>
          <div className="text-2xl font-black text-forest-800">₹54.5 L</div>
          <span className="text-[10px] text-emerald-700 font-semibold">+28% YoY</span>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-5 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Farmers</span>
          <div className="text-2xl font-black text-slate-900">{farmers.length * 1680}+</div>
          <span className="text-[10px] text-emerald-700 font-semibold">6 Key States</span>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-5 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Buyers</span>
          <div className="text-2xl font-black text-slate-900">15,400+</div>
          <span className="text-[10px] text-blue-700 font-semibold">Retail & Wholesale</span>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-5 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Listed Crops</span>
          <div className="text-2xl font-black text-slate-900">{products.length * 120}+</div>
          <span className="text-[10px] text-amber-700 font-semibold">10 Categories</span>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-5 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending KYC</span>
          <div className="text-2xl font-black text-rose-700">{pendingVerificationCount}</div>
          <span className="text-[10px] text-rose-700 font-semibold">Needs review</span>
        </div>
      </div>

      {/* Platform GMV Growth Chart */}
      <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-earth-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Gross Merchandise Value (GMV) Growth</h3>
            <p className="text-xs text-slate-500">Direct agricultural trade settled through AgroConnect Escrow</p>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
            FY 2026 Monthly Trend
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={platformGmvData}>
              <defs>
                <linearGradient id="gmvColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15803d" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#15803d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(val) => `₹${val / 100000}L`}
              />
              <Tooltip
                formatter={(val: any) => [`₹${(val / 100000).toFixed(2)} Lakhs`, 'Monthly GMV']}
                contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
              />
              <Area
                type="monotone"
                dataKey="gmv"
                stroke="#15803d"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#gmvColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Admin Modules Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('/admin/verification')}
          className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft hover:border-forest-500 transition-all cursor-pointer space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Farmer KYC Verification Desk</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Inspect uploaded 7/12 land revenue extracts, Aadhaar documents, and approve or reject farmer accounts.
          </p>
          <span className="text-xs font-bold text-forest-700 block pt-1">Open Verification Desk →</span>
        </div>

        <div
          onClick={() => navigate('/admin/complaints')}
          className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft hover:border-forest-500 transition-all cursor-pointer space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Buyer-Farmer Dispute Desk</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Manage escrow refund requests, quality grade complaints, and delivery logistics mediation.
          </p>
          <span className="text-xs font-bold text-rose-700 block pt-1">Review Disputes (0 Open) →</span>
        </div>

        <div
          onClick={() => navigate('/marketplace')}
          className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft hover:border-forest-500 transition-all cursor-pointer space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Crop Listing Moderation</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Review active marketplace listings, verify lab pesticide-free claims, and enforce fair pricing bounds.
          </p>
          <span className="text-xs font-bold text-purple-700 block pt-1">Inspect Listings →</span>
        </div>
      </div>
    </div>
  );
};
