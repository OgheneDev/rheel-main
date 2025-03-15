'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface PropertyImageSliderProps {
  images: string[];
}

const PropertyImageSlider: React.FC<PropertyImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Number of items per view based on screen size
  const itemsPerView = isMobile ? 1 : 3;
  
  // Calculate total number of slides
  const totalSlides = Math.max(1, Math.ceil(images.length / itemsPerView));
  
  // Create properly grouped images for current view
  const getGroupedImages = () => {
    const result = [];
    // Create a padded version of images to handle edge cases
    let paddedImages = [...images];
    
    // If we need to pad the last group
    const remainder = images.length % itemsPerView;
    if (remainder > 0 && remainder < itemsPerView) {
      const imagesToAdd = itemsPerView - remainder;
      paddedImages = [...paddedImages, ...images.slice(0, imagesToAdd)];
    }
    
    // Group images based on itemsPerView
    for (let i = 0; i < paddedImages.length; i += itemsPerView) {
      result.push(paddedImages.slice(i, i + itemsPerView));
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

  // Get grouped images
  const groupedImages = getGroupedImages();

  // If no images provided, show placeholder
  if (images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">No property images available</p>
      </div>
    );
  }

  return (
    <div className='md:pt-8'>
      <div className="w-full max-w-6xl py-5 mx-auto overflow-hidden rounded-lg">
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
              transform: `translateX(-${currentIndex * 100 / groupedImages.length}%)`,
              width: `${groupedImages.length * 100}%`
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {groupedImages.map((group, groupIndex) => (
              <div 
                key={groupIndex}
                className="flex"
                style={{ width: `${100 / groupedImages.length}%` }}
              >
                {group.map((imageUrl, index) => (
                  <div 
                    key={`${groupIndex}-${index}`}
                    className="px-1 md:px-2"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="relative h-64 md:h-80 lg:h-96 w-full">
                      <Image
                        src={imageUrl}
                        alt={`Property image ${groupIndex * itemsPerView + index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Navigation arrows (absolute positioned over the slider) */}
          <button 
            onClick={prevSlide}
            className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white/90 transition-colors shadow-md z-10"
            aria-label="Previous image"
            disabled={isTransitioning}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white/90 transition-colors shadow-md z-10"
            aria-label="Next image"
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
            aria-label={`Go to image slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyImageSlider;