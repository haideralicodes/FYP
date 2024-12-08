const mongoose = require('mongoose');

// Define the Category Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  selectedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Assuming there's a Product model in your system
    }
  ],
  images: [
    {
      type: String, // This stores the image file paths or URLs
      required: false, // Images are optional (based on your form)
    },
  ],
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;