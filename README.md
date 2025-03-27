# Open Library Explorer

## Setup and Run Instructions

By following these steps, you should be able to set up and run both the backend and frontend components locally.

### Clone the Repository
```sh
git clone git@github.com:vishika092/Open-Library-Explorer.git
cd Open-Library-Explorer
```

### Install Dependencies
```sh
npm install
```

### Configure Environment Variables
Create a `.env` file in the backend directory with the necessary environment variables.

### Start the Backend Server
```sh
npm run dev
```

### Navigate to Frontend Repository
```sh
cd ../frontend
```

### Install Dependencies
```sh
npm install
```

### Start the Frontend Application
```sh
npm run dev
```

---

## Data Modeling
The **Book** model is designed as a document in MongoDB with fields such as:
- `title`
- `author`
- `genre`
- `description`
- `publishedYear`
- `coverImageUrl`

### Indexes
#### Single Field Indexes
- Indexes on `genre` and `publishedYear` improve filtering.

#### Compound Indexes
- `{ title: 1, _id: 1 }`
- `{ publishedYear: 1, _id: 1 }`
- `{ author: 1, _id: 1 }`

These indexes are designed for **cursor-based pagination**, ensuring queries can reliably pick up where the previous one left off.

#### Text Index
- A text index on `title` and `author` enables **full-text search**.

---

## API Structure

### GET `/api/books`
- Retrieves a list of books.
- Supports dynamic filtering by `genre` and `publishedYear`.
- Enables full-text search.
- Sorting by `title`, `publishedYear`, or `author`.
- Implements **cursor-based pagination** for efficiency with large datasets.

### GET `/api/books/genres`
- Returns a list of unique genres.
- Uses an aggregation pipeline to group books by genre, helping to populate filters on the client side.

### GET `/api/books/:id`
- Fetches detailed information about a single book identified by its unique ID.

---

## Design Decisions

### Pagination Strategy → Cursor-Based Pagination

- **Cursor-Based Pagination Efficiency:**
  - Cursor-based pagination leverages indexes to directly seek a specific position in the dataset.
  - This method avoids scanning and discarding many records—as with offset-based pagination (for example, skipping the first 999 rows to start at row 1000).
  - Consequently, the system processes fewer records, which leads to better performance, especially with large datasets.

- **Dynamic Query Construction with Indexes:**
  - The API builds queries dynamically based on client-supplied filters (such as genre and publishedYear), full-text search terms, and sorting preferences.
  - Clients can choose a sort field—such as title, publishedYear, or author—and the system leverages single field indexes, compound indexes, or a text index to support sorting, filtering, searching, and pagination.
  - Predefining these indexes greatly improves read/query performance by minimizing the number of documents scanned during each query, hence speeding up data retrieval.


- **Dynamic Query Construction with Indexes:**
  - The API builds queries dynamically based on client-supplied filters (such as genre and publishedYear), full-text search terms, and sorting preferences and the system leverages single field indexes, compound indexes, or a text index to support these operations with pagination.

  - Predefining these indexes greatly improves read/query performance by minimizing the number of documents scanned during each query, hence speeding up data retrieval.

---

## Trade-offs
### Complexity
-  Implementing cursor-based pagination adds complexity to both the client and the server. They must manage cursor strings and implement more advanced query logic, increasing development and maintenance efforts compared to a simpler offset-based approach.

### Maintenance Overhead
- Maintaining multiple indexes comes with a cost. Every time a document is inserted, updated, or deleted, all related indexes need to be updated. This additional work can slow down write operations and increase resource usage.


### Increased Storage Needs
-  Additional indexes require more disk space. While this trade-off is often acceptable given the benefits of improved read performance.

---
