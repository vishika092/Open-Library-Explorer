import BookModel from '../models/Book.js';
import Book from '../models/Book.js';

/*
* GET /api/books
 *  - Retrieves a paginated list of books.
 *  - Supports filtering by genre and publishedYear.
 *  - Allows full-text search on title and author.
 *  - Enables dynamic sorting (by title, publishedYear, or author) using cursor-based pagination.
*/
export const getBooks = async (req, res) => {
  try {
      // set page size limit and extract query parameters for filtering, sorting, and pagination.
    const limit = 20;
    const cursor = req.query.cursor;
    const searchTerm = req.query.q;
    const genre = req.query.genre;
    const year = req.query.year;
    const sortBy = req.query.sortBy || "title"; 
    
    // Define sort options with a secondary sort on _id , this guarantees that even if multiple records have the same value for the sort field, their order remains consistent.
    const sortOptions = {
      title: { title: 1, _id: 1 },
      publishedYear : { publishedYear: 1, _id: 1 },
      author: { author: 1, _id: 1 },
    };

   
 // Build the query based on provided filters.
    const query = {};

    if (genre) query.genre = genre;
    if (year) query.publishedYear = year;

   // If a search term is provided, use full-text search based on proper full names of books or authors.
    if (searchTerm) {
      query.$text = { $search: `"${searchTerm}"` };
    }
    
    // If provided , it indicates where the previous page ended. This helps in fetching the next set of records.
    if (cursor) {
      const [lastSortValue, cursorId] = cursor.split("_");    // it splits the cursor into two parts
      query.$or = [
        { [sortBy]: { $gt: lastSortValue } },    // either it finds books where the current sort field value is greater than the last value
        { [sortBy]: lastSortValue, _id: { $gt: cursorId } },     // Or, if the sort field value is equal, it then looks for books with an _id greater than the last _id.
      ];
      // note : This mechanism ensures that the query resumes exactly where it left off, without skipping or repeating records.
    }

 // The query is executed with the defined filters, sorting, and a limit of 21 records (one extra than the page size , this helps determine helps determine if there are more records beyond the current page.)
    const books = await Book.find(query)
      .sort(sortOptions[sortBy])
      .limit(limit + 1);

    // if there's an extra document which indicates more results, and set the next cursor using the last record’s sort field value and _id
    const hasMore = books.length > limit;
    const nextCursor = hasMore
      ? `${books[limit - 1][sortBy]}_${books[limit - 1]._id}` 
      : null;


    res.json({
      books: books.slice(0, limit), 
      nextCursor,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/*

 * GET /api/books/:id
 *  - Retrieves detailed information about a specific book by its ID.
*/
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({book});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/*
 * GET /api/books/genres
 *  - Returns a list of unique genres.
 *  - Uses an aggregation pipeline to group books by genre.

*/
export const getGenres = async (req, res) => {
  try {
    const genres = await BookModel.aggregate([
      { $group: { _id: "$genre" } }, 
      { $project: { _id: 0, name: "$_id" } } 
    ]);
    
    res.json(genres.map(g => g.name)); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};