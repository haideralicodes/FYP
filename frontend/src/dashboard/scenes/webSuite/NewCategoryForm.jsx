import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Dummy products data with images
const productsData = [
  { id: 1, name: 'Product A', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product B', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product C', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Product D', image: 'https://via.placeholder.com/150' },
];

const NewCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Enabled');
  const [includeInMenu, setIncludeInMenu] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]); // Add product selection logic here
  const [categoryImages, setCategoryImages] = useState(null); // For image upload
  const [dialogOpen, setDialogOpen] = useState(false); // For opening product selection dialog
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    setCategoryImages(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submit logic here, like sending data to the backend
    console.log({
      categoryName,
      description,
      status,
      includeInMenu,
      selectedProducts,
      categoryImages,
    });
    navigate('/'); // Redirect back to categories page after creation
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

        <Typography>Status</Typography>
        <RadioGroup value={status} onChange={(e) => setStatus(e.target.value)} row>
          <FormControlLabel value="Enabled" control={<Radio />} label="Enabled" />
          <FormControlLabel value="Disabled" control={<Radio />} label="Disabled" />
        </RadioGroup>

        <FormControlLabel
          control={<Checkbox checked={includeInMenu} onChange={() => setIncludeInMenu(!includeInMenu)} />}
          label="Include in Menu"
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
              <Grid item xs={12} sm={6} md={4} key={product.id}>
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
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {product.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleProductSelect(product.id)}
                    sx={{ mt: 1 }}
                  >
                    {selectedProducts.includes(product.id) ? 'Deselect' : 'Select'}
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