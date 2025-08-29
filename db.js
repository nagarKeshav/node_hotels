const mongoose = require('mongoose');
require('dotenv').config();

// Get environment variables
const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const cluster = process.env.MONGODB_CLUSTER;
const dbname = process.env.MONGODB_DATABASE;

// const mongoURL = `mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority`;
const mongoURL = `mongodb://127.0.0.1:27017/Hotel`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
      }
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected!');
  setTimeout(connectDB, 5000); // Retry after 5 seconds
});

module.exports = db;
