import { Bed, Bath, Sofa } from "lucide-react";

interface PropertyFeaturesProps {
  bathroom: string;
  bedroom: string;
  livingRoom: string;
}

const PropertyFeatures = ({ bathroom, bedroom, livingRoom }: PropertyFeaturesProps) => {
  return (
    <div>
      <span className="text-[#161E2D]">Features</span>
      <div className="flex items-center text-sm md:text-[12px] gap-2">
        <div className="flex gap-1 items-center text-[#5C6368]">
          <Bath size={15} />
          <span>Baths: {bathroom}</span>
        </div>
        <div className="flex gap-1 items-center text-[#5C6368]">
          <Bed size={15} />
          <span>Bed: {bedroom}</span>
        </div>
        <div className="flex gap-1 items-center text-[#5C6368]">
          <Sofa size={15} />
          <span>Living Room: {livingRoom}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyFeatures;