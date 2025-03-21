import Image from "next/image"

const CoreValues = () => {
  return (
    <div className='flex flex-col md:flex-row gap-5 md:gap-14 justify-center items-center md:px-8  pb-5'>
        <div className="text-container flex-1">
            <h3 className='uppercase font-bold text-xl mb-2'>Our Core Values</h3>
            <p className="mb-5">At Rheel Estate, our core values guide everything we do :</p>
            <ul className='list-disc pl-4'>
                <li className='leading-7.5'>Integrity – We believe in being upfront and honest with our clients, offering clear, transparent information at all times.</li>
                <li className='leading-7.5'>Quality – We are committed to providing only the highest quality properties and services, rejecting poorly built or overpriced homes.</li>
                <li className='leading-7.5'>Customer-Centricity – Our clients are at the heart of everything we do, and we go above and beyond to ensure they have a smooth and seamless experience.</li>
                <li className='leading-7.5'>Innovation – We leverage cutting-edge technology to enhance the real estate process and make transactions faster, simpler, and more efficient.</li>
                <li className='leading-7.5'>Accountability – We take full responsibility for every transaction, providing accurate, well-documented records and keeping our clients informed throughout</li>
            </ul>
        </div>

        <div className="image-container flex-1">
            <Image
              src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1742592879/Photoroom_20250321_133303_xflbnk.png"
              width={500}
              height={500}
              alt='About Us'
              className="w-[90%] h-auto"
            />
        </div>
    </div>
  )
}

export default CoreValues