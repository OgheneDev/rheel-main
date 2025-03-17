'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const TrustedBy = () => {
    const companyLogos = [
        '/images/real-estate.png',
        '/images/tagline.png',
        '/images/bauhouse.png',
        '/images/accusaf.png',
        '/images/company.png',
        '/images/business.png',
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
        <div ref={sectionRef} className="md:px-[130px] py-8 px-5 md:py-15">
            <h3 className="text-center mb-6 font-bold">Trusted By</h3>
            <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                {companyLogos.map((logo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <Image alt="Logo" src={logo} height={105} width={105} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default TrustedBy
