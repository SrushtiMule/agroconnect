import React, { useState } from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import { VerifiedFarmerBadge } from '../../components/common/Badge';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  MapPin,
  Building,
  User,
  ExternalLink,
  Eye,
  AlertCircle,
  X,
} from 'lucide-react';

interface AdminVerificationProps {
  navigate: (path: string) => void;
}

export const AdminVerification: React.FC<AdminVerificationProps> = ({ navigate }) => {
  const { farmers, verifyFarmer } = useAgriData();
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; url: string; farmer: string } | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleApprove = (farmerId: string, farmerName: string) => {
    verifyFarmer(farmerId, 'VERIFIED', 'Government land records & KYC documents approved by operations.');
    setActionFeedback(`Farmer "${farmerName}" has been successfully verified! Verified badge active.`);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleReject = (farmerId: string, farmerName: string) => {
    const reason = prompt(`Enter rejection reason for ${farmerName}:`, 'Incomplete land revenue 7/12 document extract.');
    if (reason) {
      verifyFarmer(farmerId, 'REJECTED', reason);
      setActionFeedback(`Farmer "${farmerName}" KYC marked as REJECTED.`);
      setTimeout(() => setActionFeedback(null), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-forest-700" />
            <span>Farmer KYC Verification Desk</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Validate 7/12 land revenue extracts, Aadhaar identities, and issue Verified Farmer badges
          </p>
        </div>
      </div>

      {actionFeedback && (
        <div className="p-3.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Verification Queue */}
      <div className="space-y-6">
        {farmers.map((farmer) => (
          <div
            key={farmer.id}
            className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-soft space-y-6"
          >
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth-100">
              <div className="flex items-center gap-4">
                <img
                  src={farmer.avatarUrl}
                  alt={farmer.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{farmer.name}</h3>
                    {farmer.isVerified ? (
                      <VerifiedFarmerBadge size="sm" />
                    ) : (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ⏳ {farmer.verificationStatus}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-forest-700">{farmer.farmName}</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-forest-600" />
                    <span>{farmer.village}, {farmer.district}, {farmer.state} ({farmer.pincode})</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleApprove(farmer.id, farmer.name)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Verify</span>
                </button>

                <button
                  onClick={() => handleReject(farmer.id, farmer.name)}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-rose-200 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>

            {/* Farm & KYC Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-earth-50 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Farm Profile
                </span>
                <p className="font-bold text-slate-900">{farmer.farmSizeAcres} Acres Holding</p>
                <p className="text-slate-600">{farmer.experienceYears} Years Farming Exp.</p>
                <p className="text-slate-500 text-[11px]">Type: {farmer.farmingType}</p>
              </div>

              <div className="bg-earth-50 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Bank & Settlement Details
                </span>
                <p className="font-bold text-slate-900">{farmer.bankDetails?.bankName || 'State Bank of India'}</p>
                <p className="text-slate-600">A/C: {farmer.bankDetails?.accountNumber || '••••••••8912'}</p>
                <p className="text-slate-500 text-[11px]">IFSC: {farmer.bankDetails?.ifscCode || 'SBIN0001234'}</p>
              </div>

              <div className="bg-earth-50 p-4 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Uploaded Documents
                </span>
                <div className="space-y-1.5">
                  <button
                    onClick={() =>
                      setSelectedDoc({
                        title: '7/12 Land Revenue Extract',
                        url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
                        farmer: farmer.name,
                      })
                    }
                    className="w-full bg-white hover:bg-forest-50 p-2 rounded-xl border border-earth-200 flex items-center justify-between text-slate-800 text-[11px] font-semibold transition-colors"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <FileText className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                      <span className="truncate">7_12_Extract_Niphad.pdf</span>
                    </span>
                    <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>

                  <button
                    onClick={() =>
                      setSelectedDoc({
                        title: 'Aadhaar Card Front & Back',
                        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
                        farmer: farmer.name,
                      })
                    }
                    className="w-full bg-white hover:bg-forest-50 p-2 rounded-xl border border-earth-200 flex items-center justify-between text-slate-800 text-[11px] font-semibold transition-colors"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <FileText className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                      <span className="truncate">Aadhaar_KYC.pdf</span>
                    </span>
                    <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-earth-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedDoc.title}</h3>
                <span className="text-xs text-slate-500">Submitted by {selectedDoc.farmer}</span>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="p-2 rounded-lg text-slate-400 hover:bg-earth-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-4/3 w-full rounded-2xl overflow-hidden bg-earth-50 border border-earth-200">
              <img src={selectedDoc.url} alt="Document Preview" className="w-full h-full object-cover" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="bg-forest-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
