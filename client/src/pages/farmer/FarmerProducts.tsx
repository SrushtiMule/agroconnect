import React, { useState } from 'react';
import { useAgriData } from '../../context/AgriDataContext';
import { GradeBadge, OrganicBadge } from '../../components/common/Badge';
import { RatingStars } from '../../components/common/RatingStars';
import {
  Package,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

interface FarmerProductsProps {
  navigate: (path: string) => void;
}

export const FarmerProducts: React.FC<FarmerProductsProps> = ({ navigate }) => {
  const { products, deleteProduct, updateProduct, farmers } = useAgriData();
  const currentFarmer = farmers[0];

  const farmerProducts = products.filter((p) => p.farmerId === currentFarmer.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            My Listed Crops & Produce
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage inventory stock levels, wholesale price tiers, and quality badges
          </p>
        </div>

        <button
          onClick={() => navigate('/farmer/products/add')}
          className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Harvest</span>
        </button>
      </div>

      {farmerProducts.length > 0 ? (
        <div className="bg-white rounded-3xl border border-earth-200 divide-y divide-earth-100 overflow-hidden shadow-soft">
          {farmerProducts.map((product) => (
            <div
              key={product.id}
              className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-earth-50/50 transition-colors"
            >
              {/* Image & Details */}
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-earth-100 shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {product.categoryName}
                    </span>
                    <GradeBadge grade={product.qualityGrade} />
                    {product.isOrganic && <OrganicBadge size="sm" />}
                  </div>

                  <h3
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="font-bold text-base text-slate-900 truncate hover:text-forest-700 cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>
                      Stock: <strong className="text-slate-900">{product.availableQuantity} {product.unit}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Harvested: <strong>{new Date(product.harvestDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Stock Controls */}
              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-earth-100">
                <div className="text-left md:text-right">
                  <div className="text-xl font-extrabold text-forest-800">
                    ₹{product.pricePerUnit} <span className="text-xs text-slate-400 font-normal">/ {product.unit}</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold block">
                    {product.totalSales} units sold
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="p-2.5 rounded-xl bg-earth-100 text-slate-700 hover:bg-earth-200 transition-colors"
                    title="View Listing"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      const newPrice = prompt(`Enter new price per ${product.unit} for ${product.name}:`, product.pricePerUnit.toString());
                      if (newPrice && !isNaN(Number(newPrice))) {
                        updateProduct(product.id, { pricePerUnit: Number(newPrice) });
                      }
                    }}
                    className="p-2.5 rounded-xl bg-forest-50 text-forest-800 hover:bg-forest-100 transition-colors"
                    title="Quick Price Update"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete listing for ${product.name}?`)) {
                        deleteProduct(product.id);
                      }
                    }}
                    className="p-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center text-slate-400 border border-earth-200 space-y-3">
          <p>No crops listed under your farm account yet.</p>
          <button
            onClick={() => navigate('/farmer/products/add')}
            className="bg-forest-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
          >
            Add Your First Harvest
          </button>
        </div>
      )}
    </div>
  );
};
