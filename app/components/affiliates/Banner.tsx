import React from 'react'

const Banner = () => {
  return (
    <div className="bg-[url('/images/affiliate-banner.jpg')] bg-cover bg-center h-[260px] md:h-[500px] flex items-center justify-center bg-black/40 bg-blend-overlay">
        <article className='text-white'>
            <h3 className='text-4xl md:text-5xl mb-2 font-bold text-center'>Affiliates</h3>
            <p className='text-sm text-center'>Turn Connections into Commissions, Earn with Rheel Estate</p>
        </article> 
    </div> 
  )
}

export default Banner