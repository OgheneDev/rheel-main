import React from 'react'

const Banner = () => {
  return (
    <div className="bg-[url('/images/career-banner.jpg')] bg-cover bg-center h-[260px] md:h-[500px] flex items-center justify-center bg-black/50 bg-blend-overlay">
      <article className='text-white'>
        <h3 className='text-4xl md:text-5xl mb-2 font-bold text-center'>Careers</h3>
        <p className='text-sm md:w-[230px] mx-auto text-center'>Build Your Future with Rheel Estate – Grow, Innovate, Succeed!</p>
      </article>
    </div>
  )
}

export default Banner