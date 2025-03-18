import Banner from "../components/services/Banner"
import ServicesList from "../components/services/ServicesList"
import TrustedBy from "../components/general/TrustedBy"
import Testimonials from "../components/general/Testimonials"
import FAQSection from "../components/general/Faqs"
import Stores from "../components/general/Stores"

const page = () => {
  return (
    <div>
        <Banner />
        <div className="py-8 px-5 md:py-15 md:px-[150px]">
            <p className="text-[#5C6368] text-center mb-7">At Rheel Estate Limited, we provide comprehensive real estate solutions designed to simplify property transactions, maximize investment opportunities, and ensure seamless property management. Whether you’re looking to buy, sell, lease, or invest, our expert team ensures a transparent, secure, and rewarding experience.</p>
            <article className="text-center mb-7">
                <span className="uppercase text-[12px] text-[#1563DF]">Our Services</span>
                <h3 className="text-2xl font-bold text-[#161E2D]">What We Do?</h3>
            </article>
            <ServicesList />
            <TrustedBy />  
        </div>
        <Testimonials />
        <FAQSection />
         <Stores />
    </div>
  )
}

export default page