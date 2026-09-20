import React, { useState } from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { useCart } from '../context/CartContext';
import { OrderStatusBadge } from '../components/common/Badge';
import { OrderStatus } from '../types';
import {
  ShoppingBag,
  Truck,
  Download,
  RotateCcw,
  Star,
  ChevronRight,
  MapPin,
  Calendar,
} from 'lucide-react';

interface OrdersProps {
  navigate: (path: string) => void;
}

export const Orders: React.FC<OrdersProps> = ({ navigate }) => {
  const { orders } = useAgriData();
  const { addToCart } = useCart();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'ALL') return true;
    return o.status === filterStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            My Buyer Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track farm-direct shipments, manage escrow releases, and view invoices
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'PENDING', 'CONFIRMED', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === status
                  ? 'bg-forest-700 text-white shadow-xs'
                  : 'bg-earth-100 text-slate-600 hover:bg-earth-200'
              }`}
            >
              {status === 'ALL' ? 'All Orders' : status.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-earth-200 p-6 shadow-soft space-y-4 hover:border-forest-400 transition-colors"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-earth-100 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-sm text-slate-900">
                    Order #{order.orderNumber}
                  </span>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-[11px]">
                  <span>Placed: {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span>Total: <strong className="text-slate-900 font-bold text-xs">₹{order.totalAmount.toLocaleString('en-IN')}</strong></span>
                </div>
              </div>

              {/* Items in Order */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-earth-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 truncate">{item.productName}</h4>
                        <p className="text-slate-500">{item.quantity} {item.unit} • ₹{item.unitPrice}/{item.unit}</p>
                      </div>
                      <span className="font-bold text-slate-900">₹{item.totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                {/* Farmer & Delivery Info */}
                <div className="bg-earth-50/70 p-4 rounded-2xl text-xs space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Farmer: {order.farmerName}</span>
                      <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded">
                        {order.paymentStatus.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-slate-500">{order.farmerLocation}</p>
                    <p className="text-slate-600 font-medium">Est. Delivery: {order.estimatedDelivery}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-earth-200">
                    <button
                      onClick={() => navigate(`/tracking/${order.id}`)}
                      className="flex-1 bg-forest-700 hover:bg-forest-800 text-white font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Shipment</span>
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="p-2 rounded-xl bg-white border border-earth-200 text-slate-700 hover:bg-earth-100"
                      title="Download Invoice"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-earth-200">
          No orders found for the selected status filter.
        </div>
      )}
    </div>
  );
};
