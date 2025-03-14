"use client";
import { useState } from "react";
import PropertyTypeButtons from "./featured properties/PropertyTypeButtons";
import FeaturedPropertyList from "./featured properties/FeaturedPropertyList";

const FeaturedProperties = () => {
  const [selectedType, setSelectedType] = useState<number | null>(null);

  return (
    <section className="px-5 md:px-[130px] py-10 md:py-15">
      <article className="text-center mb-7">
        <span className="uppercase text-[#0A2F1E]">Featured Properties</span>
        <h2 className="text-2xl font-bold text-[#161E2D]">Recommended for you</h2>
      </article>
      <PropertyTypeButtons onSelectType={setSelectedType} />
      <FeaturedPropertyList selectedType={selectedType} />
    </section>
  );
};

export default FeaturedProperties;
