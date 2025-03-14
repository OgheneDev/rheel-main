import ServicesList from "./services/ServicesList"

const Services = () => {
  return (
    <section className="md:px-[130px] pb-8 px-5 md:pb-15">
        <article className="text-center mb-7 ">
            <span className="uppercase text-[#0A2F1E] text-[13px]">Our Services</span>
            <h2 className="text-3xl font-bold text-[#161E2D]">What We Do?</h2>
        </article>
        <ServicesList />
    </section>
  )
}

export default Services