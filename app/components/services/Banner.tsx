import React from 'react'

const Banner = () => {
  return (
    <div className="bg-[url('/images/services-banner.jpg')] bg-cover bg-center h-[260px] md:h-[500px] flex items-center justify-center bg-black/40 bg-blend-overlay">
      <article className='text-white'>
        <h3 className='text-4xl md:text-5xl mb-2 font-bold text-center'>Services</h3>
        <p className='text-sm text-center'>Seamless Real Estate Solutions, From Purchase to Perfection!</p>
      </article>
    </div>
  )
}

export default Banner