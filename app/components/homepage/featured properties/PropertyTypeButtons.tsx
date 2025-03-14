import { useState } from "react";

interface PropertyTypeButtonsProps {
  onSelectType: (typeId: number | null) => void;
}

const PropertyTypeButtons: React.FC<PropertyTypeButtonsProps> = ({ onSelectType }) => {
  const propertyTypes: Record<number, string> = {
    1: "Duplex",
    2: "Terrace",
    3: "Bungalow",
    4: "Apartments",
    5: "Commercial",
    6: "Carcass",
    7: "Land",
    8: "JV Land",
  };

  const [selectedType, setSelectedType] = useState<number | null>(null);

  const handleClick = (id: number | null) => {
    setSelectedType(id);
    onSelectType(id);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-10">
      {/* View All Button */}
      <button
        className={`px-6 py-2 rounded-full text-[12px] cursor-pointer transition-colors 
                    ${selectedType === null ? "bg-[#161E2D] text-white" : "bg-[#F7F7F7] text-[#161E2D] hover:bg-[#161E2D] hover:text-white"}`}
        onClick={() => handleClick(null)}
      >
        View All
      </button>

      {/* Property Type Buttons */}
      {Object.entries(propertyTypes).map(([id, type]) => (
        <button
          key={id}
          className={`px-6 py-2 rounded-full text-[12px] cursor-pointer transition-colors 
                      ${selectedType === Number(id) ? "bg-[#161E2D] text-white" : "bg-[#F7F7F7] text-[#161E2D] hover:bg-[#161E2D] hover:text-white"}`}
          onClick={() => handleClick(Number(id))}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default PropertyTypeButtons;
