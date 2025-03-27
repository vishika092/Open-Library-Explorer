export default function SortBy({ sortBy, setSortBy }) {
    return (
      <div className="flex items-center mt-2 gap-3">
        <label className="font-medium min-w-fit">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 w-full rounded-md border-gray-300 bg-white shadow-sm hover:shadow-md transition"
        >
          <option value="title">Title</option>
          <option value="publishedYear">Year</option>
          <option value="author">Author</option>
        </select>
      </div>
    );
  }
  