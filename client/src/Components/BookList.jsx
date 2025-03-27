import { useEffect, useRef } from "react";
import BookCard from "./BookCard";
import useDebouncedQuery from "../hooks/useDebouncedQuery";
import useFetchBooks from "../hooks/useFetchBooks";
import BookCardSkeleton from "./BookCardSkeleton";

export default function BookList({ filters, onBookSelect, query, sortBy }) {
  
  const loaderRef = useRef();
  
 const debouncedQuery = useDebouncedQuery(query)
 const debouncedYear = useDebouncedQuery(filters.year)
const {books, load, loading , isNextPageAvailable} = useFetchBooks(filters, debouncedQuery, debouncedYear, sortBy)

  useEffect(() => {
    if (!isNextPageAvailable || loading) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        load();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isNextPageAvailable, loading]);

  return (
    <div className="mt-8">
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length > 0 ? books.map((book) => (
          <BookCard key={book._id} book={book} onClick={() => onBookSelect(book)} />
        )) :  <div className="text-gray-500">No Books</div> }
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading && Array.from({ length: 8 }).map((_, index) => <BookCardSkeleton key={index} />)}

      </div>
      <div ref={loaderRef} className="py-4 text-center">
        {!loading && !isNextPageAvailable && books.length > 0 && (
          <div className="text-gray-500">No more books to load</div>
        )}
      </div>
    </div>
  );
}
