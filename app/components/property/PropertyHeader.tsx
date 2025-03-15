import { propertyTypes, formatPrice } from "../../types";

interface PropertyHeaderProps {
  propertyType: number;
  price: string;
}

const PropertyHeader = ({ propertyType, price }: PropertyHeaderProps) => {
  return (
    <div className="px-5 mb-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#161E2D]">
          {propertyTypes[propertyType] || "Unknown Property Type"}
        </h3>
        <div className="font-bold text-[#161E2D] text-lg">
          ₦{formatPrice(price)}
        </div>
      </div>
      {/* Divider */}
      <div className="h-[1px] w-full bg-[#E4E4E4] mt-5"></div>
    </div>
  );
};

export default PropertyHeader;