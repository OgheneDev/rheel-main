import { useState, useEffect } from 'react';
import { getProperties } from '../../../api/properties/requests';
import PropertyCard from '../../general/PropertyCard';
import { ArrowDown, ArrowUp } from 'lucide-react';
import PropertyCardSkeleton from '../../general/PropertyCardSkeleton';
import { useSearch } from '@/app/context/SearchContext';


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
    const { searchParams } = useSearch();

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

    useEffect(() => {
        // Debug logging for search params
        if (searchParams.isSearchActive) {
            console.log('Active search params:', searchParams);
        }
    }, [searchParams]);

    if (loading) {
        return (
            <div className="flex flex-col md:flex-row flex-wrap mx-auto px-5 md:px-0 gap-4 md:max-w-5xl">
                {[...Array(6)].map((_, index) => (
                    <PropertyCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (error) return <p>Error: {error}</p>;

    // Filter properties based on search parameters
    let filteredProperties = properties;

    if (searchParams.isSearchActive) {
        console.log('Filtering with search params:', searchParams);
        
        filteredProperties = filteredProperties.filter((property) => {
            // Match property type (Sell/Lease)
            const matchesType = searchParams.type
                ? property.type === searchParams.type
                : true;
                
            // Match location if provided
            const matchesLocation = searchParams.location
                ? property.location.toLowerCase().includes(searchParams.location.toLowerCase())
                : true;

            // Match property type ID if provided
            const matchesPropertyType = searchParams.propertyTypeId
                ? property.property_type_id.toString() === searchParams.propertyTypeId
                : true;

            // Debug log for individual property filtering
            console.log(`Property ${property.id} filtering:`, {
                property_type: property.type,
                searchType: searchParams.type,
                matchesType,
                property_type_id: property.property_type_id,
                searchPropertyTypeId: searchParams.propertyTypeId,
                matchesPropertyType,
                location: property.location,
                searchLocation: searchParams.location,
                matchesLocation
            });

            return matchesType && matchesLocation && matchesPropertyType;
        });
    } else if (selectedType) {
        // Filter by selected property type when no search is active
        filteredProperties = filteredProperties.filter(property => property.property_type_id === selectedType);
    }

    console.log('Filtered properties count:', filteredProperties.length);
    
    const displayedProperties = showAll ? filteredProperties : filteredProperties.slice(0, 6);

    // Modified FeaturedPropertyList component
return (
    <div className="" id="properties-section">
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 px-5 lg:px-0 md:px-10">
          <p className="text-center text-gray-500 text-lg">No properties match your search criteria.</p>
          <p className="text-center text-gray-400 mt-2">Try adjusting your filters or search for a different location.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row flex-wrap px-5 md:px-10 lg:px-0 mx-auto gap-4 md:max-w-4xl lg:max-w-5xl">
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