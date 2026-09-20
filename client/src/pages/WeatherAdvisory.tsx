import React from 'react';
import { WeatherWidget } from '../components/weather/WeatherWidget';
import { CloudSun, Sprout, AlertTriangle, Wind, Droplets } from 'lucide-react';

interface WeatherAdvisoryProps {
  navigate: (path: string) => void;
}

export const WeatherAdvisory: React.FC<WeatherAdvisoryProps> = ({ navigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest-800 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-forest-950/80 px-3 py-1 rounded-full border border-forest-700 inline-flex items-center gap-1.5">
            <CloudSun className="w-3.5 h-3.5" /> Meteorological Crop Radar
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Agri-Weather & District Advisories
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Real-time hyper-local agricultural weather forecasts, soil moisture indices, and crop spray timing advisories.
          </p>
        </div>
      </div>

      {/* Main Weather Widget */}
      <WeatherWidget />

      {/* Seasonal Farming Advisories */}
      <div className="bg-white rounded-3xl border border-earth-200 p-8 space-y-6 shadow-soft">
        <h3 className="text-xl font-bold text-slate-900">District Agricultural Spray & Sowing Advisory</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-forest-50 border border-forest-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-forest-900 text-sm">
              <Sprout className="w-4 h-4 text-forest-700" />
              <span>Kharif Harvest Window</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Maintain optimal sun curing for harvested red onions and groundnuts. Store in well-ventilated raised crates before rain probability increases.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Fungal & Blight Protection</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              High relative humidity (68%) favors downy mildew in vine vegetables. Apply biological Trichoderma viride or sour buttermilk spray early morning.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
              <Droplets className="w-4 h-4 text-blue-700" />
              <span>Drip Irrigation Scheduling</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Soil moisture is currently at 32% field capacity. Operate drip lines for 45 minutes every alternate day during evening hours to minimize evapotranspiration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
