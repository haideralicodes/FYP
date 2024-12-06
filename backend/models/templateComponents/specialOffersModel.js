const mongoose = require('mongoose');

const SpecialOffersSchema = new mongoose.Schema({
    offers: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }  // URL or path to the image
      }
    ]
});
  
const SpecialOffers = mongoose.model('SpecialOffers', SpecialOffersSchema);

module.exports = SpecialOffers;
