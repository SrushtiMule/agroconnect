import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAgriData } from '../context/AgriDataContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Truck,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Building,
} from 'lucide-react';

interface CheckoutProps {
  navigate: (path: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ navigate }) => {
  const { items, subtotal, discountAmount, deliveryFee, finalTotal, clearCart } = useCart();
  const { createOrder } = useAgriData();
  const { currentUser } = useAuth();

  const [checkoutStep, setCheckoutStep] = useState(1);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');
  const [createdOrderId, setCreatedOrderId] = useState('');

  // Address
  const [address, setAddress] = useState({
    fullName: currentUser?.name || 'Priya Sharma',
    phone: currentUser?.phone || '+91 97112 34567',
    streetAddress: 'Flat 402, Green Meadows, Baner-Pashan Link Road',
    landmark: 'Near Orchid School',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411045',
  });

  // Delivery Type
  const [deliveryType, setDeliveryType] = useState<'AGROEXPRESS_24H' | 'STANDARD_FREIGHT' | 'FARMER_DELIVERY'>('AGROEXPRESS_24H');

  // Payment Option
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CREDIT_DEBIT_CARD' | 'NET_BANKING' | 'CASH_ON_DELIVERY'>('UPI');
  const [upiVpa, setUpiVpa] = useState('priyasharma@okaxis');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutStep < 3) {
      setCheckoutStep(checkoutStep + 1);
    } else {
      // Create order
      const primaryItem = items[0]?.product;
      const order = createOrder({
        buyerId: currentUser?.id || 'user-buyer-1',
        buyerName: address.fullName,
        buyerPhone: address.phone,
        buyerEmail: currentUser?.email || 'priya.sharma@gmail.com',
        farmerId: primaryItem?.farmerId || 'farmer-1',
        farmerName: primaryItem?.farmerName || 'Rajesh Patil',
        farmerPhone: '+91 98234 56789',
        farmerLocation: `${primaryItem?.originDistrict || 'Nashik'}, ${primaryItem?.originState || 'Maharashtra'}`,
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          productImage: i.product.images[0],
          unit: i.product.unit,
          quantity: i.quantity,
          unitPrice: i.product.pricePerUnit,
          totalPrice: i.product.pricePerUnit * i.quantity,
        })),
        subtotal,
        deliveryFee,
        discountAmount,
        totalAmount: finalTotal,
        status: 'PENDING',
        paymentStatus: 'ESCROW_HELD',
        paymentMethod,
        deliveryAddress: {
          id: `addr-${Date.now()}`,
          fullName: address.fullName,
          phone: address.phone,
          streetAddress: address.streetAddress,
          landmark: address.landmark,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          isDefault: true,
          lat: 18.5590,
          lng: 73.7868,
        },
        deliveryType,
        estimatedDelivery: 'Tomorrow by 2:00 PM',
      });

      setCreatedOrderNumber(order.orderNumber);
      setCreatedOrderId(order.id);
      clearCart();

      // Launch Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#22c55e', '#f59e0b', '#10b981'],
      });

      setCheckoutStep(4);
    }
  };

  if (checkoutStep === 4) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-soft">
          🎉
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Payment Held Safely in Escrow
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Order Placed Successfully!
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Order <strong>#{createdOrderNumber}</strong> has been transmitted to the farm origin. The farmer is packing your freshly harvested crops.
        </p>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl border border-earth-200 p-6 text-left text-xs space-y-3 shadow-soft max-w-md mx-auto">
          <div className="flex justify-between border-b border-earth-100 pb-2">
            <span className="text-slate-500">Order Number:</span>
            <span className="font-bold text-slate-900">{createdOrderNumber}</span>
          </div>
          <div className="flex justify-between border-b border-earth-100 pb-2">
            <span className="text-slate-500">Total Paid (Escrow):</span>
            <span className="font-extrabold text-forest-800 text-sm">₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between border-b border-earth-100 pb-2">
            <span className="text-slate-500">Estimated Delivery:</span>
            <span className="font-semibold text-emerald-700">Tomorrow by 2:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Delivery Address:</span>
            <span className="font-semibold text-slate-800 text-right max-w-[200px] truncate">
              {address.streetAddress}, {address.city}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate(`/tracking/${createdOrderId}`)}
            className="w-full sm:w-auto bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track Live Delivery on Map</span>
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="w-full sm:w-auto bg-earth-100 hover:bg-earth-200 text-slate-800 font-bold text-xs px-6 py-3.5 rounded-xl"
          >
            View All Orders
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { num: '01', title: 'Delivery Address' },
    { num: '02', title: 'Shipping Method' },
    { num: '03', title: 'Payment & Escrow' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-20">
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          AgroConnect Direct Checkout
        </h1>
        <p className="text-xs text-slate-500">100% Escrow buyer protection on all farm orders</p>
      </div>

      {/* Stepper */}
      <div className="grid grid-cols-3 gap-3">
        {steps.map((s, idx) => {
          const stepNum = idx + 1;
          const isCurrent = checkoutStep === stepNum;
          const isDone = checkoutStep > stepNum;

          return (
            <div
              key={s.num}
              className={`p-3 rounded-2xl border text-center transition-all ${
                isCurrent
                  ? 'bg-forest-900 text-white border-forest-900 shadow-xs'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-white text-slate-400 border-earth-200'
              }`}
            >
              <div className="text-xs font-black">{s.num}</div>
              <div className="text-xs font-bold truncate">{s.title}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft">
          <form onSubmit={handleNext} className="space-y-6">
            {/* Step 1: Address */}
            {checkoutStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-earth-100 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-forest-700" />
                  <span>Step 1: Enter Delivery Destination</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Recipient Name / Business</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Contact Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-slate-700">Street Address / Society / Warehouse</label>
                    <input
                      type="text"
                      required
                      value={address.streetAddress}
                      onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                      className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Landmark</label>
                    <input
                      type="text"
                      value={address.landmark}
                      onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                      className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">City / District</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">State</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Pincode</label>
                    <input
                      type="text"
                      required
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Option */}
            {checkoutStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-earth-100 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-forest-700" />
                  <span>Step 2: Choose Agri-Logistics Speed</span>
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      id: 'AGROEXPRESS_24H',
                      name: 'AgroExpress 24H (Temperature Controlled)',
                      desc: 'Refrigerated van pickup at farm gate within 4 hours. Optimal for vegetables, berries & fresh fruits.',
                      price: 'Included (₹75 or FREE on ₹1500+)',
                    },
                    {
                      id: 'STANDARD_FREIGHT',
                      name: 'Heavy Freight Agro-Cargo',
                      desc: 'Best for bulk grain bags (Quintals & Tons), pulses and cash crops.',
                      price: 'Standard Freight Rate',
                    },
                    {
                      id: 'FARMER_DELIVERY',
                      name: 'Farmer Direct Local Delivery',
                      desc: 'Farmer transports directly to nearby mandi or buyer warehouse.',
                      price: 'Local Transit',
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setDeliveryType(method.id as any)}
                      className={`p-4 rounded-2xl border flex items-start gap-4 cursor-pointer transition-all ${
                        deliveryType === method.id
                          ? 'bg-forest-50/70 border-forest-600 ring-2 ring-forest-600/20 shadow-xs'
                          : 'bg-white border-earth-200 hover:bg-earth-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryType"
                        checked={deliveryType === method.id}
                        onChange={() => setDeliveryType(method.id as any)}
                        className="mt-1 accent-forest-700"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm">{method.name}</span>
                          <span className="font-semibold text-emerald-700">{method.price}</span>
                        </div>
                        <p className="text-slate-500 mt-0.5 leading-relaxed">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {checkoutStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-earth-100 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-forest-700" />
                  <span>Step 3: Escrow Payment Method</span>
                </h3>

                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'UPI' ? 'bg-forest-50/70 border-forest-600' : 'bg-white border-earth-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="mt-1 accent-forest-700"
                    />
                    <div className="flex-1 text-xs space-y-2">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-emerald-600" />
                        <span>Instant UPI (GPay / PhonePe / Paytm / BHIM)</span>
                      </div>
                      <p className="text-slate-500">Scan QR or enter UPI VPA ID</p>
                      {paymentMethod === 'UPI' && (
                        <div className="pt-2">
                          <input
                            type="text"
                            value={upiVpa}
                            onChange={(e) => setUpiVpa(e.target.value)}
                            placeholder="yourname@okhdfcbank"
                            className="w-full bg-white border border-earth-300 rounded-xl p-2.5 text-xs outline-none focus:border-forest-600"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Cards */}
                  <label
                    onClick={() => setPaymentMethod('CREDIT_DEBIT_CARD')}
                    className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'CREDIT_DEBIT_CARD' ? 'bg-forest-50/70 border-forest-600' : 'bg-white border-earth-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'CREDIT_DEBIT_CARD'}
                      onChange={() => setPaymentMethod('CREDIT_DEBIT_CARD')}
                      className="mt-1 accent-forest-700"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-slate-900 text-sm">Credit / Debit Card (Visa, RuPay, MasterCard)</div>
                      <p className="text-slate-500">Protected with 3D Secure 256-bit encryption</p>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                    className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'CASH_ON_DELIVERY' ? 'bg-forest-50/70 border-forest-600' : 'bg-white border-earth-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'CASH_ON_DELIVERY'}
                      onChange={() => setPaymentMethod('CASH_ON_DELIVERY')}
                      className="mt-1 accent-forest-700"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-slate-900 text-sm">Pay on Delivery (Cash / QR at doorstep)</div>
                      <p className="text-slate-500">Inspect produce at your doorstep before handing payment to driver</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-earth-100">
              {checkoutStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCheckoutStep(checkoutStep - 1)}
                  className="flex items-center gap-1.5 bg-earth-100 hover:bg-earth-200 text-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                className="flex items-center gap-1.5 bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md ml-auto"
              >
                <span>{checkoutStep === 3 ? `Pay ₹${finalTotal.toLocaleString('en-IN')} & Secure Order` : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Mini Order Summary (4 Cols) */}
        <div className="lg:col-span-4 bg-earth-50/80 rounded-3xl border border-earth-200 p-6 space-y-4">
          <h4 className="font-bold text-slate-900 text-sm pb-2 border-b border-earth-200">
            Order Items ({items.length})
          </h4>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 text-xs">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 truncate">{item.product.name}</div>
                  <div className="text-slate-500 text-[11px]">{item.quantity} {item.product.unit}</div>
                </div>
                <div className="font-bold text-slate-900">
                  ₹{(item.product.pricePerUnit * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-earth-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount:</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>AgroExpress Logistics:</span>
              <span className="font-bold text-slate-900">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className="pt-2 border-t border-earth-200 flex justify-between font-extrabold text-sm text-forest-900">
              <span>Total Payable:</span>
              <span className="text-lg">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
