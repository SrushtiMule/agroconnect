import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { Leaf, ArrowRight, Sparkles } from 'lucide-react';

interface CategoriesProps {
  navigate: (path: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ navigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest-800 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-forest-950/80 px-3 py-1 rounded-full border border-forest-700 inline-flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5" /> Agriculture Classifications
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Crop & Produce Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Browse our wide catalog of agricultural commodities, from fresh daily vegetables and organic grains to high-curcumin spices and industrial cash crops.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/marketplace?category=${cat.id}`)}
            className="group bg-white rounded-3xl border border-earth-200/90 overflow-hidden shadow-soft hover:shadow-soft-lg hover:border-forest-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Header */}
            <div className="relative aspect-16/9 w-full overflow-hidden bg-earth-50">
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="font-extrabold text-lg">{cat.name}</span>
                <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                  {cat.itemCount}+ Listings
                </span>
              </div>
            </div>

            {/* Content & Popular tags */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>

                {cat.popularItems && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Popular Produce:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.popularItems.map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-earth-100 text-slate-700 px-2.5 py-0.5 rounded-lg font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-earth-100 flex items-center justify-between text-xs font-bold text-forest-700 group-hover:text-forest-900">
                <span>Explore {cat.name}</span>
                <div className="w-8 h-8 rounded-full bg-forest-50 group-hover:bg-forest-700 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
