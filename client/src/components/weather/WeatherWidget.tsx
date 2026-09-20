import React, { useState } from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  AlertTriangle,
  Compass,
  Sprout,
  CheckCircle2,
} from 'lucide-react';

const DISTRICTS = [
  'Nashik (Maharashtra)',
  'Ludhiana (Punjab)',
  'Mandya (Karnataka)',
  'Guntur (Andhra Pradesh)',
  'Anand (Gujarat)',
  'Indore (Madhya Pradesh)',
  'Varanasi (Uttar Pradesh)',
];

export const WeatherWidget: React.FC = () => {
  const { weather } = useAgriData();
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0]);

  return (
    <div className="bg-gradient-to-br from-forest-900 via-forest-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-forest-800 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-800/80">
        <div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
            <CloudSun className="w-3.5 h-3.5" /> Live Agri-Weather Satellite Radar
          </span>
          <h3 className="text-xl sm:text-2xl font-bold mt-2">
            Farming Weather & Micro-Climate Advisory
          </h3>
        </div>

        {/* District Selector */}
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="bg-forest-900/90 border border-forest-700 rounded-xl px-3.5 py-2 text-xs font-semibold text-white outline-none focus:border-emerald-400"
        >
          {DISTRICTS.map((d) => (
            <option key={d} value={d} className="bg-slate-900 text-white">
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Current Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 items-center">
        {/* Main Temp */}
        <div className="md:col-span-1 flex items-center gap-4 bg-forest-900/40 p-4 rounded-2xl border border-forest-800">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-3xl">
            ☀️
          </div>
          <div>
            <div className="text-4xl font-extrabold tracking-tight">
              {weather.temperature}°<span className="text-xl text-slate-400">C</span>
            </div>
            <p className="text-xs text-emerald-300 font-medium mt-0.5">{weather.condition}</p>
          </div>
        </div>

        {/* Parameter Badges */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-forest-900/40 p-3.5 rounded-2xl border border-forest-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              <span>Humidity</span>
            </div>
            <div className="text-lg font-bold text-white">{weather.humidity}%</div>
            <span className="text-[10px] text-emerald-400">Ideal for onions</span>
          </div>

          <div className="bg-forest-900/40 p-3.5 rounded-2xl border border-forest-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <CloudRain className="w-3.5 h-3.5 text-blue-300" />
              <span>Rain Prob.</span>
            </div>
            <div className="text-lg font-bold text-white">{weather.rainfallProbability}%</div>
            <span className="text-[10px] text-amber-300">Light scattered</span>
          </div>

          <div className="bg-forest-900/40 p-3.5 rounded-2xl border border-forest-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Wind className="w-3.5 h-3.5 text-teal-300" />
              <span>Wind Speed</span>
            </div>
            <div className="text-lg font-bold text-white">{weather.windSpeed} km/h</div>
            <span className="text-[10px] text-teal-300">Gentle Breeze</span>
          </div>

          <div className="bg-forest-900/40 p-3.5 rounded-2xl border border-forest-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              <span>Soil Moisture</span>
            </div>
            <div className="text-lg font-bold text-white">{weather.soilMoisture}</div>
            <span className="text-[10px] text-emerald-400">Optimal Field Cap.</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Row */}
      <div className="py-4 border-t border-forest-800/80">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          7-Day Farming Weather Forecast
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {weather.forecast.map((f, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl text-center space-y-1 border transition-all ${
                i === 0
                  ? 'bg-emerald-900/40 border-emerald-500 shadow-xs'
                  : 'bg-forest-900/30 border-forest-800/60 hover:bg-forest-900/60'
              }`}
            >
              <span className="text-[11px] font-bold text-slate-300 block">{f.day}</span>
              <div className="text-lg py-0.5">
                {f.condition.includes('Rain') ? '🌧️' : f.condition.includes('Cloud') ? '⛅' : '☀️'}
              </div>
              <div className="text-xs font-bold text-white">
                {f.tempMax}° <span className="text-slate-400 font-normal text-[10px]">{f.tempMin}°</span>
              </div>
              <span className="text-[10px] text-blue-300 block">💧 {f.rainProb}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Agro Advisory Alert */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h5 className="font-bold text-amber-300 text-xs sm:text-sm">
            Agronomist Crop Alert & Spray Advisory
          </h5>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{weather.advisory}</p>
        </div>
      </div>
    </div>
  );
};
