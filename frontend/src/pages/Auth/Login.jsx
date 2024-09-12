import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed');
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const decoded = jwtDecode(credential);
      const { email, name } = decoded;

      const res = await fetch('http://localhost:4000/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        const data = await res.json();
        setError(data.message || 'Google login failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Google login failed');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login error:', error);
    setError('Google login failed');
  };

  return (
    <div className="login-container">
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

        <p className='loginInfo'><span style={{color:"#422AFB"}} className='forgetPass' onClick={() => navigate('/forget-password')}>Forgot Password?</span></p>
        <button type="submit" className="login-btn">Login</button>
        <p className='loginInfo'>Not Registered yet?<span className='loginn' onClick={() => navigate('/signup')}> Signup</span></p>
        {/* <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div> */}
      </form>
    </div>
  );
};

export default Login;
