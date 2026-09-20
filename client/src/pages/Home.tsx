import React, { useState } from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { CATEGORIES } from '../data/mockData';
import { ProductCard } from '../components/marketplace/ProductCard';
import { WeatherWidget } from '../components/weather/WeatherWidget';
import { MandiPriceWidget } from '../components/mandi/MandiPriceWidget';
import { PriceTicker } from '../components/marketplace/PriceTicker';
import { FarmMapLeaflet } from '../components/maps/FarmMapLeaflet';
import { VerifiedFarmerBadge, OrganicBadge } from '../components/common/Badge';
import { RatingStars } from '../components/common/RatingStars';
import {
  Sprout,
  Search,
  ShieldCheck,
  Truck,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Package,
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Sparkles,
  Leaf,
  Store,
  ChevronRight,
  Share2,
  MoreHorizontal,
} from 'lucide-react';

interface HomeProps {
  navigate: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ navigate }) => {
  const { products, farmers } = useAgriData();
  const [searchQuery, setSearchQuery] = useState('');
  const [plannerTab, setPlannerTab] = useState<'water' | 'market' | 'risk'>('water');

  const featuredProducts = products.slice(0, 6);
  const featuredFarmers = farmers.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const quickSearchTags = [
    'Nashik Red Onions',
    'Sharbati Wheat',
    'Guntur Chilli',
    'Organic Jaggery',
    'Desi Tomatoes',
    'Salem Turmeric',
  ];

  const decisionMetrics = [
    { label: 'Water Risk', value: 'Low', tone: 'emerald' },
    { label: 'Yield Forecast', value: '+12.4%', tone: 'amber' },
    { label: 'Market Premium', value: '+₹3.6/kg', tone: 'sky' },
    { label: 'Profit Index', value: '8.9/10', tone: 'violet' },
  ];

  const insightCards = [
    {
      title: 'AI Scenario Engine',
      text: 'Compare planting weather, input cost, water stress and yield probability before you commit.',
      icon: TrendingUp,
    },
    {
      title: 'Farm Risk Radar',
      text: 'Detect erratic rainfall, price volatility and cold storage risk before every harvest cycle.',
      icon: ShieldCheck,
    },
    {
      title: 'Trusted Traceability',
      text: 'Track each crop from field to warehouse with provenance, certification and buyer history.',
      icon: CheckCircle2,
    },
  ];

  const plannerConfig = {
    water: {
      title: 'Irrigation Planner',
      headline: 'Water use is optimized by 18%',
      score: '89%',
      badge: 'Best plan',
      metrics: [
        ['Field moisture', '74%'],
        ['Sprinkler timing', '4.3 hrs'],
        ['Water saved', '320 L/acre'],
      ],
      bars: [62, 81, 74, 90],
      signal: 'Recommended for the next 7 days',
    },
    market: {
      title: 'Market Timing',
      headline: 'Peak price window begins in 3 days',
      score: '92%',
      badge: 'High demand',
      metrics: [
        ['Expected CPI', '+6.2%'],
        ['Buyer demand', 'Strong'],
        ['Margin uplift', '+₹2.1/kg'],
      ],
      bars: [55, 68, 84, 96],
      signal: 'Best window to sell collected stock',
    },
    risk: {
      title: 'Risk Forecast',
      headline: 'Low climate disruption probability',
      score: '76%',
      badge: 'Stable outlook',
      metrics: [
        ['Rain risk', 'Low'],
        ['Pest exposure', 'Moderate'],
        ['Storage risk', 'Low'],
      ],
      bars: [48, 71, 60, 77],
      signal: 'Strategy remains resilient under forecast variation',
    },
  } as const;

  const planner = plannerConfig[plannerTab];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Live Mandi Ticker */}
      <PriceTicker />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 sm:pt-10">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 text-white overflow-hidden shadow-2xl border border-forest-800/80 p-8 sm:p-12 lg:p-16">
          {/* Subtle Background Pattern & Agriculture Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300 backdrop-blur-xs">
                <Sprout className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>India's #1 Direct Farmer-to-Buyer Marketplace</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                From Our Farms, <br />
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent">
                  Straight to Your Table.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Connect directly with verified Indian farmers. Discover fresh, traceable, pesticide-tested crops at fair transparent prices — with zero middlemen.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-xl">
                <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-lg border border-white/20">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search crops, vegetables, fruits, grains, pulses, spices..."
                    className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-xs sm:text-sm px-3 py-2 outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Popular Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs text-slate-300">
                  <span className="text-emerald-400 font-semibold text-[11px]">Popular:</span>
                  {quickSearchTags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => navigate(`/marketplace?search=${encodeURIComponent(tag)}`)}
                      className="bg-forest-900/60 hover:bg-forest-800 border border-forest-700/60 px-2.5 py-0.5 rounded-full text-[11px] text-slate-200 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </form>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/marketplace')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-extrabold text-sm px-7 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  <span>Explore Marketplace</span>
                </button>

                <button
                  onClick={() => navigate('/farmer/register')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2"
                >
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  <span>Start Selling (Farmer KYC)</span>
                </button>
              </div>

              {/* Statistics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-forest-800/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300">10,000+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Verified Farmers</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-300">25,000+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Farm Crops Listed</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300">15,000+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Active Buyers</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-300">98.4%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Buyer Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Cards (Floating Live Produce Cards) */}
            <div className="lg:col-span-5 relative space-y-4">
              {/* Featured Hero Product Card 1 */}
              <div
                onClick={() => navigate('/product/prod-1')}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-4 text-slate-900 border border-white/40 shadow-xl cursor-pointer hover:scale-102 transition-transform duration-300 flex items-center gap-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&auto=format&fit=crop&q=80"
                  alt="Nashik Onion"
                  className="w-20 h-20 rounded-2xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Fresh Harvest
                    </span>
                    <VerifiedFarmerBadge size="sm" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 truncate mt-1">
                    Organic Nashik Red Onions
                  </h4>
                  <p className="text-[11px] text-slate-500">Rajesh Patil • Nashik, Maharashtra</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-extrabold text-forest-800 text-sm">₹28 / KG</span>
                    <RatingStars rating={4.9} size="sm" showNumber={false} />
                  </div>
                </div>
              </div>

              {/* Featured Hero Product Card 2 */}
              <div
                onClick={() => navigate('/product/prod-2')}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-4 text-slate-900 border border-white/40 shadow-xl cursor-pointer hover:scale-102 transition-transform duration-300 flex items-center gap-4 ml-0 sm:ml-6"
              >
                <img
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&auto=format&fit=crop&q=80"
                  alt="Sharbati Wheat"
                  className="w-20 h-20 rounded-2xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      Grade A+ Grain
                    </span>
                    <OrganicBadge size="sm" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 truncate mt-1">
                    Punjab Sharbati Golden Wheat
                  </h4>
                  <p className="text-[11px] text-slate-500">Gurpreet Singh • Khanna, Punjab</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-extrabold text-forest-800 text-sm">₹32 / KG</span>
                    <RatingStars rating={5.0} size="sm" showNumber={false} />
                  </div>
                </div>
              </div>

              {/* Escrow Guarantee Float */}
              <div className="bg-emerald-950/90 border border-emerald-500/30 text-white rounded-2xl p-3.5 backdrop-blur-md flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-emerald-300">100% Escrow Protected Trade</div>
                  <div className="text-slate-400 text-[11px]">
                    Buyer inspection guarantee before fund settlement.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem State / Challenge Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-300 shadow-[0_24px_80px_rgba(15,23,42,0.12)] bg-[#eef8ff]">
          <div className="flex items-center justify-between bg-[#0b0f14] px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-3 text-white">
              <button type="button" aria-label="Go back" className="p-1.5 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">Problem_State...</h3>
            </div>
            <div className="flex items-center gap-3 text-slate-200">
              <button type="button" aria-label="Share" className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button type="button" aria-label="More" className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-[#dfeef8] via-[#e7f4fc] to-[#d3ecf7] px-4 pb-8 pt-5 sm:px-6 sm:pb-10 lg:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.10),_transparent_38%)]" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#bfe3f5] to-transparent" />

            <div className="relative space-y-6">
              <div className="flex items-center justify-between gap-3 border-b border-slate-500/60 pb-2">
                <div className="flex items-center gap-3 uppercase tracking-[0.22em] text-[10px] sm:text-[11px] font-black text-slate-700">
                  <span className="inline-block rounded-md bg-emerald-100 px-2 py-1 text-emerald-700 border border-emerald-200">Prarambha 2.0</span>
                  <span className="text-slate-600">A 24 hour online hackathon</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-bold text-slate-600">
                  <span>Build</span>
                  <span className="text-slate-400">|</span>
                  <span>Innovate</span>
                  <span className="text-slate-400">|</span>
                  <span>Impact</span>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-300/80 bg-white/35 backdrop-blur-sm p-4 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                <div className="flex flex-col gap-3 border-b border-slate-300 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sm">
                      Domain
                    </span>
                    <span className="text-lg sm:text-xl font-black text-slate-800">Agritech</span>
                    <span className="text-sm text-slate-500">• Sustainable Solutions</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-slate-500">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold">Problem</span>
                    <span className="text-2xl font-black text-slate-800">01</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 border-b border-slate-300 pb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600">PS 01 :-</span>
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-800">Scenario &amp; Decision Simulator</h4>
                  </div>
                  <div className="flex items-center justify-center rounded-full bg-slate-200/80 px-5 py-2 text-xl font-black text-slate-700 shadow-inner">
                    2 / 10
                  </div>
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="space-y-5 text-slate-800">
                    <div>
                      <p className="mb-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">Background</p>
                      <p className="text-sm sm:text-base leading-relaxed text-slate-700">
                        Farmers make critical crop decisions under uncertain rainfall, changing prices, and volatile input costs. Without a reliable decision engine, even strong harvest plans can underperform when conditions shift.
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">The Pain Point</p>
                      <p className="text-sm sm:text-base leading-relaxed text-slate-700">
                        Most farming decisions still depend on static assumptions and experience. Buyers and growers need a quick way to test crop choices, compare likely outcomes, and understand risk before committing funds or resources.
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">Core Requirements</p>
                      <ul className="space-y-2 text-sm sm:text-base text-slate-700">
                        <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />Configure crop, irrigation, weather, input cost, and planting schedule scenarios in one place.</li>
                        <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />Compare multiple field plans using yield, cost, risk, and resource consumption.</li>
                        <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />Transform raw farm data into visual decisions to support faster and smarter action.</li>
                      </ul>
                    </div>

                    <div>
                      <p className="mb-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">Evaluation Metrics</p>
                      <ul className="space-y-2 text-sm sm:text-base text-slate-700">
                        <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />Accuracy of scenario forecasts under changing agricultural conditions.</li>
                        <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />Clarity of comparison between alternative farm decisions.</li>
                        <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />Ease of understanding and acting on risk-adjusted outcomes.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-sky-300/80 bg-gradient-to-br from-[#ecfbff] via-[#e5f7ff] to-[#cfeafc] p-4">
                    <div className="absolute -left-6 top-8 h-40 w-40 rounded-full border-[18px] border-sky-200/80" />
                    <div className="absolute -right-4 bottom-0 h-32 w-32 rounded-full border-[18px] border-sky-200/80" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.25),transparent_50%)]" />

                    <div className="relative flex h-full flex-col justify-between">
                      <div className="rounded-[1.2rem] bg-white/70 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm">
                        <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                          <span>Smart Yield Model</span>
                          <span>Live</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {decisionMetrics.map((item) => (
                            <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50/90 p-2.5 text-left">
                              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                              <div className={`mt-2 text-sm font-black ${item.tone === 'emerald' ? 'text-emerald-700' : item.tone === 'amber' ? 'text-amber-700' : item.tone === 'sky' ? 'text-sky-700' : 'text-violet-700'}`}>
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-300/70 bg-white/50 p-3 shadow-inner backdrop-blur-sm">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                          <span>Same Campus</span>
                          <span>Bigger Possibilities</span>
                        </div>
                        <div className="rounded-[1.2rem] bg-gradient-to-br from-white to-slate-100 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                          <div className="relative mx-auto h-36 w-full max-w-[260px] overflow-hidden rounded-[1rem] border border-slate-200 bg-[linear-gradient(to_bottom,#dcf5ff_0%,#ebf7ff_38%,#f4f5f7_39%,#eef1f5_100%)]">
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-100 to-transparent" />
                            <div className="absolute bottom-10 left-1/2 h-20 w-40 -translate-x-1/2 rounded-t-[3rem] border-2 border-slate-300 bg-white/90" />
                            <div className="absolute bottom-16 left-1/2 h-10 w-16 -translate-x-1/2 rounded-t-[1.4rem] border-2 border-slate-300 bg-white/80" />
                            <div className="absolute bottom-[4rem] left-[18%] h-12 w-4 rounded-t-full bg-slate-300" />
                            <div className="absolute bottom-[4rem] right-[18%] h-12 w-4 rounded-t-full bg-slate-300" />
                            <div className="absolute bottom-6 left-[15%] h-7 w-7 rounded-full border-2 border-slate-300 bg-white" />
                            <div className="absolute bottom-6 right-[15%] h-7 w-7 rounded-full border-2 border-slate-300 bg-white" />
                            <div className="absolute bottom-5 left-1/2 h-3 w-20 -translate-x-1/2 rounded-full bg-slate-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-400/60 pt-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
                <span>Page 2</span>
                <span>Same Campus Bigger Possibilities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {insightCards.map(({ title, text, icon: Icon }) => (
            <div key={title} className="rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 sm:p-7 shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" /> Smart Farm Planner
              </div>
              <h3 className="text-2xl font-black text-white sm:text-3xl">Decision dashboard for farmers and buyers</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['water', 'market', 'risk'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setPlannerTab(tab)}
                  className={`rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] transition ${
                    plannerTab === tab
                      ? 'bg-emerald-400 text-slate-950'
                      : 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {tab === 'water' ? 'Water' : tab === 'market' ? 'Market' : 'Risk'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.75rem] bg-slate-900/80 border border-slate-700 p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Current mode</p>
                  <h4 className="mt-1 text-xl font-black text-white">{planner.title}</h4>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                  {planner.badge}
                </span>
              </div>

              <div className="mb-5 flex items-end justify-between gap-3 rounded-[1.4rem] border border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Forecast</p>
                  <p className="mt-2 text-lg font-bold text-white">{planner.headline}</p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-emerald-400/30 bg-slate-900 text-xl font-black text-emerald-300">
                  {planner.score}
                </div>
              </div>

              <div className="space-y-3">
                {planner.metrics.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-sm">
                    <span className="text-slate-300">{label}</span>
                    <span className="font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Signal</p>
                  <h4 className="mt-1 text-xl font-black text-white">Performance trend</h4>
                </div>
                <div className="rounded-full border border-slate-600 bg-slate-800 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-300">
                  7-day view
                </div>
              </div>

              <div className="flex h-52 items-end gap-3">
                {planner.bars.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                    <div
                      className="w-full rounded-t-[1rem] bg-gradient-to-t from-emerald-500 via-emerald-400 to-emerald-300"
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{index + 1}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                {planner.signal}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
              <Leaf className="w-3.5 h-3.5" /> Direct Produce Sectors
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Explore Farm Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Source fresh harvest categorized by crop types directly from certified Indian growers.
            </p>
          </div>

          <button
            onClick={() => navigate('/categories')}
            className="flex items-center gap-1.5 text-xs font-bold text-forest-700 hover:text-forest-900 group"
          >
            <span>View All 10+ Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/marketplace?category=${cat.id}`)}
              className="group bg-white rounded-3xl border border-earth-200 p-3 hover:border-forest-500 hover:shadow-soft-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3 bg-earth-50 relative">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-forest-700 transition-colors">
                {cat.name}
              </h4>
              <span className="text-[11px] text-slate-400 mt-0.5">{cat.itemCount}+ Products</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fresh From Farm Marketplace Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Freshly Harvested Produce
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Fresh From the Farm Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top-rated agricultural commodities harvested within the last 48 hours across India.
            </p>
          </div>

          <button
            onClick={() => navigate('/marketplace')}
            className="flex items-center gap-1.5 text-xs font-bold text-forest-700 hover:text-forest-900 group"
          >
            <span>Explore All Farm Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* Interactive Mandi Price Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MandiPriceWidget />
      </section>

      {/* Live Agri Weather Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WeatherWidget />
      </section>

      {/* How AgroConnect Works: 4 Step Interactive Flow */}
      <section className="bg-forest-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-[2.5rem] max-w-7xl mx-auto border border-forest-800">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Transparent Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            How AgroConnect Transforms Farming
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            A seamless, secure 4-step digital ecosystem connecting farmers directly with food buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-forest-950/60 p-6 rounded-3xl border border-forest-800/80 space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 font-black text-lg flex items-center justify-center">
              01
            </div>
            <h4 className="text-base font-bold text-white">Farmer Lists Produce</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verified farmers list crops with geotagged harvest dates, quality grades, photos, and minimum order quantities.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-forest-950/60 p-6 rounded-3xl border border-forest-800/80 space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 font-black text-lg flex items-center justify-center">
              02
            </div>
            <h4 className="text-base font-bold text-white">Direct Chat & Order</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Buyers chat directly with farmers, negotiate wholesale rates, and place orders with 100% Escrow security.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-forest-950/60 p-6 rounded-3xl border border-forest-800/80 space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 font-black text-lg flex items-center justify-center">
              03
            </div>
            <h4 className="text-base font-bold text-white">AgroExpress Logistics</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Temperature-controlled transport picks produce directly at the farm gate and tracks live GPS coordinates.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-forest-950/60 p-6 rounded-3xl border border-forest-800/80 space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 font-black text-lg flex items-center justify-center">
              04
            </div>
            <h4 className="text-base font-bold text-white">Inspect & Settle</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Buyer confirms freshness upon delivery, and escrow payments are instantly deposited into the farmer's bank account.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Farmers Showcase with Leaflet Map Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-forest-700 bg-forest-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" /> India's Progressive Kisans
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Meet Our Verified Farmers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore progressive farmers across Maharashtra, Punjab, Karnataka, Gujarat, and MP.
            </p>
          </div>

          <button
            onClick={() => navigate('/farmers')}
            className="flex items-center gap-1.5 text-xs font-bold text-forest-700 hover:text-forest-900 group"
          >
            <span>View All Registered Farmers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Farmers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredFarmers.map((f) => (
            <div
              key={f.id}
              onClick={() => navigate(`/farmer/${f.id}`)}
              className="group bg-white rounded-3xl border border-earth-200 p-5 hover:border-forest-500 hover:shadow-soft-lg transition-all duration-300 cursor-pointer space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={f.avatarUrl}
                    alt={f.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-300 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{f.name}</h4>
                    <p className="text-xs text-forest-700 font-semibold">{f.farmName}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3 h-3 text-forest-600" />
                      <span>{f.district}, {f.state}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{f.bio}</p>

                <div className="flex flex-wrap gap-1">
                  {f.topCrops.slice(0, 2).map((c, i) => (
                    <span
                      key={i}
                      className="bg-earth-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-earth-100 flex items-center justify-between text-xs">
                <RatingStars rating={f.ratingAvg} size="sm" reviewsCount={f.totalReviews} />
                <span className="font-semibold text-emerald-800 text-[11px]">
                  {f.farmSizeAcres} Acres
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Map Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Interactive Map: Verified Indian Farm Hubs
            </h3>
            <span className="text-xs text-slate-500">Click any pin to view farm details</span>
          </div>
          <FarmMapLeaflet
            farmers={farmers}
            onSelectFarmer={(id) => navigate(`/farmer/${id}`)}
          />
        </div>
      </section>

      {/* CTA Banner For Farmers & Bulk Buyers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Farmer Card */}
          <div className="bg-gradient-to-br from-forest-800 to-forest-900 text-white rounded-3xl p-8 sm:p-10 space-y-4 border border-forest-700 relative overflow-hidden shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold">Are You a Farmer?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sell your agricultural produce directly to retail buyers, restaurant chains, and exporters. Get daily mandi alerts and fair advance payment settlements.
            </p>
            <button
              onClick={() => navigate('/farmer/register')}
              className="bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>Register Farm (Free KYC)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bulk Buyer Card */}
          <div className="bg-gradient-to-br from-earth-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-4 border border-earth-700 relative overflow-hidden shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold">Wholesale & Restaurant Sourcing?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Get tiered bulk discounts on quintals and tons, schedule recurring weekly truck deliveries, and negotiate directly with farmer cooperatives.
            </p>
            <button
              onClick={() => navigate('/marketplace')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>Browse Wholesale Grains & Crops</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
