import Image from 'next/image'

const OurStory = () => {
  return (
    <div className='flex flex-col gap-8 md:flex-row w-full max-w-7xl mb-5 md:mb-0 mx-auto md:px-8 md:pb-15'>
      <div className="image-container w-full md:w-1/2 h-full">
        <div className="relative w-full h-[555px]">
          <Image
            src="/images/WhatsApp Image 2025-03-21 at 14.47.20_593d0df4.jpg"
            fill
            alt='Our Founder'
            className="object-fill rounded-[15px]"
            priority
          />
        </div>
      </div>
      <div className="text-container w-full md:w-1/2 flex flex-col">
        <h3 className='uppercase font-bold text-xl mb-6'>Our Story</h3>
        <div className="space-y-6">
          <p className='text-base leading-relaxed md:leading-8'>
            Founded by Odera Muoma, Rheel Estate Limited was established with the vision to address the challenges faced by both property buyers and sellers in Nigeria. The real estate landscape has long been marred by unethical practices, inflated prices, and a lack of accessible services. With these issues in mind, we sought to create a company that not only delivers exceptional service but also promotes ethical practices that restore faith in the industry.
          </p>
          <p className='text-base leading-relaxed md:leading-8'>
            Drawing on the extensive experience of our founder, who has seen firsthand the difficulties faced by Nigerians both in the diaspora and locally, Rheel Estate was designed to be a solution for the modern age—driven by technology, guided by integrity, and focused on long-term relationships with our clients. We understand that property transactions are some of the most important decisions people will ever make, which is why we approach every deal with the utmost care and professionalism.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OurStory