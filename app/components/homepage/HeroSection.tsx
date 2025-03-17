'use client'
import { useState, useEffect, useRef } from "react"
import Search from "./hero section/Search"
import { motion } from "framer-motion"

const HeroSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

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
    <section
     ref={sectionRef}
     className="bg-[url('/images/hero-bg.jpg')] bg-cover bg-center h-screen bg-blend-overlay bg-black/40 text-white px-7 md:px-[130px] py-15 md:pt-30 text-center">
        <motion.article
         variants={containerVariants}
         initial="hidden"
         animate={inView ? 'visible' : 'hidden'}
         className="mb-10">
            <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-5">Find Your Dream Home</motion.h1>
            <motion.p variants={itemVariants} className="text-sm">We offering you a seamless blend of sophistication, security, and value. Whether you're a resident or in the diaspora. Buy with confidence and enjoy exclusive discounts and cashback, direct access to home owners, and flexible financing options all designed to make homeownership easier and more rewarding</motion.p>
        </motion.article>
        <motion.div variants={itemVariants}>
        <Search />
        </motion.div>
    </section>
  )
}

export default HeroSection