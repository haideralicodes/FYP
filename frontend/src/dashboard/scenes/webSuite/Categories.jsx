// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Checkbox,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
// } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Categories = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [categories, setCategories] = useState([]); // Ensure this starts as an empty array
//   const navigate = useNavigate();

//   // Fetch categories from the backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/categories/getCategories');
//         if (Array.isArray(response.data)) {
//           setCategories(response.data);
//         } else {
//           console.error('Unexpected response format:', response.data);
//           setCategories([]);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSearchChange = (event) => setSearchTerm(event.target.value);

//   const handleCategorySelect = (categoryId) => {
//     if (selectedCategories.includes(categoryId)) {
//       setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
//     } else {
//       setSelectedCategories([...selectedCategories, categoryId]);
//     }
//   };

//   const handleDeleteCategories = () => {
//     setCategories(categories.filter((cat) => !selectedCategories.includes(cat._id)));
//     setSelectedCategories([]);
//   };

//   // Filter categories based on search term
//   const filteredCategories = categories.filter((category) =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box sx={{ p: 4 }}>
//       {/* Search Bar */}
//       <TextField
//         fullWidth
//         label="Search Categories"
//         variant="outlined"
//         value={searchTerm}
//         onChange={handleSearchChange}
//         sx={{ mb: 2 }}
//       />

//       {/* New Category Button */}
//       <Button variant="contained" color="primary" onClick={() => navigate('/dashboard/Websuite/NewCategory')}>
//         New Category
//       </Button>

//       {/* Action Buttons */}
//       <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
//         <Button variant="contained" color="error" onClick={handleDeleteCategories} disabled={!selectedCategories.length}>
//           Delete
//         </Button>
//       </Box>

//       {/* Categories Table */}
//       <TableContainer component={Paper} sx={{ mt: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Select</TableCell>
//               <TableCell>Category Name</TableCell>
//               <TableCell>Products</TableCell>
//               <TableCell>Images</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredCategories.map((category) => (
//               <TableRow key={category._id}>
//                 <TableCell>
//                   <Checkbox
//                     checked={selectedCategories.includes(category._id)}
//                     onChange={() => handleCategorySelect(category._id)}
//                   />
//                 </TableCell>
//                 <TableCell>{category.name}</TableCell>
//                 <TableCell>
//                   {category.selectedProducts?.map((product) => (
//                     <Typography key={product._id} variant="body2">
//                       {product.name}
//                     </Typography>
//                   )) || 'No products'}
//                 </TableCell>
//                 <TableCell>
//                   {category.images?.map((image, index) => (
//                     <Card key={index} sx={{ maxWidth: 100, m: 1 }}>
//                       <CardMedia
//                         component="img"
//                         height="70"
//                         image={image.startsWith('http') ? image : /${image}} // Adjust URL handling
//                         alt={Image ${index}}
//                       />
//                     </Card>
//                   )) || 'No images'}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default Categories;






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
  TextField,
  Checkbox,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]); // Ensure this starts as an empty array
  const navigate = useNavigate();

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/categories/getCategories');
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleDeleteCategories = () => {
    setCategories(categories.filter((cat) => !selectedCategories.includes(cat._id)));
    setSelectedCategories([]);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
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
              <TableCell>Total Products</TableCell>
              <TableCell>Products List</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategorySelect(category._id)}
                  />
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.selectedProducts?.length || 0}</TableCell>
                <TableCell>
                  {category.selectedProducts?.length > 0
                    ? category.selectedProducts.map((product) => (
                        <Typography key={product._id} variant="body2">
                          {product.name}
                        </Typography>
                      ))
                    : 'No products'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Categories;