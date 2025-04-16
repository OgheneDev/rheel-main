'use client';

import { useEffect, useState } from "react";
import { Property } from "@/app/types";
import PropertyHeader from "@/app/components/property/PropertyHeader";
import PropertyFeatures from "@/app/components/property/PropertyFeatures";
import PropertyLocation from "@/app/components/property/PropertyLocation";
import { LoadingState, ErrorState } from "@/app/components/property/StateComponents";
import ContactButtons from "@/app/components/property/ContactButtons";
import Description from "@/app/components/property/Description";
import Divider from "@/app/components/property/Divider";
import Overview from "@/app/components/property/Overview";
import VideoTour from "@/app/components/property/VideoTour";
import Amenities from "@/app/components/property/Amenities";
import FloorPlans from "@/app/components/property/FloorPlans";
import Stores from "@/app/components/general/Stores";
import PropertyImageSlider from "@/app/components/property/ImageSlider";

// Define the props type for the component
interface PropertyClientProps {
  id: number;
}

const PropertyClient: React.FC<{ id: number }> = ({ id }) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://apidoc.rheel.ng/data/properties/${id}`, {
          cache: 'force-cache' // Force static fetching
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // The API returns the property directly, not in a data array for single property
        const propertyData = result.data ?? result;
        
        if (propertyData) {
          setProperty(propertyData);
        } else {
          throw new Error('Property not found');
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) return <LoadingState />;
  if (!property) return <ErrorState />;

  return (
    <div className="py-10 md:py-15">
      {/* Property Header */}
      <PropertyHeader 
        propertyType={property.property_type_id}
        price={property.price}
      />
      
      <div className="px-5 md:px-[130px] flex flex-col md:flex-row gap-5">
        {/* Property Features */}
        <PropertyFeatures
          bathroom={property.bathroom}
          bedroom={property.bedroom}
          livingRoom={property.living_room}
        />
        
        {/* Property Location */}
        <PropertyLocation location={property.location} />
      </div>
      
      <div className="px-5">
        {/*Property Images */}
        <PropertyImageSlider images={property?.property_images || []} />
      </div>
      
      <div className="py-5 md:py-8 px-5">
        {/* Contact Buttons - Pass the property prop correctly */}
        <ContactButtons property={property} />
        
        {/* Property Description */}
        <Description description={property.property_description} />
        <Divider />
        
        {/* Property Overview */}
        <Overview
          bathroom={property.bathroom}
          bedroom={property.bedroom}
          livingRoom={property.living_room}
          propertyType={property.property_type_id}
        />
        <Divider />
        
        {/* Video Tour */}
        {property.video_upload && property.video_upload.length > 0 && (
          <>
            <VideoTour videoUrl={property.video_upload} />
            <Divider />
          </>
        )}
        
        {/* Amenities - Only render if amenities exist */}
        {property.amenities && property.amenities.length > 0 && (
          <>
            <Amenities amenities={property.amenities} />
            <Divider />
          </>
        )}
        
        {/* Floor Plans - Render only if available */}
        {property.floor_plan && property.floor_plan.length > 0 && (
          <>
            <FloorPlans floorPlans={property.floor_plan} />
            <Divider />
          </>
        )}
      </div>
      
      {/* Store Listings */}
      <Stores />
    </div>
  );
};

export default PropertyClient;