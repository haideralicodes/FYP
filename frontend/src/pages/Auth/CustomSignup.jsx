import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    TextField,
    Link
} from '@mui/material';
import cog from '../../assets/cog.png';
import noodle from '../../assets/noodle.png';
import cylinder from '../../assets/cylinder.png';
import tube from '../../assets/tube.png';
import pyramid from '../../assets/pyramid.png';

// Ali@1234

const CustomSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [FNameError, SetFNameError] = useState('');
  const [LNameError, SetLNameError] = useState('');
  const [EmailError, SetEmailError] = useState('');
  const [PhoneNumError, SetPhoneNumError] = useState('');
  const [PasswordError, SetPasswordError] = useState('');
  const [ConfirmPassError, SetConfirmPassError] = useState('');

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login'); 
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?![@$#%^!*&()\-=_+])(?=.*[A-Z])(?=.*[@$!%*?&#]).{8,}$/;

    SetFNameError('');
    SetLNameError('');
    SetEmailError('');
    SetPhoneNumError('');
    SetPasswordError('');
    SetConfirmPassError('');

    let isValid = true;
  
    if (!email.includes('@gmail.com')) {
        SetEmailError('Email must be a valid @gmail.com address');
        isValid = false;
    }
  
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        if (!firstName) SetFNameError('All fields are required');
        if (!lastName) SetLNameError('All fields are required');
        if (!email) SetEmailError('All fields are required');
        if (!phone) SetPhoneNumError('All fields are required');
        if (!password) SetPasswordError('All fields are required');
        if (!confirmPassword) SetConfirmPassError('All fields are required');
        isValid = false;
    }

    if (!passwordRegex.test(password)) {
        SetPasswordError('Password must be at least 8 characters long, contain at least one capital letter, one special character, and not start with a special character.');
        isValid = false;
    }
  
    if (password !== confirmPassword) {
        SetPasswordError('Passwords not match');
        SetConfirmPassError('Passwords not match');
        isValid = false;
    }

    if (!isValid) return;
  
    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
        }),
      });
  
      if (response.ok) {
        console.log('Signup successful');
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Error signing up');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error signing up');
    }
  };
  

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "50vw", backgroundColor: "black", height: "100vh" }}></Box>
      <Box sx={{ width: "50vw", backgroundColor: "white", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "500px", p: 2 }}>
            <Typography variant='h5' sx={{ fontSize: "1.7rem", fontWeight: "700", lineHeight: "1.5" }}>Get started absolutely free</Typography>
            <Typography variant='h6' sx={{ fontSize: "1rem", fontWeight: "400", lineHeight: "1.57143", color: "#637381", display: "flex", gap: "5px" }}>
                Already have an account? 
                <Link style={{ textDecoration: "none" }}>
                  <Typography 
                    onClick={() => navigate('/login')}
                    sx={{ fontSize: "1rem", fontWeight: "600", lineHeight: "1.57143", color: "#00A76F", ":hover": { textDecoration: "underline" } }}>Login</Typography>
                </Link>
            </Typography>
            <Box component="form" onSubmit={handleSignup} sx={{ display: "flex", flexDirection: "column", gap: "35px", mt: "30px" }}>
                <Box sx={{display:"flex", gap:"35px"}}>
                    <TextField
                        error={Boolean(FNameError)}
                        helperText={FNameError}
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        onChange={(e) => setFirstName(e.target.value)}
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
                        error={Boolean(LNameError)}
                        helperText={LNameError}
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        onChange={(e) => setLastName(e.target.value)}
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
                </Box>  
                <TextField
                    error={Boolean(EmailError)}
                    helperText={EmailError}
                    fullWidth
                    label="Email"
                    variant="outlined"
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
                <TextField
                    error={Boolean(PhoneNumError)}
                    helperText={PhoneNumError}
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    onChange={(e) => setPhone(e.target.value)}
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
                <Box sx={{display:"flex", gap:"35px"}}>
                    <TextField
                        error={Boolean(PasswordError)}
                        helperText={PasswordError}
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
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
                        error={Boolean(ConfirmPassError)}
                        helperText={ConfirmPassError}
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
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
                </Box>
                <Button type="submit" variant="contained" sx={{ backgroundColor: "black", height: "3.3rem", fontWeight:"700", fontSize:"0.9375rem", lineHeight:"1.71429", textDecoration:"none"}}>Create Account</Button>
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomSignup;
