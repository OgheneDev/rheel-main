import React from "react";
import Image from "next/image";
import { Bed, Bath, Sofa, MapPin } from "lucide-react";

interface Property {
    id: number; 
    agent_id: number;
    amenities: string[];
    archived: boolean;
    bathroom: string;
    bedroom: string;
    created_at: string;
    finance: boolean;
    floor_plan: string[];
    living_room: string;
    location: string;
    price: string;
    property_availability: string;
    property_description: string;
    property_images: string[];
    property_type_id: number;
    type: string;
    updated_at: string;
    video_upload: string[];
    agent_name?: string;
}

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({property}) => {
  return (
    <div className="relative rounded-lg overflow-hidden border border-[#E4E4E4] bg-white max-w-sm">
      {/* Property Image */}
      <div className="relative h-48 w-full bg-gray-200">
        {property.property_images && property.property_images.length > 0 ? (
          // Using img tag instead of Next/Image to avoid domain configuration issues
          <img 
            src={property.property_images[0]} 
            alt={`Property at ${property.location}`}
            className="h-full w-full object-cover"
          />
        ) : null}
        
        {/* Featured and For Sale Tags */}
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className="bg-[#0A2F1E] text-white text-xs font-medium px-2 py-1 rounded-full">Featured</span>
          <span className="bg-[#0B213266] text-white text-xs font-medium px-2 py-1 rounded-full">For Sale</span>
        </div>
        
        {/* Location */}
        <div className="absolute bottom-3 left-3  text-white text-xs p-1 rounded flex gap-2 items-center">
          <MapPin size={15} />
          <span>{property.location}</span>
        </div>
      </div>
      
      {/* Property Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-[#161E2D]">Casa Lomas De Machali Machas</h3>
        
        <div className="flex  gap-2 text-sm text-[#5C6368] mb-4">
          {/* Beds */}
          <div className="flex items-center">
            <Bed size={14} className="mr-1" />
            <span>Beds:</span>
            <span className="mr-1 text-[#3A3A3C]">{property.bedroom}</span>
          </div>
          
          {/* Baths */}
          <div className="flex items-center">
            <Bath size={14} className="mr-1" />
            <span>Baths:</span>
            <span className="mr-1 text-[#3A3A3C]">{property.bathroom}</span>
          </div>
          
          {/* Sofa Feet */}
          <div className="flex items-center">
            <Sofa size={14} className="mr-1" />
            <span>Living Rooms:</span>
            <span className="mr-1 text-[#3A3A3C]">{property.living_room}</span>
          </div>
        </div>

        <div className="bg-[#E4E4E4] h-[1px] w-full "></div>
        
        {/* Agent and Price */}
        <div className="flex justify-between items-center pt-5">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
            <span className="text-sm text-[#161E2D]">{property.agent_name || "Agent Name"}</span>
          </div>
          <div className="text-right font-bold text-[#161E2D]">${property.price}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;