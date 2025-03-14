import Search from "./hero section/Search"

const HeroSection = () => {
  return (
    <section className="bg-[url('/images/hero-bg.jpg')] bg-cover bg-center h-screen bg-blend-overlay bg-black/40 text-white px-7 md:px-[350px] py-15 md:pt-30 text-center">
        <article className="mb-10">
            <h1 className="text-5xl font-bold mb-5">Find Your Dream Home</h1>
            <p className="text-sm">We offering you a seamless blend of sophistication, security, and value. Whether you're a resident or in the diaspora. Buy with confidence and enjoy exclusive discounts and cashback, direct access to home owners, and flexible financing options all designed to make homeownership easier and more rewarding</p>
        </article>
        <Search />
    </section>
  )
}

export default HeroSection