import { propertyTypes } from "@/app/types";
import { Sliders, Home, Bath, Bed } from "lucide-react";

interface OverviewProps {
  bathroom: string;
  bedroom: string;
  livingRoom: string;
  propertyType: number;
}

const Overview = ({bathroom, bedroom, livingRoom, propertyType}: OverviewProps) => {
  return (
    <div className="pt-5 md:pt-12 md:max-w-2xl md:mx-auto">
      <h3 className="text-[#1C1C1E] font-medium mb-2">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div className="flex items-center">
          <div className="mr-3 border p-2 border-[#E4E4E4] rounded-md">
            <Sliders className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Type:</p>
            <p className="font-semibold text-sm text-[#161E2D]">{propertyTypes[propertyType]}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 border p-2 border-[#E4E4E4] rounded-md">
            <Home className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Living Room</p>
            <p className="font-semibold text-sm text-[#161E2D]">{livingRoom}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 border p-2 border-[#E4E4E4] rounded-md">
            <Bath className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Bathrooms:</p>
            <p className="font-semibold text-sm text-[#161E2D]">{bathroom}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 border p-2 border-[#E4E4E4] rounded-md">
            <Bed className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Bedrooms:</p>
            <p className="font-semibold text-sm text-[#161E2D]">{bedroom}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview