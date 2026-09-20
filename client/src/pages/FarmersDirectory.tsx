import React, { useState } from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { FarmMapLeaflet } from '../components/maps/FarmMapLeaflet';
import { VerifiedFarmerBadge } from '../components/common/Badge';
import { RatingStars } from '../components/common/RatingStars';
import {
  Users,
  Search,
  MapPin,
  Sprout,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface FarmersDirectoryProps {
  navigate: (path: string) => void;
}

const STATES = [
  'All States',
  'Maharashtra',
  'Punjab',
  'Karnataka',
  'Gujarat',
  'Madhya Pradesh',
  'Andhra Pradesh',
  'Uttar Pradesh',
];

export const FarmersDirectory: React.FC<FarmersDirectoryProps> = ({ navigate }) => {
  const { farmers } = useAgriData();
  const [selectedState, setSelectedState] = useState('All States');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFarmers = farmers.filter((f) => {
    if (selectedState !== 'All States' && f.state !== selectedState) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = f.name.toLowerCase().includes(q);
      const matchFarm = f.farmName.toLowerCase().includes(q);
      const matchDistrict = f.district.toLowerCase().includes(q);
      const matchCrops = f.topCrops.some((c) => c.toLowerCase().includes(q));
      if (!matchName && !matchFarm && !matchDistrict && !matchCrops) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest-800 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-forest-950/80 px-3 py-1 rounded-full border border-forest-700 inline-flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> India's Agri Pioneers
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Verified Farmer Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discover progressive growers, organic innovators, and certified agriculturalists. Know the farmer who grows your food and buy directly from their fields.
          </p>
        </div>
      </div>

      {/* Interactive Map of Verified Farms */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-forest-700" />
            <span>Interactive Map of Verified Indian Farms</span>
          </h3>
          <span className="text-xs text-slate-500">Click any marker to open farm profile</span>
        </div>
        <FarmMapLeaflet
          farmers={filteredFarmers}
          onSelectFarmer={(id) => navigate(`/farmer/${id}`)}
        />
      </div>

      {/* Search & State Filter Bar */}
      <div className="bg-white rounded-2xl border border-earth-200 p-4 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by farmer name, crop, farm name, or district..."
            className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-forest-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        {/* State Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {STATES.slice(0, 5).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedState === st
                  ? 'bg-forest-700 text-white shadow-xs'
                  : 'bg-earth-50 text-slate-600 hover:bg-earth-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map((f) => (
          <div
            key={f.id}
            onClick={() => navigate(`/farmer/${f.id}`)}
            className="group bg-white rounded-3xl border border-earth-200 p-6 hover:border-forest-500 hover:shadow-soft-lg transition-all duration-300 cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Profile Top Strip */}
              <div className="flex items-start gap-4">
                <img
                  src={f.avatarUrl}
                  alt={f.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 group-hover:scale-105 transition-transform shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-base truncate">{f.name}</h3>
                  </div>
                  <p className="text-xs font-semibold text-forest-700">{f.farmName}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-forest-600 shrink-0" />
                    <span className="truncate">{f.village}, {f.district}, {f.state}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{f.bio}</p>

              {/* Crops */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Crops Grown:
                </span>
                <div className="flex flex-wrap gap-1">
                  {f.topCrops.map((c, i) => (
                    <span
                      key={i}
                      className="bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-3 gap-2 bg-earth-50 p-3 rounded-2xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Land</span>
                  <span className="font-bold text-slate-800">{f.farmSizeAcres} Ac</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Exp</span>
                  <span className="font-bold text-slate-800">{f.experienceYears} Yrs</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Orders</span>
                  <span className="font-bold text-slate-800">{f.totalOrdersFulfilled}+</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-earth-100 flex items-center justify-between text-xs">
              <RatingStars rating={f.ratingAvg} size="sm" reviewsCount={f.totalReviews} />
              <div className="flex items-center gap-1 font-bold text-forest-700 group-hover:text-forest-900">
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
