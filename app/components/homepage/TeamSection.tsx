'use client'
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TeamList from "./team/TeamList"

const TeamSection = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

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

  return (
    <section
    ref={sectionRef}
    id="team" className="md:px-[150px] py-8 px-5 md:py-15">
        <motion.article className="text-center mb-10 ">
            <motion.span
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
            transition={{ duration: 0.5 }}
            className="uppercase text-[#0A2F1E] text-[12px]">Our Team</motion.span>
            <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-[#161E2D]">Meet The Team</motion.h2>
        </motion.article>
        <TeamList />
    </section>
  )
}

export default TeamSection