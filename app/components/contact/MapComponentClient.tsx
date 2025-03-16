"use client";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponentClient = () => {
  const position: [number, number] = [41.639, -87.461];
  const mapRef = useRef<L.Map | null>(null);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // Create a custom SVG marker icon (small dark dot as in your screenshot)
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
        <circle cx="12" cy="12" r="12" fill="#0A2F1E" />
      </svg>
    `;

    const svgUrl = `data:image/svg+xml;base64,${btoa(svgIcon)}`;

    setCustomIcon(
      new L.Icon({
        iconUrl: svgUrl,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, -6],
      })
    );
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={12}
      style={{ height: "500px", width: "100%", borderRadius: "8px" }}
      ref={mapRef}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />
      {customIcon && (
        <Marker position={position} icon={customIcon}>
          <Popup className="custom-popup">
            <div className="bg-white rounded-lg overflow-hidden shadow-md" style={{ width: "320px" }}>
              {/* Gray Map Placeholder */}
              <div className="bg-gray-200 h-30 w-full"></div>
              
              {/* White Content Area */}
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4 text-gray-900">Office address</h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 mr-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">101 E 129th St, East Chicago, IN 46312, US</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 mr-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">1-333-345-6868</span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">themesflat@gmail.com</span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponentClient;