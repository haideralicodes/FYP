import React, { useState } from 'react';
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
  Modal,
  Checkbox,
  Toolbar,
  Typography,
  Stack
} from '@mui/material';
import NewProductForm from './NewProductForm';  

//  data
const initialProducts = [
  { id: 1, thumbnail: 'https://via.placeholder.com/50', name: 'Nike revolution 5', price: 255, sku: 'NJC44203-Brown-M', stock: 915, status: 'Available' },
  { id: 2, thumbnail: 'https://via.placeholder.com/50', name: 'Nike react phantom run flyknit 2', price: 718, sku: 'NJC48508-Green-S', stock: 0, status: 'Out of Stock' },
  { id: 3, thumbnail: 'https://via.placeholder.com/50', name: 'Nike react infinity run flyknit', price: 543, sku: 'NJC44141-Green-M', stock: 805, status: 'Available' },
  { id: 4, thumbnail: 'https://via.placeholder.com/50', name: 'Nike court vision low', price: 904, sku: 'NJC78436-Black-X', stock: 712, status: 'Available' }
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle select all checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allProductIds = products.map((product) => product.id);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  // Handle individual product selection
  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  // Determine if all products are selected
  const isAllSelected = products.length > 0 && selectedProducts.length === products.length;

  // Handle action button (e.g., delete, edit, disable, enable)
  const handleDelete = () => {
    const remainingProducts = products.filter((product) => !selectedProducts.includes(product.id));
    setProducts(remainingProducts);
    setSelectedProducts([]);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* New Product Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        New Product
      </Button>

      {/* Action buttons based on selected products */}
      {selectedProducts.length > 0 && (
        <Toolbar sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outlined" color="primary">
              Edit
            </Button>
            <Button variant="outlined" color="secondary">
              Disable
            </Button>
            <Button variant="outlined" color="success">
              Enable
            </Button>
          </Stack>
        </Toolbar>
      )}

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedProducts.length > 0 && selectedProducts.length < products.length}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} selected={selectedProducts.includes(product.id)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <img src={product.thumbnail} alt={product.name} style={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.stock > 0 ? '✔' : '✘'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for New Product Form */}
      <Modal open={open} onClose={handleClose}>
        <NewProductForm onClose={handleClose} />
      </Modal>
    </Box>
  );
};

export default Products;