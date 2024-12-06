const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  businessName: 
  { 
    type: String, 
  },
  businessStory: 
  { 
    type: String, 
  },
  businessLocation: 
  { 
    type: String, 
  }
});

const businessDetails = mongoose.model('User', businessSchema);

module.exports = businessDetails;