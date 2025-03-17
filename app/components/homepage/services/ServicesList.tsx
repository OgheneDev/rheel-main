"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
} 

const ServicesListSlider: React.FC = () => {
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
      title: 'Sell A Home',
      description: 'We assist buyers and sellers in navigating the real estate market with confidence.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742059912/sales_u24c59.png'
    },
    {
      id: 3,
      title: 'Rent A Home',
      description: 'We help landlords and tenants find the right match for their rental needs.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742059912/lease_qkt3jn.png'
    },
    {
      id: 4,
      title: 'Facilities Management',
      description: 'We offer end-to-end property management services to ensure properties remain in top condition and generate consistent income.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742253791/facilities_h2ttr8.png'
    },
    {
      id: 5,
      title: 'Interior Finishing & Handover Service',
      description: 'Many property developers in Nigeria deliver partially finished homes, completing only the exterior while leaving the interior for buyers to customize.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742253791/interior_nfa94i.png'
    },
    {
      id: 6,
      title: 'Purchase Assistance',
      description: 'Many Nigerians in the diaspora have lost millions to unreliable family members who mismanage or squander funds meant for home construction.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742059912/purchase_sjc66b.png'
    },
    {
      id: 7,
      title: 'Construction & Project Management',
      description: 'Many Nigerians in the diaspora have lost millions to unreliable family members who mismanage or squander funds meant for home construction.',
      icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742253791/construction_jlkzg2.png'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Number of items per view based on screen size
  const itemsPerView = isMobile ? 1 : 4;
  
  // Calculate total number of slides
  const totalSlides = Math.max(1, Math.ceil(servicesData.length / itemsPerView));
  
  // Create properly grouped services for current view
  const getGroupedServices = () => {
    const result = [];
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
      result.push(paddedServices.slice(i, i + itemsPerView));
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

  // Navigation handlers
  const nextSlide = () => {
    if (isTransitioning) return;
    
    const nextIndex = (currentIndex + 1) % totalSlides;
    handleSlideChange(nextIndex);
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    
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
      <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-lg">
        {/* Slider container */}
        <div 
          ref={sliderRef}
          className="relative overflow-hidden"
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
            {groupedServices.map((group, groupIndex) => (
              <div 
                key={groupIndex}
                className="flex"
                style={{ width: `${100 / groupedServices.length}%` }}
              >
                {group.map((service, index) => (
                  <div 
                    key={`${groupIndex}-${index}`}
                    className="px-2"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="service-card bg-white border border-[#E4E4E4] text-center shadow-md space-y-5 px-5 py-10 rounded-lg h-full flex flex-col">
                      <div className="relative">
                        {service.icon && (
                          <Image 
                            src={service.icon} 
                            alt={service.title} 
                            width={200} 
                            height={200} 
                            className='mx-auto' 
                          />
                        )}
                      </div>
                      
                      <h3 className='text-[#161E2D] font-bold text-xl'>
                        {service.title}
                      </h3>
                      
                      <p className='text-sm text-[#5C6368] flex-grow'>
                        {service.description}
                      </p>
                      
                      <div>
                        <Link href='/services'>
                          <button 
                            className='flex gap-2 items-center mx-auto cursor-pointer bg-white border hover:bg-[#0A2F1E] hover:border-none hover:text-white transition-colors border-[#0A2F1E] text-[#0A2F1E] rounded-full py-2 px-10'
                          >
                            Learn More
                            <ArrowRight size={20} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white/90 transition-colors shadow-md z-10"
            aria-label="Previous services"
            disabled={isTransitioning}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white/90 transition-colors shadow-md z-10"
            aria-label="Next services"
            disabled={isTransitioning}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Indicators */}
      <div className="flex justify-center mt-4 pb-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-1 h-1 mx-1 rounded-full transition-all ${
              currentIndex === index ? 'bg-[#0A2F1E] ring ring-[#165c3b] ring-opacity-50' : 'bg-gray-300'
            }`}
            aria-label={`Go to service slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesListSlider;