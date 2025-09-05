import { Metadata } from 'next';
import PropertyFallbackClient from './PropertyFallbackClient';

// Static metadata for the fallback page
export const metadata: Metadata = {
  title: 'Property in Abuja',
  description: 'Explore properties for sale or rent in Abuja. Find your dream home with detailed listings.',
  keywords: ['properties in Abuja', 'Abuja real estate', 'homes for sale Abuja', 'apartments for rent Abuja'],
  openGraph: {
    title: 'Property in Abuja',
    description: 'Explore properties for sale or rent in Abuja.',
    type: 'website',
    url: 'https://rheel.ng/properties/fallback',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property in Abuja',
    description: 'Explore properties for sale or rent in Abuja.',
  },
  alternates: {
    canonical: 'https://rheel.ng/properties/fallback',
  },
};

export default function PropertyFallbackPage() {
  return <PropertyFallbackClient />;
}