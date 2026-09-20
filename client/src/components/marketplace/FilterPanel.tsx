import React from 'react';
import { CATEGORIES } from '../../data/mockData';
import { FarmingType, QualityGrade } from '../../types';
import { Filter, RotateCcw, Check, Sparkles, ShieldCheck } from 'lucide-react';

export interface FilterState {
  category: string;
  state: string;
  maxPrice: number;
  farmingType: string;
  isOrganicOnly: boolean;
  qualityGrade: string;
  isVerifiedOnly: boolean;
  minRating: number;
  inStockOnly: boolean;
}

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const INDIAN_STATES = [
  'All States',
  'Maharashtra',
  'Punjab',
  'Karnataka',
  'Gujarat',
  'Madhya Pradesh',
  'Andhra Pradesh',
  'Uttar Pradesh',
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
  onReset,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-earth-200/90 p-6 shadow-soft space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-earth-100">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
          <Filter className="w-4 h-4 text-forest-700" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 transition-colors font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Produce Category
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, category: '' }))}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
              filters.category === ''
                ? 'bg-forest-700 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-earth-100'
            }`}
          >
            <span>All Categories</span>
          </button>
          {CATEGORIES.map((cat) => {
            const active = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilters((prev) => ({ ...prev, category: cat.id }))}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                  active
                    ? 'bg-forest-700 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-earth-100'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] ${active ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* State / Region */}
      <div className="space-y-3 pt-4 border-t border-earth-100">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Origin State
        </label>
        <select
          value={filters.state}
          onChange={(e) => setFilters((prev) => ({ ...prev, state: e.target.value === 'All States' ? '' : e.target.value }))}
          className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-forest-600"
        >
          {INDIAN_STATES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-earth-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Max Price (₹ / unit)
          </label>
          <span className="text-xs font-bold text-forest-700">₹{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-forest-700 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>₹10</span>
          <span>₹500</span>
          <span>₹1000+</span>
        </div>
      </div>

      {/* Farming Practices & Quality Toggles */}
      <div className="space-y-2.5 pt-4 border-t border-earth-100">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Verification & Certification
        </label>

        {/* Organic Only Toggle */}
        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.isOrganicOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, isOrganicOnly: e.target.checked }))}
            className="w-4 h-4 rounded text-forest-700 focus:ring-forest-600 accent-forest-700 rounded-md"
          />
          <span className="font-semibold text-forest-900">100% Certified Organic Only</span>
        </label>

        {/* Verified Farmer Only */}
        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.isVerifiedOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, isVerifiedOnly: e.target.checked }))}
            className="w-4 h-4 rounded text-forest-700 focus:ring-forest-600 accent-forest-700 rounded-md"
          />
          <span className="flex items-center gap-1 font-semibold text-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Farmers Only</span>
          </span>
        </label>

        {/* In Stock Only */}
        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
            className="w-4 h-4 rounded text-forest-700 focus:ring-forest-600 accent-forest-700 rounded-md"
          />
          <span>In Stock Immediately</span>
        </label>
      </div>

      {/* Quality Grade */}
      <div className="space-y-2 pt-4 border-t border-earth-100">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Quality Grade
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {['ALL', 'A_PLUS', 'A', 'B'].map((g) => (
            <button
              key={g}
              onClick={() => setFilters((prev) => ({ ...prev, qualityGrade: g === 'ALL' ? '' : g }))}
              className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-colors ${
                (g === 'ALL' && filters.qualityGrade === '') || filters.qualityGrade === g
                  ? 'bg-forest-800 text-white border-forest-800'
                  : 'bg-earth-50 text-slate-700 border-earth-200 hover:bg-earth-100'
              }`}
            >
              {g === 'ALL' ? 'All' : g === 'A_PLUS' ? 'Grade A+' : `Grade ${g}`}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Close Button */}
      {isMobileDrawer && (
        <div className="pt-4 border-t border-earth-100">
          <button
            onClick={onCloseMobileDrawer}
            className="w-full bg-forest-700 text-white font-bold py-2.5 rounded-xl text-xs"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};
