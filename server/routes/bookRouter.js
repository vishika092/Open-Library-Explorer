import express from 'express';
import { getBooks, getBookById, getGenres } from '../controllers/bookController.js';

const bookRouter = express.Router();

bookRouter.get('/', getBooks);

bookRouter.get('/genres', getGenres);

bookRouter.get('/:id', getBookById);



export default bookRouter;