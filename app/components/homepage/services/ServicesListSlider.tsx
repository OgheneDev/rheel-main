"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
} 

interface ServiceGroup {
  services: Service[];
}

const ServicesListSlider: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLearnMore = (serviceTitle: string) => {
    const serviceId = serviceTitle.toLowerCase().replace(/\s+/g, '-');
    if (pathname === '/services') {
      // We're on the services page, just scroll to element
      const element = document.getElementById(`service-${serviceId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // Navigate to services page with hash
      router.push(`/services#service-${serviceId}`);
    }
  };

  // Add the same effect as in Footer for handling hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && pathname === '/services') {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [pathname]);

  // Defining an array of services with proper TypeScript typing
  const servicesData: Service[] = [
    {
      id: 1,
      title: 'Investment Services',
      description: 'Our investment services help clients grow wealth through strategic real estate opportunities.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742253791/invest_pjjpth.png'
    },
    {
      id: 2,
      title: 'Sales',
      description: 'We assist buyers and sellers in navigating the real estate market with confidence.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742059912/sales_u24c59.png'
    },
    {
      id: 3,
      title: 'Lease',
      description: 'We help landlords and tenants find the right match for their rental needs.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742059912/lease_qkt3jn.png'
    },
    {
      id: 4,
      title: 'Facilities Management',
      description: 'We offer end-to-end property management services to ensure properties remain in top condition.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742253791/facilities_h2ttr8.png'
    },
    {
      id: 5,
      title: 'Interior Finishing',
      description: 'Many property developers deliver partially finished homes, completing only the exterior.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742253791/interior_nfa94i.png'
    },
    {
      id: 6,
      title: 'Purchase Assistance',
      description: 'Many Nigerians in the diaspora have lost millions to unreliable family members who mismanage or squander funds.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742059912/purchase_sjc66b.png'
    },
    {
      id: 7,
      title: 'Project Management',
      description: 'Many Nigerians in the diaspora have lost millions to unreliable family members who mismanage or squander funds meant for home construction.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742253791/construction_jlkzg2.png'
    },
    {
      id: 8,
      title: 'Cleaning Services',
      description: 'At Rheel Estate Limited, we understand that a newly purchased property isn’t truly ready until it’s spotless.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742592879/Photoroom_20250321_132931_ecnp8s.png'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Number of items per view based on screen size
  const itemsPerView = isMobile ? 1 : 3;
  
  // Calculate total number of slides
  const totalSlides = Math.max(1, Math.ceil(servicesData.length / itemsPerView));
  
  // Create properly grouped services for current view
  const getGroupedServices = (): ServiceGroup[] => {
    const result: ServiceGroup[] = [];
    // Create a padded version of services to handle edge cases
    let paddedServices = [...servicesData];
    
    // If we need to pad the last group
    const remainder = servicesData.length % itemsPerView;
    if (remainder > 0 && remainder < itemsPerView) {
      const servicesToAdd = itemsPerView - remainder;
      paddedServices = [...paddedServices, ...servicesData.slice(0, servicesToAdd)];
    }
    
    // Group services based on itemsPerView
    for (let i = 0; i < paddedServices.length; i += itemsPerView) {
      result.push({ services: paddedServices.slice(i, i + itemsPerView) });
    }
    
    return result;
  };
  
  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const wasMobile = isMobile;
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      
      // Reset to first slide when switching between mobile and desktop
      if (wasMobile !== newIsMobile) {
        setCurrentIndex(0);
        setIsTransitioning(false);
      }
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  // Handle slide change
  const handleSlideChange = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  // Handle the transition ending
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  // Add helper functions to check slide availability
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalSlides - 1;

  // Modify navigation handlers to include checks
  const nextSlide = () => {
    if (isTransitioning || isLastSlide) return;
    const nextIndex = (currentIndex + 1) % totalSlides;
    handleSlideChange(nextIndex);
  };
  
  const prevSlide = () => {
    if (isTransitioning || isFirstSlide) return;
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    handleSlideChange(prevIndex);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide();
    }
  };

  // Get grouped services
  const groupedServices = getGroupedServices();

  return (
    <section className="py-10">
      <div className="flex flex-col md:flex-row flex-wrap mx-auto px-5 md:px-10 lg:px-0 gap-4 md:max-w-5xl overflow-hidden">
        {/* Slider container */}
        <div 
          ref={sliderRef}
          className="relative overflow-hidden w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider track */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100 / groupedServices.length}%)`,
              width: `${groupedServices.length * 100}%`
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {groupedServices.map((group: ServiceGroup, groupIndex: number) => (
              <div 
                key={groupIndex}
                className="flex gap-4"
                style={{ width: `${100 / groupedServices.length}%` }}
              >
                {group.services.map((service: Service, index: number) => (
                  <div 
                    key={`${groupIndex}-${index}`}
                    className="w-full"
                    style={{ flex: `0 0 calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 16 / itemsPerView}px)` }}
                  >
                    <div className="bg-white border border-[#E4E4E4] h-full text-center shadow-md p-6 rounded-lg flex flex-col">
                      <div className="relative mb-4">
                        {service.icon && (
                          <Image 
                            src={service.icon} 
                            alt={service.title} 
                            width={150} 
                            height={150} 
                            className='mx-auto' 
                          />
                        )}
                      </div>
                      
                      <h3 className='text-[#161E2D] font-bold text-lg mb-4'>
                        {service.title}
                      </h3>
                      
                      <p className='text-sm text-[#5C6368] flex-grow mb-4'>
                        {service.description}
                      </p>
                      
                      <button 
                        onClick={() => handleLearnMore(service.title)}
                        className='flex gap-2 items-center justify-center mx-auto cursor-pointer bg-white border hover:bg-[#0A2F1E] hover:border-none hover:text-white transition-colors border-[#0A2F1E] text-[#0A2F1E] rounded-full py-2 px-10'
                      >
                        Learn More
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex justify-between mt-6 w-full">
          <button 
            onClick={prevSlide}
            className={`p-2 rounded-full transition-colors ${
              isFirstSlide 
                ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
            }`}
            aria-label="Previous services"
            disabled={isFirstSlide || isTransitioning}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-1 h-1 rounded-full transition-all cursor-pointer ${
                  currentIndex === index ? 'bg-[#0A2F1E]' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={isTransitioning}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className={`p-2 rounded-full transition-colors ${
              isLastSlide 
                ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
            }`}
            aria-label="Next services"
            disabled={isLastSlide || isTransitioning}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesListSlider;