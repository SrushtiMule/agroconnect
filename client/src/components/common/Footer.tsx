import React, { useState } from 'react';
import {
  Sprout,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Send,
  CheckCircle2,
  TrendingUp,
  HeartHandshake,
  Award,
} from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-forest-950 text-slate-300 pt-16 pb-12 border-t border-forest-900 selection:bg-emerald-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-forest-900/80">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-forest-900/40 border border-forest-800/60">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Farm Traceability</h4>
              <p className="text-xs text-slate-400 mt-1">
                Every produce lot is geotagged with the farmer's 7/12 land record, harvest date, and lab test reports.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-forest-900/40 border border-forest-800/60">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Zero Middlemen Commission</h4>
              <p className="text-xs text-slate-400 mt-1">
                Farmers receive up to 35% higher realization while buyers save up to 20% compared to conventional retail.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-forest-900/40 border border-forest-800/60">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Escrow Buyer Protection</h4>
              <p className="text-xs text-slate-400 mt-1">
                Payments are securely held in escrow and released to farmers only upon successful quality inspection.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center text-forest-950 shadow-md">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Agro<span className="text-emerald-400">Connect</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              India's premier digital agriculture network empowering over 10,000+ verified progressive farmers to sell fresh crops directly to households, retail stores, food processors, and wholesale trade.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>AgriTech Innovation Hub, APMC Yard, Vashi, Navi Mumbai 400705</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Farmer Kisan Toll-Free: 1800-420-AGRO (24x7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@agroconnect.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider text-emerald-400">Marketplace</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/marketplace?category=cat-veg')} className="hover:text-white transition-colors">
                  Fresh Vegetables
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/marketplace?category=cat-fruits')} className="hover:text-white transition-colors">
                  Farm Orchards & Fruits
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/marketplace?category=cat-grains')} className="hover:text-white transition-colors">
                  Wheat & Basmati Grains
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/marketplace?category=cat-spices')} className="hover:text-white transition-colors">
                  Salem & Guntur Spices
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/marketplace?organic=true')} className="hover:text-white transition-colors">
                  100% Certified Organic
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/categories')} className="hover:text-white transition-colors">
                  All 10+ Categories
                </button>
              </li>
            </ul>
          </div>

          {/* For Farmers & Schemes */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider text-emerald-400">Farmer Hub</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/farmer/register')} className="hover:text-white transition-colors text-emerald-300 font-semibold">
                  Register as Farmer (KYC)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/market-prices')} className="hover:text-white transition-colors">
                  Today's APMC Mandi Rates
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/weather')} className="hover:text-white transition-colors">
                  District Weather & Alerts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/knowledge')} className="hover:text-white transition-colors">
                  PM-KISAN & PMFBY Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/knowledge')} className="hover:text-white transition-colors">
                  Zero Budget Natural Farming
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider text-emerald-400">Agri Newsletter</h5>
            <p className="text-xs text-slate-400">
              Get weekly mandi price trend forecasts and seasonal crop harvest bulletins.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-forest-900 border border-forest-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed! Check inbox for agri alerts.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-forest-900/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AgroConnect Digital Agri-Marketplace Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/about')} className="hover:text-slate-300">
              About Us
            </button>
            <button onClick={() => navigate('/contact')} className="hover:text-slate-300">
              Support & Grievances
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-emerald-500 font-medium">Made with ❤️ for Indian Farmers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
