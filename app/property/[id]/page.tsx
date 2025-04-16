import { Property } from "@/app/types";
import PropertyWrapper from '../PropertyWrapper';

interface ApiResponse {
  data: Property[];
}

export async function generateStaticParams() {
  try {
    console.log("Fetching properties for static paths...");
    
    const res = await fetch("https://apidoc.rheel.ng/data/properties");
    
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

export default function PropertyPage({ params }: PageProps) {
  const id = parseInt(params.id, 10);
  return <PropertyWrapper id={id} />;
}