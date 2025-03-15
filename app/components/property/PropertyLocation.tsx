import { MapPin } from "lucide-react";

interface PropertyLocationProps {
  location: string;
}

const PropertyLocation = ({ location }: PropertyLocationProps) => {
  return (
    <div>
      <span className="text-[#161E2D]">Location</span>
      <div className="flex gap-1 items-center text-[#5C6368]">
        <MapPin size={15} />
        <span className=' text-sm md:text-[12px]'>Location: {location}</span>
      </div>
    </div>
  );
};

export default PropertyLocation;