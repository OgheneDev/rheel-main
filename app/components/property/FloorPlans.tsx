'use client';

import { useState } from "react";
import Image from "next/image";
import { Property } from "@/app/types";

interface FloorPlansProps {
  floorPlans: Property['floor_plan'];
}

const FloorPlans = ({ floorPlans }: FloorPlansProps) => {
  // Store which floor plans are expanded
  const [expandedFloors, setExpandedFloors] = useState<{ [key: number]: boolean }>({
    0: true // First floor is expanded by default
  });

  // Early return if no floor plans
  if (!floorPlans || floorPlans.length === 0) {
    return null;
  }

  // Toggle floor plan visibility
  const toggleFloor = (index: number) => {
    setExpandedFloors(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="w-full pt-5">
      <h2 className="text-[#1C1C1E] font-medium mb-2">Floor Plans</h2>
      
      {floorPlans.map((planUrl, index) => {
        // Determine floor name based on index
        const floorName = index === 0 ? "First Floor" : 
                         index === 1 ? "Second Floor" : 
                         `Floor ${index + 1}`;
        
        // Mock data - in a real app you'd get this from your API
        const bedroomCount = 2;
        const bathroomCount = 2;
        
        const isExpanded = expandedFloors[index] || false;
        
        return (
          <div key={index} className="mb-4 rounded-md bg-[#E4E4E4] overflow-hidden">
            {/* Floor Header - Always visible */}
            <div 
              className="flex items-center justify-between p-4  cursor-pointer"
              onClick={() => toggleFloor(index)}
            >
              <div className="flex items-center">
                {/* Arrow icon */}
                <svg 
                  className={`w-5 h-5 mr-2 transition-transform ${isExpanded ? 'transform rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-medium">{floorName}</span>
              </div>
            </div>
            
            {/* Floor Plan Image - Only visible when expanded */}
            {isExpanded && (
              <div className="p-4">
                <div className="w-full relative h-[300px]">
                  <Image 
                    src={planUrl} 
                    alt={`${floorName} floor plan`}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FloorPlans;