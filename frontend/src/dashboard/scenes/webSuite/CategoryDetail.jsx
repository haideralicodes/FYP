import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state; // Get the passed category data

  const [categoryName, setCategoryName] = useState(category.name);
  const [description, setDescription] = useState(category.description || ''); // Initialize description
  const [status, setStatus] = useState(category.status);
  const [includeInMenu, setIncludeInMenu] = useState(category.includeInMenu === 'Yes'); // Initialize checkbox

  useEffect(() => {
    setCategoryName(category.name);
    setDescription(category.description || ''); // Set description
    setStatus(category.status);
    setIncludeInMenu(category.includeInMenu === 'Yes'); // Set checkbox state
  }, [category]);

  const handleSave = () => {
    // Here, you would normally save the changes to the server or state management
    console.log('Category Updated:', { categoryName, description, status, includeInMenu: includeInMenu ? 'Yes' : 'No' });
    navigate('/dashboard/Websuite/Categories'); // Navigate back to Categories
  };

  const handleToggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === 'Enabled' ? 'Disabled' : 'Enabled'));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Category
      </Typography>
      <TextField
        fullWidth
        label="Category Name"
        variant="outlined"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      {/* Checkbox for Include in Menu */}
      <FormControlLabel
        control={
          <Checkbox
            checked={includeInMenu}
            onChange={(e) => setIncludeInMenu(e.target.checked)}
            color="primary"
          />
        }
        label="Include in Menu"
      />
      
      {/* Status Toggle Buttons */}
      <Box sx={{ mb: 2 }}>
        <Button 
          variant={status === 'Enabled' ? 'contained' : 'outlined'} 
          color="primary" 
          onClick={handleToggleStatus}
          sx={{ mr: 2 }}
        >
          Enable
        </Button>
        <Button 
          variant={status === 'Disabled' ? 'contained' : 'outlined'} 
          color="secondary" 
          onClick={handleToggleStatus}
        >
          Disable
        </Button>
      </Box>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/dashboard/Websuite/Categories')} sx={{ ml: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default CategoryDetails;