import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useAgriData } from '../context/AgriDataContext';
import { ProductCard } from '../components/marketplace/ProductCard';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';

interface WishlistProps {
  navigate: (path: string) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ navigate }) => {
  const { wishlistIds, clearWishlist } = useWishlist();
  const { products } = useAgriData();

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div className="flex items-center justify-between pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            <span>Saved Farm Produce ({savedProducts.length})</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Your shortlisted fresh crops and seasonal harvest listings
          </p>
        </div>

        {savedProducts.length > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {savedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProducts.map((p) => (
            <ProductCard key={p.id} product={p} navigate={navigate} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-earth-200 p-16 text-center space-y-4 shadow-soft">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl">
            ❤️
          </div>
          <h3 className="text-xl font-bold text-slate-900">Your Wishlist is Empty</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Click the heart icon on any crop listing in the marketplace to save it for quick re-ordering.
          </p>
          <button
            onClick={() => navigate('/marketplace')}
            className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md"
          >
            <span>Browse Farm Produce</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
