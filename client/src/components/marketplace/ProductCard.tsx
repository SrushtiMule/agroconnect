import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { RatingStars } from '../common/RatingStars';
import { VerifiedFarmerBadge, OrganicBadge, GradeBadge } from '../common/Badge';
import { MapPin, ShoppingBag, Heart, Eye, Sparkles, Truck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  navigate: (path: string) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  navigate,
  viewMode = 'grid',
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.minOrderQuantity || 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="group bg-white rounded-2xl border border-earth-200/80 p-4 hover:shadow-soft-lg hover:border-forest-400 transition-all cursor-pointer flex flex-col sm:flex-row gap-5 items-start sm:items-center relative"
      >
        {/* Product Image */}
        <div className="relative w-full sm:w-48 h-44 rounded-xl overflow-hidden bg-earth-50 shrink-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isOrganic && (
            <div className="absolute top-2 left-2">
              <OrganicBadge size="sm" />
            </div>
          )}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-xs text-slate-600 hover:text-rose-600 hover:scale-110 transition-all shadow-xs"
          >
            <Heart
              className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>
        </div>

        {/* Info Column */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {product.categoryName}
            </span>
            <GradeBadge grade={product.qualityGrade} />
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-forest-600" />
              <span>{product.originDistrict}, {product.originState}</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-forest-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>

          {/* Farmer info */}
          <div className="flex items-center gap-2 pt-1">
            <img
              src={product.farmerAvatar}
              alt={product.farmerName}
              className="w-6 h-6 rounded-full object-cover border border-emerald-300"
            />
            <span className="text-xs font-medium text-slate-700">{product.farmerName}</span>
            {product.isFarmerVerified && <VerifiedFarmerBadge size="sm" />}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="w-full sm:w-48 sm:text-right flex flex-col justify-between sm:border-l sm:border-earth-100 sm:pl-5 space-y-3 shrink-0">
          <div>
            <div className="text-2xl font-extrabold text-forest-800">
              ₹{product.pricePerUnit}{' '}
              <span className="text-xs font-normal text-slate-500">/ {product.unit}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Available: <span className="font-semibold text-slate-800">{product.availableQuantity} {product.unit}</span>
            </div>
            <div className="text-[11px] text-amber-700 font-medium">
              Min Order: {product.minOrderQuantity} {product.unit}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
              className="p-2 rounded-xl bg-earth-100 hover:bg-earth-200 text-slate-700 text-xs font-semibold"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-forest-700 hover:bg-forest-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white rounded-3xl border border-earth-200/90 hover:border-forest-500/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-earth-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isOrganic && <OrganicBadge size="sm" />}
          <GradeBadge grade={product.qualityGrade} />
        </div>

        <button
          onClick={handleToggleWishlist}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-600 hover:text-rose-600 hover:scale-110 transition-all shadow-sm"
        >
          <Heart
            className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`}
          />
        </button>

        {/* Harvest Date Tag */}
        <div className="absolute bottom-3 left-3 bg-slate-950/75 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <Truck className="w-3 h-3 text-emerald-400" />
          <span>Harvested: {new Date(product.harvestDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category & Origin */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px]">
              <MapPin className="w-3 h-3 text-forest-600" />
              <span>{product.originDistrict}, {product.originState}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 group-hover:text-forest-700 transition-colors line-clamp-1 text-base">
            {product.name}
          </h3>

          {/* Farmer profile strip */}
          <div className="flex items-center justify-between pt-1 border-t border-earth-100">
            <div className="flex items-center gap-2">
              <img
                src={product.farmerAvatar}
                alt={product.farmerName}
                className="w-6 h-6 rounded-full object-cover border border-emerald-300"
              />
              <span className="text-xs font-semibold text-slate-700 truncate max-w-[110px]">
                {product.farmerName}
              </span>
            </div>
            {product.isFarmerVerified && <VerifiedFarmerBadge size="sm" />}
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <RatingStars rating={product.ratingAvg} size="sm" reviewsCount={product.reviewsCount} />
            <span className="text-[11px] text-slate-500">
              Stock: <strong className="text-slate-800">{product.availableQuantity} {product.unit}</strong>
            </span>
          </div>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="pt-3 border-t border-earth-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-xl font-extrabold text-forest-800">
              ₹{product.pricePerUnit}{' '}
              <span className="text-xs font-normal text-slate-500">/ {product.unit}</span>
            </div>
            <div className="text-[10px] text-amber-700 font-medium">
              MOQ: {product.minOrderQuantity} {product.unit}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
              className="p-2.5 rounded-xl bg-earth-100 hover:bg-earth-200 text-slate-700 transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 bg-forest-700 hover:bg-forest-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
