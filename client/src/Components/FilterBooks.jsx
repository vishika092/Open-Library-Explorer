import React from 'react'

function FilterBooks({filters, handleChange, genres}) {
  return (
    <>
     <div className='grid grid-cols-1 w-full gap-2 '>
        <div className="flex items-center gap-2">
          <label className="border-gray-200  font-medium">Genre:</label>
          <select 
            name="genre" 
            value={filters.genre || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-black"
          >
              <option value="">All</option>
            {genres.length > 0 && genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        
        <div className="flex items-center gap-2">
          <label className="font-medium ">Year:</label>
          <input
            type="number"
            name="year"
            placeholder="Filter by year"
            value={filters.year}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        </div>
    </>
  )
}

export default FilterBooks