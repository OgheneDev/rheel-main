const PropertyTypeButtons = () => {
    const propertyTypes = {
        1: 'Duplex',
        2: 'Terrace',
        3: 'Bungalow',
        4: 'Apartments',
        5: 'Commercial',
        6: 'Carcass',
        7: 'Land',
        8: 'JV Land',
    };

    return (
        <div className="flex flex-wrap gap-4 justify-center mb-10">
            {Object.values(propertyTypes).map((type, index) => (
                <button
                    key={index}
                    className="px-6 py-2 rounded-full text-[12px] bg-[#F7F7F7] text-[#161E2D] transition-colors"
                >
                    {type}
                </button>
            ))}
        </div>
    );
};

export default PropertyTypeButtons;