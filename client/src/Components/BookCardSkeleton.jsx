export default function BookCardSkeleton() {
    return (
      <div className="book-card bg-white rounded-lg overflow-hidden animate-pulse">
        <div className="h-72 bg-gray-200 shadow-md flex items-center justify-center rounded-2xl"></div>
        <div className="p-4">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  