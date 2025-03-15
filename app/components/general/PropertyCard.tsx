"use client"; // Add this at the top for client-side rendering

import React from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { Bed, Bath, Sofa, MapPin } from "lucide-react";
import Image from "next/image";

const propertyTypes: { [key: number]: string } = {
  1: "Duplex",
  2: "Terraced House",
  3: "Detached House",
  4: "Semi-Detached House",
  5: "Apartment",
  6: "Carcass",
  7: "Land",
  8: "JV Land",
};

interface Property {
  id: number;
  agent_id: number;
  amenities: string[];
  archived: boolean;
  bathroom: string;
  bedroom: string;
  created_at?: string;
  living_room: string;
  location: string;
  price: string;
  property_availability: string;
  property_description: string;
  property_images: string[];
  property_type_id: number;
  updated_at?: string;
  agent_name?: string;
  agent_image?: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter(); // Use next/navigation
  const formatPrice = (price: string) => {
    return Number(price).toLocaleString("en-NG");
  };

  const handleNavigate = () => {
    router.push(`/property/${property.id}`);
  };

  return (
    <div className="relative rounded-lg shadow-lg overflow-hidden bg-white">
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-200 cursor-pointer" onClick={handleNavigate}>
        {property.property_images?.length > 0 && (
          <Image
            src={property.property_images[0]}
            alt={`Property at ${property.location}`}
            width={500}
            height={300}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
          />
        )}

        {/* Featured and For Sale Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#0A2F1E] text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </span>
          <span className="bg-[#0B213266] text-white text-xs font-medium px-2 py-1 rounded-full">
            For Sale
          </span>
        </div>

        {/* Location */}
        <div className="absolute bottom-3 left-3 flex items-center text-white text-xs bg-black/50 p-1 rounded">
          <MapPin size={15} />
          <span>{property.location}</span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-[#161E2D]">
          {propertyTypes[property.property_type_id] || "Unknown Property Type"}
        </h3>

        {/* Amenities */}
        <div className="flex gap-4 text-sm text-[#5C6368] mb-4">
          <div className="flex items-center">
            <Bed size={14} className="mr-1" />
            <span>{property.bedroom} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath size={14} className="mr-1" />
            <span>{property.bathroom} Baths</span>
          </div>
          <div className="flex items-center">
            <Sofa size={14} className="mr-1" />
            <span>{property.living_room} Living Rooms</span>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-[#E4E4E4] h-[1px] w-full my-3"></div>

        {/* Agent & Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2">
              <Image
                src={property.agent_image || "/images/agent-logo.png"}
                alt={property.agent_name || "Agent"}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-sm text-gray-600">
              {property.agent_name || "Rheel Estate"}
            </span>
          </div>
          <div className="text-right font-bold text-[#161E2D] text-lg">
            ₦{formatPrice(property.price)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
