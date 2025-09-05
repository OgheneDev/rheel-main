'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingState, ErrorState } from "@/app/components/property/StateComponents";
import PropertyClient from "../PropertyClient";
import { Property, propertyTypes } from "@/app/types";

export default function PropertyFallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!id || isNaN(parseInt(id, 10))) {
      router.push("/properties/not-found");
      return;
    }

    const validateProperty = async () => {
      try {
        const response = await fetch(`https://apidoc.rheel.ng/data/properties/${id}`, {
          cache: 'no-store', // Fetch fresh data for new properties
        });

        if (!response.ok) {
          throw new Error(`Property not found: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const fetchedProperty: Property = data.data ?? data;
        if (!fetchedProperty || !fetchedProperty.id) {
          throw new Error('Invalid property data');
        }

        setProperty(fetchedProperty);
        setLoading(false);

        // Update document metadata client-side
        const propertyType = propertyTypes[fetchedProperty.property_type_id] || 'Property';
        const title = `Property in ${fetchedProperty.location} | ${fetchedProperty.bedroom} Bedroom ${propertyType} for ${fetchedProperty.type}`;
        const description = `Find ${fetchedProperty.bedroom}-bedroom ${propertyType.toLowerCase()} for ${fetchedProperty.type} in ${fetchedProperty.location}. ${fetchedProperty.property_description.slice(0, 130)} Price: ₦${fetchedProperty.price}.`;

        document.title = title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', description);
        } else {
          const meta = document.createElement('meta');
          meta.name = 'description';
          meta.content = description;
          document.head.appendChild(meta);
        }

        // Update Open Graph and Twitter meta tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
          ogTitle.setAttribute('content', title);
        }
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
          ogDescription.setAttribute('content', description);
        }
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
          ogUrl.setAttribute('content', `https://rheel.ng/properties/fallback?id=${id}`);
        }
        if (fetchedProperty.property_images?.length > 0) {
          const ogImage = document.querySelector('meta[property="og:image"]');
          if (ogImage) {
            ogImage.setAttribute('content', fetchedProperty.property_images[0]);
          }
        }

        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
          twitterTitle.setAttribute('content', title);
        }
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
          twitterDescription.setAttribute('content', description);
        }
        if (fetchedProperty.property_images?.length > 0) {
          const twitterImage = document.querySelector('meta[name="twitter:image"]');
          if (twitterImage) {
            twitterImage.setAttribute('content', fetchedProperty.property_images[0]);
          }
        }
      } catch (error) {
        console.error('Error validating property:', error);
        setError(true);
        setLoading(false);
      }
    };

    validateProperty();
  }, [id, router]);

  if (!id || isNaN(parseInt(id, 10))) return null;
  if (loading) return <LoadingState />;
  if (error || !property) return <ErrorState />;

  return <PropertyClient id={parseInt(id, 10)} />;
}