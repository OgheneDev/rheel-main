

const MediaList = () => {
    const images = [
      "https://res.cloudinary.com/dgc8cd67w/image/upload/v1742235953/IMG-20240710-WA0008-DKvuID2F_kfikdk_a9ls8k.jpg",
      "https://res.cloudinary.com/dgc8cd67w/image/upload/v1742235491/image-1722027593710_dfdry5.jpg",
      "https://res.cloudinary.com/dgc8cd67w/image/upload/v1742235491/image-1722026431852_m3xwhb.jpg",
      "https://res.cloudinary.com/dgc8cd67w/image/upload/v1742235953/IMG-20240710-WA0000-B6sJKWqH_xapndz_qydcr4.jpg",
      "https://res.cloudinary.com/dgc8cd67w/image/upload/v1742235953/IMG-20240710-WA0006-BQ06V6fe_i3d0dn_pmmnud.jpg"
    ];
  
    return (
      <div className="p-6 py-10 md:py-15 md:px-[130px]">
        <div className="text-center mb-10">
            <span className="text-sm uppercase">Media gallery</span>
            <h4 className="font-bold text-2xl">Media</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden cursor-pointer rounded-lg shadow-lg">
              <img
                src={src}
                alt={`Media ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MediaList;
  