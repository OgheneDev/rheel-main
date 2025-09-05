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
          cache: 'no-store', // Always fetch fresh data
        });

        if (!response.ok) {
          throw new Error(`Property not found: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const fetchedProperty: Property = data.data ?? data;
        if (!fetchedProperty || !fetchedProperty.id) {
          throw new Error("Invalid property data");
        }

        setProperty(fetchedProperty);
        setLoading(false);

        // === SEO Title & Description ===
        const propertyType = propertyTypes[fetchedProperty.property_type_id] || "Property";
        const title = `Property in ${fetchedProperty.location} | ${fetchedProperty.bedroom} Bedroom ${propertyType} for ${fetchedProperty.type}`;
        const description = `Find ${fetchedProperty.bedroom}-bedroom ${propertyType.toLowerCase()} for ${fetchedProperty.type} in ${fetchedProperty.location}. ${fetchedProperty.property_description.slice(0, 130)} Price: ₦${fetchedProperty.price}.`;

        // === Update Document Metadata ===
        document.title = title;

        const updateMetaTag = (name: string, content: string, isProperty = false) => {
  let meta = document.querySelector<HTMLMetaElement>(
    `meta[${isProperty ? "property" : "name"}="${name}"]`
  );

  if (meta) {
    meta.setAttribute("content", content);
  } else {
    meta = document.createElement("meta");
    if (isProperty) {
      meta.setAttribute("property", name);
    } else {
      meta.setAttribute("name", name);
    }
    meta.setAttribute("content", content);
    document.head.appendChild(meta);
  }
};


        // Meta description
        updateMetaTag("description", description);

        // Open Graph tags
        updateMetaTag("og:title", title, true);
        updateMetaTag("og:description", description, true);
        updateMetaTag("og:url", `https://rheel.ng/properties/fallback?id=${id}`, true);
        if (fetchedProperty.property_images?.length > 0) {
          updateMetaTag("og:image", fetchedProperty.property_images[0], true);
        }

        // Twitter tags
        updateMetaTag("twitter:title", title);
        updateMetaTag("twitter:description", description);
        if (fetchedProperty.property_images?.length > 0) {
          updateMetaTag("twitter:image", fetchedProperty.property_images[0]);
        }

        // === Inject Structured Data (JSON-LD) ===
        const structuredData = {
          "@context": "https://schema.org",
          "@type": fetchedProperty.property_type_id === 7 || fetchedProperty.property_type_id === 8
            ? "Land"
            : "Residence",
          name: title,
          description: fetchedProperty.property_description,
          address: {
            "@type": "PostalAddress",
            addressLocality: fetchedProperty.location,
            addressCountry: "NG",
          },
          numberOfRooms:
            fetchedProperty.property_type_id === 7 || fetchedProperty.property_type_id === 8
              ? undefined
              : parseInt(fetchedProperty.bedroom, 10) +
                parseInt(fetchedProperty.bathroom, 10) +
                parseInt(fetchedProperty.living_room, 10),
          image: fetchedProperty.property_images || [],
          offers: {
            "@type": "Offer",
            price: fetchedProperty.price,
            priceCurrency: "NGN",
            availability:
              fetchedProperty.type === "sale"
                ? "https://schema.org/InStock"
                : "https://schema.org/PreOrder",
          },
        };

        // Remove any old structured data to avoid duplicates
        const oldScript = document.querySelector('script[type="application/ld+json"]');
        if (oldScript) oldScript.remove();

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.innerHTML = JSON.stringify(structuredData);
        document.head.appendChild(script);

      } catch (error) {
        console.error("Error validating property:", error);
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
