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
    <div className="pt-5">
      <h3 className="text-[#1C1C1E] font-semibold mb-2">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div className="flex items-center">
          <div className="mr-3 border p-2 border-[#E4E4E4]">
            <Sliders className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Type:</p>
            <p className="font-medium">{propertyTypes[propertyType]}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 border p-2 border-[#E4E4E4]">
            <Home className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Living Room</p>
            <p className="font-medium">{livingRoom}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 border p-2 border-[#E4E4E4]">
            <Bath className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Bathrooms:</p>
            <p className="font-medium">{bathroom}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 border p-2 border-[#E4E4E4]">
            <Bed className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Bedrooms:</p>
            <p className="font-medium">{bedroom}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview