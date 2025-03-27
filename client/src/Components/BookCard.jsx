export default function BookCard({ book, onClick }) {
    return (
      <div 
        className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-transform hover:-translate-y-1 cursor-pointer p-4"
        onClick={onClick}
      >
        <div className="h-72 flex items-center justify-center rounded-2xl bg-gray-100">
          {book.coverImageUrl ? (
            <img 
              src={book.coverImageUrl} 
              alt={book.title}
              className="object-contain max-h-full shadow-xl shadow-gray-400"
            />
          ) : (
            <div className="text-5xl font-bold text-gray-400">
              {book.title.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="mt-3 text-center">
          <h3 className="font-medium text-lg truncate">{book.title}</h3>
          <p className="text-gray-600 text-sm">{book.author}</p>
          <p className="text-gray-500 text-xs mt-1">
            {book.genre} • {book.publishedYear}
          </p>
        </div>
      </div>
    );
  }
  