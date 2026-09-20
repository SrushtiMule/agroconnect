import React, { useState } from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Search,
  ArrowUpDown,
  Calendar,
  Sparkles,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const MandiPriceWidget: React.FC = () => {
  const { mandiPrices } = useAgriData();
  const [selectedMandiId, setSelectedMandiId] = useState<string>(mandiPrices[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrices = mandiPrices.filter(
    (m) =>
      m.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.marketName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeItem = mandiPrices.find((m) => m.id === selectedMandiId) || mandiPrices[0];

  return (
    <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-earth-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-forest-100 text-forest-700">
              <Activity className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Today's APMC Mandi Market Prices
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Official daily agricultural market committee rates across major Indian mandis
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop or APMC mandi..."
            className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-forest-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Main Content: Table on Left, Chart on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table Column */}
        <div className="lg:col-span-7 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-earth-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pl-3">Crop Name</th>
                <th className="pb-3">APMC Mandi</th>
                <th className="pb-3 text-right">Min (₹)</th>
                <th className="pb-3 text-right">Max (₹)</th>
                <th className="pb-3 text-right">Modal Rate</th>
                <th className="pb-3 pr-3 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-50">
              {filteredPrices.map((item) => {
                const isSelected = item.id === activeItem?.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedMandiId(item.id)}
                    className={`cursor-pointer transition-colors rounded-xl ${
                      isSelected
                        ? 'bg-forest-50/80 font-bold text-forest-900'
                        : 'hover:bg-earth-50 text-slate-700'
                    }`}
                  >
                    <td className="py-3.5 pl-3">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span>{item.cropName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-500">
                      <div>{item.marketName}</div>
                      <div className="text-[10px] text-slate-400">{item.state}</div>
                    </td>
                    <td className="py-3.5 text-right text-slate-600">
                      ₹{item.minPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 text-right text-slate-600">
                      ₹{item.maxPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 text-right font-extrabold text-forest-800 text-sm">
                      ₹{item.modalPrice.toLocaleString('en-IN')}
                      <span className="text-[10px] font-normal text-slate-400 block">
                        /{item.unit}
                      </span>
                    </td>
                    <td className="py-3.5 pr-3 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.trend === 'UP'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.trend === 'DOWN'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.trend === 'UP' ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : item.trend === 'DOWN' ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : null}
                        {item.priceChangePct > 0 ? `+${item.priceChangePct}%` : `${item.priceChangePct}%`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 7-Day Trend Line Chart Column */}
        {activeItem && (
          <div className="lg:col-span-5 bg-earth-50/70 p-6 rounded-3xl border border-earth-200/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest-700 bg-forest-100 px-2.5 py-0.5 rounded-full">
                  Historical Price Trend
                </span>
                <span className="text-[11px] text-slate-400">{activeItem.updatedDate}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mt-2">
                {activeItem.cropName} — {activeItem.marketName}
              </h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-forest-800">
                  ₹{activeItem.modalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500">per {activeItem.unit}</span>
              </div>
            </div>

            {/* Recharts Line Graph */}
            <div className="h-52 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeItem.historicalPrices}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickFormatter={(v) => `₹${v}`}
                  />
                  <Tooltip
                    formatter={(val: any) => [`₹${val} / ${activeItem.unit}`, 'Modal Price']}
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', border: '1px solid #cbd5e1' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#15803d"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#15803d', strokeWidth: 2, stroke: '#ffffff' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="text-[11px] text-slate-500 bg-white p-3 rounded-xl border border-earth-200/80 flex items-center justify-between">
              <span>Weekly High: <strong>₹{Math.max(...activeItem.historicalPrices.map((h) => h.price))}</strong></span>
              <span>Weekly Low: <strong>₹{Math.min(...activeItem.historicalPrices.map((h) => h.price))}</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
