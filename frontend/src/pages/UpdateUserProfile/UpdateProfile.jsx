import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

function UpdateProfile() {
  const [isEditable, setIsEditable] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  // Fetch user details from the API
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    try {
      // Use the correct base URL for the API
      const response = await axios.put('http://localhost:4000/api/user', userDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      setIsEditable(false); 
      console.log('User details updated successfully:', response.data);
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <Box sx={{width:"75vw", margin:"auto", borderTopLeftRadius:"22px"}}>
      
      <Box sx={{display:"flex", gap:"15px", ml:55}}>
        <lord-icon
          src="https://cdn.lordicon.com/kthelypq.json"
          trigger="loop"
          colors="primary:#000000"
          style={{paddingTop:"15px", height:"55px", width:"55px"}}>
        </lord-icon>
        <Typography variant="h1" color='#8367c7' fontWeight={550} fontSize={40} gutterBottom textAlign="center" marginTop="20px" marginBottom="20px">
          User Profile
        </Typography>
      </Box>

      <Card variant="outlined" sx={{backgroundColor:"#F5FFF6", boxShadow: '0px 20px 30px 10px rgba(0,0,0,0.1)', p:4, height:"78.7vh", borderTopLeftRadius:"25px", borderTopRightRadius:"25px"}}>
        <CardContent>
          <Stack spacing={3}>
            <TextField
              label="First Name"
              name="name"
              value={userDetails.firstName}
              onChange={handleChange}
              fullWidth
              disabled={!isEditable}
              sx={{
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Input font size
                '& .MuiInputLabel-root': { fontSize: '1.1rem' }, // Label font size
              }}
            />
            <TextField
              label="Last Name"
              name="name"
              value={userDetails.lastName}
              onChange={handleChange}
              fullWidth
              disabled={!isEditable}
              sx={{
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Input font size
                '& .MuiInputLabel-root': { fontSize: '1.1rem' }, // Label font size
              }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              fullWidth
              disabled={!isEditable}
              sx={{
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Input font size
                '& .MuiInputLabel-root': { fontSize: '1.1rem' }, // Label font size
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              fullWidth
              disabled={!isEditable}
              sx={{
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Input font size
                '& .MuiInputLabel-root': { fontSize: '1.1rem' }, // Label font size
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={userDetails.password}
              onChange={handleChange}
              fullWidth
              disabled={!isEditable}
              sx={{
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Input font size
                '& .MuiInputLabel-root': { fontSize: '1.1rem' }, // Label font size
              }}
            />
          </Stack>

          <Stack direction="row" spacing={4} mt={6}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEdit}
              disabled={isEditable}
              sx={{boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', backgroundColor: "transparent", color:"#04e762", border:"2px solid #04e762", width:"170px", height:"48px", fontSize:"17px", fontWeight:"550", borderRadius:"70px", transition:"0.5s ease-in-out", 
                ":hover":{backgroundColor:"#04e762", color:"white"}
                }}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!isEditable}
              sx={{boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.1)', backgroundColor: "transparent", color:"black", border:"2px solid black", width:"170px", height:"48px", fontSize:"17px", fontWeight:"550", borderRadius:"70px", transition:"0.5s ease-in-out", 
                ":hover":{backgroundColor:"black", color:"white"}
                }}
            >
              Save
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UpdateProfile;