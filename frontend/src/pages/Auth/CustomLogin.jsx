import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  TextField,
  Link
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const CustomLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [EmailError, SetEmailError] = useState('');
  const [PasswordError, SetPasswordError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    SetEmailError('');
    SetPasswordError('');

    // Validate inputs
    if (!email && !password) {
      SetEmailError('Email is required.');
      SetPasswordError('Password is required.');
      return;
    }
    if (!email) {
      SetEmailError('Email is required.');
      return;
    }
    if (!password) {
      SetPasswordError('Password is required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, userId } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        console.log("\n Token: ", token);
        console.log("\n User Id: ", userId);
        navigate('/dashboard');
      } else {
        const data = await response.json();
        if (data.message === 'User not found') {
          SetEmailError('Email is incorrect.');
        } else if (data.message === 'Incorrect password') {
          SetPasswordError('Password is incorrect.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "50vw", backgroundColor: "black", height: "100vh" }}></Box>
      <Box sx={{ width: "50vw", backgroundColor: "white", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "500px", p: 2 }}>
          <Typography variant='h5' sx={{ fontSize: "1.7rem", fontWeight: "700", lineHeight: "1.5" }}>Sign in to your account</Typography>
          <Typography variant='h6' sx={{ fontSize: "1rem", fontWeight: "400", lineHeight: "1.57143", color: "#637381", display: "flex", gap: "5px" }}>
            Don’t have an account? 
            <Link style={{ textDecoration: "none" }}>
              <Typography 
                onClick={() => navigate('/signup')}
                sx={{ fontSize: "1rem", fontWeight: "600", lineHeight: "1.57143", color: "#00A76F", ":hover": { textDecoration: "underline" } }}>Get started</Typography>
            </Link>
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: "35px", mt: "30px" }}>
            <TextField
              error={Boolean(EmailError)}
              fullWidth
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              helperText={EmailError}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black', // Default outline color
                  },
                  '&:hover fieldset': {
                    borderColor: 'black', // Outline color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black', // Outline color when focused
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'black', // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#00A76F', // Label color when focused
                  fontSize: "1.2rem",
                },
              }}
            />
            <Link style={{ textDecoration: "none", marginLeft: "71%", marginBottom: "-25px", marginTop: "-10px" }}>
              <Typography 
                sx={{ fontSize: "1rem", fontWeight: "600", lineHeight: "1.57143", color: "#00A76F", ":hover": { textDecoration: "underline" } }}
                onClick={() => navigate('/forget-password')}
              >
                Forgot Password?
              </Typography>
            </Link>
            <TextField
              error={Boolean(PasswordError)}
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              helperText={PasswordError}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black', // Default outline color
                  },
                  '&:hover fieldset': {
                    borderColor: 'black', // Outline color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black', // Outline color when focused
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'black', // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#00A76F', // Label color when focused
                  fontSize: "1.2rem",
                },
              }}
            />  
            <Button type="submit" variant="contained" sx={{ backgroundColor: "black", height: "3.3rem", fontWeight:"700", fontSize:"0.9375rem", lineHeight:"1.71429", textDecoration:"none"}}>Sign in</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomLogin;