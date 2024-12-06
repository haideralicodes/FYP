import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Stack
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

// Updated Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,  // Increased width
  height: 'auto',  // Let the height auto adjust with content
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 6,  // Increased padding
  borderRadius: 4, // Add rounded corners
};

const NewProductForm = ({ onClose }) => {
  const [images, setImages] = useState([]);

  // Handle image selection
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic can go here
    onClose();
  };

  return (
    <Box sx={modalStyle}>
      <Typography variant="h5" component="h2" gutterBottom>
        Add New Product
      </Typography>
      <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Product Name"
          margin="normal"
          variant="outlined"
          required
          sx={{ mb: 3 }}  // Add more spacing
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          margin="normal"
          variant="outlined"
          required
          sx={{ mb: 3 }}  // Add more spacing
        />
        <TextField
          fullWidth
          label="SKU"
          margin="normal"
          variant="outlined"
          required
          sx={{ mb: 3 }}  // Add more spacing
        />
        <TextField
          fullWidth
          label="Stock"
          type="number"
          margin="normal"
          variant="outlined"
          required
          sx={{ mb: 3 }}  // Add more spacing
        />

        {/* Image Upload Section */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Images
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{
                backgroundColor: '#1976d2',  // Custom button color
                '&:hover': {
                  backgroundColor: '#1565c0',  // Darken on hover
                }
              }}
            >
              Upload
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </Stack>

          {/* Display selected images */}
          <Box sx={{ mt: 2 }}>
            {images.length > 0 && (
              <Typography variant="subtitle2">Selected Images:</Typography>
            )}
            {images.map((image, index) => (
              <Typography key={index}>{image.name}</Typography>
            ))}
          </Box>
        </Box>

        {/* Form submission */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mr: 2, width: '120px' }}
          >
            Add Product
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{ width: '120px' }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewProductForm;