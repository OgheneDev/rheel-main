'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RiDoubleQuotesL } from 'react-icons/ri';

interface Testimonial {
  quote: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
    name: "Henry Fisher",
    position: "CEO",
    company: "Homefindr",
    rating: 5,
    image: "/testimonial-avatar-1.jpg"
  },
  {
    quote: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
    name: "Courtney Henry",
    position: "CEO",
    company: "Homefindr",
    rating: 5,
    image: "/testimonial-avatar-1.jpg"
  },
  {
    quote: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
    name: "Esther Howard",
    position: "CFO",
    company: "Homefindr",
    rating: 5,
    image: "/testimonial-avatar-2.jpg"
  },
  {
    quote: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
    name: "Annette Black",
    position: "CTO",
    company: "Homefindr",
    rating: 5,
    image: "/testimonial-avatar-3.jpg"
  },
  {
    quote: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
    name: "Bessie Cooper",
    position: "CTO",
    company: "Homefindr",
    rating: 5,
    image: "/testimonial-avatar-4.jpg"
  }
];


const createSlidingTestimonials = (items: Testimonial[], itemsPerView: number) => {

  let result = [...items];
  

  const remainder = items.length % itemsPerView;
  if (remainder > 0 && remainder < itemsPerView) {
    const itemsToAdd = itemsPerView - remainder;
    result = [...result, ...items.slice(0, itemsToAdd)];
  }
  
  return result;
};

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slidingTestimonials, setSlidingTestimonials] = useState(testimonials);
  
  // Number of items per view based on screen size
  const itemsPerView = isMobile ? 1 : 3;
  
  // Update sliding testimonials when view changes
  useEffect(() => {
    setSlidingTestimonials(createSlidingTestimonials(testimonials, itemsPerView));
  }, [itemsPerView]);
  
  // Calculate total number of pages
  const totalPages = Math.ceil(testimonials.length / itemsPerView);
  
  // Create properly grouped testimonials for current view
  const getGroupedTestimonials = () => {
    const result = [];
    
    for (let i = 0; i < slidingTestimonials.length; i += itemsPerView) {
      result.push(slidingTestimonials.slice(i, i + itemsPerView));
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
    
    // If we're at the last slide and it has duplicate items, we need to reset
    if (currentIndex === totalPages - 1 && testimonials.length % itemsPerView !== 0) {
      // This will happen after the animation completes
      const timeout = setTimeout(() => {
        if (currentIndex === totalPages - 1) {
          setCurrentIndex(0);
        }
      }, 5000); // Set a timeout before auto-resetting to first slide
      
      return () => clearTimeout(timeout);
    }
  };

  // Navigation handlers
  const nextSlide = () => {
    if (isTransitioning) return;
    
    const nextIndex = (currentIndex + 1) % totalPages;
    handleSlideChange(nextIndex);
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    
    const prevIndex = (currentIndex - 1 + totalPages) % totalPages;
    handleSlideChange(prevIndex);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (autoScrollPaused) return;
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning, autoScrollPaused]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setAutoScrollPaused(true);
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
    
    // Resume auto scrolling after a delay
    setTimeout(() => setAutoScrollPaused(false), 1000);
  };

  // Mouse handlers to pause auto-scroll when interacting
  const handleMouseEnter = () => {
    setAutoScrollPaused(true);
  };

  const handleMouseLeave = () => {
    setAutoScrollPaused(false);
  };

  // Get grouped testimonials
  const groupedTestimonials = getGroupedTestimonials();

  return (
    <div 
      className="w-full max-w-6xl mx-auto  overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
            transform: `translateX(-${currentIndex * 100 / groupedTestimonials.length}%)`,
            width: `${groupedTestimonials.length * 100}%`
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {groupedTestimonials.map((group, groupIndex) => (
            <div 
              key={groupIndex}
              className="flex"
              style={{ width: `${100 / groupedTestimonials.length}%` }}
            >
              {group.map((testimonial, index) => (
                <div 
                  key={`${groupIndex}-${index}`}
                  className="px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                    <div className="mb-4">
                      <RiDoubleQuotesL className='w-[40px] h-[40px] text-[#0A2F1E]' />
                      <p className="text-sm  text-[#161E2D]">{testimonial.quote}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6">
                      <div>
                        <h4 className="font-semibold text-base">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.position}, {testimonial.company}
                        </p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div> 
      </div>
      
      {/* Navigation arrows and indicators */}
      <div className="flex justify-between mt-6">
        <button 
          onClick={prevSlide}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Previous testimonial"
          disabled={isTransitioning}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Indicators - only show for real pages, not duplicate content */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
        
        <button 
          onClick={nextSlide}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Next testimonial"
          disabled={isTransitioning}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;