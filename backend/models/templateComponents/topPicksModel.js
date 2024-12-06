const mongoose = require('mongoose');

const TopPicksSchema = new mongoose.Schema({
    products: [
      {
        productSrc: { type: String, required: true },  // URL or path to the product image
        productName: { type: String, required: true },
        productPrice: { type: String, required: true }
      }
    ]
});

const TopPicks = mongoose.model('TopPicks', TopPicksSchema);

module.exports = TopPicks;
