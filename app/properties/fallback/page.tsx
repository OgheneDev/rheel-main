"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LoadingState, ErrorState } from "@/app/components/property/StateComponents";
import PropertyClient from "../PropertyClient";

export default function PropertyFallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      router.push("/property/not-found");
      return;
    }

    const validateProperty = async () => {
      try {
        const response = await fetch(`https://apidoc.rheel.ng/data/properties/${id}`, {
          next: { revalidate: 0 }
        });

        if (!response.ok) {
          throw new Error('Property not found');
        }

        const data = await response.json();
        if (!data) {
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
