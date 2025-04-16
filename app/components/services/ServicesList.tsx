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
  whyChooseUs?: string[];  // Add this new property
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
    {
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742592879/Photoroom_20250321_132931_ecnp8s.png',
      title: 'Cleaning Services',
      description: 'At Rheel Estate Limited, we understand that a newly purchased property isn’t truly ready until it’s spotless. That’s why we’ve partnered with Hallmark-Janitors, a professional cleaning service provider, to ensure your home is fresh, hygienic, and move-in ready.',
      subheading: 'Our Cleaning Services Include:',
      nestedList: [ 
        'Post-Construction Cleaning – Removing dust, debris, and residues left after construction.',
        'Deep Cleaning for New Homes – Sanitizing and polishing every corner for a fresh start.',
        'Standard Cleaning for Occupied Homes – Maintaining a clean and comfortable living space.',
        'Short-Term Rental & Lease Property Cleaning – Ensuring properties are spotless for new tenants'
      ],
      whyChooseUs: [
        'Expert Cleaning by Hallmark-Janitors – A trusted name in professional cleaning.',
        'Tailored to Your Needs – Whether it’s a one-time deep clean or routine maintenance.',
        'Move-In Ready Assurance – We handle the cleaning so you can settle in stress-free.',
        'Convenience for Diaspora Clients – We ensure your home is perfect before you arrive.'
      ],
      conclusion: 'Let Rheel Estate Limited and Hallmark-Janitors take care of the mess so you can focus on making your new house a home.'
    }
  ];

  const renderServiceCard = (service: ServiceItem, isReversed: boolean): React.ReactNode => {
    // Modify the Cleaning Services section
    if (service.title === 'Cleaning Services') {
      return (
        <div className="flex flex-col md:flex-row gap-6 h-full">
          <div className={`flex flex-col md:flex-row gap-8 w-full ${isReversed ? 'md:flex-row-reverse' : ''}`}>
            {/* Image Section */}
            <div className="md:w-1/3 flex items-center justify-center">
              <div className="w-full h-[200px] relative">
                <Image 
                  src={service.icon}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-2/3">
              <h3 className="font-semibold text-[#161E2D] text-xl mb-4">
                {service.title}
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-[#5C6368]">{service.description}</p>
                
                {service.subheading && (
                  <p className="text-sm font-medium mb-2 text-[#5C6368]">{service.subheading}</p>
                )}
                
                {service.nestedList && (
                  <ul className="list-disc pl-5 text-sm mb-4 space-y-1">
                    {service.nestedList.map((item: string, idx: number) => (
                      <li key={idx} className="text-[#5C6368]">{item}</li>
                    ))}
                  </ul>
                )}
                
                {service.whyChooseUs && (
                  <>
                    <p className="text-sm font-medium mb-2 text-[#5C6368]">Why Choose Us?</p>
                    <ol className="list-decimal pl-5 text-sm mb-4 space-y-1">
                      {service.whyChooseUs.map((item: string, idx: number) => (
                        <li key={idx} className="text-[#5C6368]">{item}</li>
                      ))}
                    </ol>
                  </>
                )}
                
                {service.conclusion && (
                  <p className="text-sm text-[#5C6368] mt-2 leading-tight">{service.conclusion}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className={`flex flex-col md:flex-row gap-8 w-full ${isReversed ? 'md:flex-row-reverse' : ''}`}>
          {/* Image Section */}
          <div className="md:w-1/3 flex items-center justify-center">
            <div className="w-full h-[200px] relative">
              <Image 
                src={service.icon}
                alt={service.title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-2/3">
            <h3 className="font-semibold text-[#161E2D] text-xl mb-4">
              {service.title}
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-[#5C6368]">{service.description}</p>
              {/* Render lists based on service type */}
              {service.format === 'bulleted' && service.servicesRendered && (
                <ol className="list-decimal pl-5 text-sm space-y-2">
                  {service.servicesRendered.map((item, idx) => (
                    <li key={idx} className="text-[#5C6368]">{item}</li>
                  ))}
                </ol>
              )}
              {service.numberedList && (
                <>
                  {service.subheading && (
                    <p className="text-sm font-medium mb-3 text-[#5C6368]">{service.subheading}</p>
                  )}
                  <ol className="list-decimal pl-5 text-sm space-y-1">
                    {service.numberedList.map((item: string, idx: number) => (
                      <li key={idx} className="text-[#5C6368]">{item}</li>
                    ))}
                  </ol>
                  
                  {service.nestedList && (
                    <ul className="list-disc pl-7 text-sm mt-1 space-y-1">
                      {service.nestedList.map((item: string, idx: number) => (
                        <li key={idx} className="text-[#5C6368]">{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {service.conclusion && (
                    <p className="text-sm text-[#5C6368]  mt-3  leading-tight">{service.conclusion}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          {[0, 2, 4, 6].map((startIndex) => (
            <div key={startIndex} className="grid grid-cols-1 gap-8">
              {servicesData.slice(startIndex, startIndex + 2).map((service, index) => (
                <div 
                  key={startIndex + index}
                  id={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white rounded-lg border border-gray-100 shadow-sm p-6"
                >
                  {renderServiceCard(service, index % 2 !== 0)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;