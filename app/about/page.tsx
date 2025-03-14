import Banner from "../components/about/Banner"
import About from "../components/about/About"
import Stores from "../components/general/Stores"

const page = () => {
  return (
    <>
      <Banner />
      <About />
      <div className="px-5 md:px-[130px] mb-5 md:mb-10">
      <Stores />
      </div>
    </>
  )
}

export default page