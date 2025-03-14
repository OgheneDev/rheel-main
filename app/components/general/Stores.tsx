import Image from "next/image"

const Stores = () => {
  return (
    <div className='bg-[#F3F7FD] md:px-[130px] py-8 px-5 md:py-15'>
        <article className="mb-7">
            <span className="uppercase text-[#1563DF] text-[12px] font-bold">we are also available on your favourite stores</span>
            <h2 className="text-[#161E2D] font-bold text-2xl">Optimize your experience by downloading our Mobile App</h2>
        </article>
        <div className="flex flex-col items-start md:items-center md:flex-row gap-5">
            <button className="flex gap-2 items-center bg-black rounded-lg py-1 px-12 text-white">
                <Image
                 alt="Apple Logo"
                 src='/images/apple-logo 1.svg'
                 height={30}
                 width={30}
                />
                <article>
                    <span className="text-[9px]">Download on the</span>
                    <p className="font-semibold text-[12px]">Apple Store</p>
                </article>
            </button>
            <button className="flex gap-2 items-center border border-[#121212] rounded-lg py-1 px-12 text-[#121212]">
            <Image
                 alt="Google Play Logo"
                 src='/images/playstore 1.svg'
                 height={30}
                 width={30}
                />
                <article>
                    <span className="text-[9px]">Get it on the</span>
                    <p className="font-semibold text-[12px]">Google Play</p>
                </article>
            </button>
        </div>
    </div>
  )
}

export default Stores