import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {
    Box,
    Button,
    Typography,
    TextField,
    Link
} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const CustomResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ''; // Retrieve email from state

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [alertType, setAlertType] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');

  const validatePassword = (password) => {
    const errors = [];
    if (!password) {
      errors.push("Password is required.");
    } else {
      if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
      }
      if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character.");
      }
    }
    return errors;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    let isValid = true;

    setPasswordError('');
    setConfirmPassError('');
    setError('');
    setAlertType(null);

    const passwordErrors = validatePassword(password);

    if (!password && !confirmPassword) {
      setPasswordError('Password is required.');
      setConfirmPassError('Confirm password is required.');
      isValid = false;
    } else if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (!confirmPassword) {
      setConfirmPassError('Confirm password is required.');
      isValid = false;
    } else if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors.join(' '));
      isValid = false;
    } else if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setConfirmPassError('Passwords do not match.');
      isValid = false;
    }

    if (!isValid) {
      setAlertType('error');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: password })
      });

      const result = await response.json();

      if (response.ok) {
        setAlertType('success');
        navigate('/login');
      } else {
        setError(result.message);
        setAlertType('error');
      }
    } catch (error) {
      setError('Server error');
      setAlertType('error');
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "50vw", backgroundColor: "black", height: "100vh" }}></Box>
      <Box sx={{ width: "50vw", backgroundColor: "white", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "500px", p: 2 }}>
          <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
            <Typography variant='h5' sx={{ fontSize: "1.7rem", fontWeight: "700", lineHeight: "1.5" }}>Update Password</Typography>
            <Typography variant='h6' sx={{ fontSize: "1rem", fontWeight: "400", lineHeight: "1.57143", color: "#637381" }}>Provide your new password so that you can sign in using the updated password</Typography>
          </Box>

          <Box component="form" onSubmit={handleResetPassword} sx={{ display: "flex", flexDirection: "column", gap: "35px", mt: "30px" }}>
            <TextField
              error={Boolean(passwordError)}
              helperText={passwordError}
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            <TextField
              error={Boolean(confirmPassError)}
              helperText={confirmPassError}
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

            <Button type="submit" variant="contained" sx={{ backgroundColor: "black", height: "3.3rem", fontWeight:"700", fontSize:"0.9375rem", lineHeight:"1.71429", textDecoration:"none" }}>
              Update Password
            </Button>

            <Link style={{ display:"flex", justifyContent:"center", textAlign:"center", textDecoration: "none", marginBottom: "-25px", marginTop: "-10px" }}>
              <KeyboardArrowLeftIcon sx={{color: "#00A76F"}}/>
              <Typography 
                sx={{ fontSize: "1rem", fontWeight: "600", lineHeight: "1.57143", color: "#00A76F", ":hover": { textDecoration: "underline" } }}
                onClick={() => navigate('/login')}
              >
                Return to sign in
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomResetPassword;