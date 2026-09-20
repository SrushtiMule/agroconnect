import React, { useState } from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { useAuth } from '../context/AuthContext';
import {
  Sprout,
  User,
  MapPin,
  ShieldCheck,
  Building,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileText,
} from 'lucide-react';

interface FarmerRegistrationProps {
  navigate: (path: string) => void;
}

export const FarmerRegistration: React.FC<FarmerRegistrationProps> = ({ navigate }) => {
  const { addFarmer } = useAgriData();
  const { switchRole } = useAuth();

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: '',
    mobileNumber: '',
    email: '',
    dob: '',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
    // Step 2: Farm
    farmName: '',
    village: '',
    district: '',
    state: 'Maharashtra',
    pincode: '',
    farmSizeAcres: 10,
    landType: 'Drip Irrigated Black Cotton Soil',
    // Step 3: Verification & Bank
    aadhaarNumber: '',
    farmerIdCard: '',
    bankName: 'State Bank of India',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
    documentUploaded: true,
    // Step 4: Agri Profile
    mainCrops: 'Onions, Tomatoes, Wheat, Sugarcane',
    farmingType: 'ORGANIC' as const,
    organicCert: 'PGS-India Organic / Zero Chemical',
    experienceYears: 12,
    bio: 'Dedicated progressive kisan focused on sustainable soil biology and chemical-free produce.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit new farmer profile
      const newFarmer = addFarmer({
        name: formData.fullName || 'Rameshwar Patil',
        farmName: formData.farmName || 'Patil Bio Farm',
        farmSizeAcres: Number(formData.farmSizeAcres) || 10,
        experienceYears: Number(formData.experienceYears) || 10,
        farmingType: formData.farmingType,
        bio: formData.bio,
        avatarUrl: formData.avatarUrl,
        state: formData.state,
        district: formData.district || 'Nashik',
        village: formData.village || 'Niphad',
        pincode: formData.pincode || '422303',
        topCrops: formData.mainCrops.split(',').map((c) => c.trim()),
      });

      // Switch role to farmer
      switchRole('FARMER');
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-soft">
          🌱
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
          KYC Application Submitted
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Your Farmer Profile is Under Verification
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for registering with AgroConnect! Our field inspection team will verify your 7/12 land record within 24 hours. In the meantime, you can access your Farmer Dashboard and prepare your crop listings.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate('/farmer/dashboard')}
            className="w-full sm:w-auto bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md"
          >
            Go to Farmer Dashboard
          </button>
          <button
            onClick={() => navigate('/admin/verification')}
            className="w-full sm:w-auto bg-earth-100 hover:bg-earth-200 text-slate-800 font-bold text-xs px-6 py-3.5 rounded-xl"
          >
            Inspect in Admin Verification Desk
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { num: '01', title: 'Personal', desc: 'Identity & Contacts' },
    { num: '02', title: 'Farm', desc: 'Location & Acreage' },
    { num: '03', title: 'Verification', desc: 'KYC & Bank IFSC' },
    { num: '04', title: 'Agriculture', desc: 'Crops & Experience' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-20">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Farmer Onboarding Portal
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Register as an AgroConnect Farmer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Join 10,000+ certified farmers. Eliminate commission agents and sell directly to verified retail and wholesale buyers.
        </p>
      </div>

      {/* 4-Step Progress Indicator */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 pb-4">
        {steps.map((s, idx) => {
          const stepNum = idx + 1;
          const isCurrent = step === stepNum;
          const isDone = step > stepNum;

          return (
            <div
              key={s.num}
              className={`p-3 rounded-2xl border text-center transition-all ${
                isCurrent
                  ? 'bg-forest-900 text-white border-forest-900 shadow-sm'
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

      {/* Multi-Step Form */}
      <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-10 shadow-soft">
        <form onSubmit={handleNext} className="space-y-6">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-earth-100 flex items-center gap-2">
                <User className="w-5 h-5 text-forest-700" />
                <span>Step 1: Personal & Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Full Name (As on Aadhaar)</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rameshwar D. Patil"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Mobile Number (WhatsApp Enabled)</label>
                  <input
                    type="tel"
                    required
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="+91 98234 56789"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="farmer.patil@gmail.com"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Date of Birth</label>
                  <input
                    type="date"
                    required
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Farm Details */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-earth-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-forest-700" />
                <span>Step 2: Farm Location & Holding Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700">Farm / Estate Name</label>
                  <input
                    type="text"
                    required
                    name="farmName"
                    value={formData.farmName}
                    onChange={handleChange}
                    placeholder="e.g. Patil Godavari Organic Agro Farms"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Village / Town</label>
                  <input
                    type="text"
                    required
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    placeholder="e.g. Niphad"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">District</label>
                  <input
                    type="text"
                    required
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="e.g. Nashik"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 font-medium"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Pincode</label>
                  <input
                    type="text"
                    required
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="422303"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Farm Holding Size (Acres)</label>
                  <input
                    type="number"
                    required
                    name="farmSizeAcres"
                    value={formData.farmSizeAcres}
                    onChange={handleChange}
                    placeholder="15"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Soil & Irrigation Type</label>
                  <input
                    type="text"
                    name="landType"
                    value={formData.landType}
                    onChange={handleChange}
                    placeholder="Drip Irrigated / Borewell / Canal"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Verification & Banking */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-earth-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-forest-700" />
                <span>Step 3: Identity Verification & Bank Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Aadhaar Card Number (Masked)</label>
                  <input
                    type="text"
                    required
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleChange}
                    placeholder="XXXX-XXXX-8912"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">PM-KISAN / State Farmer ID</label>
                  <input
                    type="text"
                    name="farmerIdCard"
                    value={formData.farmerIdCard}
                    onChange={handleChange}
                    placeholder="MH-NSK-2024-8910"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Bank Name for Escrow Settlements</label>
                  <input
                    type="text"
                    required
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="State Bank of India"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Bank Account Number</label>
                  <input
                    type="text"
                    required
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="30918273645"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">IFSC Code</label>
                  <input
                    type="text"
                    required
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    placeholder="SBIN0001234"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">UPI ID for Quick Payouts</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="patilfarm@sbi"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                {/* Upload Land Record Dropzone */}
                <div className="sm:col-span-2 border-2 border-dashed border-earth-300 rounded-2xl p-4 text-center bg-earth-50/50 space-y-1">
                  <Upload className="w-6 h-6 text-forest-700 mx-auto" />
                  <span className="font-bold text-slate-800 block text-xs">
                    Upload 7/12 Land Revenue Extract or Kisan Credit Card
                  </span>
                  <span className="text-[10px] text-slate-400 block">PDF, PNG, JPG up to 10MB</span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 7_12_Extract_Niphad_Farm.pdf (Uploaded)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Agriculture Profile */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-earth-100 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-forest-700" />
                <span>Step 4: Crops, Experience & Organic Profile</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700">Primary Crops Harvested (Comma separated)</label>
                  <input
                    type="text"
                    required
                    name="mainCrops"
                    value={formData.mainCrops}
                    onChange={handleChange}
                    placeholder="e.g. Red Onions, Sharbati Wheat, Pomegranates, Chillies"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Farming Method</label>
                  <select
                    name="farmingType"
                    value={formData.farmingType}
                    onChange={handleChange}
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 font-medium"
                  >
                    <option value="ORGANIC">100% Certified Organic</option>
                    <option value="NATURAL">Zero Budget Natural Farming (ZBNF)</option>
                    <option value="CONVENTIONAL">Conventional High-Yield</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Years of Farming Experience</label>
                  <input
                    type="number"
                    required
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    placeholder="15"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700">Farm Story & Soil Practice Note</label>
                  <textarea
                    rows={3}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Describe your soil preparation, Jeevamrutha enrichment, or pesticide-free commitment..."
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-earth-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
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
              <span>{step === 4 ? 'Submit Farmer Profile for Verification' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
