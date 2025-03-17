'use client'
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Stores = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
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

  return (
    <div ref={sectionRef} className="bg-[#F3F7FD] md:px-[130px] py-8 px-5 md:py-15">
      <motion.article 
        initial={{ opacity: 0, y: 50 }} 
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-7"
      >
        <span className="uppercase text-[#1563DF] text-[12px] font-bold">
          we are also available on your favourite stores
        </span>
        <h2 className="text-[#161E2D] font-bold text-2xl">
          Optimize your experience by downloading our Mobile App
        </h2>
      </motion.article>

      <motion.div 
        className="flex flex-col items-start md:items-center md:flex-row gap-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Apple Store Button */}
        <a href="https://apps.apple.com/us/app/rheel/id6467382726">
          <motion.button 
            className="flex cursor-pointer gap-2 items-center bg-black rounded-lg py-1 px-12 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image alt="Apple Logo" src="/images/apple-logo 1.svg" height={30} width={30} />
            <article>
              <span className="text-[9px]">Download on the</span>
              <p className="font-semibold text-[12px]">Apple Store</p>
            </article>
          </motion.button>
        </a>

        {/* Google Play Store Button */}
        <a href="https://play.google.com/store/apps/details?id=rheel.easy.property.search">
          <motion.button 
            className="flex cursor-pointer gap-2 items-center border border-[#121212] rounded-lg py-1 px-12 text-[#121212]"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image alt="Google Play Logo" src="/images/playstore 1.svg" height={30} width={30} />
            <article>
              <span className="text-[9px]">Get it on the</span>
              <p className="font-semibold text-[12px]">Google Play</p>
            </article>
          </motion.button>
        </a>
      </motion.div>
    </div>
  );
};

export default Stores;
