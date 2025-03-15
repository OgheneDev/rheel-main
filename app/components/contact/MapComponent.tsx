"use client"; // Ensure this is a client-side component

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicMap = dynamic(() => import("./MapComponentClient"), {
  ssr: false, // Prevents Next.js from trying to render Leaflet on the server
});

const MapComponent = () => {
  return <DynamicMap />;
};

export default MapComponent;
