import Banner from "../components/careers/Banner"
import CareersList from "../components/careers/CareersList"
import Stores from "../components/general/Stores"

const page = () => {
  return (
    <>
      <Banner />
      <div className="px-5 md:px-[130px] py-8 md:py-15">
        <p className="text-center text-[#5C6368]">At Rheel Estate Limited, we provide comprehensive real estate solutions designed to simplify property transactions, maximize investment opportunities, and ensure seamless property management. Whether you’re looking to buy, sell, lease, or invest, our expert team ensures a transparent, secure, and rewarding experience.</p>
       <CareersList />  
       <Stores />
      </div>  
    </>
  )
}

export default page