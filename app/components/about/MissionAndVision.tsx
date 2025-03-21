'use client'
import { useEffect, useRef } from 'react';

const MissionAndVision = () => {
  const visionContentRef = useRef<HTMLDivElement>(null);
  const missionContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustContent = () => {
      // Only apply on desktop
      if (window.innerWidth >= 768 && visionContentRef.current && missionContentRef.current) {
        // Get the parent containers
        const visionParent = visionContentRef.current.parentElement;
        const missionParent = missionContentRef.current.parentElement;
        
        if (visionParent && missionParent) {
          // Reset first
          visionParent.style.display = "block";
          missionParent.style.display = "block";
          
          // Use flexbox to push content to the top
          visionParent.style.display = "flex";
          missionParent.style.display = "flex";
          visionParent.style.flexDirection = "column";
          missionParent.style.flexDirection = "column";
          
          // Instead of making the containers the same height,
          // we'll align the content at the top and let them naturally end at different points
          visionParent.style.alignItems = "flex-start";
          missionParent.style.alignItems = "flex-start";
        }
      }
    };

    adjustContent();
    window.addEventListener('resize', adjustContent);
    
    return () => {
      window.removeEventListener('resize', adjustContent);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-20 justify-start items-start max-w-7xl mx-auto px-4 md:px-8 pb-10 md:pb-15">
      <div className="vision w-full md:w-1/2 flex flex-col">
        <h3 className="uppercase text-xl font-bold mb-6">Our Vision</h3>
        <div ref={visionContentRef} className="space-y-8">
          <p className="text-base leading-8 md:leading-[2.2]">
            Our vision is simple: to be the most trusted and innovative real estate company in Nigeria, recognised for our commitment to delivering high-quality properties at fair prices, ensuring full transparency, and providing unmatched customer service. We aim to make property transactions easier, more accessible, and more reliable for Nigerians at home and abroad.
          </p>
          <p className="text-base leading-8 md:leading-[2.2]">
            We are committed to building a reputation that speaks to the values we hold dear: trust, transparency, quality, and customer satisfaction. Whether you are a first-time buyer, an investor, or someone looking to lease or manage property, we are dedicated to providing you with the resources and support to make informed decisions every step of the way.
          </p>
        </div>
      </div>
      
      <div className="mission w-full md:w-1/2 flex flex-col">
        <h3 className="uppercase text-xl font-bold mb-6">Our Mission</h3>
        <div ref={missionContentRef} className="space-y-6">
          <p className="text-base leading-7.5 md:leading-8">
            At Rheel Estate Limited, our mission is to redefine real estate in Nigeria by providing a transparent, secure, and customer-focused property experience. We are committed to helping individuals and businesses buy, sell, lease, and manage properties with ease and confidence, whether they are in Nigeria or abroad.
          </p>
          <p className="text-base leading-7.5 md:leading-8">
            Through integrity, innovation, and excellence, we aim to bridge the gap between property owners, buyers, and investors, ensuring seamless transactions, fair pricing, and high-quality developments. We also strive to make a positive impact in people's lives by empowering Nigerians with financial opportunities through our affiliate program and by developing well-built, modern homes that offer true value.
          </p>
          <p className="text-base leading-7.5 md:leading-8">
            At Rheel Estate, we don't just sell properties—we build trust, create opportunities, and shape the future of real estate in Nigeria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionAndVision;