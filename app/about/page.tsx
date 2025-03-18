import Banner from "../components/about/Banner"
import AboutUs from "../components/about/AboutUs"
import Stores from "../components/general/Stores"
import OurStory from "../components/about/OurStory"
import MissionAndVision from "../components/about/MissionAndVision"
import CoreValues from "../components/about/CoreValues"
import Strength from "../components/about/Strength"
import Plans from "../components/about/Plans"

const page = () => {
  return (
    <>
      <Banner />
      <div className="px-5 md:px-[150px]">
      <AboutUs />
      <OurStory />
      <MissionAndVision />
      <CoreValues />
      <Strength />
      <Plans />
      </div>
      <Stores />
    </>
  )
}

export default page