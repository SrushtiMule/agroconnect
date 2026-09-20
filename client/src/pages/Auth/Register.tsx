import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sprout, User, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { Role } from '../../types';

interface RegisterProps {
  navigate: (path: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ navigate }) => {
  const { registerUser } = useAuth();
  const [role, setRole] = useState<Role>('BUYER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'FARMER') {
      navigate('/farmer/register');
      return;
    }
    registerUser({
      name,
      email,
      phone,
      role,
    });
    navigate('/marketplace');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 pb-20">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-forest-800 to-forest-600 flex items-center justify-center text-white mx-auto shadow-md">
          <Sprout className="w-7 h-7 text-emerald-300" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Join AgroConnect</h1>
        <p className="text-xs text-slate-500">Buy fresh farm crops or sell directly to verified buyers</p>
      </div>

      <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft space-y-6">
        {/* Role Picker */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-slate-700 block">I want to register as:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('BUYER')}
              className={`p-3 rounded-2xl border font-bold text-xs transition-all text-center ${
                role === 'BUYER'
                  ? 'bg-forest-700 text-white border-forest-700 shadow-xs'
                  : 'bg-earth-50 text-slate-700 border-earth-200 hover:bg-earth-100'
              }`}
            >
              🛒 Buyer / Retailer
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('FARMER');
                navigate('/farmer/register');
              }}
              className={`p-3 rounded-2xl border font-bold text-xs transition-all text-center ${
                role === 'FARMER'
                  ? 'bg-forest-700 text-white border-forest-700 shadow-xs'
                  : 'bg-earth-50 text-slate-700 border-earth-200 hover:bg-earth-100'
              }`}
            >
              🌱 Farmer (Sell Produce)
            </button>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Full Name / Business Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priya.sharma@gmail.com"
              className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Mobile Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98000 11223"
              className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Create Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-earth-100 text-center text-xs text-slate-500">
          <span>Already registered? </span>
          <button
            onClick={() => navigate('/login')}
            className="text-forest-700 font-bold hover:underline"
          >
            Sign In here
          </button>
        </div>
      </div>
    </div>
  );
};
