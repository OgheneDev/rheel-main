

const CareerSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <div className="flex justify-between mb-6">
        <div className="bg-gray-200 h-8 w-24 rounded-full animate-pulse" />
        <div className="bg-gray-200 h-8 w-24 rounded-full animate-pulse" />
      </div>
      
      <div className="bg-gray-200 h-7 w-3/4 rounded mb-4 animate-pulse" />
      <div className="space-y-2 mb-6">
        <div className="bg-gray-200 h-4 w-full rounded animate-pulse" />
        <div className="bg-gray-200 h-4 w-5/6 rounded animate-pulse" />
        <div className="bg-gray-200 h-4 w-4/6 rounded animate-pulse" />
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 h-5 w-5 rounded-full animate-pulse" />
          <div className="bg-gray-200 h-4 w-24 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 h-5 w-5 rounded-full animate-pulse" />
          <div className="bg-gray-200 h-4 w-32 rounded animate-pulse" />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <div className="bg-gray-200 h-6 w-24 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default CareerSkeleton;