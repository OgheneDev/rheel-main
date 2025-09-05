import { Metadata } from 'next';
import { Property, propertyTypes } from "@/app/types";
import PropertyFallbackClient from './PropertyFallbackClient';

interface PropertyFallbackProps {
  searchParams: { id?: string };
}

export async function generateMetadata({ searchParams }: PropertyFallbackProps): Promise<Metadata> {
  const id = searchParams.id;
  try {
    if (!id || isNaN(parseInt(id, 10))) {
      throw new Error(`Invalid property ID: ${id}`);
    }

    const res = await fetch(`https://apidoc.rheel.ng/data/properties/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();
    const property: Property = result.data ?? result; // Handle both { data: Property } and direct Property responses

    if (!property || !property.id) {
      throw new Error("Property not found or invalid");
    }

    // Validate required fields
    if (!property.location || !property.bedroom || !property.bathroom || !property.living_room || !property.price || !property.property_description) {
      throw new Error("Missing required property fields");
    }

    const propertyType = propertyTypes[property.property_type_id] || 'Property';
    const title = `${property.bedroom} Bedroom ${propertyType} for ${property.property_availability} in ${property.location}`;
    const description = `${property.property_description.slice(0, 160)} | ${property.bedroom} Bed, ${property.bathroom} Bath, ${property.living_room} Living Room. Price: ${property.price}. Located in ${property.location}.`;

    console.log(`✅ Generated metadata for fallback property ${id}:`, { title, description });

    return {
      title,
      description,
      keywords: [
        `properties in ${property.location}`,
        `${property.bedroom} bedroom ${propertyType.toLowerCase()} ${property.location}`,
        `${property.property_availability} properties ${property.location}`,
        `${propertyType.toLowerCase()} for ${property.property_availability} in ${property.location}`,
        `real estate ${property.location}`,
        `${property.amenities?.join(', ') || ''} ${property.location}`,
      ],
      openGraph: {
        title,
        description,
        type: 'website',
        url: `https://rheel.ng/properties/fallback?id=${id}`,
        images: property.property_images?.length > 0 ? [{
          url: property.property_images[0],
          width: 1200,
          height: 630,
          alt: title,
        }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: property.property_images?.length > 0 ? [property.property_images[0]] : [],
      },
      alternates: {
        canonical: `https://rheel.ng/properties/${id}`, // Canonical to the main property URL
      },
      other: {
        'structured-data': JSON.stringify({
          '@context': 'https://schema.org',
          '@type': property.property_type_id === 7 || property.property_type_id === 8 ? 'Land' : 'Residence',
          name: title,
          description: property.property_description,
          address: {
            '@type': 'PostalAddress',
            addressLocality: property.location,
            addressCountry: 'NG',
          },
          numberOfRooms: property.property_type_id === 7 || property.property_type_id === 8 
            ? undefined 
            : parseInt(property.bedroom, 10) + parseInt(property.bathroom, 10) + parseInt(property.living_room, 10),
          image: property.property_images || [],
          offers: {
            '@type': 'Offer',
            price: property.price,
            priceCurrency: 'NGN',
            availability: property.property_availability === 'sale' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
          },
        }),
      },
    };
  } catch (error) {
    console.error(`❌ Error in generateMetadata for fallback property ${id}:`, error);
    return {
      title: 'Property in Abuja',
      description: 'Explore properties for sale or rent in Abuja. Find your dream home with detailed listings.',
      keywords: ['properties in Abuja', 'Abuja real estate', 'homes for sale Abuja', 'apartments for rent Abuja'],
      openGraph: {
        title: 'Property in Abuja',
        description: 'Explore properties for sale or rent in Abuja.',
        url: `https://rheel.ng/properties/fallback?id=${id || 'unknown'}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Property in Abuja',
        description: 'Explore properties for sale or rent in Abuja.',
      },
      alternates: {
        canonical: `https://rheel.ng/properties/${id || 'unknown'}`,
      },
    };
  }
}

export default function PropertyFallbackPage({ searchParams }: PropertyFallbackProps) {
  return <PropertyFallbackClient searchParams={searchParams} />;
}