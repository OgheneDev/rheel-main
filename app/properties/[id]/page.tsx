import { Property } from "@/app/types";
import PropertyWrapper from '../PropertyWrapper';
import { Metadata } from 'next';
import { propertyTypes } from "@/app/types";

interface ApiResponse {
  data: Property[];
}

export async function generateStaticParams() {
  try {
    console.log("Fetching properties for static paths...");
    const res = await fetch("https://apidoc.rheel.ng/data/properties", {
      cache: 'no-store', // Ensure fresh data
    });
    
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    
    const jsonResponse = await res.json() as ApiResponse;
    const params = jsonResponse.data.map((property: Property) => ({
      id: property.id.toString(),
    }));

    console.log("✅ Generated static params:", params);
    return params;
  } catch (error) {
    console.error("❌ Error in generateStaticParams:", error);
    return [];
  }
}

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      throw new Error(`Invalid property ID: ${params.id}`);
    }

    const res = await fetch(`https://apidoc.rheel.ng/data/properties/${id}`, {
      cache: 'no-store', // Prevent caching issues
    });
    
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    
    const property: Property = await res.json();
    if (!property) {
      throw new Error("Property not found");
    }
    
    const propertyType = propertyTypes[property.property_type_id] || 'Property';
    const title = `${property.bedroom} Bedroom ${propertyType} for ${property.property_availability} in ${property.location}`;
    const description = `${property.property_description.slice(0, 160)} | ${property.bedroom} Bed, ${property.bathroom} Bath, ${property.living_room} Living Room. Price: ${property.price}. Located in ${property.location}.`;
    
    return {
      title,
      description,
      keywords: [
        `properties in ${property.location}`,
        `${property.bedroom} bedroom ${propertyType.toLowerCase()} ${property.location}`,
        `${property.property_availability} properties ${property.location}`,
        `${propertyType.toLowerCase()} for ${property.property_availability} in ${property.location}`,
        `real estate ${property.location}`,
        `${property.amenities.join(', ')} ${property.location}`,
      ],
      openGraph: {
        title,
        description,
        type: 'website',
        url: `https://rheel.ng/properties/${params.id}`,
        images: property.property_images.length > 0 ? [{
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
        images: property.property_images.length > 0 ? [property.property_images[0]] : [],
      },
      alternates: {
        canonical: `https://rheel.ng/properties/${params.id}`,
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
          image: property.property_images,
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
    console.error("❌ Error in generateMetadata:", error);
    return {
      title: 'Property in Abuja',
      description: 'Explore properties for sale or rent in Abuja. Find your dream home with detailed listings.',
      keywords: ['properties in Abuja', 'Abuja real estate', 'homes for sale Abuja', 'apartments for rent Abuja'],
      openGraph: {
        title: 'Property in Abuja',
        description: 'Explore properties for sale or rent in Abuja.',
        url: `https://rheel.ng/properties/${params.id}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Property in Abuja',
        description: 'Explore properties for sale or rent in Abuja.',
      },
      alternates: {
        canonical: `https://rheel.ng/properties/${params.id}`,
      },
    };
  }
}

export default function PropertyPage({ params }: PageProps) {
  const id = parseInt(params.id, 10);
  return <PropertyWrapper id={id} />;
}