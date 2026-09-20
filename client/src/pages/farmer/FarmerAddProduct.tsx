import React, { useState } from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import { CATEGORIES } from '../../data/mockData';
import { ProductUnit, QualityGrade, FarmingType } from '../../types';
import {
  Upload,
  Sparkles,
  ArrowRight,
  Package,
  Leaf,
  DollarSign,
  Calendar,
  Truck,
  CheckCircle2,
} from 'lucide-react';

interface FarmerAddProductProps {
  navigate: (path: string) => void;
}

export const FarmerAddProduct: React.FC<FarmerAddProductProps> = ({ navigate }) => {
  const { addProduct, farmers } = useAgriData();
  const currentFarmer = farmers[0];

  const [formData, setFormData] = useState({
    name: '',
    categoryId: 'cat-veg',
    description: '',
    pricePerUnit: 35,
    unit: 'KG' as ProductUnit,
    availableQuantity: 500,
    minOrderQuantity: 10,
    qualityGrade: 'A_PLUS' as QualityGrade,
    farmingType: 'ORGANIC' as FarmingType,
    isOrganic: true,
    harvestDate: new Date().toISOString().split('T')[0],
    shelfLifeDays: 30,
    originState: currentFarmer.state,
    originDistrict: currentFarmer.district,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCat = CATEGORIES.find((c) => c.id === formData.categoryId) || CATEGORIES[0];

    addProduct({
      farmerId: currentFarmer.id,
      farmerName: currentFarmer.name,
      farmerAvatar: currentFarmer.avatarUrl,
      farmerRating: currentFarmer.ratingAvg,
      isFarmerVerified: currentFarmer.isVerified,
      categoryId: selectedCat.id,
      categoryName: selectedCat.name,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: formData.description,
      images: [
        formData.imageUrl,
        'https://images.unsplash.com/photo-1546470427-0d4db154ceb7?w=800&auto=format&fit=crop&q=80',
      ],
      pricePerUnit: Number(formData.pricePerUnit),
      unit: formData.unit,
      availableQuantity: Number(formData.availableQuantity),
      minOrderQuantity: Number(formData.minOrderQuantity),
      qualityGrade: formData.qualityGrade,
      farmingType: formData.farmingType,
      isOrganic: formData.isOrganic,
      harvestDate: formData.harvestDate,
      shelfLifeDays: Number(formData.shelfLifeDays),
      originState: formData.originState,
      originDistrict: formData.originDistrict,
      deliveryOptions: ['PICKUP', 'FARMER_DELIVERY', 'AGROEXPRESS'],
      inStock: true,
      tierDiscounts: [
        { minQuantity: Number(formData.minOrderQuantity) * 5, discountPercent: 8 },
        { minQuantity: Number(formData.minOrderQuantity) * 20, discountPercent: 15 },
      ],
      specifications: {
        moistureContent: '11.5%',
        pesticideResidual: formData.isOrganic ? '0.00 ppm (Zero chemical)' : '<0.01 ppm',
        cultivationMethod: 'Drip irrigated with organic compost',
        soilType: 'Rich Fertile Black Alluvial',
      },
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/farmer/products');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-20">
      <div className="flex items-center justify-between pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            List New Farm Harvest
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish your fresh crops with grade certification and tiered wholesale pricing
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-10 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* Produce Basics */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-earth-100 flex items-center gap-2">
              <Package className="w-4 h-4 text-forest-700" />
              <span>1. Produce & Category Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">Crop / Product Listing Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Export Grade Pink Garlic / Ratnagiri Devgad Alphonso Mangoes"
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 font-medium"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Quality Grade</label>
                <select
                  value={formData.qualityGrade}
                  onChange={(e) => setFormData({ ...formData, qualityGrade: e.target.value as any })}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 font-medium"
                >
                  <option value="A_PLUS">Grade A+ (Export / Premium Size)</option>
                  <option value="A">Grade A (Standard Table Quality)</option>
                  <option value="B">Grade B (Processing Quality)</option>
                  <option value="C">Grade C (Industrial Feed)</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">Produce Description & Soil Nutrition</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe variety name, seed origin, curing method, shelf life, and taste notes..."
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Units */}
          <div className="space-y-4 pt-4 border-t border-earth-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-earth-100 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-forest-700" />
              <span>2. Pricing & Quantity Limits</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Price per Unit (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.pricePerUnit}
                  onChange={(e) => setFormData({ ...formData, pricePerUnit: Number(e.target.value) })}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Price Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value as any })}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 font-bold"
                >
                  <option value="KG">KG (Kilogram)</option>
                  <option value="QUINTAL">Quintal (100 KG)</option>
                  <option value="TON">Metric Ton</option>
                  <option value="BOX">Box (Crate)</option>
                  <option value="PIECE">Piece / Bundle</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Available Stock Quantity</label>
                <input
                  type="number"
                  required
                  value={formData.availableQuantity}
                  onChange={(e) => setFormData({ ...formData, availableQuantity: Number(e.target.value) })}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Minimum Order Quantity (MOQ)</label>
                <input
                  type="number"
                  required
                  value={formData.minOrderQuantity}
                  onChange={(e) => setFormData({ ...formData, minOrderQuantity: Number(e.target.value) })}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Harvest Date & Farming Method */}
          <div className="space-y-4 pt-4 border-t border-earth-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-earth-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-forest-700" />
              <span>3. Harvest Dates & Farming Method</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Harvest Date</label>
                <input
                  type="date"
                  required
                  value={formData.harvestDate}
                  onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Shelf Life (Days)</label>
                <input
                  type="number"
                  required
                  value={formData.shelfLifeDays}
                  onChange={(e) => setFormData({ ...formData, shelfLifeDays: Number(e.target.value) })}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Farming Method</label>
                <select
                  value={formData.farmingType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      farmingType: e.target.value as any,
                      isOrganic: e.target.value === 'ORGANIC',
                    })
                  }
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-slate-900 outline-none focus:border-forest-600 font-medium"
                >
                  <option value="ORGANIC">100% Certified Organic (NPOP)</option>
                  <option value="NATURAL">Zero Budget Natural Farming (ZBNF)</option>
                  <option value="CONVENTIONAL">Conventional High-Yield</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drag and Drop Image Dropzone */}
          <div className="space-y-2 pt-4 border-t border-earth-100">
            <label className="font-bold text-slate-700 block">Produce Photos & Crop Image URL</label>
            <div className="border-2 border-dashed border-earth-300 rounded-2xl p-6 text-center bg-earth-50/50 space-y-2">
              <Upload className="w-8 h-8 text-forest-700 mx-auto" />
              <div className="text-xs font-bold text-slate-800">
                Drag & drop high-resolution farm produce images here
              </div>
              <p className="text-[11px] text-slate-400">JPEG, PNG, WebP up to 15MB each</p>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="Or paste image URL"
                className="w-full max-w-md bg-white border border-earth-300 rounded-xl p-2 text-xs text-slate-800 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-earth-100">
            <button
              type="button"
              onClick={() => navigate('/farmer/dashboard')}
              className="bg-earth-100 text-slate-700 font-bold px-5 py-3 rounded-xl hover:bg-earth-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Produce Listing</span>
            </button>
          </div>

          {submitted && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Listing published successfully! Redirecting to inventory...</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
