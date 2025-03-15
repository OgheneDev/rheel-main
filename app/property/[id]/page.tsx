'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPropertyById } from "@/app/api/properties/requests";
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

const PropertyPage = () => {
  const { id } = useParams(); // Get property ID from URL
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      console.log("Fetching property with ID:", id);
      getPropertyById(id as string)
        .then((response) => {
          console.log("Fetched property:", response);
          if (response.status) {
            setProperty(response.data); // Extract the actual data
          } else {
            setProperty(null);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching property:", error);
          setLoading(false);
        });
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
      
      <div className="px-5 flex flex-col gap-5">
        {/* Property Features */}
        <PropertyFeatures 
          bathroom={property.bathroom}
          bedroom={property.bedroom}
          livingRoom={property.living_room}
        />
        
        {/* Property Location */}
        <PropertyLocation location={property.location} />
      </div>

      <div className="py-5 px-5">
        {/* Contact Buttons - Pass the property prop correctly */}
        <ContactButtons property={property} />

        {/*Property Images */}
        <PropertyImageSlider images={property.property_images} />

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

        {/* Amenities */}
        <Amenities amenities={property.amenities} />
        <Divider />

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

export default PropertyPage;
