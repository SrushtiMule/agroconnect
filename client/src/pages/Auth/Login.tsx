import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sprout, User, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Role } from '../../types';

interface LoginProps {
  navigate: (path: string) => void;
}

export const Login: React.FC<LoginProps> = ({ navigate }) => {
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const success = login(email);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleQuickDemoLogin = (role: Role, demoEmail: string) => {
    login(demoEmail, role);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 pb-20">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-forest-800 to-forest-600 flex items-center justify-center text-white mx-auto shadow-md">
          <Sprout className="w-7 h-7 text-emerald-300" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Sign In to AgroConnect</h1>
        <p className="text-xs text-slate-500">Access your farm orders, listings & live mandi rates</p>
      </div>

      {/* 1-Click Instant Demo Login Box */}
      <div className="bg-forest-950 text-white rounded-3xl p-5 border border-forest-800 space-y-3 shadow-soft text-xs">
        <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
          ⚡ Quick 1-Click Demo Profiles:
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('FARMER', 'rajesh.patil@agroconnect.in')}
            className="p-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-left border border-forest-700 transition-colors"
          >
            <div className="font-bold text-emerald-300 text-xs">🌱 Rajesh Patil</div>
            <span className="text-[10px] text-slate-400">Progressive Farmer</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoLogin('BUYER', 'priya.sharma@gmail.com')}
            className="p-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-left border border-forest-700 transition-colors"
          >
            <div className="font-bold text-amber-300 text-xs">🛒 Priya Sharma</div>
            <span className="text-[10px] text-slate-400">Retail Consumer</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoLogin('BUYER', 'procurement@mehtatraders.com')}
            className="p-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-left border border-forest-700 transition-colors"
          >
            <div className="font-bold text-blue-300 text-xs">🏢 Vikram Mehta</div>
            <span className="text-[10px] text-slate-400">Wholesale Trader</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoLogin('ADMIN', 'admin@agroconnect.in')}
            className="p-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-left border border-forest-700 transition-colors"
          >
            <div className="font-bold text-purple-300 text-xs">🛡️ Operations Desk</div>
            <span className="text-[10px] text-slate-400">Admin Console</span>
          </button>
        </div>
      </div>

      {/* Main Login Form */}
      <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft">
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Email Address or Phone Number</label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rajesh.patil@agroconnect.in"
                className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-9 pr-3 py-3 text-slate-900 outline-none focus:border-forest-600"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="font-bold text-slate-700">Password</label>
              <a href="#" className="text-forest-700 font-semibold hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-9 pr-3 py-3 text-slate-900 outline-none focus:border-forest-600"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-earth-100 text-center text-xs text-slate-500">
          <span>New to AgroConnect? </span>
          <button
            onClick={() => navigate('/register')}
            className="text-forest-700 font-bold hover:underline"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};
