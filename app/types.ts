export interface Career {
    id: string;
    position: string;
    title: string;
    type: string;
    description: string;
    location: string;
    salary: number;
}

export interface Property {
    id: number;
    agent_id: number;
    amenities: string[];
    archived: boolean;
    bathroom: string;
    bedroom: string;
    created_at?: string;
    living_room: string;
    location: string;
    price: string;
    property_availability: string;
    property_description: string;
    property_images: string[];
    property_type_id: number;
    updated_at?: string;
    agent_name?: string;
    agent_image?: string;
    video_upload: string[];
    floor_plan: string[];
  }
  
  export const propertyTypes: { [key: number]: string } = {
    1: "Duplex",
    2: "Terraced House",
    3: "Detached House",
    4: "Semi-Detached House",
    5: "Apartment",
    6: "Carcass",
    7: "Land",
    8: "JV Land",
  };
  
  export const formatPrice = (price: string) => {
    return Number(price).toLocaleString("en-NG");
  };
