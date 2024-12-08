const express = require('express');
const Product = require('../models/productModels');

const router = express.Router();

// Create a new product
router.post('/addProduct', async (req, res) => {
  try {
    const { name, description, price, stock, images } = req.body;
    const newProduct = new Product({ name, description, price, stock, images });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/getProduct', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });


// Bulk delete products
// Bulk delete products
router.post('/deleteProduct', async (req, res) => {
    try {
      const { ids } = req.body; // Array of selected product IDs
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Invalid or empty IDs array' });
      }
      
      const result = await Product.deleteMany({ _id: { $in: ids } }); // Delete products with these IDs
      res.status(200).json({ 
        message: `${result.deletedCount} product(s) deleted successfully` // Use backticks for template literal
      });
    } 
    catch (error) {
      console.error('Error deleting products:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });  

  
module.exports = router;