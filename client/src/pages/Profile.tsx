import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProfileProps {
  navigate: (path: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ navigate }) => {
  const { currentUser, updateProfile, currentRole } = useAuth();

  const [name, setName] = useState(currentUser?.name || 'Priya Sharma');
  const [email, setEmail] = useState(currentUser?.email || 'priya.sharma@gmail.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 97112 34567');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-20">
      <div className="flex items-center justify-between pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Account & Profile Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage your identity, role permissions and notification preferences</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-10 shadow-soft space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-earth-100">
          <img
            src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
            alt="Profile Avatar"
            className="w-20 h-20 rounded-3xl object-cover border-2 border-forest-600 shadow-md"
          />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">{currentUser?.name}</h3>
            <p className="text-xs text-slate-500">{currentUser?.email}</p>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Active Role: {currentRole}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-earth-100">
            <button
              type="submit"
              className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
            >
              Save Profile Changes
            </button>
          </div>

          {saved && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Profile details updated successfully!</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
