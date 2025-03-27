import express from 'express';
import booksRouter from './routes/bookRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import './utils/dbConnect.js';



const app = express();

app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(express.json());

app.use('/api/books', booksRouter);


const PORT = 3004 ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});