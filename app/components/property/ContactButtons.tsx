import { Copy } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Property, propertyTypes } from "@/app/types";

interface ContactButtonsProps {
  property: Property;
}

const ContactButtons: React.FC<ContactButtonsProps> = ({ property }) => {
  const propertyType = propertyTypes[property.property_type_id] || "Unknown Type";

  const whatsappMessage = encodeURIComponent(
    `I am interested in the property at ${property.location}. Here are the details:\n
    - Property Type: ${propertyType}
    - Property ID: ${property.id}
    - Property Location: ${property.location}
    - Price: ${property.price}\n\n
    Please get back to me with more information.`
  );

  const emailMessage = encodeURIComponent(
    `I am interested in the property at ${property.location}. Here are the details:\n
    - Property Type: ${propertyType}
    - Property ID: ${property.id}
    - Property Location: ${property.location}
    - Price: ${property.price}\n\n
    Please get back to me with more information.`
  );

  const whatsappUrl = `https://wa.me/2348099222223?text=${whatsappMessage}`;
  const mailtoUrl = `mailto:hello@rheelestate.com?subject=Property%20Inquiry&body=${emailMessage}`;

  return (
    <div className="flex items-center justify-center gap-5">
      {/* WhatsApp Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex gap-2 cursor-pointer text-[12px] items-center bg-[#0A2F1E] text-white py-2 px-5 rounded-full"
      >
        <FaWhatsapp size={15} />
        Make enquiries
      </a>

      {/* Email Button */}
      <a 
        href={mailtoUrl} 
        className="flex gap-2 text-[12px] cursor-pointer items-center bg-[#0A2F1E] text-white py-2 px-5 rounded-full"
      >
        <Copy size={15} />
        Make enquiries
      </a>
    </div>
  );
};

export default ContactButtons;
