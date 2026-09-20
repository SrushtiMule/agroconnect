import React from 'react';
import { MandiPriceWidget } from '../components/mandi/MandiPriceWidget';
import { PriceTicker } from '../components/marketplace/PriceTicker';
import { TrendingUp, ShieldCheck, Activity, BarChart3, AlertCircle } from 'lucide-react';

interface MarketPricesProps {
  navigate: (path: string) => void;
}

export const MarketPrices: React.FC<MarketPricesProps> = ({ navigate }) => {
  return (
    <div className="space-y-8 pb-20">
      <PriceTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest-800 relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-forest-950/80 px-3 py-1 rounded-full border border-forest-700 inline-flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Live Mandi Ticker
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Today's Mandi Market Rates
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real-time daily modal prices, minimums, maximums, and weekly price trends across Indian APMC markets (Agmarknet synchronized).
            </p>
          </div>
        </div>

        {/* Mandi Widget with Recharts */}
        <MandiPriceWidget />

        {/* Information Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-earth-200 p-6 space-y-2 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center font-bold">
              📊
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Modal Price Analysis</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              The modal rate represents the price at which the highest volume of produce was traded in the APMC yard today.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-earth-200 p-6 space-y-2 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              ⚖️
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Farmer Fair Price Formula</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              AgroConnect ensures farmers sell at or above the daily mandi modal price, bypassing private commission cuts.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-earth-200 p-6 space-y-2 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              📈
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Wholesale Price Forecasting</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track seasonal arrival spikes to time your procurement and harvest dispatches for maximum profitability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
