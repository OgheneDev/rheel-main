import Image from 'next/image'

const TrustedBy = () => {
    const companyLogos = {
        1: '/images/real-estate.png',
        2: '/images/tagline.png',
        3: '/images/bauhouse.png',
        5: '/images/accusaf.png',
        6: '/images/company.png',
        7: '/images/business.png',
    }

  return (
    <div className='md:px-[130px] py-8 px-5 md:py-15'>
        <h3 className='text-center mb-6 font-bold'>Trusted By</h3>
        <div className='flex flex-wrap justify-center gap-5 md:gap-10'>
            {Object.values(companyLogos).map((logo, index) => (
                <Image 
                 key={index}
                 alt='Logo'
                 src={logo}
                 height={105}
                 width={105}
                />
            ))}
        </div>
    </div>
  )
}

export default TrustedBy