import Image from "next/image"

const OurStory = () => {
  return (
    <div className='flex flex-col md:flex-row gap-5 md:gap-10 justify-center items-stretch pb-10 md:pb-20'>
      <div className="image-container flex-1 relative min-h-[400px] md:min-h-full">
        <Image
          src='/images/odera.png'
          fill
          alt="Our Story"
          className="object-contain"
          priority
        />
      </div>
      <div className="text-container flex-1 space-y-5">
        <h3 className='uppercase font-bold text-xl'>Our Story</h3>
        <p className='leading-7.5'>Founded by Odera Muoma, Rheel Estate Limited was established with the vision to address the challenges faced by both property buyers and sellers in Nigeria. The real estate landscape has long been marred by unethical practices, inflated prices, and a lack of accessible services. With these issues in mind, we sought to create a company that not only delivers exceptional service but also promotes ethical practices that restore faith in the industry</p>
        <p className='leading-7.5'>Drawing on the extensive experience of our founder, who has seen firsthand the difficulties faced by Nigerians both in the diaspora and locally, Rheel Estate was designed to be a solution for the modern age—driven by technology, guided by integrity, and focused on long-term relationships with our clients. We understand that property transactions are some of the most important decisions people will ever make, which is why we approach every deal with the utmost care and professionalism.</p>
      </div>
    </div>
  )
}

export default OurStory