interface AmenitiesProps {
    amenities: string[]
}

const Amenities = ({amenities}: AmenitiesProps ) => {
  return (
    <div className="pt-5">
        <h3 className="text-[#1C1C1E] font-medium mb-2">Amenities and Features</h3>
        <ul className="grid grid-cols-2">
            {amenities.map((amenity, index) => (
                <li key={index} className="list-disc ml-5 text-[#5C6368]">
                    {amenity}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Amenities