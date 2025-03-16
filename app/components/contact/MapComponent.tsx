"use client";
import dynamic from "next/dynamic";
import { FC, useState, useEffect } from "react";

const DynamicMap = dynamic(() => import("./MapComponentClient"), {
  ssr: false, // Prevents Next.js from trying to render Leaflet on the server
  loading: () => <MapLoadingState />
});

// Improved loading state component
const MapLoadingState: FC = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90; // Cap at 90% to avoid giving false impression of completion
        }
        return prev + 10;
      });
    }, 300);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-gray-100 rounded-lg h-[500px] w-full flex flex-col items-center justify-center">
      <div className="w-16 h-16 mb-4">
        <svg className="animate-spin text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div className="text-lg font-medium text-gray-600 mb-3">Loading Map...</div>
      <div className="w-64 bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-800 h-2.5 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-2">Preparing location data for Abuja</p>
    </div>
  );
};

const MapComponent: FC = () => {
  return <DynamicMap />;
};

export default MapComponent;