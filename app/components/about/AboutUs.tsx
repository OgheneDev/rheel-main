import Image from 'next/image'

const AboutUs = () => {
  return (
    <div className='flex flex-col md:flex-row gap-5 md:gap-14 justify-between items-center py-10 md:py-20 max-w-7xl mx-auto  md:px-8'>
      <div className="text-container md:w-1/2 lg:w-5/12">
        <h3 className='uppercase font-bold text-xl'>About Us</h3>
        <p className='leading-7 md:leading-8 text-base '>
          Rheel Estate Limited is an innovative real estate company founded with a singular mission: to bring transparency, trust, and efficiency to Nigeria's property market. With a deep understanding of the complexities that come with buying, selling, leasing, and managing properties, we are committed to transforming how Nigerians engage with the real estate industry, both at home and abroad.
        </p>
        <p className='leading-7 md:leading-8 text-base '>
          In an environment where real estate transactions are often clouded by hidden fees, unreliable service, and opaque processes, Rheel Estate stands out as a beacon of integrity and excellence. We believe that the future of real estate lies in creating a seamless, customer-centric experience that prioritizes clarity, fairness, and quality in every interaction.
        </p>
      </div>
      <div className="image-container md:w-1/2 lg:w-6/12">
        <Image
          src="/images/aboutus.png"
          width={600}
          height={600}
          alt='About Us'
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  )
}

export default AboutUs