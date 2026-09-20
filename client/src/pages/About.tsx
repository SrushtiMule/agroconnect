import React from 'react';
import { Sprout, ShieldCheck, HeartHandshake, Award, Users, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  navigate: (path: string) => void;
}

export const About: React.FC<AboutProps> = ({ navigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-16 shadow-xl border border-forest-800 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-forest-950/80 px-3 py-1 rounded-full border border-forest-700 inline-flex items-center gap-1.5">
            <Sprout className="w-3.5 h-3.5" /> Our Mission & Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Technology That Connects Farmers With Opportunity.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            AgroConnect removes unnecessary intermediaries and helps progressive Indian farmers reach buyers directly, while giving consumers, retailers, and food processors access to 100% fresh, traceable agricultural products at fair prices.
          </p>
        </div>
      </div>

      {/* 3 Pillars: Mission, Vision, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl border border-earth-200 p-8 space-y-4 shadow-soft">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
            🎯
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To build India's most transparent agricultural value chain where every farmer earns a dignified living and every consumer receives safe, non-toxic, freshly harvested crops.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-8 space-y-4 shadow-soft">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
            🔭
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To digitize 1,00,000+ agricultural clusters across Maharashtra, Punjab, Karnataka, Gujarat, and MP with precision GPS logistics, real-time APMC price parity, and chemical-free traceability.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-8 space-y-4 shadow-soft">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
            🤝
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Core Values</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Farmer-First Economics, Zero Compromise on Freshness, Complete Escrow Trade Security, and Environmental Soil Stewardship.
          </p>
        </div>
      </div>

      {/* Impact Numbers */}
      <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-12 border border-forest-800">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <h3 className="text-2xl font-extrabold text-white">Our Real-World Agriculture Impact</h3>
          <p className="text-xs text-slate-300">Empowering rural farming communities with technology</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-forest-950/60 rounded-2xl border border-forest-800">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">₹45 Cr+</div>
            <div className="text-xs text-slate-300 mt-1">Direct Farmer Payouts</div>
          </div>
          <div className="p-4 bg-forest-950/60 rounded-2xl border border-forest-800">
            <div className="text-3xl sm:text-4xl font-black text-amber-400">35%</div>
            <div className="text-xs text-slate-300 mt-1">Higher Farmer Margin</div>
          </div>
          <div className="p-4 bg-forest-950/60 rounded-2xl border border-forest-800">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">12,500+</div>
            <div className="text-xs text-slate-300 mt-1">Acres Organic Certified</div>
          </div>
          <div className="p-4 bg-forest-950/60 rounded-2xl border border-forest-800">
            <div className="text-3xl sm:text-4xl font-black text-amber-400">24 Hours</div>
            <div className="text-xs text-slate-300 mt-1">Farm-to-Doorstep Window</div>
          </div>
        </div>
      </div>
    </div>
  );
};
