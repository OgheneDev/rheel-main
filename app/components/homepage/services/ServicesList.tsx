import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const ServicesList: React.FC = () => {
  // Defining an array of services with proper TypeScript typing
  const servicesData: Service[] = [
    {
      id: 1,
      title: 'Buy A New Home',
      description: 'Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742059912/purchase_sjc66b.png'
    },
    {
      id: 2,
      title: 'Sell A Home',
      description: 'Sell confidently with expert guidance and effective strategies, showcasing your property`s best features for a successful sale.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742059912/sales_u24c59.png'
    },
    {
      id: 3,
      title: 'Rent A Home',
      description: 'Discover your perfect rental effortlessly. Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742059912/lease_qkt3jn.png'
    }
  ];

  return (
    <div className="services-container flex flex-col md:flex-row gap-7" >
      {servicesData.map((service) => (
        <div key={service.id} className="service-card bg-white border border-[#E4E4E4] text-center shadow-md space-y-5 px-5 py-10">
          <Image src={service.icon} alt={service.title} width={200} height={200} className='mx-auto' />
          <h3 className='text-[#161E2D] font-bold'>{service.title}</h3>
          <p className='text-sm text-[#5C6368]'>{service.description}</p>
          <Link
          href='/services'
          >
          <button className='flex gap-2 items-center mx-auto cursor-pointer bg-white border border-[#0A2F1E] text-[#0A2F1E] hover:border-none hover:text-white hover:bg-[#0A2F1E] transition-colors duration-75 rounded-full py-2 px-10'>
            Learn More
            <ArrowRight size={20} />
          </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;