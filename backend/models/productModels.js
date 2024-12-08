const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
images: [
  {
    type: String,
    required: true,
  }
],
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;