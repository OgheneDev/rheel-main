"use client";

import dynamic from "next/dynamic";
import { FC } from "react";

const DynamicMap = dynamic(() => import("./MapComponentClient"), {
  ssr: false, // Prevents Next.js from trying to render Leaflet on the server
  loading: () => <div style={{ height: "500px", width: "100%", background: "#f0f0f0" }}>Loading map...</div>
});

const MapComponent: FC = () => {
  return <DynamicMap />;
};

export default MapComponent;