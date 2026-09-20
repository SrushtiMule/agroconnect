import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { ShieldCheck, UserCheck, Sprout, Store, ArrowRightLeft } from 'lucide-react';

export const DemoRoleBanner: React.FC = () => {
  const { currentRole, switchRole, currentUser } = useAuth();

  const roles: { role: Role; label: string; name: string; icon: React.ReactNode; color: string }[] = [
    {
      role: 'FARMER',
      label: 'Farmer',
      name: 'Rajesh Patil (Nashik)',
      icon: <Sprout className="w-3.5 h-3.5" />,
      color: 'bg-emerald-600 text-white',
    },
    {
      role: 'BUYER',
      label: 'Retail Buyer',
      name: 'Priya Sharma (Pune)',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      color: 'bg-amber-600 text-white',
    },
    {
      role: 'BUYER',
      label: 'Wholesale Buyer',
      name: 'Vikram Mehta (Mumbai APMC)',
      icon: <Store className="w-3.5 h-3.5" />,
      color: 'bg-blue-600 text-white',
    },
    {
      role: 'ADMIN',
      label: 'Admin',
      name: 'Operations Desk',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      color: 'bg-purple-600 text-white',
    },
  ];

  return (
    <div className="bg-slate-900 text-white text-xs py-1.5 px-4 sticky top-0 z-50 shadow-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
            <ArrowRightLeft className="w-3 h-3" /> 1-Click Role Switcher:
          </span>
          <span className="hidden sm:inline text-slate-300">
            Current User: <strong className="text-white">{currentUser?.name}</strong> (
            <span className="text-emerald-400 font-medium">{currentRole}</span>)
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {roles.map((r, idx) => {
            const isActive =
              (r.role === currentRole && r.label.includes('Wholesale') && currentUser?.name.includes('Vikram')) ||
              (r.role === currentRole && r.label.includes('Retail') && currentUser?.name.includes('Priya')) ||
              (r.role === currentRole && r.role === 'FARMER' && currentUser?.role === 'FARMER') ||
              (r.role === currentRole && r.role === 'ADMIN' && currentUser?.role === 'ADMIN');

            return (
              <button
                key={idx}
                onClick={() => {
                  if (r.label.includes('Wholesale')) {
                    // select wholesale user directly
                    switchRole('BUYER');
                    localStorage.setItem('agroconnect_user', JSON.stringify({
                      id: 'user-wholesale-1',
                      name: 'Vikram Mehta (Spice & Grain Traders)',
                      email: 'procurement@mehtatraders.com',
                      phone: '+91 98980 12345',
                      role: 'BUYER',
                      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
                      createdAt: '2024-01-20T09:15:00Z',
                      token: 'jwt-demo-wholesale-token',
                    }));
                    window.location.reload();
                  } else {
                    switchRole(r.role);
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all text-[11px] font-medium ${
                  isActive
                    ? `${r.color} ring-2 ring-white/30 shadow-sm scale-105`
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
