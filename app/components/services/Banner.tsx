import React from 'react'

const Banner = () => {
  return (
    <div className="bg-[url('/images/services-banner.jpg')] bg-cover bg-bottom md:bg-bottom-right h-[260px] bg-no-repeat bg-blend-overlay bg-black/40 w-full md:h-[400px] md:flex md:items-center md:justify-center">
      <article className='text-white text-center pt-20 md:pt-0'>
        <h3 className='text-2xl md:text-3xl font-bold md:mb-3'>Services</h3>
        <p>Homes/Services</p>
      </article>
    </div>
  )
}

export default Banner