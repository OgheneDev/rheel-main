interface AmenitiesProps {
    amenities: string[]
}

const Amenities = ({amenities}: AmenitiesProps ) => {
  return (
    <div className="pt-5 md:pt-8 md:max-w-2xl md:mx-auto">
        <h3 className="text-[#1C1C1E] font-semibold text-xl mb-2">Amenities and Features</h3>
        <ul className="grid grid-cols-2 md:grid-col-5">
            {amenities.map((amenity, index) => (
                <li key={index} className="list-disc ml-5 text-[#5C6368] text-sm">
                    {amenity}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Amenities