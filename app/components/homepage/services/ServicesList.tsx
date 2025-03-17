"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";

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

  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      },
    },
  };
        
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: index * 0.2
      }
    }),
    hover: {
      y: -15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        delay: 0.2,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.3 
      }
    },
    hidden: { 
      opacity: 0, 
      y: 20 
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#0A2F1E",
      color: "white",
      borderColor: "#0A2F1E",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const arrowVariants = {
    hidden: { x: -5 },
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.5
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="services-container flex flex-col md:flex-row gap-7 px-4 md:px-0"
      >
        {servicesData.map((service, index) => (
          <motion.div 
            key={service.id} 
            custom={index}
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredCard(service.id)}
            onHoverEnd={() => setHoveredCard(null)}
            className="service-card cursor-pointer bg-white border border-[#E4E4E4] text-center shadow-md space-y-5 px-5 py-10 rounded-lg flex-1 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f8faf9] opacity-0"
              animate={{
                opacity: hoveredCard === service.id ? 0.2 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div
              variants={imageVariants}
              className="relative z-10"
            >
              <Image 
                src={service.icon} 
                alt={service.title} 
                width={200} 
                height={200} 
                className='mx-auto' 
              />
            </motion.div>
            
            <motion.h3 
              variants={textVariants}
              className='text-[#161E2D] font-bold text-xl'
            >
              {service.title}
            </motion.h3>
            
            <motion.p 
              variants={textVariants}
              className='text-sm text-[#5C6368]'
            >
              {service.description}
            </motion.p>
            
            <motion.div >
              <Link href='/services'>
                <motion.button 
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  className='flex gap-2  items-center mx-auto cursor-pointer bg-white border hover:bg-[#0A2F1E] hover:border-none hover:text-white transition-colors border-[#0A2F1E] text-[#0A2F1E] rounded-full py-2 px-10'
                >
                  Learn More
                  <motion.div variants={arrowVariants}>
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesList;