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
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    const teamData: Team[] = [
        {
            icon:'https://res.cloudinary.com/dgc8cd67w/image/upload/v1741968616/Icon_ovodsn.png',
            name: 'Chris Pratt',
            department: 'Administrative Staff'
        },
        {
            icon:'https://res.cloudinary.com/dgc8cd67w/image/upload/v1741968616/Icon_ovodsn.png',
            name: 'Chris Pratt',
            department: 'Administrative Staff'
        },
        {
            icon:'https://res.cloudinary.com/dgc8cd67w/image/upload/v1741968616/Icon_ovodsn.png',
            name: 'Chris Pratt',
            department: 'Administrative Staff'
        },
        {
            icon:'https://res.cloudinary.com/dgc8cd67w/image/upload/v1741968616/Icon_ovodsn.png',
            name: 'Chris Pratt',
            department: 'Administrative Staff'
        }
    ]

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
  return (
    <section ref={sectionRef}>
        <motion.div 
         variants={containerVariants}
         initial="hidden"
         animate={inView ? 'visible' : 'hidden'}
         className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {teamData.map((team, index) => (
            <motion.div
            variants={itemVariants}
             key={index}
             className='md:w-[250px]'
            >
                <Image src={team.icon} alt={team.name} width={200} height={200} className='mb-5 w-full' />
                <div className='flex justify-between'>
                    <div>
                     <h3 className='text-[#161E2D] font-bold'>{team.name}</h3>
                     <span className='text-sm text-[#5C6368]'>{team.department}</span>
                    </div>
                    <div className='flex items-center gap-2 text-[#5C6368]'>
                        <div className='border border-[#5C6368] p-2 rounded-full'>
                        <Phone size={10} />
                        </div>
                        <div className='border border-[#5C6368] p-2 rounded-full'>
                        <Mail size={10} />
                        </div>
                    </div>
                </div>
            </motion.div>
        ))}
    </motion.div>
    </section>
  )
}

export default TeamList