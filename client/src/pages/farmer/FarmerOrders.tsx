import React, { useState } from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import { OrderStatusBadge } from '../../components/common/Badge';
import { OrderStatus } from '../../types';
import { ShoppingBag, Truck, CheckCircle2, Clock, Phone, MapPin } from 'lucide-react';

interface FarmerOrdersProps {
  navigate: (path: string) => void;
}

export const FarmerOrders: React.FC<FarmerOrdersProps> = ({ navigate }) => {
  const { orders, updateOrderStatus } = useAgriData();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'ALL') return true;
    return o.status === filterStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Incoming Produce Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Confirm harvests, pack produce crates, and dispatch via AgroExpress
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          {['ALL', 'PENDING', 'CONFIRMED', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-forest-700 text-white shadow-xs'
                  : 'bg-white border border-earth-200 text-slate-600 hover:bg-earth-100'
              }`}
            >
              {status === 'ALL' ? 'All Orders' : status.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-earth-100 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-sm text-slate-900">{order.orderNumber}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                <span>Buyer: <strong className="text-slate-900">{order.buyerName}</strong></span>
                <span>•</span>
                <span>Payout: <strong className="text-forest-800 text-xs">₹{order.totalAmount.toLocaleString('en-IN')} (Escrow)</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs items-center">
              {/* Item Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <img src={order.items[0]?.productImage} alt="Crop" className="w-14 h-14 rounded-2xl object-cover border" />
                  <div>
                    <h4 className="font-bold text-slate-900">{order.items[0]?.productName}</h4>
                    <p className="text-slate-500">{order.items[0]?.quantity} {order.items[0]?.unit} ordered</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1 text-slate-600">
                <span className="font-bold text-slate-800 block">Buyer Destination:</span>
                <p className="line-clamp-2">{order.deliveryAddress.streetAddress}, {order.deliveryAddress.city}</p>
                <span className="text-[11px] text-emerald-700 font-semibold block">{order.deliveryType.replace(/_/g, ' ')}</span>
              </div>

              {/* Status Updater */}
              <div className="space-y-2 bg-earth-50 p-4 rounded-2xl border border-earth-200">
                <label className="font-bold text-slate-800 block text-[11px]">
                  Harvest Progression Status:
                </label>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                  className="w-full bg-white border border-earth-300 rounded-xl p-2 text-xs font-bold text-slate-900 outline-none focus:border-forest-600"
                >
                  <option value="PENDING">01. Order Placed</option>
                  <option value="CONFIRMED">02. Confirm Harvest Batch</option>
                  <option value="PACKED">03. Packed in Crates</option>
                  <option value="OUT_FOR_DELIVERY">04. Dispatched on Van</option>
                  <option value="DELIVERED">05. Delivered & Settle</option>
                </select>
                <span className="text-[10px] text-slate-400 block">
                  Selecting status automatically notifies the buyer and triggers GPS milestone tracking.
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
