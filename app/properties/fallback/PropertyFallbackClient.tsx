'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingState, ErrorState } from "@/app/components/property/StateComponents";
import PropertyClient from "../PropertyClient";

interface PropertyFallbackClientProps {
  searchParams: { id?: string };
}

export default function PropertyFallbackClient({ searchParams }: PropertyFallbackClientProps) {
  const router = useRouter();
  const id = searchParams.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      router.push("/properties/not-found");
      return;
    }

    const validateProperty = async () => {
      try {
        const response = await fetch(`https://apidoc.rheel.ng/data/properties/${id}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Property not found: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const property = data.data ?? data; // Handle both response types
        if (!property || !property.id) {
          throw new Error('Invalid property data');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error validating property:', error);
        setError(true);
        setLoading(false);
      }
    };

    validateProperty();
  }, [id, router]);

  if (!id) return null;
  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return <PropertyClient id={parseInt(id, 10)} />;
}