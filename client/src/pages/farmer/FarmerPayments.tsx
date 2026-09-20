import React, { useState } from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import { DollarSign, ShieldCheck, CheckCircle2, ArrowDownRight, Clock, Building, Download } from 'lucide-react';

interface FarmerPaymentsProps {
  navigate: (path: string) => void;
}

export const FarmerPayments: React.FC<FarmerPaymentsProps> = ({ navigate }) => {
  const [withdrawn, setWithdrawn] = useState(false);

  const settlementLogs = [
    {
      id: 'TXN-8910-SETTLE',
      order: 'AGC-2026-8910',
      date: '25 Aug 2026',
      amount: 14080,
      bank: 'State Bank of India (••••8912)',
      status: 'SETTLED',
    },
    {
      id: 'TXN-8840-SETTLE',
      order: 'AGC-2026-8840',
      date: '20 Aug 2026',
      amount: 22400,
      bank: 'State Bank of India (••••8912)',
      status: 'SETTLED',
    },
    {
      id: 'TXN-8790-SETTLE',
      order: 'AGC-2026-8790',
      date: '14 Aug 2026',
      amount: 18900,
      bank: 'State Bank of India (••••8912)',
      status: 'SETTLED',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Escrow Settlements & Bank Payouts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automatic RBI-compliant escrow disbursements directly to your verified bank account
          </p>
        </div>

        <button
          onClick={() => {
            setWithdrawn(true);
            setTimeout(() => setWithdrawn(false), 4000);
          }}
          className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
        >
          Withdraw Available Escrow Funds
        </button>
      </div>

      {withdrawn && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Payout request of ₹18,450 initiated to SBI Account (••••8912). IMPS settlement reference #AGC-PAY-9812.</span>
        </div>
      )}

      {/* 3 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Available for Withdrawal
          </span>
          <div className="text-3xl font-black text-forest-800">₹18,450</div>
          <span className="text-[11px] text-emerald-700 font-semibold block">Delivered & verified orders</span>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Escrow Held in Transit
          </span>
          <div className="text-3xl font-black text-amber-700">₹12,800</div>
          <span className="text-[11px] text-slate-500 font-medium block">Releases within 24h of delivery</span>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Lifetime Earnings
          </span>
          <div className="text-3xl font-black text-slate-900">₹1,25,450</div>
          <span className="text-[11px] text-emerald-700 font-semibold block">0% intermediary commission</span>
        </div>
      </div>

      {/* Settlement Table */}
      <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-earth-100">
          <h3 className="text-lg font-bold text-slate-900">Direct Bank Settlement History</h3>
          <span className="text-xs text-slate-500 font-medium">Auto-credited via IMPS / NEFT</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-earth-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pl-2">Transaction ID</th>
                <th className="pb-3">Order Ref</th>
                <th className="pb-3">Settlement Date</th>
                <th className="pb-3">Destination Account</th>
                <th className="pb-3 text-right">Amount (₹)</th>
                <th className="pb-3 pr-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-50">
              {settlementLogs.map((log) => (
                <tr key={log.id} className="hover:bg-earth-50/60 transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-900">{log.id}</td>
                  <td className="py-4 text-slate-600">{log.order}</td>
                  <td className="py-4 text-slate-500">{log.date}</td>
                  <td className="py-4 text-slate-700 font-medium">{log.bank}</td>
                  <td className="py-4 text-right font-extrabold text-forest-800 text-sm">
                    ₹{log.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[10px]">
                      ✓ {log.status}
                    </span>
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
