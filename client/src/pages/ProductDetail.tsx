import React, { useState } from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { RatingStars } from '../components/common/RatingStars';
import { VerifiedFarmerBadge, OrganicBadge, GradeBadge } from '../components/common/Badge';
import { ProductCard } from '../components/marketplace/ProductCard';
import {
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  MapPin,
  Calendar,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Plus,
  Minus,
  Award,
  Leaf,
  Scale,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface ProductDetailProps {
  productId: string;
  navigate: (path: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, navigate }) => {
  const { products, farmers, reviews, addReview, sendChatMessage } = useAgriData();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find((p) => p.id === productId) || products[0];
  const farmer = farmers.find((f) => f.id === product.farmerId) || farmers[0];
  const productReviews = reviews.filter((r) => r.productId === product.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQty, setSelectedQty] = useState(product.minOrderQuantity || 1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [addedToCartToast, setAddedToCartToast] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Calculate Tiered Price based on selected quantity
  let effectivePrice = product.pricePerUnit;
  let activeDiscountPct = 0;
  if (product.tierDiscounts) {
    for (const tier of product.tierDiscounts) {
      if (selectedQty >= tier.minQuantity) {
        effectivePrice = product.pricePerUnit * (1 - tier.discountPercent / 100);
        activeDiscountPct = tier.discountPercent;
      }
    }
  }

  const subtotal = Math.round(effectivePrice * selectedQty);

  const handleQtyChange = (delta: number) => {
    const next = selectedQty + delta;
    if (next >= product.minOrderQuantity && next <= product.availableQuantity) {
      setSelectedQty(next);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedQty);
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 4000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedQty);
    navigate('/cart');
  };

  const handleContactFarmer = () => {
    sendChatMessage({
      receiverId: farmer.userId,
      messageText: `Namaste ${farmer.name}, I am interested in purchasing ${selectedQty} ${product.unit} of ${product.name}. Is this batch available for immediate dispatch?`,
      productCard: {
        id: product.id,
        name: product.name,
        price: product.pricePerUnit,
        unit: product.unit,
        image: product.images[0],
      },
    });
    navigate('/messages');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addReview({
        userId: 'current-user',
        userName: 'Priya Sharma (Verified Buyer)',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        productId: product.id,
        farmerId: farmer.id,
        rating: newRating,
        comment: newComment.trim(),
        verifiedPurchase: true,
      });
      setShowReviewModal(false);
      setNewComment('');
    }
  };

  const relatedProducts = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => navigate('/')} className="hover:text-forest-700">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigate('/marketplace')} className="hover:text-forest-700">Marketplace</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigate(`/marketplace?category=${product.categoryId}`)} className="hover:text-forest-700">
          {product.categoryName}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* Main Product Showcase (Left Gallery, Right Specs & Purchase) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden bg-earth-50 border border-earth-200 shadow-soft group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isOrganic && <OrganicBadge size="md" />}
              <GradeBadge grade={product.qualityGrade} />
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-xs text-slate-600 hover:text-rose-600 transition-transform hover:scale-110 shadow-md"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-forest-700 ring-2 ring-forest-700/20 shadow-sm'
                      : 'border-earth-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Traceability Card */}
          <div className="bg-forest-50/70 border border-forest-200/80 rounded-2xl p-4 space-y-2 text-xs">
            <div className="font-bold text-forest-900 flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              <span>100% Farm Provenance & Geotag</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <div>
                <span className="text-slate-400 block text-[10px]">Harvest Lot Origin:</span>
                <span className="font-semibold text-slate-800">{product.originVillage || 'Niphad'}, {product.originDistrict}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Harvest Date:</span>
                <span className="font-semibold text-slate-800">{new Date(product.harvestDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Estimated Shelf Life:</span>
                <span className="font-semibold text-slate-800">{product.shelfLifeDays} Days (at 18-24°C)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Chemical Pesticides:</span>
                <span className="font-bold text-emerald-700">0.00 ppm (Tested)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-forest-600" />
                <span>{product.originDistrict}, {product.originState}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Farmer Strip */}
            <div className="flex items-center justify-between pt-1">
              <div
                onClick={() => navigate(`/farmer/${farmer.id}`)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <img
                  src={farmer.avatarUrl}
                  alt={farmer.name}
                  className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-forest-700 flex items-center gap-1">
                    <span>{farmer.name}</span>
                    <VerifiedFarmerBadge size="sm" />
                  </div>
                  <span className="text-[11px] text-slate-500">{farmer.farmName}</span>
                </div>
              </div>

              <div className="text-right">
                <RatingStars rating={product.ratingAvg} size="sm" reviewsCount={product.reviewsCount} />
              </div>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-earth-50/80 p-5 rounded-3xl border border-earth-200/90 space-y-3">
            <div className="flex items-baseline gap-3">
              <div className="text-3xl sm:text-4xl font-black text-forest-800">
                ₹{effectivePrice.toFixed(0)}{' '}
                <span className="text-sm font-normal text-slate-500">/ {product.unit}</span>
              </div>
              {activeDiscountPct > 0 && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {activeDiscountPct}% Bulk Savings Applied!
                </div>
              )}
            </div>

            {/* Tiered Wholesale Rates Preview */}
            {product.tierDiscounts && product.tierDiscounts.length > 0 && (
              <div className="pt-2 border-t border-earth-200/80">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Tiered Wholesale Pricing
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {product.tierDiscounts.map((tier, i) => (
                    <div
                      key={i}
                      className={`px-3 py-1.5 rounded-xl border font-medium ${
                        selectedQty >= tier.minQuantity
                          ? 'bg-forest-700 text-white border-forest-700 font-bold'
                          : 'bg-white text-slate-700 border-earth-200'
                      }`}
                    >
                      {tier.minQuantity}+ {product.unit}: <strong>{tier.discountPercent}% Off</strong> (₹{(product.pricePerUnit * (1 - tier.discountPercent / 100)).toFixed(0)}/{product.unit})
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Availability */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-earth-200/80 text-slate-600">
              <span>
                Available Stock: <strong className="text-slate-900">{product.availableQuantity} {product.unit}</strong>
              </span>
              <span>
                Min Order Quantity: <strong className="text-amber-800">{product.minOrderQuantity} {product.unit}</strong>
              </span>
            </div>
          </div>

          {/* Quantity Selector & Subtotal Calculation */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-earth-200 shadow-2xs">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Order Quantity ({product.unit})
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-earth-100 rounded-xl p-1 border border-earth-200">
                    <button
                      onClick={() => handleQtyChange(-5)}
                      disabled={selectedQty <= product.minOrderQuantity}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-earth-50 disabled:opacity-40 shadow-xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      value={selectedQty}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= product.minOrderQuantity && val <= product.availableQuantity) {
                          setSelectedQty(val);
                        }
                      }}
                      className="w-16 text-center font-bold text-sm bg-transparent outline-none text-slate-900"
                    />
                    <button
                      onClick={() => handleQtyChange(5)}
                      disabled={selectedQty >= product.availableQuantity}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-earth-50 disabled:opacity-40 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{product.unit}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Calculated Subtotal:</span>
                <span className="text-2xl font-black text-forest-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs sm:text-sm py-3.5 rounded-2xl transition-all shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm py-3.5 rounded-2xl transition-all shadow-md"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleContactFarmer}
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm py-3.5 rounded-2xl transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Farmer</span>
              </button>
            </div>

            {/* Toast feedback */}
            {addedToCartToast && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Added {selectedQty} {product.unit} of {product.name} to your cart!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs / Specifications & Quality Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-earth-200">
        {/* Specifications & Description */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 space-y-4 shadow-soft">
            <h3 className="text-lg font-bold text-slate-900">Produce Description & Cultivation</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.description}</p>

            {product.specifications && (
              <div className="pt-4 border-t border-earth-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Agronomic & Quality Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-earth-50 p-3 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Moisture Content:</span>
                    <span className="font-semibold text-slate-800">{product.specifications.moistureContent}</span>
                  </div>
                  <div className="bg-earth-50 p-3 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Pesticide Residual Report:</span>
                    <span className="font-semibold text-emerald-700">{product.specifications.pesticideResidual}</span>
                  </div>
                  <div className="bg-earth-50 p-3 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Cultivation Technique:</span>
                    <span className="font-semibold text-slate-800">{product.specifications.cultivationMethod}</span>
                  </div>
                  <div className="bg-earth-50 p-3 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Soil Ecology:</span>
                    <span className="font-semibold text-slate-800">{product.specifications.soilType}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reviews & Ratings Section */}
          <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 space-y-6 shadow-soft">
            <div className="flex items-center justify-between pb-4 border-b border-earth-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Buyer Reviews & Quality Ratings</h3>
                <div className="flex items-center gap-2 mt-1">
                  <RatingStars rating={product.ratingAvg} size="md" />
                  <span className="text-xs text-slate-500">Based on {product.reviewsCount || productReviews.length} verified purchases</span>
                </div>
              </div>

              <button
                onClick={() => setShowReviewModal(true)}
                className="bg-forest-700 hover:bg-forest-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
              >
                Write a Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4 divide-y divide-earth-100">
              {productReviews.length > 0 ? (
                productReviews.map((rev) => (
                  <div key={rev.id} className="pt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rev.userAvatar} alt={rev.userName} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <span className="font-bold text-slate-900">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="ml-2 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                              ✓ Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-slate-400 text-[11px]">{rev.date}</span>
                    </div>
                    <RatingStars rating={rev.rating} size="sm" showNumber={false} />
                    <p className="text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-4">No reviews yet for this harvest lot. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Farmer Card & Shipping */}
        <div className="lg:col-span-4 space-y-6">
          {/* Farmer Card */}
          <div className="bg-white rounded-3xl border border-earth-200 p-6 space-y-4 shadow-soft">
            <div className="flex items-center gap-3 pb-3 border-b border-earth-100">
              <img
                src={farmer.avatarUrl}
                alt={farmer.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-300"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{farmer.name}</h4>
                <p className="text-xs text-forest-700 font-semibold">{farmer.farmName}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-forest-600" />
                  <span>{farmer.district}, {farmer.state}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{farmer.bio}</p>

            <div className="grid grid-cols-2 gap-2 text-xs py-2 bg-earth-50 p-3 rounded-2xl">
              <div>
                <span className="text-slate-400 text-[10px] block">Farm Size:</span>
                <span className="font-bold text-slate-800">{farmer.farmSizeAcres} Acres</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Experience:</span>
                <span className="font-bold text-slate-800">{farmer.experienceYears} Years</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Orders Fulfilled:</span>
                <span className="font-bold text-slate-800">{farmer.totalOrdersFulfilled}+ Orders</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Farmer Rating:</span>
                <span className="font-bold text-emerald-700">⭐ {farmer.ratingAvg}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => navigate(`/farmer/${farmer.id}`)}
                className="w-full bg-forest-50 hover:bg-forest-100 text-forest-800 font-bold text-xs py-2.5 rounded-xl transition-colors border border-forest-200 flex items-center justify-center gap-1.5"
              >
                <span>View Full Farmer Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleContactFarmer}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Message Farmer Directly</span>
              </button>
            </div>
          </div>

          {/* Delivery & Protection Card */}
          <div className="bg-forest-900 text-white rounded-3xl p-6 space-y-3 shadow-lg border border-forest-800">
            <h4 className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
              <Truck className="w-4 h-4" /> AgroExpress Logistics
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Temperature-controlled farm gate pickup with real-time GPS tracking. Safe arrival guarantee or 100% refund.
            </p>
            <div className="pt-2 border-t border-forest-800 text-xs text-slate-400 space-y-1">
              <div>✓ Direct from harvest lot to doorstep</div>
              <div>✓ Safe payment held in escrow</div>
              <div>✓ 24h quality return window</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products from same category */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-earth-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Similar Farm Produce</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900">Rate & Review Produce</h3>
            <p className="text-xs text-slate-500">
              Share your feedback on freshness, grade uniformity, and packaging for {product.name}.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Rating</label>
                <RatingStars rating={newRating} interactive={true} onRatingChange={setNewRating} size="lg" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Review Comment</label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="How was the quality, aroma, and packaging of this produce?"
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-forest-600"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-earth-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-forest-700 text-white py-2.5 rounded-xl text-xs font-bold"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
