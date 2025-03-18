import Image from 'next/image'

const AboutUs = () => {
  return (
    <div className='flex flex-col md:flex-row gap-5 md:gap-10 justify-center items-center  py-10 md:pb-20'>
        <div className="text-container flex-1">
            <h3 className='uppercase font-bold text-xl'>About Us</h3>
            <p className='leading-7.5'>Rheel Estate Limited is an innovative real estate company founded with a singular mission: to bring transparency, trust, and efficiency to Nigeria’s property market. With a deep understanding of the complexities that come with buying, selling, leasing, and managing properties, we are committed to transforming how Nigerians engage with the real estate industry, both at home and abroad. </p>
            <p className='leading-7.5'>In an environment where real estate transactions are often clouded by hidden fees, unreliable service, and opaque processes, Rheel Estate stands out as a beacon of integrity and excellence. We believe that the future of real estate lies in creating a seamless, customer-centric experience that prioritizes clarity, fairness, and quality in every interaction..</p>
        </div>
        <div className="image-container flex-1">
            <Image
             src="/images/aboutus.png"
             width={500}
             height={500}
             alt='About Us'
             className="w-full h-auto"
            />
        </div>
    </div>
  )
}

export default AboutUs