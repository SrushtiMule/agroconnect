import React, { useState, useMemo, useEffect } from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { ProductCard } from '../components/marketplace/ProductCard';
import { FilterPanel, FilterState } from '../components/marketplace/FilterPanel';
import { PriceTicker } from '../components/marketplace/PriceTicker';
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  Sparkles,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface MarketplaceProps {
  navigate: (path: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ navigate }) => {
  const { products } = useAgriData();

  // Parse initial query from URL
  const initialCategory = new URLSearchParams(window.location.search).get('category') || '';
  const initialSearch = new URLSearchParams(window.location.search).get('search') || '';
  const initialOrganic = new URLSearchParams(window.location.search).get('organic') === 'true';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'RECOMMENDED' | 'PRICE_ASC' | 'PRICE_DESC' | 'NEWEST' | 'RATING'>('RECOMMENDED');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const initialFilterState: FilterState = {
    category: initialCategory,
    state: '',
    maxPrice: 1000,
    farmingType: '',
    isOrganicOnly: initialOrganic,
    qualityGrade: '',
    isVerifiedOnly: false,
    minRating: 0,
    inStockOnly: false,
  };

  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Update when URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cat = urlParams.get('category');
    const srch = urlParams.get('search');
    const org = urlParams.get('organic') === 'true';

    if (cat !== null) setFilters((prev) => ({ ...prev, category: cat }));
    if (srch !== null) setSearchQuery(srch);
    if (org) setFilters((prev) => ({ ...prev, isOrganicOnly: true }));
  }, []);

  const handleReset = () => {
    setFilters({
      category: '',
      state: '',
      maxPrice: 1000,
      farmingType: '',
      isOrganicOnly: false,
      qualityGrade: '',
      isVerifiedOnly: false,
      minRating: 0,
      inStockOnly: false,
    });
    setSearchQuery('');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCategory = p.categoryName.toLowerCase().includes(q);
          const matchFarmer = p.farmerName.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchState = p.originState.toLowerCase().includes(q);
          if (!matchName && !matchCategory && !matchFarmer && !matchDesc && !matchState) return false;
        }

        // Category
        if (filters.category && p.categoryId !== filters.category) return false;

        // State
        if (filters.state && p.originState.toLowerCase() !== filters.state.toLowerCase()) return false;

        // Max Price
        if (p.pricePerUnit > filters.maxPrice) return false;

        // Organic
        if (filters.isOrganicOnly && !p.isOrganic) return false;

        // Quality Grade
        if (filters.qualityGrade && p.qualityGrade !== filters.qualityGrade) return false;

        // Farmer verified
        if (filters.isVerifiedOnly && !p.isFarmerVerified) return false;

        // In stock
        if (filters.inStockOnly && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PRICE_ASC') return a.pricePerUnit - b.pricePerUnit;
        if (sortBy === 'PRICE_DESC') return b.pricePerUnit - a.pricePerUnit;
        if (sortBy === 'NEWEST') return new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime();
        if (sortBy === 'RATING') return b.ratingAvg - a.ratingAvg;
        return b.totalSales - a.totalSales; // Recommended
      });
  }, [products, searchQuery, filters, sortBy]);

  const activeFilterPills = [
    filters.category ? `Category: ${filters.category}` : null,
    filters.state ? `State: ${filters.state}` : null,
    filters.isOrganicOnly ? '100% Organic' : null,
    filters.isVerifiedOnly ? 'Verified Farmers' : null,
    filters.qualityGrade ? `Grade: ${filters.qualityGrade}` : null,
    filters.maxPrice < 1000 ? `Max ₹${filters.maxPrice}` : null,
  ].filter(Boolean);

  return (
    <div className="space-y-6 pb-16">
      <PriceTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Marketplace Header Bar */}
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-forest-950/80 px-2.5 py-1 rounded-full border border-forest-700">
              Direct Kisan Mandi
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Fresh From the Farm
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Procure farm-graded crops directly from certified progressive growers with full price transparency and lab-tested quality assurance.
            </p>
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white rounded-2xl border border-earth-200 p-4 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop, farmer name, state, or variety..."
              className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-forest-600 focus:bg-white transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Drawer Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-forest-700 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sorting Select */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-earth-50 border border-earth-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-forest-600"
              >
                <option value="RECOMMENDED">Recommended (Bestselling)</option>
                <option value="PRICE_ASC">Price: Low to High</option>
                <option value="PRICE_DESC">Price: High to Low</option>
                <option value="NEWEST">Newest Harvest</option>
                <option value="RATING">Highest Rated</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-earth-50 rounded-xl border border-earth-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-forest-800' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-xs text-forest-800' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Pill Tags */}
        {activeFilterPills.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Active Filters:</span>
            {activeFilterPills.map((pill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold"
              >
                <span>{pill}</span>
              </span>
            ))}
            <button
              onClick={handleReset}
              className="text-xs text-rose-600 hover:underline font-semibold ml-2 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Main Content: Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <FilterPanel filters={filters} setFilters={setFilters} onReset={handleReset} />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> farm listings
              </span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Quality Guaranteed
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    navigate={navigate}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl border border-earth-200 p-12 text-center space-y-4 shadow-soft">
                <div className="w-16 h-16 rounded-3xl bg-earth-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                  🌾
                </div>
                <h3 className="text-xl font-bold text-slate-900">No Farm Products Found</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  We couldn't find any crops matching your search criteria. Try removing filters or searching for another commodity.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 space-y-4 animate-slide-left">
              <div className="flex items-center justify-between pb-4 border-b border-earth-100">
                <h3 className="text-lg font-bold text-slate-900">Filter Produce</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-earth-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onReset={handleReset}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setMobileFilterOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
