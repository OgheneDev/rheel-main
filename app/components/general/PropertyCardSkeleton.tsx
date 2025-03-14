import React from "react";

const PropertyCardSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden border border-[#E4E4E4] bg-white max-w-sm animate-pulse">
      {/* Property Image Placeholder */}
      <div className="relative h-48 w-full bg-gray-200"></div>
      
      {/* Tags Placeholder */}
      <div className="absolute top-3 left-3 flex space-x-2">
        <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
        <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
      </div>
      
      {/* Location Placeholder */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </div>

      {/* Property Details Placeholder */}
      <div className="p-4">
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
        
        <div className="flex gap-2 text-sm mb-4">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
            <div className="h-4 w-10 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
            <div className="h-4 w-10 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
            <div className="h-4 w-10 bg-gray-300 rounded"></div>
          </div>
        </div>
        
        <div className="bg-[#E4E4E4] h-[1px] w-full"></div>
        
        {/* Agent and Price Placeholder */}
        <div className="flex justify-between items-center pt-5">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
