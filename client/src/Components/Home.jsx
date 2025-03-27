import { useEffect, useState } from 'react';
import BookList from './BookList';
import BookDetail from './BookDetail';
import SettingsBar from './SettingsBar';
import axios from 'axios'

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [filters, setFilters] = useState({
    genre: '',
    year: ''
  });
  const [query, setQuery] = useState('');
  const [genres, setGenres] = useState('');
  const [sortBy, setSortBy] = useState("title");

  
  
  useEffect(() => {
    async function h(){
        try{
            let res = await axios.get("/api/books/genres");
            setGenres(res.data)

        }
        catch(err){
            console.log(err);
            
        }
    }
    h()
  }, [])
  
  return (
    <div className="pb-12">
      <div className=" mx-auto px-4 py-6">
        <SettingsBar filters={filters} setFilters={setFilters} setQuery={setQuery} query={query} genres={genres} sortBy={sortBy} setSortBy={setSortBy} />
        <BookList 
          filters={filters} 
          onBookSelect={setSelectedBook}
          query={query}
          sortBy={sortBy}
        />
        {selectedBook && (
          <BookDetail 
            book={selectedBook} 
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </div>
  );
}