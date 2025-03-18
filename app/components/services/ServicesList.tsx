import React from 'react';
import Image from 'next/image';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  servicesRendered?: string[];
  numberedList?: string[];
  nestedList?: string[];
  subheading?: string;
  conclusion?: string;
  format?: string;
}

const ServicesList: React.FC = () => {
  const servicesData: ServiceItem[] = [
    {
      icon: '/images/sales.png',
      title: 'Sales',
      description: 'We assist buyers and sellers in navigating the real estate market with confidence. Our platform offers:',
      servicesRendered: [
        'A wide selection of verified properties in Abuja.',
        'Professional guidance through every step, from property search to final purchase',
        'Discounts or CashBack reward on every successful property purchase',
        'Direct connections to property owners'
      ],
      format: 'bulleted'
    },
    {
      icon: '/images/lease.png',
      title: 'Lease',
      description: 'We help landlords and tenants find the right match for their rental needs:',
      servicesRendered: [
        'Discount property listings for landlords.',
        'Tenant screening to ensure reliability and security',
        'Short-term and long-term rental options, including furnished and unfurnished properties',
        'Seamless rental agreements and management support to ensure a hassle-free leasing experience.'
      ],
      format: 'bulleted'
    },
    {
      icon: '/images/invest.png',
      title: 'Investment Services',
      description: 'Our investment services help clients grow wealth through strategic real estate opportunities',
      servicesRendered: [
        'Guaranteed Sale Service (Coming Soon)',
        'Real estate advisory for investors looking to maximize returns.',
        'Exclusive deals on properties in high-growth areas, including Centenary City',
        'Flexible financing solutions for Nigerians in the diaspora, making property ownership more accessible (Coming Soon)'
      ],
      format: 'bulleted'
    },
    {
      icon: '/images/purchase.png',
      title: 'Purchase Assistance',
      description: 'Buying a property can be complex, especially for Nigerians living abroad, and sellers who care about keeping their identity confidential. We simplify the process through:',
      servicesRendered: [
        'Full transaction representation for absentee buyers or those who prefer to keep identity private',
        'Step-by-step guidance on legal, financial, and ownership processes',
        'Flexible payment plans to help clients acquire properties on finance',
        'Access to exclusive off-market deals for strategic investments'
      ],
      format: 'bulleted'
    },
    {
      icon: '/images/facilities.png',
      title: 'Facilities Management',
      description: 'We offer end-to-end property management services to ensure properties remain in top condition and generate consistent income:',
      servicesRendered: [
        'Regular maintenance and repairs to preserve property value',
        'Tenant management to handle inquiries, rent collection, and dispute resolution',
        'Financial reporting and transparency for property owners.',
        'Security and utility management for seamless operations'
      ],
      format: 'bulleted'
    },
    {
      icon: '/images/interior.png',
      title: 'Interior Finishing & Handover Service',
      description: 'Many property developers in Nigeria deliver partially finished homes, completing only the exterior while leaving the interior for buyers to customize. This can be challenging for buyers, especially those living abroad or with busy schedules. With Rheel Estate\'s Interior Finishing Service, we:',
      numberedList: [
        'Oversee the entire interior finishing process, ensuring top-quality materials and workmanship.',
        'Manage contractors, designers, and suppliers to bring the buyer\'s vision to life.',
        'Provide accurate financial reporting, keeping track of every expense.',
        'Offer a VIP handover experience, including:'
      ],
      nestedList: [
        'Professional property move-in',
        'Airport pickup for international clients',
        'Personal property tour & key handover with full documentation'
      ],
      conclusion: 'With this service, Rheel Estate represents clients from the beginning of their journey to the moment they step into their completed home.'
    },
    {
      icon: '/images/construction.png',
      title: 'Construction & Project Management',
      description: 'Many Nigerians in the diaspora have lost millions to unreliable family members who mismanage or squander funds meant for home construction. At Rheel Estate, we eliminate these risks by offering a trusted, professional project management service.',
      subheading: 'Our Construction & Project Management Service includes:',
      numberedList: [
        'Land Acquisition Assistance (if needed)',
        'Full construction oversight from foundation to finishing',
        'Regular progress updates with photos, videos, and financial reports',
        'Transparent cost management to prevent unnecessary expenses',
        'Secure and efficient contractor management, ensuring the project stays on time and within budget'
      ],
      conclusion: 'We act as your eyes and ears on the ground, ensuring that your dream home is built exactly as planned, with zero stress and 100% transparency.'
    },
  ];

  const renderServiceContent = (service: ServiceItem): React.ReactNode => {
    if (service.format === 'bulleted' && service.servicesRendered) {
      return (
        <ol className="list-decimal pl-5 text-xs space-y-1">
          {service.servicesRendered.map((item: string, idx: number) => (
            <li key={idx} className="text-gray-600">{item}</li>
          ))}
        </ol>
      );
    } else if (service.numberedList) {
      return (
        <>
          {service.subheading && (
            <p className="text-xs font-medium mb-3 text-gray-600">{service.subheading}</p>
          )}
          <ol className="list-decimal pl-5 text-xs space-y-1">
            {service.numberedList.map((item: string, idx: number) => (
              <li key={idx} className="text-gray-600">{item}</li>
            ))}
          </ol>
          
          {service.nestedList && (
            <ul className="list-disc pl-7 text-xs mt-1 space-y-1">
              {service.nestedList.map((item: string, idx: number) => (
                <li key={idx} className="text-gray-600">{item}</li>
              ))}
            </ul>
          )}
          
          {service.conclusion && (
            <p className="text-xs text-gray-600  mt-3  leading-tight">{service.conclusion}</p>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        {/* Top row - first 3 services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {servicesData.slice(0, 3).map((service: ServiceItem, index: number) => (
            <div 
              key={index} 
              id={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex flex-col"
            >
              <div className="flex justify-center mb-2">
                <div className="w-25 h-25 relative">
                  <Image 
                    src={service.icon}
                    alt={service.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              
              <h3 className="text-base font-semibold text-center mb-3">{service.title}</h3>
              
              <p className="text-xs text-gray-600 mb-2">{service.description}</p>
              
              <div className="mt-1">
                {renderServiceContent(service)}
              </div>
            </div>
          ))}
        </div>

        {/* Middle row - next 2 services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {servicesData.slice(3, 5).map((service: ServiceItem, index: number) => (
            <div 
              key={index + 3} 
              id={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex flex-col"
            >
              <div className="flex justify-center mb-2">
                <div className="w-25 h-25 relative">
                  <Image 
                    src={service.icon}
                    alt={service.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              
              <h3 className="text-base font-semibold text-center mb-3">
                {service.title}
              </h3>
              
              <p className="text-xs text-gray-600 mb-2">{service.description}</p>
              
              <div className="mt-1">
                {renderServiceContent(service)}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row - last 2 services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servicesData.slice(5).map((service: ServiceItem, index: number) => (
            <div 
              key={index + 5} 
              id={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex flex-col"
            >
              <div className="flex justify-center mb-2">
                <div className="w-25 h-25 relative">
                  <Image 
                    src={service.icon}
                    alt={service.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              
              <h3 className="text-base font-semibold text-center mb-3">
                {service.title}
              </h3>
              
              <p className="text-xs text-gray-600 mb-2">{service.description}</p>
              
              <div className="mt-1">
                {renderServiceContent(service)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;