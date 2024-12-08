import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Toolbar,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import NewProductForm from './NewProductForm';

const Products = () => {
  const [products, setProducts] = useState([]); // Products from DB
  const [selectedProducts, setSelectedProducts] = useState([]); // Selected product IDs
  const [isFormOpen, setIsFormOpen] = useState(false); // Control form visibility
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products/getProduct');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle Product Addition
  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setSnackbar({ open: true, message: 'Product added successfully!', severity: 'success' });
    setIsFormOpen(false); // Close the form
  };

  // Handle Product Selection
  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle Select All Products
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allProductIds = products.map((product) => product._id);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleDeleteProducts = async () => {
    try {
      // Make sure the correct endpoint is used here
      await axios.post('http://localhost:4000/products/deleteProduct', {
        ids: selectedProducts, // Send 'ids' as expected by backend
      });
  
      setProducts((prevProducts) =>
        prevProducts.filter((product) => !selectedProducts.includes(product._id))
      );
      setSelectedProducts([]);
      setSnackbar({ open: true, message: 'Products deleted successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting products!', severity: 'error' });
      console.error('Error deleting products:', error);
    }
  };
  

  return (
    <Box sx={{ p: 4 }}>
      {/* Toolbar */}
      <Toolbar>
        <Button variant="contained" color="primary" onClick={() => setIsFormOpen(true)} sx={{ mr: 2 }}>
          New Product
        </Button>
        {selectedProducts.length > 0 && (
          <Button variant="contained" color="error" onClick={handleDeleteProducts}>
            Delete Selected
          </Button>
        )}
      </Toolbar>

      {/* Products Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedProducts.length > 0 && selectedProducts.length < products.length
                  }
                  checked={products.length > 0 && selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleSelectProduct(product._id)}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={product.images?.[0]} // Display the first image
                    alt={product.name}
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* New Product Form */}
      {isFormOpen && (
        <NewProductForm
          onClose={() => setIsFormOpen(false)}
          onProductAdded={handleProductAdded}
        />
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Products;