const mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
    links: [
      {
        label: { type: String, required: true },
        url: { type: String, required: true }
      }
    ],
    copyright: { type: String, required: true }
});
  
  
const Footer = mongoose.model('Footer', FooterSchema);

module.exports = Footer;
