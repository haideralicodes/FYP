const mongoose = require('mongoose');

const NavbarSchema = new mongoose.Schema({
    // brandName: { type: String, required: true },
    links: [
        {
            label: { type: String, required: true },
            url: { type: String, required: true }
        }
    ]
  });

const Navbar = mongoose.model('Navbar', NavbarSchema);

module.exports = Navbar;
