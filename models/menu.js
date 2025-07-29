const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['starter', 'main course', 'dessert'],
    required: true
  }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
