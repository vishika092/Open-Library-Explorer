import search from "../assets/search.png"

export function SearchBooks({setQuery, query}) {


  return (
    <div className="border-b w-full flex gap-4 border-gray-200 focus-within:border-gray-700 px-4 py-1">
      <img src={search} alt="" className="w-7" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books or authors..."
        className="focus:outline-none w-full"
      />
    </div>
  );
}