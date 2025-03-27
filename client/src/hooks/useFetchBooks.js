import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function useFetchBooks(filters, debouncedQuery, debouncedYear, sortBy) {
  const [books, setBooks] = useState([]);
  const cursor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isNextPageAvailable , setIsNextPageAvailable ] = useState(true);

  async function load() {
    try {
      setLoading(true);
     
      const url = `/api/books?${cursor.current ? `cursor=${encodeURIComponent(cursor.current)}` : ""}${debouncedQuery ? `&q=${encodeURIComponent(debouncedQuery)}` : ""}${filters.genre ? `&genre=${encodeURIComponent(filters.genre)}` : ""}${debouncedYear ? `&year=${(debouncedYear)}` : ""}&sortBy=${sortBy}`;

      

      const res = await axios.get(url);
      const { books: newBooks, nextCursor } = res.data;
     
      setBooks((prev) => {
        const bookIds = new Set(prev.map((b) => b._id));
        return [...prev, ...newBooks.filter((b) => !bookIds.has(b._id))];
      });

      cursor.current = nextCursor
      setIsNextPageAvailable(!!nextCursor);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    cursor.current = null;
    setBooks([]);
    setIsNextPageAvailable(true);
    load();
  }, [debouncedQuery, filters.genre, debouncedYear, sortBy]);

  return { books, loading, isNextPageAvailable, load };
}
