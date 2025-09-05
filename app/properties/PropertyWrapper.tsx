'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropertyClient from './PropertyClient';

interface PropertyWrapperProps {
  id: number;
}

export default function PropertyWrapper({ id }: PropertyWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    const checkProperty = async () => {
      try {
        // First try to check if property exists in static paths
        const staticCheck = await fetch(`/api/properties/${id}.json`, {
          method: 'HEAD'
        });

        if (!staticCheck.ok) {
          // If not in static paths, check if it exists in API
          const apiCheck = await fetch(`https://apidoc.rheel.ng/data/properties/${id}`);
          
          if (apiCheck.ok) {
            // Property exists in API but not in static paths, use fallback
            router.replace(`/properties/fallback?id=${id}`);
          } else {
            // Property doesn't exist at all
            router.replace('/properties/not-found');
          }
        }
      } catch (error) {
        console.error('Error checking property:', error);
        // On error, try fallback
        router.replace(`/properties/fallback?id=${id}`);
      }
    };

    checkProperty();
  }, [id, router]);

  return <PropertyClient id={id} />;
}