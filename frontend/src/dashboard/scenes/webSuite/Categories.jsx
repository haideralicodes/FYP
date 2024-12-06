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
  TextField,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation

// Dummy categories data
const initialCategories = [
  { id: 1, name: 'Brands', status: 'Enabled', includeInMenu: 'Yes' },
  { id: 2, name: 'Kid', status: 'Enabled', includeInMenu: 'No' },
  { id: 3, name: 'Women', status: 'Enabled', includeInMenu: 'Yes' },
  { id: 4, name: 'Men', status: 'Enabled', includeInMenu: 'Yes' },
];

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState(initialCategories);
  const navigate = useNavigate();

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleEnableCategories = () => {
    setCategories(categories.map(cat => (
      selectedCategories.includes(cat.id) ? { ...cat, status: 'Enabled' } : cat
    )));
  };

  const handleDisableCategories = () => {
    setCategories(categories.map(cat => (
      selectedCategories.includes(cat.id) ? { ...cat, status: 'Disabled' } : cat
    )));
  };

  const handleDeleteCategories = () => {
    setCategories(categories.filter(cat => !selectedCategories.includes(cat.id)));
    setSelectedCategories([]); // Clear the selected categories after deleting
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      {/* Search Bar */}
      <TextField
        fullWidth
        label="Search Categories"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      {/* New Category Button */}
      <Button variant="contained" color="primary" onClick={() => navigate('/dashboard/Websuite/NewCategory')}>
        New Category
      </Button>

      {/* Action Buttons */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleEnableCategories} disabled={!selectedCategories.length}>
          Enable
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleDisableCategories} disabled={!selectedCategories.length}>
          Disable
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteCategories} disabled={!selectedCategories.length}>
          Delete
        </Button>
      </Box>

      {/* Categories Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Include in Menu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategorySelect(category.id)}
                  />
                </TableCell>
                <TableCell>{category.status}</TableCell>
                <TableCell>{category.includeInMenu}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Categories;