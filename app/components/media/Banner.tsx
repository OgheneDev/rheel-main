import React from 'react'

const Banner = () => {
  return (
    <div className="bg-[url('/images/media-banner.jpg')]  bg-cover bg-center h-[260px] md:h-[500px] flex items-center justify-center bg-blend-overlay bg-black/40">
        <article className='text-white'>
            <h3 className='text-4xl md:text-5xl mb-2 font-bold text-center'>Media</h3>
            <p className='text-sm  text-center'>Rheel Estate in the Spotlight – Stories, Updates & Insights!</p>
        </article> 
    </div>
  )
}

export default Banner