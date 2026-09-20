import React, { useEffect, useRef } from 'react';
import { Order } from '../../types';
import L from 'leaflet';

interface DeliveryTrackerMapProps {
  order: Order;
}

export const DeliveryTrackerMap: React.FC<DeliveryTrackerMapProps> = ({ order }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const origin = order.tracking?.originCoords || [20.0784, 74.1089]; // Nashik default
    const dest = order.tracking?.destCoords || [18.5590, 73.7868];     // Pune default
    const current = order.tracking?.currentCoords || [19.3000, 73.9500];

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: current,
        zoom: 8,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Origin Pin
    const originIcon = L.divIcon({
      className: 'origin-pin',
      html: `
        <div style="background:#15803d; color:white; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; border:2px solid white; box-shadow:0 2px 8px rgba(0,0,0,0.3);">
          🌱
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    // Destination Pin
    const destIcon = L.divIcon({
      className: 'dest-pin',
      html: `
        <div style="background:#b91c1c; color:white; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; border:2px solid white; box-shadow:0 2px 8px rgba(0,0,0,0.3);">
          📍
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    // Driver Van Pin
    const vanIcon = L.divIcon({
      className: 'van-pin',
      html: `
        <div style="background:#d97706; color:white; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; border:3px solid white; box-shadow:0 0 15px rgba(217,119,6,0.8); animation: pulse 2s infinite;">
          🚚
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    // Add Markers
    const originMarker = L.marker(origin, { icon: originIcon }).addTo(map);
    originMarker.bindPopup(`<strong>Farm Origin:</strong><br/>${order.farmerName}<br/>${order.farmerLocation}`);

    const destMarker = L.marker(dest, { icon: destIcon }).addTo(map);
    destMarker.bindPopup(`<strong>Buyer Destination:</strong><br/>${order.deliveryAddress.fullName}<br/>${order.deliveryAddress.streetAddress}, ${order.deliveryAddress.city}`);

    const truckMarker = L.marker(current, { icon: vanIcon }).addTo(map);
    truckMarker.bindPopup(`<strong>AgroExpress Van (In Transit)</strong><br/>Driver: ${order.tracking?.driverName || 'Santosh Shinde'}<br/>Vehicle: ${order.tracking?.vehicleNumber || 'MH-15-EG-4921'}`);

    // Draw Polyline Route
    const routeCoordinates: [number, number][] = [
      origin,
      [19.8500, 74.0500],
      [19.5000, 73.9500],
      current,
      [18.9500, 73.8500],
      dest,
    ];

    const polyline = L.polyline(routeCoordinates, {
      color: '#15803d',
      weight: 4,
      opacity: 0.8,
      dashArray: '8, 8',
    }).addTo(map);

    // Fit Bounds
    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

    return () => {
      // cleanup if needed
    };
  }, [order]);

  return (
    <div className="relative w-full h-[380px] rounded-3xl overflow-hidden border border-earth-200 shadow-soft">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-earth-200 shadow-xs text-xs space-y-0.5">
        <div className="font-bold text-slate-900 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
          <span>AgroExpress GPS Live Satellite Tracking</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Temperature-controlled crate storage: <strong className="text-emerald-700">14°C (Fresh)</strong>
        </div>
      </div>
    </div>
  );
};
