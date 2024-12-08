const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModels');
const Product = require('../models/productModels');

router.get('/getCartItems', async (req, res) => {
    const { userId } = req.query; // Get userId from query parameters

    try {
        // Fetch the cart items for the user
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart.items);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add product to cart
router.post('/add-to-cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find user's cart or create a new one
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      // If product exists in the cart, update quantity
      existingItem.quantity += quantity;
    } else {
      // Otherwise, add the product to the cart
      cart.items.push({ productId, quantity });
    }

    // Save the cart
    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Remove product from cart
router.delete('/remove-from-cart', async (req, res) => {
    const { userId, productId } = req.query; // Use query parameters

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove product from the cart
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // Save the updated cart
        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

  

module.exports = router;
