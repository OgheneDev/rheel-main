'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const TrustedBy = () => {
    const companyLogos = [
        'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742326636/WhatsApp_Image_2025-03-18_at_4.12.54_PM_ccp2pp.png',
        'https://res.cloudinary.com/dgc8cd67w/image/upload/v1742326637/WhatsApp_Image_2025-03-18_at_4.12.55_PM_ayhvpt.png',
    ]

    const sectionRef = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        document.body.style.overflowX = 'hidden'
        return () => {
            document.body.style.overflowX = 'auto'
        }
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    return (
        <div ref={sectionRef} className="md:px-[150px] py-8 px-5 md:py-15">
            <h3 className="text-center mb-6 font-bold">Trusted By</h3>
            <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                {companyLogos.map((logo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <Image 
                            alt="Logo" 
                            src={logo} 
                            height={105} 
                            width={105} 
                            className={`w-auto h-auto flex-1`} 
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default TrustedBy
