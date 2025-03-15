"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const position: [number, number] = [41.639, -87.461]; // Example coordinates

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png", // Use a custom marker image
  iconSize: [30, 30], // Adjust marker size
  iconAnchor: [15, 30], // Positioning
  popupAnchor: [0, -30], // Popup positioning
});

const MapComponentClient = () => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <MapContainer center={position} zoom={10} className="w-full h-full">
        {/* Light gray styled map (matches design) */}
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_gray/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        />
        
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="p-4 bg-white rounded-lg shadow-lg text-gray-800 text-sm">
              <h3 className="text-lg font-semibold">Office Address</h3>
              <p className="mt-2">📍 101 E 129th St, East Chicago, IN 46312, US</p>
              <p className="mt-1">📞 1-333-345-6868</p>
              <p className="mt-1">✉ themesflat@gmail.com</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponentClient;
