export default function BookDetail({ book, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-3xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="md:flex p-6">
          <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
            <div className="h-64 md:h-80 rounded-lg flex items-center justify-center">
              {book.coverImageUrl ? (
                <img
                
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-8xl font-bold text-gray-400">
                  {book.title.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <p className="text-gray-600 mt-2">by {book.author}</p>

            <div className="flex gap-2 mt-4">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {book.genre}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {book.publishedYear}
              </span>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-lg mb-2">Description</h4>
              <p className="text-gray-700">{book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
