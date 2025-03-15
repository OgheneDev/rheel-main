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
      <PropertyHeader 
        propertyType={property.property_type_id} 
        price={property.price} 
      />
      
      <div className="px-5 flex flex-col gap-5">
        <PropertyFeatures 
          bathroom={property.bathroom}
          bedroom={property.bedroom}
          livingRoom={property.living_room}
        />
        
        <PropertyLocation location={property.location} />
      </div>

      <div className="py-5 px-5">
       <ContactButtons />
       <Description
       description={property.property_description}
      />
      <Divider />
      <Overview
       bathroom={property.bathroom}
       bedroom={property.bedroom}
       livingRoom={property.living_room}
       propertyType={property.property_type_id}
      />
      </div>
      
    </div>
  );
};

export default PropertyPage;