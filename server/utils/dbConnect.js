import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vishika744:password123password@bootcamp.jdbm9y3.mongodb.net/bookstore");
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MonogDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB()