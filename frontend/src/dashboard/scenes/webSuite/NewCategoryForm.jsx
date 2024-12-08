import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]); 
  const [categoryImages, setCategoryImages] = useState(null); 
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [productsData, setProductsData] = useState([]); 
  const navigate = useNavigate();

  // Fetch products from the backend API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/products/getProduct');
      setProductsData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageUpload = (event) => {
    setCategoryImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append category data
    formData.append('name', categoryName);
    formData.append('description', description);
    formData.append('selectedProducts', JSON.stringify(selectedProducts));

    // Append images
    if (categoryImages) {
      for (let i = 0; i < categoryImages.length; i++) {
        formData.append('images', categoryImages[i]);
      }
    }

    try {
      // Submit the form data to the backend to create a new category
      await axios.post('http://localhost:4000/categories/create', formData);
      navigate('/'); // Redirect to the categories page after creation
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Category
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />

        {/* Button Container for all action buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          {/* Add Product Button */}
          <Button variant="outlined" onClick={() => setDialogOpen(true)}>
            Add Products
          </Button>

          {/* Image Upload Button */}
          <Button variant="outlined" component="label">
            Upload Category Images
            <input type="file" multiple hidden onChange={handleImageUpload} />
          </Button>

          {/* Submit Button */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Save Category
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ mt: 1 }}>
          (Upload images for the category, you can select multiple files.)
        </Typography>
      </Box>

      {/* Product Selection Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Select Products</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {productsData.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Box
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {product.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleProductSelect(product._id)}
                    sx={{ mt: 1 }}
                  >
                    {selectedProducts.includes(product._id) ? 'Deselect' : 'Select'}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewCategoryPage;