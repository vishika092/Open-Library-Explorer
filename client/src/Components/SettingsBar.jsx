import FilterBooks from "./FilterBooks";
import { SearchBooks } from "./SearchBooks";
import SortBy from "./SortBy";
import { useState } from "react";
import settings from "../assets/settings.png";

export default function SettingsBar({
  filters,
  setFilters,
  setQuery,
  query,
  genres,
  sortBy,
  setSortBy,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "All" ? "" : value,
    }));
  };

  function handleReset(){
    setFilters({genre : "", year : ""});
    setSortBy("title")
    setShowFilters(false)

  }

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="bg-white shadow-lg rounded-xl p-6 flex   items-center gap-4">
        <SearchBooks setQuery={setQuery} query={query} />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className=" text-white px-3 py-2 rounded-full shadow-lg transition"
        >
          <img src={settings} alt="" className="w-7" />
        </button>
      </div>

      {showFilters && (
        <div className="absolute top-full right-0 bg-white shadow-lg rounded-lg p-5 w-fit z-50">
          <FilterBooks
            handleChange={handleChange}
            genres={genres}
            filters={filters}
          />

          <SortBy setSortBy={setSortBy} sortBy={sortBy} />
          <button onClick={handleReset} className="w-full px-3 py-1 bg-black text-white mt-4 rounded-lg cursor-pointer">Reset Filter</button>
        </div>
      )}
    </div>
  );
}
