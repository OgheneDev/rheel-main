import React from 'react'
import TestimonialSlider from './testimonials/TestimonialSlider'

const Testimonials = () => {
  return (
    <section className="md:px-[130px] py-8 px-5 md:py-15 bg-[#F3F7FD]">
        <article className="text-center mb-7 md:px-12">
            <span className="uppercase text-[#0A2F1E] text-[12px]">Our Testimonials</span>
            <h2 className="text-2xl font-bold text-[#161E2D] mb-5">What’s people say’s</h2>
            <p className='text-sm text-[#5C6368]'>Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.</p>
        </article>
        <TestimonialSlider />
    </section>
  )
}

export default Testimonials