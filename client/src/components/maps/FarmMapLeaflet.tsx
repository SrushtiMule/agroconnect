import React, { useEffect, useRef } from 'react';
import { FarmerProfile } from '../../types';
import { MapPin, Navigation, Sprout, Star } from 'lucide-react';
import L from 'leaflet';

interface FarmMapLeafletProps {
  farmers: FarmerProfile[];
  onSelectFarmer?: (farmerId: string) => void;
  selectedFarmerId?: string;
}

export const FarmMapLeaflet: React.FC<FarmMapLeafletProps> = ({
  farmers,
  onSelectFarmer,
  selectedFarmerId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center on Central India (Nagpur / Central coordinates)
      const map = L.map(mapContainerRef.current, {
        center: [21.5, 78.5],
        zoom: 5,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Custom Farm Icon
    const farmIcon = L.divIcon({
      className: 'custom-farm-pin',
      html: `
        <div style="
          background: #15803d;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          border: 2px solid white;
        ">
          <div style="transform: rotate(45deg); font-size: 14px;">🌱</div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const activeFarmIcon = L.divIcon({
      className: 'custom-farm-pin-active',
      html: `
        <div style="
          background: #d97706;
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(217, 119, 6, 0.7);
          border: 3px solid white;
        ">
          <div style="transform: rotate(45deg); font-size: 16px;">⭐</div>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    });

    farmers.forEach((farmer) => {
      if (farmer.latitude && farmer.longitude) {
        const isSelected = farmer.id === selectedFarmerId;
        const marker = L.marker([farmer.latitude, farmer.longitude], {
          icon: isSelected ? activeFarmIcon : farmIcon,
        }).addTo(map);

        const popupContent = document.createElement('div');
        popupContent.className = 'p-1 font-sans text-xs space-y-1.5';
        popupContent.innerHTML = `
          <div class="font-bold text-sm text-slate-900">${farmer.name}</div>
          <div class="text-emerald-700 font-semibold">${farmer.farmName} (${farmer.farmSizeAcres} Acres)</div>
          <div class="text-slate-500">${farmer.village}, ${farmer.district}, ${farmer.state}</div>
          <div class="text-[11px] text-slate-600 font-medium">🌾 Main Crops: ${farmer.topCrops.join(', ')}</div>
          <div class="pt-1 flex items-center justify-between">
            <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">⭐ ${farmer.ratingAvg}</span>
            <button id="btn-view-${farmer.id}" style="background:#15803d; color:white; padding:3px 8px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:10px;">
              View Farm Profile
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on('click', () => {
          if (onSelectFarmer) onSelectFarmer(farmer.id);
        });

        marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-view-${farmer.id}`);
          if (btn) {
            btn.onclick = () => {
              if (onSelectFarmer) onSelectFarmer(farmer.id);
            };
          }
        });

        markersRef.current[farmer.id] = marker;
      }
    });

    return () => {
      // Cleanup markers
    };
  }, [farmers, selectedFarmerId, onSelectFarmer]);

  return (
    <div className="relative w-full h-[450px] rounded-3xl overflow-hidden border border-earth-200 shadow-soft">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      {/* Overlay Badge */}
      <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-earth-200 shadow-xs flex items-center gap-1.5 text-xs font-semibold text-slate-800">
        <Sprout className="w-3.5 h-3.5 text-emerald-600" />
        <span>{farmers.length} Verified AgroConnect Farm Hubs</span>
      </div>
    </div>
  );
};
