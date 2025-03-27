import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  coverImageUrl: { type: String }
});

BookSchema.index({ genre: 1 }); 
BookSchema.index({ publishedYear: 1 })
BookSchema.index({ title: 1, _id: 1 }); 
BookSchema.index({ publishedYear: 1, _id: 1 });
BookSchema.index({ author: 1, _id: 1 });
BookSchema.index({ title: "text", author: "text"});


let BookModel = mongoose.model('BookModel', BookSchema, "books");

export default BookModel