import React from 'react'

const Banner = () => {
  return (
    <div className="bg-[url('/images/affiliates-banner.png')]  bg-cover bg-center h-[260px] md:h-[500px] flex items-center justify-center bg-blend-overlay bg-[#185A5199]">
        <article className='text-white'>
            <h3 className='text-4xl md:text-5xl mb-2 font-bold text-center'>Media</h3>
            <p className='text-sm md:w-[230px] mx-auto text-center'>Rheel Estate in the Spotlight – Stories, Updates & Insights!</p>
        </article> 
    </div>
  )
}

export default Banner