import React from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const PriceTicker: React.FC = () => {
  const { mandiPrices } = useAgriData();

  return (
    <div className="bg-forest-950 text-emerald-100 py-1.5 px-4 text-xs overflow-hidden border-b border-forest-900 flex items-center">
      <div className="flex items-center gap-1.5 shrink-0 pr-4 font-bold text-emerald-400 uppercase tracking-wider text-[10px] border-r border-forest-800">
        <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
        <span>Live APMC Mandi Rates</span>
      </div>

      <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap gap-6 pl-4 items-center animate-none md:animate-marquee">
        {mandiPrices.map((m) => (
          <div key={m.id} className="inline-flex items-center gap-2 text-[11px]">
            <span className="font-semibold text-white">{m.cropName}</span>
            <span className="text-emerald-400/80">({m.marketName}):</span>
            <span className="font-bold text-amber-300">
              ₹{m.modalPrice.toLocaleString('en-IN')}/{m.unit}
            </span>
            <span
              className={`inline-flex items-center text-[10px] font-semibold ${
                m.trend === 'UP' ? 'text-emerald-400' : m.trend === 'DOWN' ? 'text-rose-400' : 'text-slate-400'
              }`}
            >
              {m.trend === 'UP' ? (
                <TrendingUp className="w-3 h-3 inline mr-0.5" />
              ) : m.trend === 'DOWN' ? (
                <TrendingDown className="w-3 h-3 inline mr-0.5" />
              ) : null}
              {m.priceChangePct > 0 ? `+${m.priceChangePct}%` : `${m.priceChangePct}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
