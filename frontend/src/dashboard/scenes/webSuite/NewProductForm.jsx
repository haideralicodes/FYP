import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios'; 

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 6,
  borderRadius: 4,
};

const NewProductForm = ({ onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
  });
  const [images, setImages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert images to Base64
    const base64Images = await Promise.all(
      images.map((image) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result); // Base64 string
          reader.onerror = (err) => reject(err);
        })
      )
    );

    try {
      const response = await axios.post('http://localhost:4000/products/addProduct', {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        stock: formData.stock,
        images: base64Images, // Send Base64 images
      });

      onProductAdded(response.data); 
      setOpenSnackbar(true); 

      // Reset form
      setFormData({ name: '', price: '', description: '', stock: '' });
      setImages([]);
    } catch (err) {
      setError("error");
    }
  };

  return (
    <Box sx={modalStyle}>
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <Typography variant="subtitle1" gutterBottom>
          Upload Images
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
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
        <Box sx={{ mt: 2 }}>
          {images.map((image, index) => (
            <Typography key={index}>{image.name}</Typography>
          ))}
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
            Save Product
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </form>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Product saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewProductForm;