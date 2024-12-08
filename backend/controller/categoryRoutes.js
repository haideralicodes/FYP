// const express = require('express');
// const Category = require('../models/categoryModels');
// const Product = require('../models/productModels');
// const router = express.Router();

// // 1. Create a new category
// router.post('/create', async (req, res) => {
//   const { name, description, status, selectedProducts, images } = req.body;

//   try {
//     const newCategory = new Category({
//       name,
//       description,
//       selectedProducts,  
//       images,
//     });

//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // 3. Get all categories with their associated products
// router.get('/getCategories', async (req, res) => {
//   try {
//     const categories = await Category.find().populate('selectedProducts');
//     res.status(200).json(categories);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete categories
// router.post('/delete', async (req, res) => {
//     const { ids } = req.body;
    
//     try {
//       await Category.deleteMany({ _id: { $in: ids } });
//       res.status(200).json({ message: 'Categories deleted' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  

// module.exports = router;



const express = require('express');
const Category = require('../models/categoryModels');
const Product = require('../models/productModels');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // You can change the folder to fit your needs
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// 1. Create a new category with associated products and images
router.post('/create', upload.array('images', 10), async (req, res) => {
  const { name, description, selectedProducts } = req.body;

  // Collect the image paths
  const imagePaths = req.files ? req.files.map(file => file.path) : [];

  try {
    const newCategory = new Category({
      name,
      description,
      selectedProducts: JSON.parse(selectedProducts),  // Parse the selected products
      images: imagePaths, // Store the uploaded image paths
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 3. Get all categories with their associated products
router.get('/getCategories', async (req, res) => {
  try {
    const categories = await Category.find().populate('selectedProducts');
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;