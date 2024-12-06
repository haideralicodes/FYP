import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import cog from '../../assets/cog.png';
import noodle from '../../assets/noodle.png';
import cylinder from '../../assets/cylinder.png';
import tube from '../../assets/tube.png';
import pyramid from '../../assets/pyramid.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alertType, setAlertType] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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
        console.log("\n Token: ", token)
        console.log("\n User Id: ", userId)
        setAlertType('success');
          navigate('/dashboard');
      } 
      else {
        const data = await response.json();
        if (data.message === 'User not found') {
          setAlertType('email-error');
        } else if (data.message === 'Incorrect password') {
          setAlertType('password-error');
        } else {
          setError(data.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed');
    }
  };

  return (
    <div className="login-container">
      <Stack sx={{ width: '26%', height:'0%' }} spacing={100}>
        {alertType === 'success' && (
          <Alert variant="outlined" severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success Alert with an encouraging title.
          </Alert>
        )}
        {alertType === 'email-error' && (
          <Alert variant="outlined" severity="error">
            <AlertTitle>Error</AlertTitle>
            Incorrect Email
          </Alert>
        )}
        {alertType === 'password-error' && (
          <Alert variant="outlined" severity="error">
            <AlertTitle>Error</AlertTitle>
            Incorrect Password
          </Alert>
        )}
      </Stack>

      {/* Login form */}
      <form onSubmit={handleLogin} className="login-form">
        <center><h2>Login</h2></center>
        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="email"
              value={email}
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
          </div>
        </div>

        <p className="loginInfo">
          <span style={{ color: '#422AFB' }} className="forgetPass" onClick={() => navigate('/forget-password')}>
            Forgot Password?
          </span>
        </p>
        <button type="submit" className="login-btn">Login</button>
        <p className="loginInfo">Not Registered yet?
          <span className="loginn" onClick={() => navigate('/signup')}> Signup</span>
        </p>
      </form>
      <img src={cog} alt="Cog" className="cog" />
      <img src={cylinder} alt="Cylinder" className="cylinder" />
      <img src={noodle} alt="Noodle" className="noodle" />
      <img src={tube} alt="Tube" className="tube" />
      <img src={pyramid} alt="Pyramid" className="pyramid" />
    </div>
  );
};

export default Login;
