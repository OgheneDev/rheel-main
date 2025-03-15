import { MapPin } from "lucide-react";

interface PropertyLocationProps {
  location: string;
}

const PropertyLocation = ({ location }: PropertyLocationProps) => {
  return (
    <div>
      <span>Location</span>
      <div className="flex gap-1 items-center text-[#5C6368]">
        <MapPin size={15} />
        <span>Location: {location}</span>
      </div>
    </div>
  );
};

export default PropertyLocation;