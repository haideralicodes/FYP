import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Typography,
    TextField,
    Link
} from '@mui/material';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const CustomForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (email === '') {
      setError('Email is required');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/api/requestOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setShowOtp(true);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to send OTP');
      console.error('Error:', error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/reset-password', { state: { email } });
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      setError('Failed to verify OTP');
      console.error('Error:', error);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) { // Prevent more than one character
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData('Text');
    const otpChars = pastedData.split('').slice(0, 6); // Limit to 6 characters
    const newOtp = otpChars.map((char, index) => otp[index] !== undefined ? char : '');
    setOtp(newOtp);
    
    // Focus the last input field if all pasted
    if (otpChars.length === 6) {
      document.getElementById(`otp-input-5`).focus(); // Move focus to the last input
    }
    event.preventDefault(); // Prevent default paste behavior
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "50vw", backgroundColor: "black", height: "100vh" }}></Box>
      <Box sx={{ width: "50vw", backgroundColor: "white", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "500px", p: 2 }}>
          <Box sx={{ display: "flex", gap: "10px", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            {showOtp ? (
              <lord-icon
                src="https://cdn.lordicon.com/vpbspaec.json"
                trigger="in"
                colors="primary:#00A76F"
                style={{ width: "130px", height: "130px" }}
              ></lord-icon>
            ) : (
              <lord-icon
                src="https://cdn.lordicon.com/fgxwhgfp.json"
                trigger="in"
                state="in-reveal"
                colors="primary:#00A76F"
                style={{ width: "130px", height: "130px" }}
              ></lord-icon>
            )}
            <Typography variant='h5' sx={{ fontSize: "1.7rem", fontWeight: "700", lineHeight: "1.5" }}>
              {showOtp ? "Request sent successfully!" : "Forgot your password?"}
            </Typography>
            <Typography variant='h6' sx={{ fontSize: "1rem", fontWeight: "400", lineHeight: "1.57143", color: "#637381" }}>
              {showOtp ? "We have sent a 6-digit code to your email. Enter it below to verify." : "Please enter your email to request an OTP for resetting your password."}
            </Typography>
          </Box>
          <Box component="form" onSubmit={showOtp ? handleVerifyOtp : handleForgotPassword} sx={{ display: "flex", flexDirection: "column", gap: "35px", mt: "30px" }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            
            {showOtp && (
              <Box sx={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    placeholder='-'
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onPaste={handlePaste}
                    maxLength={1}
                    style={{ height: "3.7rem", width: "4.1rem", textAlign: "center", border: "1px solid black", borderRadius: "10px" }}
                  />
                ))}
              </Box>
            )}

            {error && <Typography color="error">{error}</Typography>}
            {message && <Typography color="success">{message}</Typography>}

            <Button type="submit" variant="contained" sx={{ backgroundColor: "black", height: "3.3rem", fontWeight:"700", fontSize:"0.9375rem", lineHeight:"1.71429", textDecoration:"none"}}>
              {showOtp ? 'Verify OTP' : 'Forgot Password'}
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

export default CustomForgetPassword;