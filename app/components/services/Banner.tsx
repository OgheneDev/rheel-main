import React from 'react'

const Banner = () => {
  return (
    <div className="bg-[url('/images/services-banner.jpg')] bg-cover bg-center h-[260px] md:h-[500px] flex items-center justify-center bg-black/40 bg-blend-overlay">
      <article className='text-white'>
        <h3 className='text-3xl font-bold'>Services</h3>
      </article>
    </div>
  )
}

export default Banner