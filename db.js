const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/Hotel';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('MongoDB connected successfully!');
});

db.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

module.exports = db;
