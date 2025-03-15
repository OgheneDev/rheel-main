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
    <div className="pt-5">
      <article>
        <h2 className="text-[#1C1C1E] font-medium mb-2">Description</h2>
        <p className="text-[#5C6368]">
          {isExpanded ? description : `${description.slice(0, previewLength)}...`}
        </p>
        {description.length > previewLength && (
          <button 
            onClick={toggleDescription} 
            className="text-[#161E2D] underline font-medium mt-2"
          >
            {isExpanded ? "View Less" : "View More"}
          </button>
        )}
      </article>
    </div>
  );
};

export default Description;
