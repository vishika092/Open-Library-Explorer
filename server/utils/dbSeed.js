import BookModel from "../models/Book.js";

import "./dbConnect.js"
import fs from 'fs'

async function seed(){
    const rawData = fs.readFileSync("bestseller_books.json");
    const books = JSON.parse(rawData);

    await BookModel.insertMany(books);
    console.log(`Successfully inserted ${books.length} books into MongoDB`);
}


seed()