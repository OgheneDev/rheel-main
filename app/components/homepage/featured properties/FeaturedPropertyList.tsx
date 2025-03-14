import { useState, useEffect } from 'react';
import { getProperties } from '../../../api/properties/requests';
import PropertyCard from '../../general/PropertyCard';
import { ArrowDown, ArrowUp } from 'lucide-react';
import PropertyCardSkeleton from '../../general/PropertyCardSkeleton';

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
    property_availability: string;
    property_description: string;
    property_images: string[];
    property_type_id: number;
    type: string;
    updated_at: string;
    video_upload: string[];
    price: string;
  }

interface FeaturedPropertyListProps {
    selectedType: number | null;
}

const FeaturedPropertyList: React.FC<FeaturedPropertyListProps> = ({ selectedType }) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState<boolean>(false);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getProperties();
                console.log('Fetched properties:', data);
                setProperties(Array.isArray(data) ? data : []);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
                <PropertyCardSkeleton key={index} />
            ))}
        </div>
    );
    
    if (error) return <p>Error: {error}</p>;

    // Filter properties by selected type
    const filteredProperties = selectedType
        ? properties.filter(property => property.property_type_id === selectedType)
        : properties;

    const displayedProperties = showAll ? filteredProperties : filteredProperties.slice(0, 6);

    return (
        <div className="container mx-auto">
            {filteredProperties.length === 0 ? (
                <p className="text-center text-gray-500">No properties available for this type.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>

                    {filteredProperties.length > 6 && (
                        <div className="text-center mt-8">
                            <button
                                className="bg-[#0A2F1E] text-white px-12 flex gap-2 items-center mx-auto cursor-pointer py-2 rounded-full text-sm"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? (
                                    <>
                                        Show Less <ArrowUp size={15} />
                                    </>
                                ) : (
                                    <>
                                        Load More <ArrowDown size={15} />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FeaturedPropertyList;