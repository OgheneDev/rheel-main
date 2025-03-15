interface VideoTourProps {
    videoUrl:string[];
}

const VideoTour = ({videoUrl}: VideoTourProps) => {
  return (
    <div>
        <div className='pt-5'>
        <h3 className='text-[#1C1C1E] font-semibold mb-5"'>Video Tour</h3>
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={videoUrl[0]}
              title="Property Video Tour"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="absolute inset-0 pointer-events-none border border-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

export default VideoTour