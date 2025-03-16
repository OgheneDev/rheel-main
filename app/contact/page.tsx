import Banner from "../components/contact/Banner"
import ContactForm from "../components/contact/ContactForm"
import ContactUs from "../components/contact/ContactUs"
import FAQSection from "../components/general/Faqs"
import Stores from "../components/general/Stores"
import MapComponent from "../components/contact/MapComponent"

const page = () => {
  return (
    <div>
        <Banner />
        <div className="px-5 py-10 flex flex-col md:flex-row md:justify-center md:py-15 md:px-[160px] gap-10">
        <ContactForm />
        <ContactUs />
        </div>
        <MapComponent />
        <FAQSection />
        <Stores />
    </div>
  )
}

export default page