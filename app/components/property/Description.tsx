'use client'
import { useState } from "react";

interface PropertyDescriptionProps {
  description?: string; // Make description optional
}

const Description: React.FC<PropertyDescriptionProps> = ({ description = '' }) => { // Add default empty string
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 150;

  // Early return if no description provided
  if (!description) {
    return (
      <div className="pt-5 md:pt-12 md:max-w-2xl md:mx-auto">
        <article>
          <h2 className="text-[#1C1C1E] font-semibold text-xl mb-2">Description</h2>
          <p className="text-[#5C6368] text-sm">No description available.</p>
        </article>
      </div>
    );
  }

  // Show full description if it's shorter than preview length
  const shouldShowToggle = description.length > previewLength;
  const displayText = isExpanded ? description : description.slice(0, previewLength);

  return (
    <div className="pt-5 md:pt-12 md:max-w-2xl md:mx-auto">
      <article>
        <h2 className="text-[#1C1C1E] font-semibold text-xl mb-2">Description</h2>
        <p className="text-[#5C6368] text-sm">
          {displayText}{!isExpanded && shouldShowToggle && '...'}
        </p>
        {shouldShowToggle && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
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
