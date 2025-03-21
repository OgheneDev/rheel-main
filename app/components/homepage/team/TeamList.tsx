"use client";
import { useState, useEffect, useRef } from "react";
import { Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import { motion } from "framer-motion";

interface Team {
    icon: string,
    name: string,
    department: string
}

const TeamList: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    // Add in-view detection
    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        return () => {
            document.body.style.overflowX = 'auto';
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
    };

    const teamData: Team[] = [
        {
            icon:'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742325892/PHOTO-2025-03-18-18-13-09_1_ge9ndd.png',
            name: 'Odera Muoma',
            department: 'Founder / CEO'
        },
        {
            icon:'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742325891/PHOTO-2025-03-18-19-20-54_1_vbjzyt.png',
            name: 'Ochemba Obialo',
            department: 'Legal'
        },
        {
            icon:'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742325891/PHOTO-2025-03-18-17-07-35_1_uevalk.png',
            name: 'Chidinma Iwuh',
            department: 'Head of Operations / PRO'
        },
        {
            icon: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742325891/WhatsApp_Image_2025-03-18_at_6.50.41_PM_1_vhpjfo.png',
            name: 'Salisu Dabai ',
            department: 'Head of Logistics'
        },
        {
            icon:'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742325892/PHOTO-2025-03-18-18-14-42_1_sy0p0x.png',
            name: 'Okechukwu Mbonu',
            department: 'Analytics and Insights Manager'
        }
    ];

    // Number of items per view based on screen size
    const itemsPerView = isMobile ? 1 : 4;
    
    // Calculate total number of pages
    const totalPages = Math.ceil(teamData.length / itemsPerView);

    const createSlidingTeam = () => {
        let result = [...teamData];
        const remainder = teamData.length % itemsPerView;
        if (remainder > 0 && remainder < itemsPerView) {
            const itemsToAdd = itemsPerView - remainder;
            result = [...result, ...teamData.slice(0, itemsToAdd)];
        }
        return result;
    };

    // Group team members for current view
    const getGroupedTeam = () => {
        const result = [];
        const slidingTeam = createSlidingTeam();
        for (let i = 0; i < slidingTeam.length; i += itemsPerView) {
            result.push(slidingTeam.slice(i, i + itemsPerView));
        }
        return result;
    };

    // Check if mobile on mount and window resize
    useEffect(() => {
        const checkMobile = () => {
            const wasMobile = isMobile;
            const newIsMobile = window.innerWidth < 768;
            setIsMobile(newIsMobile);
            
            if (wasMobile !== newIsMobile) {
                setCurrentIndex(0);
                setIsTransitioning(false);
            }
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [isMobile]);

    // Navigation handlers
    const handleSlideChange = (index: number) => {
        setIsTransitioning(true);
        setCurrentIndex(index);
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
    };

    const isFirstSlide = currentIndex === 0;
    const isLastSlide = currentIndex === totalPages - 1;

    const nextSlide = () => {
        if (isTransitioning || isLastSlide) return;
        const nextIndex = (currentIndex + 1) % totalPages;
        handleSlideChange(nextIndex);
    };
    
    const prevSlide = () => {
        if (isTransitioning || isFirstSlide) return;
        const prevIndex = (currentIndex - 1 + totalPages) % totalPages;
        handleSlideChange(prevIndex);
    };

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) nextSlide();
        if (touchStart - touchEnd < -50) prevSlide();
    };



    const groupedTeam = getGroupedTeam();

    return (
        <section 
            ref={sectionRef}
            className=""
        >
            <motion.div 
                className="flex flex-col md:flex-row flex-wrap mx-auto px-5 md:px-0 gap-4 md:max-w-5xl overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
            >
                <div 
                    ref={sliderRef}
                    className="relative overflow-hidden w-full"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div 
                        className="flex gap-4 transition-transform duration-700 ease-in-out"
                        style={{ 
                            transform: `translateX(-${currentIndex * 100 / groupedTeam.length}%)`,
                            width: `${groupedTeam.length * 100}%`
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {groupedTeam.map((group, groupIndex) => (
                            <div 
                                key={groupIndex}
                                className="flex gap-4"
                                style={{ width: `${100 / groupedTeam.length}%` }}
                            >
                                {group.map((member, index) => (
                                    <div 
                                        key={`${groupIndex}-${index}`}
                                        className="w-full"
                                        style={{ flex: `0 0 calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 16 / itemsPerView}px)` }}
                                    >
                                        <motion.div 
                                            className=""
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Image src={member.icon} alt={member.name} width={200} height={200} className='mb-5 w-full' />
                                            <div className='flex justify-between'>
                                                <div>
                                                    <h3 className='text-[#161E2D] font-bold'>{member.name}</h3>
                                                    <span className='text-sm text-[#5C6368]'>{member.department}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation arrows and indicators */}
                <div className="flex justify-between mt-6 w-full">
                    <button 
                        onClick={prevSlide}
                        className={`p-2 rounded-full transition-colors ${
                            isFirstSlide 
                                ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                                : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
                        }`}
                        aria-label="Previous team member"
                        disabled={isFirstSlide || isTransitioning}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleSlideChange(index)}
                                className={`w-1 h-1  rounded-full transition-all ${
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
                        aria-label="Next team member"
                        disabled={isLastSlide || isTransitioning}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default TeamList;