'use client'
import { useState, useEffect } from 'react';
import { getProperties } from '../../../api/properties/requests';
import PropertyCard from '../../general/PropertyCard';
import { ArrowDown, ArrowUp } from 'lucide-react';

// Define a Property type based on API response
interface Property {
    id: number; 
    agent_id: number;
    amenities: string[];
    archived: boolean;
    bathroom: string;
    bedroom: string;
    created_at: string;
    finance: boolean;
    floor_plan: string[];
    living_room: string;
    location: string;
    price: string;
    property_availability: string;
    property_description: string;
    property_images: string[];
    property_type_id: number;
    type: string;
    updated_at: string;
    video_upload: string[];
}

const FeaturedPropertyList = () => {
    const [properties, setProperties] = useState<Property[]>([]); // Corrected type
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState<boolean>(false);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getProperties();
                console.log('Fetched properties:', data);
                
                // Check if data is an array before setting state
                setProperties(Array.isArray(data) ? data : []);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return <p>Loading properties...</p>;
    if (error) return <p>Error: {error}</p>;
    const displayedProperties = showAll ? properties : properties.slice(0, 6);

    return (
        <div className="container mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            {properties.length > 6 && (
                <div className="text-center mt-8">
                    <button
                        className="bg-[#0A2F1E] text-white px-12 flex gap-2 items-center mx-auto cursor-pointer py-2 rounded-full text-sm"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ?
                         <>
                          Show Less <ArrowUp size={15} />
                         </> : 
                         <>
                          Load More <ArrowDown size={15} />
                         </>
                        }
                    </button>
                </div>
            )}
        </div>
    );
};

export default FeaturedPropertyList;
