'use client'
import { useState } from "react";

interface PropertyDescriptionProps {
  description: string;
}

const Description: React.FC<PropertyDescriptionProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 150; // Number of characters to show initially

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="pt-5 md:pt-12 md:max-w-2xl md:mx-auto">
      <article>
        <h2 className="text-[#1C1C1E] font-semibold text-xl mb-2">Description</h2>
        <p className="text-[#5C6368] text-sm">
          {isExpanded ? description : `${description.slice(0, previewLength)}...`}
        </p>
        {description.length > previewLength && (
          <button 
            onClick={toggleDescription} 
            className="text-[#161E2D] underline font-medium mt-2 text-sm"
          >
            {isExpanded ? "View Less" : "View More"}
          </button>
        )}
      </article>
    </div>
  );
};

export default Description;
