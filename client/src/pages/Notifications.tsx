import React, { useState } from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { Bell, CheckCheck, Trash2, ArrowRight, Clock, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

interface NotificationsProps {
  navigate: (path: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ navigate }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useAgriData();
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === 'ALL') return true;
    return n.type === filterType;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <Bell className="w-7 h-7 text-forest-700" />
            <span>Notification Center</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time updates on orders, live mandi rates, escrow payouts, and farm KYC
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="flex items-center gap-1.5 text-xs text-forest-700 hover:text-forest-900 font-bold bg-forest-50 hover:bg-forest-100 px-3.5 py-2 rounded-xl transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
        {['ALL', 'ORDER', 'PRICE_ALERT', 'PAYMENT', 'VERIFICATION'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
              filterType === type
                ? 'bg-forest-700 text-white shadow-xs'
                : 'bg-white border border-earth-200 text-slate-600 hover:bg-earth-100'
            }`}
          >
            {type === 'ALL' ? 'All Alerts' : type.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-earth-200 divide-y divide-earth-100 overflow-hidden shadow-soft">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationAsRead(notif.id);
                if (notif.linkUrl) navigate(notif.linkUrl);
              }}
              className={`p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-earth-50 transition-colors ${
                !notif.isRead ? 'bg-forest-50/40' : ''
              }`}
            >
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{notif.title}</h4>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed">{notif.message}</p>
                <span className="text-[10px] text-slate-400 block pt-1">{notif.createdAt}</span>
              </div>

              {notif.linkUrl && (
                <div className="p-2 rounded-xl bg-white border border-earth-200 text-slate-400 hover:text-forest-700 shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400 text-xs">
            No notifications matching the selected category.
          </div>
        )}
      </div>
    </div>
  );
};
