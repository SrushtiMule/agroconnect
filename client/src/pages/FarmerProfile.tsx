import React, { useState } from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { VerifiedFarmerBadge, OrganicBadge } from '../components/common/Badge';
import { RatingStars } from '../components/common/RatingStars';
import { ProductCard } from '../components/marketplace/ProductCard';
import {
  MapPin,
  Calendar,
  Sprout,
  MessageSquare,
  Award,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Heart,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface FarmerProfileProps {
  farmerId: string;
  navigate: (path: string) => void;
}

export const FarmerProfile: React.FC<FarmerProfileProps> = ({ farmerId, navigate }) => {
  const { farmers, products, reviews, sendChatMessage } = useAgriData();

  const farmer = farmers.find((f) => f.id === farmerId) || farmers[0];
  const farmerProducts = products.filter((p) => p.farmerId === farmer.id);
  const farmerReviews = reviews.filter((r) => r.farmerId === farmer.id);

  const [activeTab, setActiveTab] = useState<'PRODUCTS' | 'STORY' | 'REVIEWS' | 'CERTIFICATES'>('PRODUCTS');
  const [isFollowing, setIsFollowing] = useState(false);

  const handleMessageFarmer = () => {
    sendChatMessage({
      receiverId: farmer.userId,
      messageText: `Namaste ${farmer.name}, I am visiting your AgroConnect farm profile and would like to learn more about your available harvest.`,
    });
    navigate('/messages');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => navigate('/')} className="hover:text-forest-700">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigate('/farmers')} className="hover:text-forest-700">Farmers</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold">{farmer.name}</span>
      </nav>

      {/* Hero Farm Banner & Profile Overview */}
      <div className="bg-white rounded-3xl border border-earth-200 overflow-hidden shadow-soft">
        {/* Cover Photo */}
        <div className="relative h-48 sm:h-64 w-full bg-forest-900">
          <img
            src={farmer.coverImage || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80'}
            alt="Farm Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Profile Card Overlay */}
        <div className="px-6 sm:px-10 pb-8 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
              <img
                src={farmer.avatarUrl}
                alt={farmer.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-white shadow-xl ring-2 ring-forest-600/30"
              />
              <div className="space-y-1 text-slate-900">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black">{farmer.name}</h1>
                  {farmer.isVerified && <VerifiedFarmerBadge size="md" />}
                </div>
                <p className="text-sm font-bold text-forest-700">{farmer.farmName}</p>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-forest-600" />
                  <span>{farmer.village}, {farmer.district}, {farmer.state} ({farmer.pincode})</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  isFollowing
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-earth-100 hover:bg-earth-200 text-slate-800'
                }`}
              >
                {isFollowing ? '✓ Following Farm' : '+ Follow Farmer'}
              </button>

              <button
                onClick={handleMessageFarmer}
                className="flex items-center gap-1.5 bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Farmer</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-earth-100 text-center">
            <div className="p-3 bg-earth-50 rounded-2xl">
              <span className="text-[11px] text-slate-400 block font-medium">Farm Holding</span>
              <span className="text-base font-extrabold text-slate-900">{farmer.farmSizeAcres} Acres</span>
            </div>
            <div className="p-3 bg-earth-50 rounded-2xl">
              <span className="text-[11px] text-slate-400 block font-medium">Experience</span>
              <span className="text-base font-extrabold text-slate-900">{farmer.experienceYears} Years</span>
            </div>
            <div className="p-3 bg-earth-50 rounded-2xl">
              <span className="text-[11px] text-slate-400 block font-medium">Farmer Rating</span>
              <span className="text-base font-extrabold text-emerald-700">⭐ {farmer.ratingAvg}</span>
            </div>
            <div className="p-3 bg-earth-50 rounded-2xl">
              <span className="text-[11px] text-slate-400 block font-medium">Fulfilled Orders</span>
              <span className="text-base font-extrabold text-slate-900">{farmer.totalOrdersFulfilled}+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-earth-200 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'PRODUCTS', label: `Listed Produce (${farmerProducts.length})` },
          { id: 'STORY', label: 'Farm Story & Soil Practices' },
          { id: 'REVIEWS', label: `Customer Reviews (${farmerReviews.length})` },
          { id: 'CERTIFICATES', label: 'Certificates & KYC' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-forest-700 text-forest-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'PRODUCTS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Fresh Produce Listed by {farmer.name}
            </h3>
            <span className="text-xs text-slate-500">
              All produce is freshly harvested directly from {farmer.farmName}
            </span>
          </div>

          {farmerProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} navigate={navigate} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-earth-200">
              No crops currently listed. Check back soon for the next harvest!
            </div>
          )}
        </div>
      )}

      {activeTab === 'STORY' && (
        <div className="bg-white rounded-3xl border border-earth-200 p-8 space-y-6 shadow-soft">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">About {farmer.farmName}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{farmer.bio}</p>
          </div>

          <div className="pt-6 border-t border-earth-100 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Ecological Farming Methods
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-forest-50 p-4 rounded-2xl border border-forest-100 space-y-1">
                <span className="font-bold text-forest-900 flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-forest-700" />
                  <span>Jeevamrutha Soil Treatment</span>
                </span>
                <p className="text-slate-600">
                  Enriched with native desi cow dung, urine, and organic jaggery cultures every 14 days.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Precision Drip Fertigation</span>
                </span>
                <p className="text-slate-600">
                  Pressure-compensated inline drippers save 50% groundwater and nourish root systems.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 space-y-1">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Zero Synthetic Residue</span>
                </span>
                <p className="text-slate-600">
                  Biological pest management utilizing Neem oil sprays and pheromone sticky traps.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'REVIEWS' && (
        <div className="bg-white rounded-3xl border border-earth-200 p-8 space-y-6 shadow-soft">
          <h3 className="text-xl font-bold text-slate-900">Verified Customer Testimonials</h3>
          <div className="space-y-4 divide-y divide-earth-100">
            {farmerReviews.length > 0 ? (
              farmerReviews.map((rev) => (
                <div key={rev.id} className="pt-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={rev.userAvatar} alt={rev.userName} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <span className="font-bold text-slate-900">{rev.userName}</span>
                        {rev.verifiedPurchase && (
                          <span className="ml-2 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                            ✓ Verified Buyer
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
              <p className="text-xs text-slate-400 py-4">No reviews recorded yet.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'CERTIFICATES' && (
        <div className="bg-white rounded-3xl border border-earth-200 p-8 space-y-6 shadow-soft">
          <h3 className="text-xl font-bold text-slate-900">Verified Credentials & Land Records</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-earth-50 border border-earth-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">7/12 Land Revenue Record</span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                  ✓ VERIFIED
                </span>
              </div>
              <p className="text-slate-500">Government revenue land title verified for {farmer.farmSizeAcres} acres in {farmer.village}.</p>
            </div>

            <div className="p-4 rounded-2xl bg-earth-50 border border-earth-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">NPOP Organic Certification</span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                  ✓ CERTIFIED
                </span>
              </div>
              <p className="text-slate-500">National Programme for Organic Production accreditation certificate #IN-ORG-2024-891.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
