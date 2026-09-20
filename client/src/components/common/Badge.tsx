import React from 'react';
import { CheckCircle2, ShieldCheck, Leaf, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { OrderStatus, QualityGrade } from '../../types';

export const VerifiedFarmerBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => (
  <span
    className={`inline-flex items-center gap-1 font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs ${
      size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
    }`}
  >
    <ShieldCheck className={size === 'sm' ? 'w-3 h-3 text-emerald-600' : 'w-3.5 h-3.5 text-emerald-600'} />
    <span>Verified Farmer</span>
  </span>
);

export const OrganicBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => (
  <span
    className={`inline-flex items-center gap-1 font-semibold rounded-full bg-forest-100 text-forest-800 border border-forest-300 ${
      size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
    }`}
  >
    <Leaf className={size === 'sm' ? 'w-3 h-3 text-forest-600' : 'w-3.5 h-3.5 text-forest-600'} />
    <span>100% Organic</span>
  </span>
);

export const GradeBadge: React.FC<{ grade: QualityGrade }> = ({ grade }) => {
  const gradeDisplay = {
    A_PLUS: { label: 'Grade A+', bg: 'bg-harvest-100 text-harvest-800 border-harvest-300' },
    A: { label: 'Grade A', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    B: { label: 'Grade B', bg: 'bg-blue-100 text-blue-800 border-blue-300' },
    C: { label: 'Grade C', bg: 'bg-slate-100 text-slate-700 border-slate-300' },
  }[grade];

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[11px] border ${gradeDisplay.bg}`}
    >
      <Sparkles className="w-3 h-3" />
      <span>{gradeDisplay.label}</span>
    </span>
  );
};

export const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const config = {
    PENDING: {
      label: 'Order Placed',
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    CONFIRMED: {
      label: 'Farmer Confirmed',
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    PACKED: {
      label: 'Harvest Packed',
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    OUT_FOR_DELIVERY: {
      label: 'Out for Delivery',
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    DELIVERED: {
      label: 'Delivered',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    CANCELLED: {
      label: 'Cancelled',
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: <AlertCircle className="w-3.5 h-3.5" />,
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
