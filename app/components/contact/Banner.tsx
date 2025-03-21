import React from 'react'

const Banner = () => {
  return (
    <div className="bg-[url('/images/contact-banner.jpg')] bg-cover bg-center h-[260px] md:h-[500px] flex items-center justify-center bg-black/40 bg-blend-overlay">
        <article className='text-white'>
            <h3 className='text-4xl md:text-5xl mb-2 font-bold text-center mt-[108px] ml-6'>Contact</h3>
            <p className='text-sm md:w-[230px] mx-auto text-center'>Let’s Connect – Your Real Estate Journey Starts Here</p>
        </article> 
    </div>
  )
}

export default Banner