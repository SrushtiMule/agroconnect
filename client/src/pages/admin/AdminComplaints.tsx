import React, { useState } from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import { AlertTriangle, CheckCircle2, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

interface AdminComplaintsProps {
  navigate: (path: string) => void;
}

export const AdminComplaints: React.FC<AdminComplaintsProps> = ({ navigate }) => {
  const [complaints, setComplaints] = useState([
    {
      id: 'DISP-8921-1',
      orderNumber: 'AGC-2026-8921',
      buyer: 'Priya Sharma',
      farmer: 'Rajesh Patil',
      crop: 'Nashik Red Onions (Grade A+)',
      issue: 'Produce weight inquiry (24.8 kg received vs 25.0 kg ordered due to moisture loss during transit)',
      status: 'RESOLVED',
      resolution: 'Farmer Rajesh Patil agreed to offer ₹50 voucher credit on next order.',
      date: '31 Aug 2026',
    },
    {
      id: 'DISP-8812-2',
      orderNumber: 'AGC-2026-8812',
      buyer: 'Hotel Shanti Sagar',
      farmer: 'Anita Rao',
      crop: 'Salem Golden Turmeric',
      issue: 'Delay in delivery vehicle transit due to NH-44 highway bypass repair',
      status: 'RESOLVED',
      resolution: 'AgroExpress expedited alternative temperature van. Delivered within 6 hours.',
      date: '22 Aug 2026',
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-7 h-7 text-amber-600" />
            <span>Buyer-Farmer Dispute & Mediation Desk</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Escrow hold mediation, quality grade claims, and shipment dispute resolution
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {complaints.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-earth-100">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span>Dispute #{c.id}</span>
                <span className="text-slate-400 font-normal">• Order {c.orderNumber}</span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  ✓ {c.status}
                </span>
              </div>
              <span className="text-slate-400">{c.date}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Parties</span>
                <p className="font-semibold text-slate-800">Buyer: {c.buyer}</p>
                <p className="text-forest-700 font-semibold">Farmer: {c.farmer}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Produce: {c.crop}</p>
              </div>

              <div className="md:col-span-2 space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Grievance Issue:</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{c.issue}</p>
                </div>

                <div className="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200">
                  <strong className="block text-[11px] text-emerald-800">AgroConnect Resolution:</strong>
                  <p className="text-slate-700 mt-0.5">{c.resolution}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
