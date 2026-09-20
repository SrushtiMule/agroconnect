import React from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { DeliveryTrackerMap } from '../components/maps/DeliveryTrackerMap';
import { OrderStatusBadge } from '../components/common/Badge';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Download,
  ArrowLeft,
  ChevronRight,
  Package,
  Sparkles,
} from 'lucide-react';

interface OrderTrackingProps {
  orderId: string;
  navigate: (path: string) => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId, navigate }) => {
  const { orders } = useAgriData();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth-200">
        <div className="space-y-1">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate('/')} className="hover:text-forest-700">Home</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button onClick={() => navigate('/orders')} className="hover:text-forest-700">Orders</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-semibold">{order.orderNumber}</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Live Order Tracking
            </h1>
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-earth-100 hover:bg-earth-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download Invoice (PDF)</span>
        </button>
      </div>

      {/* 5-Stage Visual Stepper Timeline */}
      <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900">Harvest-to-Doorstep Progress</h3>
          <span className="text-xs font-semibold text-forest-700">
            Estimated Delivery: {order.estimatedDelivery}
          </span>
        </div>

        {/* Stepper Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {order.timeline.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all relative ${
                step.current
                  ? 'bg-forest-900 text-white border-forest-900 shadow-md ring-2 ring-forest-600/30'
                  : step.completed
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                  : 'bg-earth-50 text-slate-400 border-earth-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black">0{idx + 1}</span>
                {step.completed ? (
                  <CheckCircle2 className={`w-4 h-4 ${step.current ? 'text-emerald-400' : 'text-emerald-600'}`} />
                ) : (
                  <Clock className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <h4 className="font-bold text-xs">{step.title}</h4>
              <p className={`text-[11px] mt-1 leading-tight ${step.current ? 'text-slate-300' : 'text-slate-500'}`}>
                {step.description}
              </p>
              <span className={`text-[10px] mt-2 block font-medium ${step.current ? 'text-emerald-300' : 'text-slate-400'}`}>
                {step.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Map & Driver Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Map */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-forest-700" />
              <span>AgroExpress Satellite GPS Route</span>
            </h3>
            <DeliveryTrackerMap order={order} />

            {/* Route Milestones */}
            {order.tracking && (
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Transit Milestones
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {order.tracking.routeSteps.slice(0, 3).map((step, i) => (
                    <div key={i} className="p-2.5 bg-earth-50 rounded-xl border border-earth-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span className="text-slate-700 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Driver & Order Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Driver Card */}
          <div className="bg-forest-900 text-white rounded-3xl p-6 space-y-4 shadow-lg border border-forest-800">
            <div className="flex items-center gap-3 pb-3 border-b border-forest-800">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
                🚚
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">
                  {order.tracking?.driverName || 'Santosh Shinde'}
                </h4>
                <p className="text-xs text-emerald-300">AgroExpress Logistics Partner</p>
                <p className="text-[11px] text-slate-400">{order.tracking?.vehicleNumber || 'MH-15-EG-4921'}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <a
                href={`tel:${order.tracking?.driverPhone || '+919822144556'}`}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Driver ({order.tracking?.driverPhone || '+91 98221 44556'})</span>
              </a>

              <button
                onClick={() => navigate('/messages')}
                className="w-full bg-forest-800 hover:bg-forest-700 text-white font-bold py-2.5 rounded-xl transition-colors text-center block"
              >
                Message Farmer ({order.farmerName})
              </button>
            </div>
          </div>

          {/* Order Summary & Destination */}
          <div className="bg-white rounded-3xl border border-earth-200 p-6 space-y-4 shadow-soft text-xs">
            <h4 className="font-bold text-slate-900 text-sm pb-2 border-b border-earth-100">
              Order #{order.orderNumber} Details
            </h4>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img src={item.productImage} alt={item.productName} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{item.productName}</p>
                    <p className="text-slate-500">{item.quantity} {item.unit} × ₹{item.unitPrice}</p>
                  </div>
                  <span className="font-bold text-slate-900">₹{item.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-earth-100 space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery:</span>
                <span>₹{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Discount:</span>
                <span>-₹{order.discountAmount}</span>
              </div>
              <div className="pt-1 flex justify-between font-extrabold text-sm text-forest-800">
                <span>Total Amount:</span>
                <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-earth-100 space-y-1">
              <span className="font-bold text-slate-800 block">Delivery Address:</span>
              <p className="text-slate-600 leading-relaxed">
                {order.deliveryAddress.fullName}, {order.deliveryAddress.streetAddress}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
