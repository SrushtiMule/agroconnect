import React, { useState } from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { useAuth } from '../context/AuthContext';
import {
  Send,
  User,
  ShoppingBag,
  Sparkles,
  Tag,
  Paperclip,
  Check,
  CheckCheck,
  Phone,
  ShieldCheck,
  Smile,
} from 'lucide-react';

interface MessagesProps {
  navigate: (path: string) => void;
}

export const Messages: React.FC<MessagesProps> = ({ navigate }) => {
  const { chatMessages, sendChatMessage, farmers, products } = useAgriData();
  const { currentUser } = useAuth();

  const [inputMsg, setInputMsg] = useState('');
  const [selectedFarmerId, setSelectedFarmerId] = useState(farmers[0].id);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerQty, setOfferQty] = useState(50);
  const [offerPrice, setOfferPrice] = useState(26);

  const activeFarmer = farmers.find((f) => f.id === selectedFarmerId) || farmers[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMsg.trim()) {
      sendChatMessage({
        receiverId: activeFarmer.userId,
        messageText: inputMsg.trim(),
      });
      setInputMsg('');
    }
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    sendChatMessage({
      receiverId: activeFarmer.userId,
      messageText: `I would like to propose a bulk quote of ₹${offerPrice}/KG for ${offerQty} KG. Please review and confirm.`,
      offerData: {
        originalPrice: 28,
        offerPrice,
        quantity: offerQty,
        status: 'PENDING',
      },
    });
    setShowOfferModal(false);
  };

  const quickReplies = [
    'Is this batch freshly harvested today?',
    'What is the shelf life under room temperature?',
    'Can you arrange 100kg bulk delivery to Pune/Mumbai?',
    'Do you have NPOP Organic Certification?',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-20">
      <div className="flex items-center justify-between pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Farmer-Buyer Direct Chat
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct real-time negotiations, price quotes, and harvest inquiries with certified farmers
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-earth-200 shadow-soft overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* Left: Farmers / Conversations List (4 Cols) */}
        <div className="lg:col-span-4 border-r border-earth-200 bg-earth-50/50 flex flex-col">
          <div className="p-4 border-b border-earth-200">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-400 block">
              Active Conversations
            </span>
          </div>

          <div className="divide-y divide-earth-100 overflow-y-auto flex-1">
            {farmers.slice(0, 4).map((f) => {
              const isActive = f.id === activeFarmer.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setSelectedFarmerId(f.id)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                    isActive ? 'bg-white font-bold border-l-4 border-l-forest-700 shadow-2xs' : 'hover:bg-earth-100'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={f.avatarUrl}
                      alt={f.name}
                      className="w-11 h-11 rounded-2xl object-cover border border-emerald-300"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 truncate">{f.name}</h4>
                      <span className="text-[10px] text-slate-400">Online</span>
                    </div>
                    <p className="text-forest-700 font-medium text-[11px] truncate">{f.farmName}</p>
                    <p className="text-slate-400 text-[10px] truncate mt-0.5">
                      {f.district}, {f.state}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Window (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-earth-200 flex items-center justify-between bg-earth-50/30">
            <div className="flex items-center gap-3">
              <img
                src={activeFarmer.avatarUrl}
                alt={activeFarmer.name}
                className="w-10 h-10 rounded-2xl object-cover border border-emerald-300"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900">{activeFarmer.name}</h3>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeFarmer.farmName} • Verified Farmer</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOfferModal(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Make Price Offer</span>
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-earth-50/20 max-h-[420px]">
            {chatMessages.map((msg) => {
              const isMe = msg.senderRole === 'BUYER';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-600">{msg.senderName}</span>
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                      isMe
                        ? 'bg-forest-800 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-earth-200 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    <p>{msg.messageText}</p>

                    {/* Product Share Card */}
                    {msg.productCard && (
                      <div
                        onClick={() => navigate(`/product/${msg.productCard?.id}`)}
                        className={`mt-2 p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer ${
                          isMe ? 'bg-forest-900/60 border-forest-700 text-white' : 'bg-earth-50 border-earth-200 text-slate-900'
                        }`}
                      >
                        <img
                          src={msg.productCard.image}
                          alt={msg.productCard.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold truncate">{msg.productCard.name}</p>
                          <p className="font-extrabold text-amber-300">
                            ₹{msg.productCard.price} / {msg.productCard.unit}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Counter Offer Card */}
                    {msg.offerData && (
                      <div
                        className={`mt-2 p-3 rounded-xl border space-y-1 ${
                          isMe ? 'bg-forest-900 border-forest-700' : 'bg-amber-50 border-amber-200 text-slate-900'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between text-[11px]">
                          <span>Proposed Bulk Price Offer</span>
                          <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">
                            {msg.offerData.status}
                          </span>
                        </div>
                        <p className="text-[11px]">
                          Quantity: <strong>{msg.offerData.quantity} KG</strong> • Proposed Rate: <strong>₹{msg.offerData.offerPrice}/KG</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Reply Chips */}
          <div className="px-4 py-2 bg-earth-50/60 border-t border-earth-200 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-400 font-semibold shrink-0">Quick Reply:</span>
            {quickReplies.map((qr, i) => (
              <button
                key={i}
                onClick={() => setInputMsg(qr)}
                className="bg-white hover:bg-earth-100 border border-earth-200 px-3 py-1 rounded-full whitespace-nowrap text-slate-700 transition-colors shrink-0"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-earth-200 flex items-center gap-3">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={`Type message or wholesale inquiry to ${activeFarmer.name}...`}
              className="flex-1 bg-earth-50 border border-earth-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-forest-600 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              className="bg-forest-700 hover:bg-forest-800 text-white p-3 rounded-2xl transition-all shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Offer Negotiation Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900">Make a Direct Price Offer</h3>
            <p className="text-xs text-slate-500">
              Negotiate bulk tiered pricing with {activeFarmer.name} directly.
            </p>

            <form onSubmit={handleSendOffer} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Quantity (KG / Quintal)</label>
                <input
                  type="number"
                  required
                  value={offerQty}
                  onChange={(e) => setOfferQty(Number(e.target.value))}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 outline-none focus:border-forest-600 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Proposed Rate per Unit (₹)</label>
                <input
                  type="number"
                  required
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 outline-none focus:border-forest-600 font-bold text-slate-900"
                />
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200">
                <span>Calculated Total Offer: <strong>₹{(offerQty * offerPrice).toLocaleString('en-IN')}</strong></span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 bg-earth-100 text-slate-700 py-2.5 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-forest-700 text-white py-2.5 rounded-xl font-bold"
                >
                  Send Price Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
