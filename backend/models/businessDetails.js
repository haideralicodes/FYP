const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  businessName: 
  { 
    type: String, 
    required: true, 
    unique: true 
    },
    branbusinessStory: 
  { 
    type: String, 
    required: true
    },
  branbusinessLocation: 
  { 
    type: String, 
    required: true 
    }
});

const businessDetails = mongoose.model('User', businessSchema);

module.exports = User;