import { useState, useEffect } from "react";

export default function useDebouncedQuery(query) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    if (query === debouncedQuery) return;
    
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  return debouncedQuery;
}
