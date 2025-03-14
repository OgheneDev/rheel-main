import PropertyTypeButtons from "./featured properties/PropertyTypeButtons"
import FeaturedPropertyList from "./featured properties/FeaturedPropertyList"

const FeaturedProperties = () => {
  return (
    <section className="px-5 md:px-[130px] py-10 md:py-15">
        <article className="text-center mb-7">
            <span className="uppercase text-[#0A2F1E] text-[12px]">Featured Properties</span>
            <h2 className="text-2xl font-bold text-[#161E2D]">Recommended for you</h2>
        </article>
        <PropertyTypeButtons />
        <FeaturedPropertyList />
    </section>
  )
}

export default FeaturedProperties