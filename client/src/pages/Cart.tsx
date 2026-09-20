import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

interface CartProps {
  navigate: (path: string) => void;
}

export const Cart: React.FC<CartProps> = ({ navigate }) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    deliveryFee,
    finalTotal,
    itemCount,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      const res = applyCoupon(inputCoupon.trim());
      setCouponFeedback(res);
      setInputCoupon('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-earth-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-soft">
          🛒
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Looks like you haven't added any farm fresh produce to your basket yet. Explore our verified farmers' harvest today!
        </p>
        <button
          onClick={() => navigate('/marketplace')}
          className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all"
        >
          <span>Explore Farm Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div className="flex items-center justify-between pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Shopping Cart ({items.length} Farm Items)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Farm-direct harvest sorted and packaged in eco-friendly crates
          </p>
        </div>

        <button
          onClick={clearCart}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 transition-colors font-medium"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            let itemPrice = item.product.pricePerUnit;
            if (item.product.tierDiscounts) {
              for (const tier of item.product.tierDiscounts) {
                if (item.quantity >= tier.minQuantity) {
                  itemPrice = item.product.pricePerUnit * (1 - tier.discountPercent / 100);
                }
              }
            }
            const itemSubtotal = Math.round(itemPrice * item.quantity);

            return (
              <div
                key={item.product.id}
                className="bg-white rounded-3xl border border-earth-200 p-4 sm:p-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              >
                {/* Image & Title */}
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-earth-100 shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.product.categoryName}
                    </span>
                    <h3
                      onClick={() => navigate(`/product/${item.product.id}`)}
                      className="font-bold text-sm text-slate-900 truncate hover:text-forest-700 cursor-pointer"
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-slate-500">Farmer: {item.product.farmerName}</p>
                    <div className="text-xs font-semibold text-forest-800">
                      ₹{itemPrice.toFixed(0)} / {item.product.unit}
                    </div>
                  </div>
                </div>

                {/* Quantity Adjuster & Item Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-earth-100">
                  {/* Quantity */}
                  <div className="flex items-center bg-earth-100 rounded-xl p-1 border border-earth-200">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 5)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-earth-50 shadow-xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-12 text-center text-xs font-bold text-slate-900">
                      {item.quantity} {item.product.unit}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 5)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-earth-50 shadow-xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[80px]">
                    <div className="text-base font-extrabold text-slate-900">
                      ₹{itemSubtotal.toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Escrow Banner */}
          <div className="bg-forest-50 border border-forest-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-forest-900">
            <ShieldCheck className="w-5 h-5 text-forest-700 shrink-0" />
            <span>
              <strong>AgroConnect Buyer Protection:</strong> Funds remain securely locked in Escrow until you inspect produce freshness upon delivery.
            </span>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-earth-200 p-6 space-y-4 shadow-soft">
            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-earth-100">
              Order Summary
            </h3>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({itemCount} units)</span>
                <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  <span>AgroExpress Delivery</span>
                </span>
                <span className="font-semibold text-slate-900">
                  {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>

              {subtotal < 1500 && (
                <div className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg font-medium">
                  Add ₹{(1500 - subtotal).toLocaleString('en-IN')} more for FREE AgroExpress delivery!
                </div>
              )}

              <div className="pt-3 border-t border-earth-100 flex justify-between items-baseline text-sm">
                <span className="font-extrabold text-slate-900">Final Total</span>
                <span className="text-2xl font-black text-forest-800">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="pt-2 border-t border-earth-100 space-y-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon: KISAN10 or HARVEST15"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-8 pr-3 py-2 text-xs uppercase outline-none focus:border-forest-600"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="bg-forest-700 hover:bg-forest-800 text-white px-3 py-2 rounded-xl text-xs font-bold"
                >
                  Apply
                </button>
              </form>

              {couponFeedback && (
                <div
                  className={`text-[11px] p-2 rounded-lg font-semibold flex items-center justify-between ${
                    couponFeedback.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  <span>{couponFeedback.message}</span>
                  {couponCode && (
                    <button onClick={removeCoupon} className="text-rose-600 font-bold hover:underline">
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm py-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
